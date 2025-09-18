
import React, { useState, useMemo, useEffect } from 'react';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import { ThemeSelector } from './components/ThemeSelector';
import type { CVData, ReorderableSectionKey, Theme } from './types';
import { INITIAL_CV_DATA, THEMES } from './constants';
import { DownloadIcon, SunIcon, MoonIcon } from './components/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [themes, setThemes] = useState<Theme[]>(THEMES);
  const [selectedThemeName, setSelectedThemeName] = useState<string>(THEMES[0].name);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const [sectionOrder, setSectionOrder] = useState<ReorderableSectionKey[]>(() => {
    const savedOrder = localStorage.getItem('sectionOrder');
    if (savedOrder) {
        try {
            const parsedOrder = JSON.parse(savedOrder);
            // Basic validation to ensure it's an array of expected keys
            const defaultKeys: ReorderableSectionKey[] = ['summary', 'experience', 'education', 'skills', 'languages', 'interests'];
            if (Array.isArray(parsedOrder) && parsedOrder.every(k => defaultKeys.includes(k))) {
                return parsedOrder;
            }
        } catch (e) {
            console.error("Failed to parse section order from localStorage", e);
        }
    }
    return ['summary', 'experience', 'education', 'skills', 'languages', 'interests'];
  });

  useEffect(() => {
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder));
  }, [sectionOrder]);


  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      return savedMode === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const selectedTheme: Theme | undefined = useMemo(() => themes.find(t => t.name === selectedThemeName), [themes, selectedThemeName]);

  const activeTheme = useMemo(() => {
    if (!selectedTheme) return undefined;

    if (isDarkMode && selectedTheme.darkColors) {
      return {
        ...selectedTheme,
        colors: { ...selectedTheme.colors, ...selectedTheme.darkColors },
      };
    }
    return selectedTheme;
  }, [selectedTheme, isDarkMode]);


  const handleThemeUpdate = (updatedTheme: Theme) => {
    setThemes(currentThemes =>
      currentThemes.map(t => (t.name === updatedTheme.name ? updatedTheme : t))
    );
  };

  const handleDownload = async () => {
    const cvPreviewElement = document.getElementById('cv-preview');
    if (!cvPreviewElement) {
      console.error('CV preview element not found for PDF generation.');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    const originalClasses = cvPreviewElement.className;

    try {
        cvPreviewElement.className = 'w-[210mm] bg-white'; // No fixed height
        await new Promise(resolve => setTimeout(resolve, 100));

        setDownloadProgress(10);
        const canvas = await html2canvas(cvPreviewElement, {
            scale: 2,
            useCORS: true,
            logging: false,
        });
        setDownloadProgress(80);

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasHeight / canvasWidth;
        const imgHeight = pdfWidth * ratio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        
        setDownloadProgress(95);
        pdf.save(`${cvData.personalInfo.name.replace(/\s/g, '_')}_CV.pdf`);
        
        setDownloadProgress(100);

    } catch (error) {
        console.error("An error occurred during PDF generation:", error);
    } finally {
        cvPreviewElement.className = originalClasses;
        setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
        }, 1500);
    }
  };

  if (!selectedTheme || !activeTheme) {
    return <div>Error: Theme not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-8 p-4 md:p-8">
        {/* Controls Section */}
        <div id="controls" className="lg:overflow-y-auto lg:h-screen lg:pb-20">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI CV Crafter</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in your details and watch your CV come to life.</p>
                    </div>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    </button>
                </header>
                <ThemeSelector 
                    themes={themes} 
                    selectedTheme={selectedTheme} 
                    setSelectedTheme={setSelectedThemeName}
                    onThemeUpdate={handleThemeUpdate}
                    isDarkMode={isDarkMode}
                />
                <CVForm 
                    cvData={cvData} 
                    setCvData={setCvData} 
                    accentColor={activeTheme.colors.accent}
                    sectionOrder={sectionOrder}
                    setSectionOrder={setSectionOrder}
                />
            </div>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col items-center">
            <div id="preview-header" className="w-full max-w-[210mm] flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Live Preview</h2>
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="relative flex items-center justify-center gap-2 px-4 py-2 w-44 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed overflow-hidden"
                >
                    {isDownloading ? (
                        <>
                            <div 
                                className="absolute top-0 left-0 h-full bg-blue-700/80 transition-all duration-200 ease-linear"
                                style={{ width: `${downloadProgress}%` }}
                            ></div>
                            <span className="relative z-10 text-sm">
                                {downloadProgress < 100 ? `Generating... ${downloadProgress}%` : 'Complete!'}
                            </span>
                        </>
                    ) : (
                        <>
                            <DownloadIcon />
                            <span>Download PDF</span>
                        </>
                    )}
                </button>
            </div>
            <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-lg origin-top transform scale-[0.35] sm:scale-75 md:scale-[0.85] lg:scale-100">
                <CVPreview data={cvData} theme={activeTheme} sectionOrder={sectionOrder} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;