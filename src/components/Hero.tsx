import { motion } from 'motion/react';
import { Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-midnight">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#00E5FF,transparent_70%)] blur-3xl transform -translate-y-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full text-teal font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={16} />
            Austin's Master Plumber (Lic #M-39482)
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 text-balance">
            WHEN EVERY <span className="text-teal italic">DROP</span> COUNTS.
          </h1>
          
          <p className="font-sans text-xl text-steel mb-12 max-w-xl leading-relaxed">
            3rd generation master plumbers delivering 60-minute emergency response and upfront flat-rate pricing. No corporate gimmicks, just Texas-tough service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:5125550199"
              className="flex items-center justify-center gap-3 bg-teal text-midnight px-8 py-5 rounded-sm font-display font-black text-lg hover:bg-white transition-all group"
            >
              <Phone size={20} />
              CALL (512) 555-0199 NOW
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-5 rounded-sm font-display font-black text-lg hover:bg-white/10 transition-all"
            >
              <Calendar size={20} />
              BOOK NON-EMERGENCY SERVICE
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full border-2 border-midnight"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="flex text-teal">
                {'★'.repeat(5)}
              </div>
              <div className="text-white/60 text-sm font-bold uppercase tracking-widest">14,000+ Happy Austinites</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/plumbing/800/1000" 
              alt="Master Plumber at work" 
              className="w-full grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                <div className="text-teal font-mono text-xs font-bold uppercase tracking-widest mb-2">Current Status</div>
                <div className="text-white font-display text-2xl font-bold flex items-center gap-3">
                  <span className="w-3 h-3 bg-teal rounded-full animate-pulse" />
                  3 Crews Active in Austin
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-copper/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
