import React, { useState } from 'react';
import ClubList from './components/ClubList';
import NoticeThread from './components/NoticeThread';
import { clubsData as initialClubs, initialNotices } from './data/mockData';

export default function App() {
  const [viewMode, setViewMode] = useState('student'); 
  const [activeClub, setActiveClub] = useState(null);
  const [clubs, setClubs] = useState(initialClubs); 
  const [allNotices, setAllNotices] = useState(initialNotices);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSelectClub = (selectedClub) => {
    setActiveClub(selectedClub);
    
    // LOGIC: If Student opens a club, clear the unread count (Reset to 0)
    if (viewMode === 'student' && selectedClub.unread > 0) {
      const updatedClubs = clubs.map((c) => 
        c.id === selectedClub.id ? { ...c, unread: 0 } : c
      );
      setClubs(updatedClubs);
    }
  };

  const handlePostNotice = (clubId, content, fileName) => {
    // 1. Add the Message
    const newMsg = {
      id: Date.now(),
      clubId: clubId,
      sender: "Admin",
      content: content,
      file: fileName,
      timestamp: getCurrentTime()
    };
    setAllNotices([...allNotices, newMsg]);

    // 2. Increment the Unread Count for this Club
    const updatedClubs = clubs.map((c) => 
      c.id === clubId ? { ...c, unread: c.unread + 1 } : c
    );
    setClubs(updatedClubs);
  };

  const handleDeleteNotice = (noticeId) => {
    setAllNotices(allNotices.filter((n) => n.id !== noticeId));
  };

  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center p-6 font-sans relative">
      
      {/* Toggle Switch (Added z-50 here so it stays on top) */}
      <div className="absolute top-6 right-6 z-50 bg-slate-800 p-1 rounded-full border border-slate-700 flex">
        <button 
          onClick={() => { setViewMode('student'); setActiveClub(null); }}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === 'student' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          Student
        </button>
        <button 
          onClick={() => { setViewMode('admin'); setActiveClub(null); }}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === 'admin' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          Admin
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex border border-slate-800/50 relative z-0">
        <ClubList 
          clubs={clubs} 
          activeClubId={activeClub?.id} 
          onSelect={handleSelectClub} 
          mode={viewMode}
        />
        <NoticeThread 
          club={activeClub} 
          notices={allNotices} 
          mode={viewMode}
          onPostNotice={handlePostNotice}
          onDeleteNotice={handleDeleteNotice}
        />
      </div>
    </div>
  );
}