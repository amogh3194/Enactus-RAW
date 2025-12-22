// src/pages/ClubDashboard.jsx
import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import NoticeCard from '../components/NoticeCard'; // Ensure you have this file in components!
import { eventsData, recruitmentData } from '../data/mockData';
import { ChevronLeft, Info } from 'lucide-react';

const ClubDashboard = ({ club, onBack }) => {
  const [activeTab, setActiveTab] = useState('events');

  // Filter content specific to this club
  const clubEvents = eventsData.filter(e => e.organizer === club.name);
  const clubRecruitments = recruitmentData.filter(r => r.clubName === club.name);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-10">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-bold transition-colors">
            <ChevronLeft size={16} /> Back to Clubs
          </button>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img src={club.logo} alt={club.name} className="w-24 h-24 rounded-2xl border-4 border-white/10 shadow-xl" />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">{club.fullName}</h1>
              <p className="text-slate-400 max-w-2xl text-lg">{club.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 inline-flex flex-wrap gap-1">
          {['events', 'recruitment', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {clubEvents.length > 0 ? clubEvents.map(e => <EventCard key={e.id} event={e} />) : <p className="text-slate-500">No events found.</p>}
          </div>
        )}
        {activeTab === 'recruitment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
             {clubRecruitments.length > 0 ? clubRecruitments.map(n => <NoticeCard key={n.id} notice={n} />) : <p className="text-slate-500">No recruitments open.</p>}
          </div>
        )}
        {activeTab === 'about' && (
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Info size={20} className="text-teal-600"/> About Us</h3>
            <p className="text-slate-600">{club.description}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClubDashboard;