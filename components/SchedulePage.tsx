
import React from 'react';
import { ScheduleEvent } from '../types';

interface SchedulePageProps {
  schedule: ScheduleEvent[];
  onBackToHome: () => void;
  onNavigateWaitlist: (litterName?: string) => void;
}

const SchedulePage: React.FC<SchedulePageProps> = ({ schedule, onBackToHome, onNavigateWaitlist }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-teal-950 text-white py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBackToHome}
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-6xl font-black mb-6">Breeding Schedule</h1>
          <p className="text-teal-200 max-w-2xl mx-auto opacity-80 text-xl leading-relaxed">
            Planning ahead for your new best friend? View our projected litters for the upcoming seasons.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
              <div className="grid grid-cols-1 divide-y divide-slate-100">
                {schedule.map((item, idx) => (
                  <div key={idx} className="p-12 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/4 text-center md:text-left">
                      <div className="text-teal-600 font-black text-sm uppercase tracking-[0.3em] mb-2">{item.period}</div>
                      <div className="text-4xl font-black text-slate-900">{item.date.split(' ')[0]}</div>
                      <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{item.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-3xl font-black text-slate-900 mb-4">{item.event}</h3>
                      <p className="text-slate-500 text-lg">{item.details}</p>
                    </div>
                    <div className="w-full md:w-auto">
                      <button 
                        onClick={() => onNavigateWaitlist(item.event)}
                        className="w-full md:w-auto px-10 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20"
                      >
                        Apply for Waitlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 p-12 bg-teal-50 rounded-[3rem] border border-teal-100 text-center">
              <h3 className="text-3xl font-black text-teal-900 mb-4">Waitlist Policy</h3>
              <p className="text-teal-800/70 max-w-2xl mx-auto leading-relaxed">
                To maintain the highest level of care for our pups, we only accept a limited number of families per litter. A refundable $500 deposit is required to secure your pick position. Our waitlist families get first access to photos and selection before puppies are made available to the general public.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
