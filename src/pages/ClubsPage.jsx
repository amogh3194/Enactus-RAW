// src/pages/ClubsPage.jsx
import React from 'react';
import Header from '../components/Header';
import ClubCard from '../components/ClubCard';
import { clubsData } from '../data/mockData';

const ClubsPage = ({ onSelectClub }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Student <span className="text-amber-500">Clubs</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubsData.map((club) => (
            <ClubCard key={club.id} club={club} onClick={onSelectClub} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClubsPage;