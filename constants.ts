import type { CVData, Theme, FontOption } from './types';

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    name: 'Alex Doe',
    title: 'Senior Frontend Developer',
    phone: '+1 (123) 456-7890',
    email: 'alex.doe@example.com',
    location: 'San Francisco, CA',
    website: 'alexdoe.dev',
    summary: 'Innovative Senior Frontend Developer with 8+ years of experience building and maintaining responsive and scalable web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating seamless user experiences and writing clean, efficient code.',
    photo: '',
  },
  experience: [
    {
      id: 'exp1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Frontend Developer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '- Led the development of a new customer-facing dashboard using React and TypeScript, resulting in a 20% increase in user engagement.\n- Mentored junior developers, providing code reviews and guidance on best practices.\n- Collaborated with UX/UI designers to implement complex and interactive features.'
    },
    {
      id: 'exp2',
      company: 'Web Innovators',
      role: 'Frontend Developer',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: '- Developed and maintained client websites using JavaScript, HTML, and CSS.\n- Improved website performance by optimizing assets and code, reducing load times by 30%.'
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2012',
      endDate: 'May 2016',
      description: 'Graduated with honors. Member of the university coding club and participated in multiple hackathons.'
    }
  ],
  skills: [
    { id: 'skill1', name: 'React & Next.js' },
    { id: 'skill2', name: 'TypeScript' },
    { id: 'skill3', name: 'JavaScript (ES6+)' },
    { id: 'skill4', name: 'Tailwind CSS' },
    { id: 'skill5', name: 'Node.js' },
    { id: 'skill6', name: 'UI/UX Design' },
    { id: 'skill7', name: 'REST APIs' },
    { id: 'skill8', name: 'Agile Methodologies' }
  ],
  languages: [
      { id: 'lang1', name: 'English', level: 'Native' },
      { id: 'lang2', name: 'Spanish', level: 'Professional' },
  ],
  interests: [
      { id: 'int1', name: 'Open Source' },
      { id: 'int2', name: 'Hiking' },
      { id: 'int3', name: 'Photography' },
  ]
};

const FONT_OPTIONS: Record<string, FontOption> = {
  INTER: { name: 'Inter', value: 'font-sans' },
  LORA: { name: 'Lora', value: '[font-family:Lora,serif]' },
  SOURCE_SANS: { name: 'Source Sans 3', value: '[font-family:Source_Sans_3,sans-serif]' },
  ROBOTO: { name: 'Roboto', value: '[font-family:Roboto,sans-serif]' },
  LATO: { name: 'Lato', value: '[font-family:Lato,sans-serif]' },
  MONTSERRAT: { name: 'Montserrat', value: '[font-family:Montserrat,sans-serif]' },
  PLAYFAIR: { name: 'Playfair Display', value: '[font-family:"Playfair Display",serif]' },
  MERRIWEATHER: { name: 'Merriweather', value: '[font-family:Merriweather,serif]' },
};

const SANS_SERIF_FONTS = [FONT_OPTIONS.INTER, FONT_OPTIONS.ROBOTO, FONT_OPTIONS.LATO, FONT_OPTIONS.MONTSERRAT];
const SERIF_FONTS = [FONT_OPTIONS.LORA, FONT_OPTIONS.PLAYFAIR, FONT_OPTIONS.MERRIWEATHER];

