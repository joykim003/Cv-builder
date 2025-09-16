import React from 'react';
import type { CVData, Theme } from '../types';
import { PhoneIcon, EmailIcon, LocationIcon, WebsiteIcon } from './Icons';

interface CVPreviewProps {
  data: CVData;
  theme: Theme;
}

const ContactInfo: React.FC<{ icon: React.ReactNode; text: string; theme: Theme }> = ({ icon, text, theme }) => (
  text ? (
    <div className={`flex items-center gap-2 ${theme.colors.textSecondary}`}>
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  ) : null
);

export const CVPreview: React.FC<CVPreviewProps> = ({ data, theme }) => {
  const { personalInfo, experience, education, skills } = data;

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="text-sm">{line}</p>
    ));
  };
  
  const hasPhoto = !!personalInfo.photo;
  const isCentered = theme.layout.headerAlignment === 'text-center';

  return (
    <div id="cv-render-content" className={`w-full h-full p-10 ${theme.font} ${theme.colors.background}`}>
      {/* Header */}
      <header className={`mb-8 flex ${isCentered ? 'flex-col items-center' : 'flex-row items-center gap-8'}`}>
        {hasPhoto && (
            <div className={`flex-shrink-0 ${isCentered ? 'mb-4' : ''}`}>
                <img src={personalInfo.photo} alt={personalInfo.name} className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700" />
            </div>
        )}
        <div className={`${theme.layout.headerAlignment} flex-grow`}>
            <h1 className={`text-5xl font-bold ${theme.colors.primary}`}>{personalInfo.name || "Your Name"}</h1>
            <h2 className={`text-2xl mt-1 ${theme.colors.secondary}`}>{personalInfo.title || "Your Title"}</h2>
            <div className={`flex items-center gap-x-6 gap-y-2 mt-4 flex-wrap ${theme.layout.headerAlignment === 'text-center' ? 'justify-center' : ''}`}>
                <ContactInfo icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} theme={theme} />
                <ContactInfo icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} theme={theme} />
                <ContactInfo icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} theme={theme} />
                <ContactInfo icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} theme={theme} />
            </div>
        </div>
      </header>

      <main className={`text-base ${theme.colors.text}`}>
        {/* Summary */}
        <section>
          <h3 className={theme.layout.sectionTitleStyle}>Summary</h3>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section className="mt-6">
          <h3 className={theme.layout.sectionTitleStyle}>Experience</h3>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-lg font-semibold ${theme.colors.primary}`}>{exp.role}</h4>
                  <p className={`text-sm font-medium ${theme.colors.textSecondary}`}>{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className={`text-md font-medium italic ${theme.colors.secondary}`}>{exp.company}</p>
                <div className={`mt-2 ${theme.colors.text} space-y-1`}>
                    {renderDescription(exp.description)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-6">
          <h3 className={theme.layout.sectionTitleStyle}>Education</h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-lg font-semibold ${theme.colors.primary}`}>{edu.degree}</h4>
                  <p className={`text-sm font-medium ${theme.colors.textSecondary}`}>{edu.startDate} - {edu.endDate}</p>
                </div>
                <p className={`text-md font-medium italic ${theme.colors.secondary}`}>{edu.institution}</p>
                <div className={`mt-1 ${theme.colors.text} space-y-1`}>
                  {renderDescription(edu.description)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6">
          <h3 className={theme.layout.sectionTitleStyle}>Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              skill.name && <span key={skill.id} className={`px-3 py-1 text-sm rounded-full ${theme.colors.accent} text-white`}>{skill.name}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};