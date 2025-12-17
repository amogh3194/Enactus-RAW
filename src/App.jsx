import React, { useState } from 'react';
import ClubList from './components/ClubList';
import NoticeThread from './components/NoticeThread';
import { clubsData as initialClubs, initialNotices } from './data/mockData';

export default function App() {
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'admin'
  const [activeClub, setActiveClub] = useState(null);
  const [clubs, setClubs] = useState(initialClubs); // Now using State for clubs
  const [allNotices, setAllNotices] = useState(initialNotices);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 1. Mark as Read Logic
  const handleSelectClub = (selectedClub) => {
    // Set the active club
    setActiveClub(selectedClub);

    // If I am a student, mark this club as read (unread = 0)
    if (viewMode === 'student' && selectedClub.unread > 0) {
      const updatedClubs = clubs.map((c) => 
        c.id === selectedClub.id ? { ...c, unread: 0 } : c
      );
      setClubs(updatedClubs);
    }
  };

  const handlePostNotice = (clubId, content, fileName) => {
    const newMsg = {
      id: Date.now(),
      clubId: clubId,
      sender: "Admin",
      content: content,
      file: fileName,
      timestamp: getCurrentTime()
    };
    setAllNotices([...allNotices, newMsg]);
  };

  // 2. Delete Logic
  const handleDeleteNotice = (noticeId) => {
    setAllNotices(allNotices.filter((n) => n.id !== noticeId));
  };

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center p-8 font-sans">
      
      {/* Simulation Toggle */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow flex gap-2">
        <button 
          onClick={() => { setViewMode('student'); setActiveClub(null); }}
          className={`px-3 py-1 rounded text-sm ${viewMode === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Student View
        </button>
        <button 
          onClick={() => { setViewMode('admin'); setActiveClub(null); }}
          className={`px-3 py-1 rounded text-sm ${viewMode === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Admin View
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden flex">
        <ClubList 
          clubs={clubs} 
          activeClubId={activeClub?.id} 
          onSelect={handleSelectClub} // Use our new handler
          mode={viewMode}
        />
        <NoticeThread 
          club={activeClub} 
          notices={allNotices} 
          mode={viewMode}
          onPostNotice={handlePostNotice}
          onDeleteNotice={handleDeleteNotice} // Pass delete function down
        />
      </div>
    </div>
  );
}