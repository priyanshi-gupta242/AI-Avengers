import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import * as authService from '../services/authService';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      let user: User;
      if (formType === 'login') {
        user = await authService.login(email, password);
      } else {
        user = await authService.signUp(name, email, password);
      }
      onLogin(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    }
  };
  
  const toggleFormType = () => {
    setFormType(prev => (prev === 'login' ? 'signup' : 'login'));
    setError(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8">
          <div className="flex justify-center mb-6">
            <LogoIcon className="h-16 w-16 text-cyan-400" />
          </div>
          <div className="text-center">
             <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {formType === 'login' ? 'Welcome Back!' : 'Create Your Account'}
             </h1>
             <p className="text-slate-400 mb-8">
                {formType === 'login' ? 'Login to automate your content.' : 'Sign up to get started.'}
             </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
             {formType === 'signup' && (
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2 text-left">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Content Creator"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300" 
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2 text-left">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2 text-left">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={formType === 'login' ? 'current-password' : 'new-password'}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300" 
              />
            </div>
            {error && <p className="text-sm text-red-400 text-left -mb-2 pt-1">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full !mt-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Processing...' : (formType === 'login' ? 'Enter Dashboard' : 'Create Account')}
            </button>
          </form>
          <p className="text-sm text-slate-400 mt-6 text-center">
            {formType === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleFormType} className="font-semibold text-cyan-400 hover:text-cyan-300 ml-2 focus:outline-none">
              {formType === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
