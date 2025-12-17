import React, { useState } from 'react';
import { Bell, Paperclip, Send, FileText, Trash2 } from 'lucide-react';

const NoticeThread = ({ club, notices, mode, onPostNotice, onDeleteNotice }) => {
  const [newNotice, setNewNotice] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNotice && !attachedFile) return;
    
    onPostNotice(club.id, newNotice, attachedFile ? attachedFile.name : null);
    setNewNotice("");
    setAttachedFile(null);
  };

  if (!club) {
    return (
      <div className="w-2/3 flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
        <Bell size={48} className="mb-4 opacity-50"/>
        <p>Select a club to view the notice board</p>
      </div>
    );
  }

  const clubNotices = notices.filter(n => n.clubId === club.id);

  return (
    <div className="w-2/3 flex flex-col h-full bg-[#e5ded8]">
      
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{club.name}</h3>
          <span className="text-xs text-green-600 font-medium">Official Notice Thread</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {clubNotices.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-10">No notices yet.</div>
        ) : (
          clubNotices.map((notice) => (
            <div key={notice.id} className="flex flex-col items-start w-full">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[70%] relative group">
                
                {/* Delete Button (Only for Admin) */}
                {mode === 'admin' && (
                  <button 
                    onClick={() => onDeleteNotice(notice.id)}
                    className="absolute -right-8 top-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete Notice"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* File Attachment */}
                {notice.file && (
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded mb-2 border border-gray-200">
                    <FileText size={16} className="text-red-500"/>
                    <span className="text-sm font-medium text-blue-600 underline cursor-pointer">{notice.file}</span>
                  </div>
                )}
                
                {/* Content */}
                <p className="text-gray-800 text-sm whitespace-pre-wrap pr-2">{notice.content}</p>
                
                {/* Timestamp */}
                <div className="text-[10px] text-gray-400 text-right mt-1">
                  {notice.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Admin Input Area */}
      {mode === 'admin' && (
        <div className="p-4 bg-gray-100 border-t">
           <form onSubmit={handleSubmit} className="flex flex-col gap-2">
             <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={newNotice}
                  onChange={(e) => setNewNotice(e.target.value)}
                  placeholder="Type a new notice..." 
                  className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                >
                  <Send size={20} />
                </button>
             </div>
             <div className="flex items-center gap-2">
                <label className="cursor-pointer flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                  <Paperclip size={16} />
                  <span>{attachedFile ? attachedFile.name : "Attach File"}</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => setAttachedFile(e.target.files[0])}
                  />
                </label>
             </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default NoticeThread;