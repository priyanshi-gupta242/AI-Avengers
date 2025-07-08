import { NavItem } from './types';
import { DashboardIcon } from './components/icons/DashboardIcon';
import { ChatbotIcon } from './components/icons/ChatbotIcon';
import { VideoIcon } from './components/icons/VideoIcon';
import { ProfileIcon } from './components/icons/ProfileIcon';

export const NAV_ITEMS: NavItem[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'Chatbot', label: 'Chatbot', icon: ChatbotIcon },
  { id: 'Videos', label: 'Videos', icon: VideoIcon },
  { id: 'Profile', label: 'Profile', icon: ProfileIcon },
];

export const MOCK_CHART_DATA = [
  { name: 'Week 1', uploads: 4, views: 2400 },
  { name: 'Week 2', uploads: 3, views: 1398 },
  { name: 'Week 3', uploads: 5, views: 9800 },
  { name: 'Week 4', uploads: 2, views: 3908 },
  { name: 'Week 5', uploads: 6, views: 4800 },
  { name: 'Week 6', uploads: 3, views: 3800 },
  { name: 'Week 7', uploads: 7, views: 10300 },
];
