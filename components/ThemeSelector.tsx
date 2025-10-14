import React, { useState } from 'react';
import type { Theme, ThemeSizing, SectionKey } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: Theme;
  setSelectedTheme: (name: string) => void;
  onThemeUpdate: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ColorPicker: React.FC<{
  label: string;
  color: string;
  onChange: (color: string) => void;
}> = ({ label, color, onChange }) => {
  const id = `color-picker-${label.toLowerCase().replace(' ', '-')}`;
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative flex items-center justify-center w-8 h-8">
        <input
          id={id}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 pointer-events-none"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

const SliderControl: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}> = ({ label, value, min, max, step, onChange }) => (
    <div>
        <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>{label}</span>
            <span>{value.toFixed(2)}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);

const SIZING_SECTIONS: { key: SectionKey | 'global'; name: string }[] = [
    { key: 'global', name: 'Global (All Sections)'},
    { key: 'header', name: 'Header' },
    { key: 'summary', name: 'Summary' },
    { key: 'experience', name: 'Experience' },
    { key: 'education', name: 'Education' },
    { key: 'projects', name: 'Projects' },
    { key: 'skills', name: 'Skills (Single Column)' },
    { key: 'languages', name: 'Languages' },
    { key: 'interests', name: 'Interests' },
    { key: 'sidebarContact', name: 'Sidebar: Contact' },
    { key: 'sidebarSkills', name: 'Sidebar: Skills' },
    { key: 'sidebarLanguages', name: 'Sidebar: Languages' },
    { key: 'sidebarInterests', name: 'Sidebar: Interests' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, setSelectedTheme, onThemeUpdate, isDarkMode }) => {
  const [selectedSizingSection, setSelectedSizingSection] = useState<SectionKey | 'global'>('global');
  
  const handleColorChange = (colorType: keyof Theme['colors'], newColor: string) => {
    const colorSetKey = isDarkMode && selectedTheme.darkColors ? 'darkColors' : 'colors';
    
    const updatedTheme = {
      ...selectedTheme,
      [colorSetKey]: {
        ...selectedTheme[colorSetKey],
        [colorType]: newColor,
      },
    };
    onThemeUpdate(updatedTheme);
  };

  const handleFontChange = (newFontValue: string) => {
    const updatedTheme = { ...selectedTheme, font: newFontValue };
    onThemeUpdate(updatedTheme);
  };

  const handleSizingChange = (field: keyof ThemeSizing, value: number) => {
    if (selectedSizingSection === 'global') {
        const updatedTheme = {
            ...selectedTheme,
            sizing: {
                ...selectedTheme.sizing,
                [field]: value,
            },
        };
        onThemeUpdate(updatedTheme);
    } else {
        const updatedTheme = {
            ...selectedTheme,
            sectionSizing: {
                ...selectedTheme.sectionSizing,
                [selectedSizingSection]: {
                    ...selectedTheme.sectionSizing?.[selectedSizingSection],
                    [field]: value,
                }
            }
        };
        onThemeUpdate(updatedTheme);
    }
  };

  const currentSizing = selectedSizingSection === 'global' 
    ? selectedTheme.sizing 
    : { ...selectedTheme.sizing, ...selectedTheme.sectionSizing?.[selectedSizingSection] };

  const currentColors = (isDarkMode && selectedTheme.darkColors) ? selectedTheme.darkColors : selectedTheme.colors;

  return (
    <div id="theme-selector">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Choose a Theme</h3>
      <div className="grid grid-cols-3 gap-4">
        {themes.map(theme => (
          <button
            key={theme.name}
            onClick={() => {
                setSelectedTheme(theme.name);
                setSelectedSizingSection('global');
            }}
            className={`p-2 rounded-lg border-2 transition-all duration-200 ${selectedTheme.name === theme.name ? 'border-blue-500 scale-105' : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'}`}
          >
            <div className="h-16 w-full flex flex-col justify-between p-2 rounded bg-white shadow-inner dark:bg-gray-700">
              <div className="flex items-center gap-1">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: isDarkMode && theme.darkColors ? theme.darkColors.accent : theme.colors.accent }}></div>
                 <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
              </div>
              <div className="flex-1 w-2/3 h-1 bg-gray-200 dark:bg-gray-600 rounded-full mt-2"></div>
               <div className="flex-1 w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full mt-1"></div>
            </div>
            <p className={`mt-2 text-sm font-medium text-center ${selectedTheme.name === theme.name ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>{theme.name}</p>
          </button>
        ))}
      </div>

      {selectedTheme && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Customize '{selectedTheme.name}'</h4>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
                <h5 className="font-semibold text-gray-800 dark:text-white">Colors & Fonts</h5>
                 <div>
                    <label htmlFor="font-selector" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Font
                    </label>
                    <select
                        id="font-selector"
                        value={selectedTheme.font}
                        onChange={(e) => handleFontChange(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        {selectedTheme.fonts.map(font => (
                            <option key={font.value} value={font.value}>
                                {font.name}
                            </option>
                        ))}
                    </select>
                </div>

                <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400 !mt-4 border-t border-gray-200 dark:border-gray-600 pt-3">Theme Colors</h6>
                <ColorPicker
                    label="Primary"
                    color={currentColors.primary}
                    onChange={(newColor) => handleColorChange('primary', newColor)}
                />
                <ColorPicker
                    label="Secondary"
                    color={currentColors.secondary}
                    onChange={(newColor) => handleColorChange('secondary', newColor)}
                />
                <ColorPicker
                    label="Accent"
                    color={currentColors.accent}
                    onChange={(newColor) => handleColorChange('accent', newColor)}
                />
                
                <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400 !mt-4 border-t border-gray-200 dark:border-gray-600 pt-3">Background Colors</h6>
                <ColorPicker
                    label={selectedTheme.layout.style === 'single-column' ? 'Page Background' : 'Main Background'}
                    color={currentColors.background}
                    onChange={(newColor) => handleColorChange('background', newColor)}
                />
                {selectedTheme.layout.style === 'two-column' && typeof currentColors.sidebarBackground !== 'undefined' && (
                    <ColorPicker
                        label="Sidebar Background"
                        color={currentColors.sidebarBackground}
                        onChange={(newColor) => handleColorChange('sidebarBackground', newColor)}
                    />
                )}
                {selectedTheme.layout.style === 'three-column' && typeof currentColors.leftSidebarBackground !== 'undefined' && (
                    <ColorPicker
                        label="Left Sidebar"
                        color={currentColors.leftSidebarBackground}
                        onChange={(newColor) => handleColorChange('leftSidebarBackground', newColor)}
                    />
                )}
                {selectedTheme.layout.style === 'three-column' && typeof currentColors.rightSidebarBackground !== 'undefined' && (
                    <ColorPicker
                        label="Right Sidebar"
                        color={currentColors.rightSidebarBackground}
                        onChange={(newColor) => handleColorChange('rightSidebarBackground', newColor)}
                    />
                )}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
                <h5 className="font-semibold text-gray-800 dark:text-white">Layout & Sizing</h5>
                 <div>
                    <label htmlFor="sizing-section-selector" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Customize Section
                    </label>
                    <select
                        id="sizing-section-selector"
                        value={selectedSizingSection}
                        onChange={(e) => setSelectedSizingSection(e.target.value as SectionKey | 'global')}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        {SIZING_SECTIONS.map(section => (
                            <option key={section.key} value={section.key}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>
                <SliderControl 
                    label="Base Font Size (px)"
                    value={currentSizing.baseFontSize}
                    min={8}
                    max={14}
                    step={0.5}
                    onChange={(value) => handleSizingChange('baseFontSize', value)}
                />
                <SliderControl 
                    label="Heading Scale"
                    value={currentSizing.headingScale}
                    min={0.8}
                    max={1.8}
                    step={0.05}
                    onChange={(value) => handleSizingChange('headingScale', value)}
                />
                <SliderControl 
                    label="Spacing"
                    value={currentSizing.spacing}
                    min={0.7}
                    max={1.5}
                    step={0.05}
                    onChange={(value) => handleSizingChange('spacing', value)}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};