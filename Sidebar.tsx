import React from 'react';
import { Page, NavItem } from '../types';
import { LogoIcon } from './icons/LogoIcon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout, navItems }) => {
  return (
    <aside className="w-64 bg-slate-900/70 backdrop-blur-md border-r border-slate-800 flex flex-col p-4 transition-all duration-300">
      <div className="flex items-center gap-3 mb-10 px-2">
        <LogoIcon className="h-10 w-10 text-cyan-400" />
        <span className="text-xl font-bold text-slate-100">Video Automator</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
              currentPage === item.id
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
