import React from 'react';
import { MessageSquare, Shield } from 'lucide-react';

const ClubList = ({ clubs, onSelect, activeClubId, mode }) => {
  // If in Admin mode, filter only clubs where user isAdmin
  const displayClubs = mode === 'admin' 
    ? clubs.filter(c => c.isAdmin) 
    : clubs;

  return (
    <div className="w-1/3 border-r border-gray-200 bg-white h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {mode === 'student' ? <MessageSquare size={20}/> : <Shield size={20}/>}
          {mode === 'student' ? 'Student Portal' : 'Admin Console'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">Select a club to view notices</p>
      </div>
      
      <ul>
        {displayClubs.map((club) => (
          <li 
            key={club.id}
            onClick={() => onSelect(club)}
            className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors flex justify-between items-center border-b border-gray-100
              ${activeClubId === club.id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''}`}
          >
            <div className="font-medium text-gray-700">{club.name}</div>
            {mode === 'student' && club.unread > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {club.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubList;