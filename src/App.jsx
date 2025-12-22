// src/App.jsx
import React, { useState } from 'react';
// These imports must match the file locations exactly!
import ClubsPage from './pages/ClubsPage';
import ClubDashboard from './pages/ClubDashboard';

export default function App() {
  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <div>
      {selectedClub ? (
        // IF a club is selected, show its Dashboard (Events/Recruitments)
        <ClubDashboard 
          club={selectedClub} 
          onBack={() => setSelectedClub(null)} 
        />
      ) : (
        // ELSE show the list of all clubs
        <ClubsPage 
          onSelectClub={(club) => setSelectedClub(club)} 
        />
      )}
    </div>
  );
}