import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('database.sqlite');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    email TEXT,
    phone TEXT,
    service TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS recipients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE
  );
`);

// Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendNotificationEmail(lead: any) {
  try {
    const recipients = db.prepare('SELECT email FROM recipients').all() as { email: string }[];
    if (recipients.length === 0) return;

    const recipientEmails = recipients.map(r => r.email).join(', ');
    
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipientEmails,
      subject: `New Service Request: ${lead.service} - ${lead.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0B1120; border-bottom: 2px solid #00E5FF; padding-bottom: 10px;">New Service Request</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Address:</strong> ${lead.address}</p>
          <p><strong>Service Type:</strong> ${lead.service}</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="font-style: italic;">"${lead.message}"</p>
          </div>
          <p style="font-size: 0.8em; color: #94A3B8; margin-top: 30px;">This is an automated notification from IRONFLOW Plumbing.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Notification email sent to:', recipientEmails);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/leads', async (req, res) => {
    const { name, address, email, phone, service, message } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO leads (name, address, email, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)');
      stmt.run(name, address, email, phone, service, message);
      
      // Send email notification asynchronously
      sendNotificationEmail({ name, address, email, phone, service, message });
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving lead:', error);
      res.status(500).json({ error: 'Failed to save lead' });
    }
  });

  app.get('/api/leads', (req, res) => {
    try {
      const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  });

  app.delete('/api/leads/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete lead' });
    }
  });

  app.delete('/api/leads', (req, res) => {
    try {
      db.prepare('DELETE FROM leads').run();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to clear leads' });
    }
  });

  app.get('/api/recipients', (req, res) => {
    try {
      const recipients = db.prepare('SELECT * FROM recipients').all();
      res.json(recipients);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipients' });
    }
  });

  app.post('/api/recipients', (req, res) => {
    const { email } = req.body;
    try {
      db.prepare('INSERT INTO recipients (email) VALUES (?)').run(email);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add recipient' });
    }
  });

  app.delete('/api/recipients/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM recipients WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete recipient' });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
