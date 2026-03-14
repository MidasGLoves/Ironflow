import { motion } from 'motion/react';
import { Award, Shield, CheckCircle } from 'lucide-react';

export default function MeetMarcus() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-limestone shadow-2xl">
              <img 
                src="https://picsum.photos/seed/marcus/800/1000" 
                alt="Marcus Delgado" 
                className="w-full"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-8 z-20 bg-teal text-midnight p-8 rounded-2xl shadow-xl">
              <div className="font-display text-5xl font-black leading-none">22</div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest">Years in Austin</div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-teal text-sm font-bold uppercase tracking-widest mb-4">The Master Plumber</div>
            <h2 className="font-display text-5xl md:text-7xl font-black text-midnight leading-none tracking-tighter mb-8">
              MEET <span className="text-copper italic">MARCUS</span> DELGADO.
            </h2>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12">
              <p className="font-bold text-midnight">
                "I didn't just learn plumbing from a textbook; I learned it holding a flashlight for my grandfather when I was ten years old. IRONFLOW isn't a corporate franchise owned by an investment firm. We are an Austin family business."
              </p>
              <p>
                "We know the limestone soil that shifts your pipes, we know the hard water that eats your heaters, and we know that when water is pouring through your ceiling at 2 AM, you don't want a salesman—you want a master tradesman."
              </p>
              <p>
                "We treat your home exactly how we treat ours: with absolute respect."
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-4 p-4 bg-limestone rounded-xl border border-slate-100">
                <Award className="text-teal" size={32} />
                <div className="font-bold text-midnight">Master Plumber Lic #M-39482</div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-limestone rounded-xl border border-slate-100">
                <Shield className="text-teal" size={32} />
                <div className="font-bold text-midnight">3rd Generation Tradesman</div>
              </div>
            </div>

            <a 
              href="#contact"
              className="inline-flex items-center gap-3 bg-midnight text-white px-8 py-4 rounded-sm font-display font-bold text-lg hover:bg-teal hover:text-midnight transition-all group"
            >
              Book Service with Marcus
              <CheckCircle size={20} className="text-teal group-hover:text-midnight" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
