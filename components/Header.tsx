
import React from 'react';
import { StethoscopeIcon } from './icons/StethoscopeIcon';

interface HeaderProps {
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StethoscopeIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-slate-700">AI Health Diagnosis Assistant</span>
        </div>
        <button
          onClick={onAboutClick}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Contact & Support
        </button>
      </div>
    </header>
  );
};