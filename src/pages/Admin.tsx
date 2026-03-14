import { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, Calendar, MapPin, User, MessageSquare, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Lead {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}

interface Recipient {
  id: number;
  email: string;
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [newRecipient, setNewRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<{id: number | 'all'} | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, recipientsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/recipients')
      ]);
      const leadsData = await leadsRes.json();
      const recipientsData = await recipientsRes.json();
      setLeads(leadsData);
      setRecipients(recipientsData);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLead = async (id: number) => {
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      setLeads(leads.filter(l => l.id !== id));
      setShowConfirmDelete(null);
    } catch (err) {
      setError('Failed to delete lead');
    }
  };

  const handleClearAllLeads = async () => {
    try {
      await fetch('/api/leads', { method: 'DELETE' });
      setLeads([]);
      setShowConfirmDelete(null);
    } catch (err) {
      setError('Failed to clear leads');
    }
  };

  const handleAddRecipient = async (e: any) => {
    e.preventDefault();
    if (!newRecipient) return;
    try {
      const res = await fetch('/api/recipients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newRecipient })
      });
      if (res.ok) {
        setNewRecipient('');
        fetchData();
      }
    } catch (err) {
      setError('Failed to add recipient');
    }
  };

  const handleDeleteRecipient = async (id: number) => {
    try {
      await fetch(`/api/recipients/${id}`, { method: 'DELETE' });
      setRecipients(recipients.filter(r => r.id !== id));
    } catch (err) {
      setError('Failed to delete recipient');
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-limestone">Loading...</div>;

  return (
    <div className="min-h-screen bg-limestone p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-display text-4xl font-black text-midnight mb-2">Admin Dashboard</h1>
            <p className="text-steel">Manage service requests and notification recipients.</p>
          </div>
          <button 
            onClick={() => setShowConfirmDelete({ id: 'all' })}
            className="flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            <Trash2 size={18} />
            Clear All Requests
          </button>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-midnight mb-6 flex items-center gap-3">
              <MessageSquare className="text-teal" />
              Service Requests ({leads.length})
            </h2>
            
            <div className="space-y-4">
              {leads.map((lead) => (
                <motion.div 
                  layout
                  key={lead.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-midnight flex items-center gap-2">
                        <User size={18} className="text-steel" />
                        {lead.name}
                      </h3>
                      <p className="text-steel text-sm flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(lead.created_at).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowConfirmDelete({ id: lead.id })}
                      className="text-steel hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail size={16} className="text-teal" />
                      <span className="text-sm">{lead.email || 'No email provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone size={16} className="text-teal" />
                      <span className="text-sm">{lead.phone || 'No phone provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 md:col-span-2">
                      <MapPin size={16} className="text-teal" />
                      <span className="text-sm">{lead.address}</span>
                    </div>
                  </div>

                  <div className="bg-limestone p-4 rounded-xl">
                    <div className="font-bold text-xs uppercase tracking-widest text-steel mb-2">Service Requested</div>
                    <div className="text-midnight font-bold mb-2">{lead.service}</div>
                    <div className="text-slate-600 text-sm italic">"{lead.message}"</div>
                  </div>
                </motion.div>
              ))}

              {leads.length === 0 && (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                  <p className="text-steel">No service requests yet.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-midnight mb-6 flex items-center gap-3">
              <Mail className="text-teal" />
              Notifications
            </h2>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <form onSubmit={handleAddRecipient} className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">Add Recipient</label>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="email@example.com"
                    className="flex-1 bg-limestone border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal outline-none"
                  />
                  <button type="submit" className="bg-midnight text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-teal hover:text-midnight transition-all">
                    Add
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-steel mb-2">Active Recipients</div>
                {recipients.map((r) => (
                  <div key={r.id} className="flex justify-between items-center p-3 bg-limestone rounded-lg">
                    <span className="text-sm text-midnight">{r.email}</span>
                    <button 
                      onClick={() => handleDeleteRecipient(r.id)}
                      className="text-steel hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-midnight/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-midnight mb-4">Confirm Deletion</h3>
              <p className="text-steel mb-8">
                {showConfirmDelete.id === 'all' 
                  ? "Are you absolutely sure you want to delete ALL service requests? This action cannot be undone." 
                  : "Are you sure you want to delete this service request? This action cannot be undone."}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirmDelete(null)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-steel hover:bg-limestone transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (showConfirmDelete.id === 'all') handleClearAllLeads();
                    else handleDeleteLead(showConfirmDelete.id as number);
                  }}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
