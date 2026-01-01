import React, { useState } from 'react';
import ClubsPage from './pages/ClubsPage';
import ClubDashboard from './pages/ClubDashboard';
import EventDetailsPage from './pages/EventDetailsPage';
import RecruitmentPage from './pages/RecruitmentPage'; // <--- Import New Page

export default function App() {
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null); // <--- New State

  // 1. If Event Page Active
  if (selectedEvent) {
    return (
      <EventDetailsPage 
        event={selectedEvent} 
        onBack={() => setSelectedEvent(null)} 
      />
    );
  }

  // 2. If Recruitment Page Active (NEW)
  if (selectedNotice) {
    return (
      <RecruitmentPage 
        notice={selectedNotice}
        onBack={() => setSelectedNotice(null)}
      />
    );
  }

  // 3. If Club Dashboard Active
  if (selectedClub) {
    return (
      <ClubDashboard 
        club={selectedClub} 
        onBack={() => setSelectedClub(null)}
        onEventClick={(event) => setSelectedEvent(event)}
        onNoticeClick={(notice) => setSelectedNotice(notice)} // <--- Handle Notice Click
      />
    );
  }

  // 4. Default: Club List
  return (
    <ClubsPage 
      onSelectClub={(club) => setSelectedClub(club)} 
    />
  );
}