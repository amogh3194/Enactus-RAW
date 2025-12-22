// src/components/ClubCard.jsx
import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

const ClubCard = ({ club, onClick }) => {
  return (
    <div 
      onClick={() => onClick(club)}
      className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-amber-400 transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
          <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
        </div>
        <span className="bg-slate-50 text-slate-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Users size={12} /> {club.members}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">{club.name}</h3>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">{club.fullName}</p>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">{club.description}</p>
      <div className="pt-4 border-t border-slate-100 flex items-center text-teal-600 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
        View Page <ArrowRight size={16} />
      </div>
    </div>
  );
};

export default ClubCard;