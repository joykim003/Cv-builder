
import React from 'react';
import type { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: string;
  setSelectedTheme: (name: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, setSelectedTheme }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Choose a Theme</h3>
      <div className="grid grid-cols-3 gap-4">
        {themes.map(theme => (
          <button
            key={theme.name}
            onClick={() => setSelectedTheme(theme.name)}
            className={`p-2 rounded-lg border-2 transition-all duration-200 ${selectedTheme === theme.name ? 'border-blue-500 scale-105' : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'}`}
          >
            <div className="h-16 w-full flex flex-col justify-between p-2 rounded bg-white shadow-inner">
              <div className="flex items-center gap-1">
                 <div className={`w-3 h-3 rounded-full ${theme.colors.accent}`}></div>
                 <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex-1 w-2/3 h-1 bg-gray-200 rounded-full mt-2"></div>
               <div className="flex-1 w-full h-1 bg-gray-200 rounded-full mt-1"></div>
            </div>
            <p className={`mt-2 text-sm font-medium text-center ${selectedTheme === theme.name ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>{theme.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
