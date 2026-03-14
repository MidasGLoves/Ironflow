import { useState, useEffect } from 'react';
import { Menu, X, Phone, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <div className="bg-midnight p-2 rounded-lg group-hover:bg-teal transition-colors">
            <Droplets className="text-teal group-hover:text-midnight transition-colors" size={24} />
          </div>
          <span className="font-display text-2xl font-black tracking-tighter text-midnight">
            IRONFLOW<span className="text-teal">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-sans text-sm font-bold uppercase tracking-widest text-midnight/70 hover:text-teal transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:5125550199"
            className="flex items-center gap-2 bg-midnight text-white px-6 py-3 rounded-sm font-display font-bold hover:bg-teal hover:text-midnight transition-all group"
          >
            <Phone size={18} className="text-teal group-hover:text-midnight" />
            (512) 555-0199
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-midnight">
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-midnight z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-2xl font-black tracking-tighter text-white">
                IRONFLOW<span className="text-teal">.</span>
              </span>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-4xl font-bold text-white hover:text-teal transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10">
              <div className="text-teal font-mono text-sm mb-4 uppercase tracking-widest">24/7 Emergency Hotline</div>
              <a href="tel:5125550199" className="text-white text-3xl font-display font-black mb-8 block">
                (512) 555-0199
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="bg-copper text-white w-full py-4 rounded-sm font-display font-bold text-lg inline-block text-center"
              >
                Book Online
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
