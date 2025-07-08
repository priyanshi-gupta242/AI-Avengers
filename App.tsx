import React, { useState, useCallback } from 'react';
import { Page, Video, User } from './types';
import { NAV_ITEMS } from './constants';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import VideoManager from './components/VideoManager';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [videos, setVideos] = useState<Video[]>([]);

  const handleLogin = useCallback((user: User) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentPage('Dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  }, []);

  const addVideo = useCallback((video: Video) => {
    setVideos(prevVideos => [video, ...prevVideos]);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard videos={videos} user={currentUser} />;
      case 'Chatbot':
        return <Chatbot addVideo={addVideo} setCurrentPage={setCurrentPage} />;
      case 'Videos':
        return <VideoManager videos={videos} />;
      case 'Profile':
        return <Profile videos={videos} user={currentUser} />;
      default:
        return <Dashboard videos={videos} user={currentUser} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} navItems={NAV_ITEMS} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
