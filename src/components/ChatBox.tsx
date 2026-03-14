import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';

const bookServiceTool: FunctionDeclaration = {
  name: 'bookService',
  description: 'Books a plumbing service request for the customer. Call this ONLY after you have collected their name, full address, either email or phone, and the type of service needed.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'Full name of the customer' },
      address: { type: Type.STRING, description: 'Full physical address for the service' },
      email: { type: Type.STRING, description: 'Email address of the customer (optional if phone is provided)' },
      phone: { type: Type.STRING, description: 'Phone number of the customer (optional if email is provided)' },
      service: { type: Type.STRING, description: 'Type of service needed (e.g., General Plumbing Repair, Water Heater Service, Drain Cleaning, Leak Detection, Other)' },
      message: { type: Type.STRING, description: 'Brief description of the issue' }
    },
    required: ['name', 'address', 'service']
  }
};

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: 'Hi! I am the IRONFLOW AI Assistant. How can I help you with your plumbing today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatHistory, setChatHistory] = useState<any[]>([
     { role: 'user', parts: [{ text: 'Hello' }] },
     { role: 'model', parts: [{ text: 'Hi! I am the IRONFLOW AI Assistant. How can I help you with your plumbing today?' }] }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const newHistory = [...chatHistory, { role: 'user', parts: [{ text: userText }] }];
    setChatHistory(newHistory);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: newHistory,
        config: {
          systemInstruction: `You are the expert AI assistant for IRONFLOW Plumbing in Austin, TX. 

          BUSINESS KNOWLEDGE:
          - Owner: Marcus "Iron" Delgado, a Master Plumber (Lic #M-39482) with 22 years of experience.
          - Heritage: 3rd generation Texas plumber. Family-owned, not a franchise.
          - Service Area: Greater Austin, TX.
          - Promise: 60-minute emergency response or the call is free.
          - Pricing: Upfront flat-rate pricing. No hidden fees.
          - Warranty: 2-year warranty on all work.
          - Phone: (512) 555-0199.

          CAPABILITIES:
          - Help users diagnose plumbing issues (leaks, clogs, water heater problems, etc.).
          - Provide expert advice on maintenance.
          - Book service requests using the 'bookService' tool.

          BOOKING PROTOCOL:
          If a user needs service, you MUST collect:
          1. Full Name
          2. Full Service Address
          3. Phone Number OR Email (both is better)
          4. Description of the issue.

          Once you have these, call 'bookService' immediately. 

          TONE:
          Professional, expert, confident, and empathetic. You represent Marcus Delgado's high standards. Be concise but helpful.`,
          tools: [{ functionDeclarations: [bookServiceTool] }]
        }
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'bookService') {
          const args = call.args as any;

          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: args.name,
              address: args.address,
              email: args.email || '',
              phone: args.phone || '',
              service: args.service,
              message: args.message || ''
            })
          });

          // Construct mailto link
          const subject = encodeURIComponent(`Service Request: ${args.service} - ${args.name}`);
          const body = encodeURIComponent(
            `New Service Request Details:\n\n` +
            `Name: ${args.name}\n` +
            `Phone: ${args.phone || 'Not provided'}\n` +
            `Email: ${args.email || 'Not provided'}\n` +
            `Address: ${args.address}\n` +
            `Service Type: ${args.service}\n\n` +
            `Message:\n${args.message || 'No additional message'}`
          );
          
          const mailtoUrl = `mailto:service@ironflow.com?subject=${subject}&body=${body}`;
          
          // Open email client
          window.location.href = mailtoUrl;

          const modelText = "Your service request has been successfully processed! Thank you for trusting IRONFLOW with your home. Your email application is opening now with a copy of your details. Marcus or one of our dispatchers will call you within 10 minutes to finalize everything. Is there anything else I can assist you with today?";
          setMessages(prev => [...prev, { role: 'model', text: modelText }]);
          setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: modelText }] }]);
        }
      } else {
        const modelText = response.text || "I'm sorry, I couldn't process that. How else can I help?";
        setMessages(prev => [...prev, { role: 'model', text: modelText }]);
        setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: modelText }] }]);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting right now. Please call us directly at (512) 555-0199 for immediate assistance!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl w-[90vw] md:w-[400px] h-[600px] flex flex-col overflow-hidden border border-slate-200 mb-4"
          >
            <div className="bg-midnight p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
                  <Bot size={24} className="text-midnight" />
                </div>
                <div>
                  <div className="text-white font-bold">IRONFLOW AI</div>
                  <div className="text-teal text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                    Expert Plumber Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-limestone">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-midnight text-white rounded-tr-none' 
                      : 'bg-white text-midnight shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                    <Loader2 size={20} className="animate-spin text-teal" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about a leak, repair, or booking..."
                  className="flex-1 bg-limestone border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-midnight text-white p-3 rounded-xl hover:bg-teal hover:text-midnight transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-midnight text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
