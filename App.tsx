
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
  const [selectedThemeName, setSelectedThemeName] = useState<string>(THEMES[0].name);
  const [isDownloading, setIsDownloading] = useState(false);

  const selectedTheme: Theme | undefined = useMemo(() => THEMES.find(t => t.name === selectedThemeName), [selectedThemeName]);

  const handleDownload = async () => {
    const cvPreviewElement = document.getElementById('cv-preview');
    if (!cvPreviewElement) {
      console.error('CV preview element not found for PDF generation.');
      return;
    }

    setIsDownloading(true);
    const originalClasses = cvPreviewElement.className;

    try {
        // Apply temporary styles for capture: full scale, no shadow, on a clean background.
        cvPreviewElement.className = 'w-[210mm] h-[297mm] bg-white';
        
        // Wait a moment for styles to apply before capturing
        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(cvPreviewElement, {
            scale: 2, // Use a high scale for better resolution
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png', 1.0); // Use full quality PNG
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${cvData.personalInfo.name.replace(/\s/g, '_')}_CV.pdf`);

    } catch (error) {
        console.error("An error occurred during PDF generation:", error);
    } finally {
        // Restore the original classes to bring back the scaled-down view
        cvPreviewElement.className = originalClasses;
        setIsDownloading(false);
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
                <ThemeSelector themes={THEMES} selectedTheme={selectedThemeName} setSelectedTheme={setSelectedThemeName} />
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
                    className="flex items-center justify-center gap-2 px-4 py-2 w-40 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isDownloading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Downloading...</span>
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
