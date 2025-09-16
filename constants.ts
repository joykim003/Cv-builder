import type { CVData, Theme } from './types';

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
  ]
};

export const THEMES: Theme[] = [
  {
    name: 'Modern Professional',
    font: 'font-sans',
    colors: {
      primary: 'text-gray-900',
      secondary: 'text-blue-600',
      accent: 'bg-blue-600',
      background: 'bg-white',
      text: 'text-gray-700',
      textSecondary: 'text-gray-500'
    },
    layout: {
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-xl font-bold text-blue-600 border-b-2 border-blue-200 pb-1 mb-4'
    }
  },
  {
    name: 'Classic Elegance',
    font: '[font-family:Lora,serif]',
    colors: {
      primary: 'text-gray-800',
      secondary: 'text-gray-600',
      accent: 'bg-gray-800',
      background: 'bg-white',
      text: 'text-gray-700',
      textSecondary: 'text-gray-500'
    },
    layout: {
      headerAlignment: 'text-center',
      sectionTitleStyle: 'text-lg font-semibold tracking-widest uppercase text-gray-700 border-b border-gray-300 pb-2 mb-4'
    }
  },
  {
    name: 'Creative Tech',
    font: '[font-family:Source_Sans_3,sans-serif]',
    colors: {
      primary: 'text-gray-900',
      secondary: 'text-teal-500',
      accent: 'bg-teal-500',
      background: 'bg-gray-50',
      text: 'text-gray-800',
      textSecondary: 'text-gray-500'
    },
    layout: {
      headerAlignment: 'text-left',
      sectionTitleStyle: 'text-2xl font-light text-teal-600 mb-4'
    }
  }
];
