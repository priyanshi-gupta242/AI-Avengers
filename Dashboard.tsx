import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Video, User } from '../types';
import { MOCK_CHART_DATA } from '../constants';

interface DashboardProps {
  videos: Video[];
  user: User | null;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
    <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400">{icon}</div>
    <div>
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ videos, user }) => {
  const userName = user?.name.split(' ')[0] || 'Content Creator';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, {userName}!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Videos Generated" value={videos.length.toString()} icon={<VideoIcon />} />
        <StatCard title="Total Views" value="1.2M" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        } />
        <StatCard title="Subscribers" value="15.7K" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        } />
        <StatCard title="Likes" value="89K" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.331V11.05C7 9.92 7.92 9 9 9h4v1zM7 21a1 1 0 01-1-1V9a1 1 0 011-1h.01M7 9a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1z" /></svg>
        } />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Weekly Uploads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
              <Legend wrapperStyle={{fontSize: "14px"}}/>
              <Bar dataKey="uploads" fill="#22d3ee" name="Uploads" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Audience Growth (Views)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MOCK_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
              <Legend wrapperStyle={{fontSize: "14px"}}/>
              <Line type="monotone" dataKey="views" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4, fill: '#22d3ee' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Dummy icons for StatCard, replace with real ones if needed
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

export default Dashboard;
