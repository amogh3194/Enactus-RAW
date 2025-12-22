import React from 'react';

const Header = () => {
  return (
    <header className="bg-amber-400 px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Simple Circle Logo */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
           <span className="font-bold text-amber-500 text-lg">IIT</span>
        </div>
        <div>
          <h1 className="font-bold text-slate-900 text-lg leading-tight">Noticeboard</h1>
          <p className="text-xs text-slate-800 font-medium opacity-80">Enactus • IIT Roorkee</p>
        </div>
      </div>
      
      {/* Aesthetic buttons (visual only for now) */}
      <div className="hidden md:flex gap-3">
        <div className="px-4 py-1.5 font-bold text-slate-800 border border-slate-800/20 rounded text-sm">Dashboard</div>
        <div className="px-4 py-1.5 font-bold text-white bg-teal-600 rounded shadow-sm text-sm">Profile</div>
      </div>
    </header>
  );
};

export default Header;