
import React from 'react';

interface HeroProps {
  logo: string;
  backgroundImage: string;
  onOpenAdoption: () => void;
}

const Hero: React.FC<HeroProps> = ({ logo, backgroundImage, onOpenAdoption }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          className="w-full h-full object-cover"
          alt="Adorable Pomsky running"
        />
        <div className="absolute inset-0 section-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-4 shadow-2xl animate-in fade-in zoom-in duration-1000">
                <img src={logo} alt="Pawsome Pomsky Logo" className="w-full h-full object-contain" />
            </div>
        </div>

        <span className="inline-block px-4 py-1 mb-6 rounded-full bg-teal-500 text-white text-sm font-bold uppercase tracking-widest">
          Premium Boutique Breeder
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Perfect <br/><span className="text-teal-300">Pawsome Companion</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
          Specializing in healthy, socialized, and stunning Pomskies from champion lines.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onOpenAdoption}
            className="bg-teal-500 hover:bg-teal-400 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Adopt Today
          </button>
          <a href="#about" className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg transition-all">
            Our Story
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
