import React, { useState, useLayoutEffect, useEffect } from 'react';
import type { TutorialStep } from '../types';

interface TutorialProps {
    steps: TutorialStep[];
    currentStepIndex: number;
    onNext: () => void;
    onFinish: () => void;
}

interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
}

const useIsMobile = (breakpoint = 768): boolean => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};


export const Tutorial: React.FC<TutorialProps> = ({ steps, currentStepIndex, onNext, onFinish }) => {
    const [targetRect, setTargetRect] = useState<Position | null>(null);
    const isMobile = useIsMobile();

    const step = steps[currentStepIndex];

    useLayoutEffect(() => {
        const targetElement = document.getElementById(step.targetId);
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            setTargetRect({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [step.targetId, currentStepIndex]);

    if (!targetRect) return null;

    const isLastStep = currentStepIndex === steps.length - 1;
    const placement = step.placement || 'bottom';

    let tooltipContainerStyles: React.CSSProperties = {};
    let tooltipArrowStyles: React.CSSProperties = {};
    
    const tooltipBaseClasses = "fixed z-[102] bg-white dark:bg-gray-800 rounded-lg shadow-2xl transition-all duration-300 ease-in-out animate-fade-in";
    let tooltipClasses = tooltipBaseClasses;

    if (isMobile) {
        tooltipClasses += " p-5 left-4 right-4 bottom-4 w-auto";
    } else {
        tooltipClasses += " p-5 w-72 max-w-[calc(100vw-2rem)]";
        const offset = 12;

        switch (placement) {
            case 'top':
                tooltipContainerStyles = {
                    bottom: `${window.innerHeight - targetRect.top + offset}px`,
                    left: `${targetRect.left + targetRect.width / 2}px`,
                    transform: 'translateX(-50%)',
                };
                tooltipArrowStyles = {
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
                break;
            case 'left':
                tooltipContainerStyles = {
                    top: `${targetRect.top + targetRect.height / 2}px`,
                    right: `${window.innerWidth - targetRect.left + offset}px`,
                    transform: 'translateY(-50%)',
                };
                tooltipArrowStyles = {
                    top: '50%',
                    left: '100%',
                    transform: 'translateY(-50%)',
                };
                break;
            case 'right':
                tooltipContainerStyles = {
                    top: `${targetRect.top + targetRect.height / 2}px`,
                    left: `${targetRect.left + targetRect.width + offset}px`,
                    transform: 'translateY(-50%)',
                };
                tooltipArrowStyles = {
                    top: '50%',
                    right: '100%',
                    transform: 'translateY(-50%)',
                };
                break;
            default: // bottom
                tooltipContainerStyles = {
                    top: `${targetRect.top + targetRect.height + offset}px`,
                    left: `${targetRect.left + targetRect.width / 2}px`,
                    transform: 'translateX(-50%)',
                };
                tooltipArrowStyles = {
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
                break;
        }
    }

    const getArrowClasses = (placement: string) => {
        const base = "absolute w-0 h-0 border-[8px] border-solid border-transparent";
        switch (placement) {
            case 'top': return `${base} border-t-white dark:border-t-gray-800`;
            case 'left': return `${base} border-l-white dark:border-l-gray-800`;
            case 'right': return `${base} border-r-white dark:border-r-gray-800`;
            default: return `${base} border-b-white dark:border-b-gray-800`;
        }
    };

    return (
        <>
            {/* Overlay and Spotlight */}
            <div
                className="fixed inset-0 z-[100] bg-black bg-opacity-60"
                onClick={onFinish} // Allow skipping by clicking overlay
            />
            <div
                className="fixed rounded-md transition-all duration-300 ease-in-out pointer-events-none z-[101]"
                style={{
                    top: targetRect.top - 8,
                    left: targetRect.left - 8,
                    width: targetRect.width + 16,
                    height: targetRect.height + 16,
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0)', // The overlay handles the color now
                    border: '2px solid rgba(59, 130, 246, 0.9)',
                }}
            />

            {/* Tooltip */}
            <div
                className={tooltipClasses}
                style={tooltipContainerStyles}
                role="dialog"
                aria-labelledby="tutorial-title"
                aria-describedby="tutorial-content"
            >
                {!isMobile && (
                    <div className={getArrowClasses(placement)} style={tooltipArrowStyles} />
                )}

                <h3 id="tutorial-title" className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p id="tutorial-content" className="text-sm text-gray-600 dark:text-gray-300">{step.content}</p>

                <div className="flex justify-between items-center mt-5">
                    <button onClick={onFinish} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                        Skip
                    </button>
                    <button
                        onClick={onNext}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isLastStep ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
};
