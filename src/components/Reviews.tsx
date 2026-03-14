import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    location: "West Lake Hills",
    text: "Marcus arrived within 45 minutes of my call at 3 AM. A pipe had burst in our guest bathroom and water was everywhere. He fixed it quickly and even helped me move some furniture out of the way. Absolute lifesaver!",
    rating: 5
  },
  {
    name: "David Rodriguez",
    location: "South Austin",
    text: "We've used IRONFLOW for three different projects now, including a full tankless water heater installation. Their flat-rate pricing is honest and their work is impeccable. Best plumbers in Austin, hands down.",
    rating: 5
  },
  {
    name: "Amanda Chen",
    location: "Round Rock",
    text: "I was worried about a hidden leak behind my kitchen wall. Their leak detection service found it exactly where they said it would be. They fixed it with minimal damage to the drywall. Very professional.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-limestone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-mono text-teal text-sm font-bold uppercase tracking-widest mb-4">Customer Testimonials</div>
          <h2 className="font-display text-5xl md:text-7xl font-black text-midnight leading-none tracking-tighter mb-8">
            WORD ON THE <span className="text-copper italic">STREET</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-8 right-8 text-teal/20" size={48} />
              <div className="flex text-teal mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-midnight text-lg leading-relaxed mb-8 italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-midnight rounded-full flex items-center justify-center text-teal font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-bold text-midnight">{review.name}</div>
                  <div className="text-steel text-xs uppercase tracking-widest font-bold">{review.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-full font-bold text-midnight hover:bg-midnight hover:text-white transition-all shadow-sm"
          >
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-5" />
            <span>Read More Google Reviews</span>
          </a>
        </div>
      </div>
    </section>
  );
}
