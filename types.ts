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
}

export interface Theme {
  name:string;
  font: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
  };
  layout: {
    headerAlignment: string; // 'text-left', 'text-center', 'text-right'
    sectionTitleStyle: string; // Tailwind classes for section titles
  };
}
