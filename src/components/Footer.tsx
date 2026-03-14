import { Droplets, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-midnight text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-8 group">
              <div className="bg-teal p-2 rounded-lg">
                <Droplets className="text-midnight" size={24} />
              </div>
              <span className="font-display text-2xl font-black tracking-tighter text-white">
                IRONFLOW<span className="text-teal">.</span>
              </span>
            </a>
            <p className="text-steel leading-relaxed mb-8">
              When Every Drop Counts. Austin's premier plumbing experts, delivering 60-minute emergency response and 2-year warranties.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: 'https://facebook.com/ironflow' },
                { Icon: Instagram, href: 'https://instagram.com/ironflow' },
                { Icon: Twitter, href: 'https://twitter.com/ironflow' },
                { Icon: Linkedin, href: 'https://linkedin.com/company/ironflow' }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-teal hover:text-midnight transition-all border border-white/10">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-8">Services</h4>
            <ul className="space-y-4 text-steel">
              <li><a href="#services" className="hover:text-teal transition-colors">Residential Plumbing</a></li>
              <li><a href="#services" className="hover:text-teal transition-colors">Commercial Plumbing</a></li>
              <li><a href="#contact" className="hover:text-teal transition-colors">24/7 Emergency</a></li>
              <li><a href="#services" className="hover:text-teal transition-colors">Drain Cleaning</a></li>
              <li><a href="#services" className="hover:text-teal transition-colors">Water Heaters</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-8">Company</h4>
            <ul className="space-y-4 text-steel">
              <li><a href="#about" className="hover:text-teal transition-colors">About Us</a></li>
              <li><a href="#reviews" className="hover:text-teal transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-teal transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="text-teal font-bold text-lg">(512) 555-0199</div>
                <div className="text-steel text-xs uppercase tracking-widest font-bold mt-1">24/7 Emergency</div>
              </li>
              <li className="text-steel">
                service@ironflow.com
              </li>
              <li className="text-steel">
                1234 Plumber Way, Suite 100<br />Austin, TX 78701
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-steel text-sm">
            © {new Date().getFullYear()} IRONFLOW Plumbing & Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            <span className="text-teal font-mono text-xs font-bold uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