export const THEMES: Theme[] = [
  {
    name: 'Modern Professional',
    font: FONT_OPTIONS.INTER.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#111827',
      secondary: '#2563EB',
      accent: '#2563EB',
      background: '#FFFFFF',
      text: '#374151',
      textSecondary: '#6B7280'
    },
    layout: {
      style: 'single-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-xl font-bold border-b-2 pb-1 mb-4'
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.1,
      spacing: 1.0,
    },
    sectionSizing: {}
  },
  {
    name: 'Classic Elegance',
    font: FONT_OPTIONS.LORA.value,
    fonts: SERIF_FONTS,
    colors: {
      primary: '#1F2937',
      secondary: '#4B5563',
      accent: '#1F2937',
      background: '#FFFFFF',
      text: '#374151',
      textSecondary: '#6B7280'
    },
    layout: {
      style: 'single-column',
      headerAlignment: 'text-center',
      sectionTitleStyle: 'text-lg font-semibold tracking-widest uppercase border-b pb-2 mb-4'
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.0,
      spacing: 1.1,
    },
    sectionSizing: {}
  },
  {
    name: 'Creative Tech',
    font: FONT_OPTIONS.SOURCE_SANS.value,
    fonts: [FONT_OPTIONS.SOURCE_SANS, ...SANS_SERIF_FONTS],
    colors: {
      primary: '#111827',
      secondary: '#14B8A6',
      accent: '#14B8A6',
      background: '#F9FAFB',
      text: '#1F2937',
      textSecondary: '#6B7280'
    },
    layout: {
      style: 'single-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-2xl font-light mb-4'
    },
    sizing: {
      baseFontSize: 11,
      headingScale: 1.2,
      spacing: 1.0,
    },
    sectionSizing: {}
  },
    {
    name: 'Professional Deep Blue',
    font: FONT_OPTIONS.INTER.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#0D1B2A',      // Dark Blue (Name, Section Titles)
      secondary: '#6B7280',    // Gray (Job Title)
      accent: '#0D1B2A',       // Use dark blue for form buttons
      background: '#FFFFFF',    // White (Main content bg)
      text: '#1F2937',         // Main text color
      textSecondary: '#4B5563', // Lighter text
      sidebarBackground: '#E6F0FA', // Light Blue (Sidebar bg)
      sidebarText: '#0D1B2A',      // Text on sidebar
    },
    layout: {
      style: 'two-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-sm font-bold uppercase tracking-wider mb-3',
    },
    sizing: {
      baseFontSize: 9.5,
      headingScale: 1.1,
      spacing: 1.0,
    },
    sectionSizing: {}
  },
  {
    name: 'Corporate Blue',
    font: FONT_OPTIONS.INTER.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#374151', // Main content name color
      secondary: '#6B7280', // Main content title color
      accent: '#3B82F6', // Timeline dots, skill tags
      background: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#4B5563',
      sidebarBackground: '#1E293B', // Dark blue sidebar
      sidebarText: '#E2E8F0',
    },
    layout: {
      style: 'two-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-lg font-bold uppercase tracking-wider mb-4',
    },
    sizing: {
      baseFontSize: 10.5,
      headingScale: 1.05,
      spacing: 1.0,
    },
    sectionSizing: {}
  },
  {
    name: 'Earthy Tones',
    font: FONT_OPTIONS.SOURCE_SANS.value,
    fonts: [FONT_OPTIONS.SOURCE_SANS, ...SERIF_FONTS],
    colors: {
      primary: '#4E342E',
      secondary: '#795548',
      accent: '#A1887F', // BG for section titles
      background: '#F5F5F5',
      text: '#4E342E',
      textSecondary: '#6D4C41',
      sidebarBackground: '#EFEBE9', // Light beige sidebar
      sidebarText: '#5D4037',
    },
    layout: {
      style: 'two-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-xl font-semibold mb-4',
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.2,
      spacing: 1.1,
    },
    sectionSizing: {}
  },
  {
    name: 'Rounded Charm',
    font: FONT_OPTIONS.MONTSERRAT.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#1E293B', // Dark Slate
      secondary: '#475569', // Medium Slate
      accent: '#8B5CF6', // Violet
      background: '#FFFFFF',
      text: '#334155',
      textSecondary: '#64748B',
      sidebarBackground: '#F3F4F6', // Light Gray
      sidebarText: '#1E293B',
    },
    layout: {
      style: 'two-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-lg font-bold uppercase tracking-wider mb-4',
      borderRadius: 'rounded-3xl',
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.15,
      spacing: 1.0,
    },
    sectionSizing: {}
  },
  {
    name: 'Diagonal Split',
    font: FONT_OPTIONS.LATO.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#047857', // Emerald
      secondary: '#475569', // Slate
      accent: '#059669', // Brighter Emerald
      background: '#FFFFFF', // White for main content
      text: '#1E293B', // Dark Slate
      textSecondary: '#64748B',
      sidebarBackground: '#F0FDF4', // Very light green
      sidebarText: '#1E293B',
    },
    layout: {
      style: 'two-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-lg font-bold tracking-wide mb-4',
      borderRadius: 'rounded-3xl',
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.1,
      spacing: 1.0,
    },
    sectionSizing: {}
  },
  {
    name: 'Tri-Column Impact',
    font: FONT_OPTIONS.MONTSERRAT.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#2d3748',
      secondary: '#4a5568',
      accent: '#D69E2E',
      background: '#FFFFFF',
      text: '#2D3748',
      textSecondary: '#718096',
      leftSidebarBackground: '#1A202C',
      leftSidebarText: '#E2E8F0',
      rightSidebarBackground: '#EDF2F7',
      rightSidebarText: '#2D3748',
    },
    layout: {
      style: 'three-column',
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b',
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.1,
      spacing: 1.0,
    },
    sectionSizing: {},
  },
  {
    name: 'Rounded Oblique',
    font: FONT_OPTIONS.MONTSERRAT.value,
    fonts: SANS_SERIF_FONTS,
    colors: {
      primary: '#111827',
      secondary: '#4B5563',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#374151',
      textSecondary: '#6B7280',
      leftSidebarBackground: '#1F293B',
      leftSidebarText: '#E2E8F0',
      rightSidebarBackground: '#1F293B',
      rightSidebarText: '#E2E8F0',
    },
    layout: {
      style: 'three-column',
      headerAlignment: 'text-center',
      sectionTitleStyle: 'text-sm font-bold uppercase tracking-wider',
    },
    sizing: {
      baseFontSize: 10,
      headingScale: 1.1,
      spacing: 1.2,
    },
    sectionSizing: {},
  }
];