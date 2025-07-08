import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, Video, ChatStep, Page } from '../types';
import { generateVideoContent } from '../services/geminiService';
import { SendIcon } from './icons/SendIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { LogoIcon } from './icons/LogoIcon';

interface ChatbotProps {
  addVideo: (video: Video) => void;
  setCurrentPage: (page: Page) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ addVideo, setCurrentPage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep>(ChatStep.AWAITING_TOPIC);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const addBotMessage = useCallback((text: React.ReactNode, isLoading = false) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text, isLoading }]);
  }, []);

  const updateLastBotMessage = useCallback((text: React.ReactNode, isLoading = false) => {
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage && lastMessage.sender === 'bot') {
        lastMessage.text = text;
        lastMessage.isLoading = isLoading;
      }
      return newMessages;
    });
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage("Welcome to the AI Video Automator! What topic would you like to create a video about today?");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserInput = async (input: string) => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      addBotMessage(`Excellent! Generating a video about "${input}". This might take a moment...`, true);
      setChatStep(ChatStep.GENERATING_CONTENT);
      
      const newVideo = await generateVideoContent(input);
      addVideo(newVideo);
      
      updateLastBotMessage(
        <div>
          <p>✨ All done! Your video titled "<strong>{newVideo.title}</strong>" is ready.</p>
          <button
            onClick={() => setCurrentPage('Videos')}
            className="mt-2 px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            View in Videos Tab
          </button>
          <p className="mt-4">What topic would you like to cover next?</p>
        </div>
      );
      setChatStep(ChatStep.AWAITING_TOPIC);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      updateLastBotMessage(`Oops! Something went wrong: ${errorMessage}. Please try another topic.`);
      setChatStep(ChatStep.AWAITING_TOPIC); // Reset on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">AI Automation Chatbot</h2>
        <p className="text-sm text-slate-400">Your AI assistant for video creation</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && <LogoIcon className="h-8 w-8 text-cyan-400 flex-shrink-0" />}
            <div className={`max-w-lg px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
              <div className="prose prose-sm prose-invert prose-p:my-1 prose-ul:my-1 text-slate-200">
                {msg.text}
              </div>
              {msg.isLoading && <SpinnerIcon className="h-5 w-5 mt-2 animate-spin text-cyan-400" />}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-slate-700">
        <form onSubmit={(e) => { e.preventDefault(); handleUserInput(userInput); }}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={isLoading ? "AI is thinking..." : "Type your topic here..."}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
            <button type="submit" disabled={isLoading || !userInput.trim()} className="p-3 bg-cyan-500 text-white rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors">
              <SendIcon className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
