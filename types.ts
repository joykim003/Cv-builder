export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    website: string;
    summary: string;
    photo: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
}

export interface FontOption {
  name: string;
  value: string;
}

export interface ThemeSizing {
  baseFontSize: number; // in px
  headingScale: number; // multiplier
  spacing: number;      // multiplier
}

export type SectionKey = 'header' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'interests' | 'sidebarContact' | 'sidebarSkills' | 'sidebarLanguages' | 'sidebarInterests';
export type ReorderableSectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'interests';


interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  sidebarBackground?: string;
  sidebarText?: string;
  leftSidebarBackground?: string;
  leftSidebarText?: string;
  rightSidebarBackground?: string;
  rightSidebarText?: string;
}

export interface Theme {
  name:string;
  font: string;
  fonts: FontOption[];
  colors: ThemeColors;
  darkColors?: ThemeColors;
  layout: {
    style: 'single-column' | 'two-column' | 'three-column';
    headerAlignment: string; // 'text-left', 'text-center', 'text-right'
    sectionTitleStyle: string; // Tailwind classes for section titles
    borderRadius?: string;
  };
  sizing: ThemeSizing;
  sectionSizing?: Partial<Record<SectionKey, Partial<ThemeSizing>>>;
}