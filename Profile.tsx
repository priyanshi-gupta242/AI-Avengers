import React from 'react';
import { Video, User } from '../types';
import { VideoIcon } from './icons/VideoIcon';

interface ProfileProps {
  videos: Video[];
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ videos, user }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white">Account Profile</h1>
        <p className="text-slate-400 mt-1">Manage your account details and view your content history.</p>
      </div>

      <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 space-y-6">
        <h2 className="text-xl font-semibold text-cyan-400 border-b border-slate-700 pb-3">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-slate-400">Name</label>
            <p className="mt-1 text-white p-3 bg-slate-700/50 rounded-md border border-slate-600">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-400">Email</label>
            <p className="mt-1 text-white p-3 bg-slate-700/50 rounded-md border border-slate-600">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-400">Account Created</label>
            <p className="mt-1 text-white p-3 bg-slate-700/50 rounded-md border border-slate-600">A few moments ago</p>
          </div>
           <div>
            <label className="text-sm font-medium text-slate-400">YouTube Channel</label>
            <p className="mt-1 text-cyan-400 p-3 bg-slate-700/50 rounded-md border border-slate-600">Connected</p>
          </div>
        </div>
        <div className="pt-4">
           <button className="px-5 py-2 bg-slate-600 text-white font-bold rounded-lg cursor-not-allowed" disabled>Update Profile</button>
        </div>
      </div>

      <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-cyan-400 border-b border-slate-700 pb-3 mb-4">Content History</h2>
        {videos.length > 0 ? (
          <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {videos.map(video => (
              <li key={video.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center gap-3">
                  <VideoIcon className="h-5 w-5 text-cyan-400"/>
                  <span className="text-white font-medium">{video.title}</span>
                </div>
                <span className="text-sm text-slate-400">{new Date(video.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 text-center py-8">No content has been generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
