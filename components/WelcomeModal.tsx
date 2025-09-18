import React from 'react';
import { SparklesIcon } from './Icons';

interface WelcomeModalProps {
    onStartWithExample: () => void;
    onStartFromScratch: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStartWithExample, onStartFromScratch }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md mx-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                        <SparklesIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome to AI CV Crafter!
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        How would you like to begin? You can start with our pre-filled example to see how it works, or begin with a blank slate.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={onStartWithExample}
                            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            Start with an Example
                        </button>
                        <button
                            type="button"
                            onClick={onStartFromScratch}
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            Start from Scratch
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
