import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ServicesGrid from '../components/ServicesGrid';
import USPs from '../components/USPs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import MeetMarcus from '../components/MeetMarcus';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';

export default function Landing() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSelectService = (service: string) => {
    setSelectedService(service);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-limestone text-slate900 font-sans selection:bg-teal selection:text-midnight">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicesGrid onSelectService={handleSelectService} />
        <USPs />
        <Stats />
        <Reviews />
        <MeetMarcus />
        <Contact preselectedService={selectedService} />
      </main>
      <Footer />
      <ChatBox />
    </div>
  );
}
