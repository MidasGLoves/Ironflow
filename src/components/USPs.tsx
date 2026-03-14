import { motion } from 'motion/react';
import { Clock, DollarSign, ShieldCheck, UserCheck } from 'lucide-react';

const usps = [
  {
    icon: Clock,
    title: "60-Min Response",
    desc: "When you have an emergency, every minute counts. We guarantee a 60-minute response time for all emergency calls in Austin."
  },
  {
    icon: DollarSign,
    title: "Flat-Rate Pricing",
    desc: "No hourly surprises. We provide upfront, flat-rate pricing before any work begins. You'll know exactly what you're paying."
  },
  {
    icon: ShieldCheck,
    title: "2-Year Warranty",
    desc: "We stand by our craftsmanship. Every repair and installation comes with a comprehensive 2-year warranty on parts and labor."
  },
  {
    icon: UserCheck,
    title: "Master Plumber Owned",
    desc: "Not a franchise. IRONFLOW is owned and operated by Marcus Delgado, a 3rd generation Master Plumber with 22 years of experience."
  }
];

export default function USPs() {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal/5 skew-x-12 transform translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-teal text-sm font-bold uppercase tracking-widest mb-4">The IRONFLOW Advantage</div>
            <h2 className="font-display text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8">
              WHY AUSTIN <span className="text-teal italic">TRUSTS</span> THE FLOW.
            </h2>
            <p className="text-steel text-xl mb-12 max-w-xl">
              We've built our reputation on three generations of plumbing excellence. We don't just fix pipes; we provide peace of mind.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <ShieldCheck className="text-teal" size={32} />
              </div>
              <div>
                <div className="text-white font-bold text-lg">Fully Licensed & Insured</div>
                <div className="text-steel text-sm">Texas Master Plumber Lic #M-39482</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {usps.map((usp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-teal/20 text-teal rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <usp.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{usp.title}</h3>
                <p className="text-steel text-sm leading-relaxed">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
