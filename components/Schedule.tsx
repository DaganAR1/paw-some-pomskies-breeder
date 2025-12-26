
import React from 'react';
import { ScheduleEvent } from '../types';

interface ScheduleProps {
  schedule: ScheduleEvent[];
  onJoinWaitlist: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, onJoinWaitlist }) => {
  return (
    <section id="schedule" className="py-24 bg-teal-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Breeding Schedule</h2>
          <p className="text-teal-200 max-w-2xl mx-auto opacity-80">
            Join our waitlist to be first in line for our upcoming seasonal litters.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-teal-800 shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-teal-900 border-b border-teal-800">
                <th className="px-8 py-6 text-teal-300 font-bold uppercase tracking-wider">Season</th>
                <th className="px-8 py-6 text-teal-300 font-bold uppercase tracking-wider">Litter Event</th>
                <th className="px-8 py-6 text-teal-300 font-bold uppercase tracking-wider">Date Expected</th>
                <th className="px-8 py-6 text-teal-300 font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-800">
              {schedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-teal-900/50 transition-colors">
                  <td className="px-8 py-8">
                    <p className="font-bold text-xl">{item.period}</p>
                  </td>
                  <td className="px-8 py-8">
                    <p className="font-semibold text-teal-100">{item.event}</p>
                    <p className="text-sm text-teal-400 mt-1">{item.details}</p>
                  </td>
                  <td className="px-8 py-8 font-mono text-teal-300">{item.date}</td>
                  <td className="px-8 py-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Open
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={onJoinWaitlist}
            className="inline-block px-12 py-4 bg-teal-600 hover:bg-teal-500 rounded-full font-bold transition-all shadow-xl"
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
