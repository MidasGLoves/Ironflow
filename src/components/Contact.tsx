import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

export default function Contact({ preselectedService }: { preselectedService: string | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmailer, setShowEmailer] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'General Repair',
    message: ''
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const subject = encodeURIComponent(`Service Request: ${formData.service} - ${formData.name}`);
        const body = encodeURIComponent(
          `New Service Request Details:\n\n` +
          `Name: ${formData.name}\n` +
          `Phone: ${formData.phone}\n` +
          `Address: ${formData.address}\n` +
          `Service Type: ${formData.service}\n\n` +
          `Message:\n${formData.message}`
        );
        
        // Gmail Compose URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=service@ironflow.com&su=${subject}&body=${body}`;
        
        // Open Gmail in a new tab
        const gmailWindow = window.open(gmailUrl, '_blank');
        
        // DETECTION LOGIC: Trigger success when they return to this tab OR close the Gmail tab
        const handleReturn = () => {
          setIsSubmitted(true);
          window.removeEventListener('focus', handleReturn);
          if (checkInterval) clearInterval(checkInterval);
        };
        
        window.addEventListener('focus', handleReturn);

        // Also poll for window closure as a secondary detection
        const checkInterval = setInterval(() => {
          if (gmailWindow && gmailWindow.closed) {
            handleReturn();
          }
        }, 500);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-midnight relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="font-mono text-teal text-sm font-bold uppercase tracking-widest mb-4">Get In Touch</div>
            <h2 className="font-display text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8">
              READY TO <span className="text-teal italic">FLOW</span>?
            </h2>
            <p className="text-steel text-xl mb-12 max-w-md">
              Fill out the form for non-emergency service, or call our 24/7 hotline for immediate emergency response.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-teal group-hover:text-midnight transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-steel text-xs font-bold uppercase tracking-widest mb-1">24/7 Emergency Hotline</div>
                  <a href="tel:5125550199" className="text-white text-2xl font-display font-bold hover:text-teal transition-colors">(512) 555-0199</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-teal group-hover:text-midnight transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-steel text-xs font-bold uppercase tracking-widest mb-1">Email Support</div>
                  <a href="mailto:service@ironflow.com" className="text-white text-2xl font-display font-bold hover:text-teal transition-colors">service@ironflow.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-teal group-hover:text-midnight transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-steel text-xs font-bold uppercase tracking-widest mb-1">Service Area</div>
                  <div className="text-white text-2xl font-display font-bold">Greater Austin, TX</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-limestone border-none rounded-xl px-4 py-4 text-midnight focus:ring-2 focus:ring-teal outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-limestone border-none rounded-xl px-4 py-4 text-midnight focus:ring-2 focus:ring-teal outline-none"
                        placeholder="(512) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">Service Address</label>
                    <input 
                      required
                      type="text" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-limestone border-none rounded-xl px-4 py-4 text-midnight focus:ring-2 focus:ring-teal outline-none"
                      placeholder="123 Austin St, Austin, TX"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">Service Type</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-limestone border-none rounded-xl px-4 py-4 text-midnight focus:ring-2 focus:ring-teal outline-none appearance-none"
                    >
                      <option>General Repair</option>
                      <option>Emergency Repairs</option>
                      <option>Water Heaters</option>
                      <option>Drain Cleaning</option>
                      <option>Leak Detection</option>
                      <option>Commercial Services</option>
                      <option>Gas Line Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">Message (Optional)</label>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full bg-limestone border-none rounded-xl px-4 py-4 text-midnight focus:ring-2 focus:ring-teal outline-none resize-none"
                      placeholder="Tell us about the issue..."
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-midnight text-white py-5 rounded-xl font-display font-black text-xl hover:bg-teal hover:text-midnight transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                    {isSubmitting ? 'SENDING...' : 'REQUEST SERVICE'}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-teal/20 text-teal rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="font-display text-4xl font-black text-midnight mb-4">REQUEST SUCCESSFULLY PROCESSED!</h3>
                  <p className="text-steel text-lg mb-8">
                    Thank you for choosing IRONFLOW. Your request has been sent successfully. 
                    Marcus or one of our expert dispatchers will reach out to you within 10 minutes. We appreciate your trust in our family business!
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-teal font-bold hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
