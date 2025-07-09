export type Page = 'Dashboard' | 'Chatbot' | 'Videos' | 'Profile';

export interface NavItem {
  id: Page;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Video {
  id: string;
  title: string;
  script: string;
  thumbnailUrl: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: React.ReactNode;
  isLoading?: boolean;
}

export enum ChatStep {
  AWAITING_TOPIC,
  GENERATING_CONTENT,
}

// Added User type for authentication
export interface User {
  id: string;
  name: string;
  email: string;
}
