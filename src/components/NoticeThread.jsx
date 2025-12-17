import React, { useState } from 'react';
import { Bell, Paperclip, Send, FileText, Trash2, Clock } from 'lucide-react';

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
      <div className="w-2/3 flex flex-col items-center justify-center h-full bg-slate-50">
        <div className="bg-white p-6 rounded-full shadow-sm mb-4">
          <Bell size={48} className="text-slate-300"/>
        </div>
        <h3 className="text-xl font-bold text-slate-700">No Club Selected</h3>
        <p className="text-slate-400 mt-2">Choose a club from the sidebar to view updates</p>
      </div>
    );
  }

  const clubNotices = notices.filter(n => n.clubId === club.id);

  return (
    <div className="w-2/3 flex flex-col h-full bg-slate-50/50 relative">
      
      {/* Header */}
      <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div>
          <h3 className="font-bold text-xl text-slate-800">{club.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Official Feed</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {clubNotices.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 opacity-50">
            <div className="w-16 h-1 bg-slate-200 rounded mb-2"></div>
            <div className="w-10 h-1 bg-slate-200 rounded"></div>
            <p className="text-slate-400 text-sm mt-4">No notices posted yet</p>
          </div>
        ) : (
          clubNotices.map((notice) => (
            <div key={notice.id} className="group flex flex-col items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white rounded-2xl rounded-tl-none p-5 shadow-sm border border-slate-100 max-w-[80%] hover:shadow-md transition-shadow relative">
                
                {/* Delete Button */}
                {mode === 'admin' && (
                  <button 
                    onClick={() => onDeleteNotice(notice.id)}
                    className="absolute -right-10 top-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-2 bg-white rounded-full shadow-sm"
                    title="Delete Notice"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Header of Card */}
                <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-2">
                   <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">ADMIN</span>
                   <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                      <Clock size={10} />
                      {notice.timestamp}
                   </div>
                </div>

                {/* Content */}
                <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{notice.content}</p>

                {/* Attachment */}
                {notice.file && (
                  <div className="mt-4 flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 p-2 rounded-lg transition-colors cursor-pointer group/file">
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                       <FileText size={16} className="text-rose-500"/>
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover/file:text-indigo-600 underline decoration-dotted">{notice.file}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Admin Input Area */}
      {mode === 'admin' && (
        <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-20">
           <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
             <input 
               type="text" 
               value={newNotice}
               onChange={(e) => setNewNotice(e.target.value)}
               placeholder="Write a new announcement..." 
               className="w-full bg-transparent p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none text-sm font-medium"
             />
             
             <div className="flex items-center justify-between px-2 pb-1">
                <label className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors py-1 px-2 rounded hover:bg-indigo-50">
                  <Paperclip size={16} />
                  <span>{attachedFile ? attachedFile.name : "Attach File"}</span>
                  <input type="file" className="hidden" onChange={(e) => setAttachedFile(e.target.files[0])} />
                </label>

                <button 
                  type="submit" 
                  disabled={!newNotice && !attachedFile}
                  className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 px-4"
                >
                  <span className="text-xs font-bold">POST</span>
                  <Send size={16} />
                </button>
             </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default NoticeThread;