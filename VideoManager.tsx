import React, { useState } from 'react';
import { Video } from '../types';

interface VideoManagerProps {
  videos: Video[];
}

const VideoCard: React.FC<{ video: Video; onSelect: () => void }> = ({ video, onSelect }) => (
  <div 
    className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden cursor-pointer group transform hover:-translate-y-1 transition-transform duration-300"
    onClick={onSelect}
  >
    <div className="aspect-video bg-slate-700 overflow-hidden">
      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-white truncate">{video.title}</h3>
      <p className="text-sm text-slate-400">{new Date(video.createdAt).toLocaleDateString()}</p>
    </div>
  </div>
);

const VideoDetailModal: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
      <div className="p-4 flex justify-between items-center border-b border-slate-700">
        <h2 className="text-xl font-bold text-white truncate">{video.title}</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">Generated Thumbnail</h3>
          <img src={video.thumbnailUrl} alt={video.title} className="w-full rounded-lg aspect-video object-cover" />
           <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 bg-cyan-500 text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors">Download Video</button>
            <button className="flex-1 py-2 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors">Upload to YouTube</button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">Generated Script</h3>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 h-96 overflow-y-auto">
            <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{video.script}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VideoManager: React.FC<VideoManagerProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Video Content</h1>
        <p className="text-slate-400 mt-1">Manage and preview your generated videos.</p>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} onSelect={() => setSelectedVideo(video)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
          <h3 className="text-xl font-semibold text-white">No Videos Yet</h3>
          <p className="text-slate-400 mt-2">Use the chatbot to generate your first video!</p>
        </div>
      )}
      
      {selectedVideo && <VideoDetailModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default VideoManager;
