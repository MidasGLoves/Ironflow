import { motion } from 'motion/react';
import { Droplets, Flame, Wind, ShieldAlert, Wrench, Search } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: "Emergency Repairs",
    desc: "Burst pipes, major leaks, and overflowing toilets. We arrive in 60 minutes or less.",
    price: "From $189"
  },
  {
    icon: Flame,
    title: "Water Heaters",
    desc: "Traditional and tankless solutions. Repair, maintenance, and expert installation.",
    price: "From $249"
  },
  {
    icon: Search,
    title: "Leak Detection",
    desc: "Non-invasive ultrasonic leak detection to find hidden issues before they cause damage.",
    price: "From $299"
  },
  {
    icon: ShieldAlert,
    title: "Drain Cleaning",
    desc: "Professional hydro-jetting and snaking to clear even the most stubborn Austin roots.",
    price: "From $149"
  },
  {
    icon: Wrench,
    title: "Commercial Services",
    desc: "Full-scale plumbing solutions for Austin businesses, restaurants, and retail spaces.",
    price: "Custom Quote"
  },
  {
    icon: Wind,
    title: "Gas Line Service",
    desc: "Safe, certified gas line repair and installation for stoves, dryers, and fireplaces.",
    price: "From $199"
  }
];

export default function ServicesGrid({ onSelectService }: { onSelectService: (service: string) => void }) {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-teal text-sm font-bold uppercase tracking-widest mb-4">Our Expertise</div>
            <h2 className="font-display text-5xl md:text-7xl font-black text-midnight leading-none tracking-tighter">
              AUSTIN'S <span className="text-copper italic">FULL-SERVICE</span>&nbsp; PLUMBING SHOP.
            </h2>
          </div>
          <p className="text-steel max-w-sm font-sans text-lg">
            From minor drips to major disasters, we bring master-level precision to every job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.button 
              key={i}
              onClick={() => onSelectService(service.title)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-limestone p-8 rounded-2xl border border-slate-100 hover:border-teal/50 hover:shadow-xl transition-all duration-500 block text-left w-full cursor-pointer"
            >
              <div className="w-14 h-14 bg-midnight text-teal rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold text-midnight mb-4">{service.title}</h3>
              <p className="text-steel mb-8 leading-relaxed">{service.desc}</p>
              <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-midnight">{service.price}</span>
                <div className="text-teal font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Service <ArrowRight size={16} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}
