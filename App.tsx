
import React, { useState, useMemo } from 'react';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import { ThemeSelector } from './components/ThemeSelector';
import type { CVData, Theme } from './types';
import { INITIAL_CV_DATA, THEMES } from './constants';
import { DownloadIcon } from './components/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [themes, setThemes] = useState<Theme[]>(THEMES);
  const [selectedThemeName, setSelectedThemeName] = useState<string>(THEMES[0].name);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const selectedTheme: Theme | undefined = useMemo(() => themes.find(t => t.name === selectedThemeName), [themes, selectedThemeName]);

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
        cvPreviewElement.className = 'w-[210mm] h-[297mm] bg-white';
        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(cvPreviewElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            // FIX: The 'onprogress' option is not available in the current version of html2canvas and causes a type error.
            /* onprogress: (progress) => {
                // html2canvas provides progress from 0 to 1. We'll map this to 0-90%.
                setDownloadProgress(Math.floor(progress * 90));
            }, */
        });

        setDownloadProgress(95); // Canvas rendering is done, now creating the PDF.

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${cvData.personalInfo.name.replace(/\s/g, '_')}_CV.pdf`);
        
        setDownloadProgress(100); // All done!

    } catch (error) {
        console.error("An error occurred during PDF generation:", error);
    } finally {
        cvPreviewElement.className = originalClasses;
        // Wait for a moment so the user can see the "Complete" status before resetting the button.
        setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
        }, 1500);
    }
  };

  if (!selectedTheme) {
    return <div>Error: Theme not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-8 p-4 md:p-8">
        {/* Controls Section */}
        <div id="controls" className="lg:overflow-y-auto lg:h-screen lg:pb-20">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <header className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI CV Crafter</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in your details and watch your CV come to life.</p>
                </header>
                <ThemeSelector 
                    themes={themes} 
                    selectedTheme={selectedTheme} 
                    setSelectedTheme={setSelectedThemeName}
                    onThemeUpdate={handleThemeUpdate}
                />
                <CVForm cvData={cvData} setCvData={setCvData} accentColor={selectedTheme.colors.accent}/>
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
            <div id="cv-preview" className="w-[210mm] h-[297mm] bg-white shadow-2xl rounded-lg origin-top transform scale-[0.35] sm:scale-75 md:scale-[0.85] lg:scale-100">
                <CVPreview data={cvData} theme={selectedTheme} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
