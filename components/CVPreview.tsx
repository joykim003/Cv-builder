import React from 'react';
import type { CVData, Theme, SectionKey, ReorderableSectionKey } from '../types';
import { PhoneIcon, EmailIcon, LocationIcon, WebsiteIcon } from './Icons';

interface CVPreviewProps {
  data: CVData;
  theme: Theme;
  sectionOrder: ReorderableSectionKey[];
}

const ContactInfoItem: React.FC<{ icon: React.ReactNode; text: string; color: string; style?: React.CSSProperties }> = ({ icon, text, color, style }) => (
  text ? (
    <div className="flex items-center" style={{ color: color, ...style }}>
      <div className="flex-shrink-0">{icon}</div>
      <span className="break-all">{text}</span>
    </div>
  ) : null
);

const renderDescription = (text: string, style: React.CSSProperties) => {
    return text.split('\n').map((line, index) => (
      <p key={index} style={style}>{line.startsWith('- ') ? <span className="mr-2">•</span> : null}{line.replace(/^- /, '')}</p>
    ));
};

export const CVPreview: React.FC<CVPreviewProps> = ({ data, theme, sectionOrder }) => {
  const renderCvContent = () => {
    const { personalInfo, experience, education, projects, skills, languages, interests } = data;
    const hasPhoto = !!personalInfo.photo;

    const getSectionStyles = (sectionKey: SectionKey | 'global' = 'global') => {
        const globalSizing = theme.sizing;
        const sectionOverride = (sectionKey !== 'global' && theme.sectionSizing?.[sectionKey]) || {};
        const { baseFontSize, headingScale, spacing } = { ...globalSizing, ...sectionOverride };
        
        const baseRem = baseFontSize;

        const s = (multiplier: number) => `${multiplier * 0.25 * spacing}rem`;

        const font = {
            xs: `${0.75 * headingScale}rem`,
            sm: `${0.875 * headingScale}rem`,
            base: '1rem',
            lg: `${1.125 * headingScale}rem`,
            xl: `${1.25 * headingScale}rem`,
            '2xl': `${1.5 * headingScale}rem`,
            '3xl': `${1.875 * headingScale}rem`,
            '4xl': `${2.25 * headingScale}rem`,
            '5xl': `${3.0 * headingScale}rem`,
            '6xl': `${3.75 * headingScale}rem`,
        };

        return { baseRem, s, font };
    };

    const globalStyles = getSectionStyles('global');

    // --- Reorderable Section Components ---
    const sectionComponentMap: Record<ReorderableSectionKey, React.ReactNode> = {
      summary: personalInfo.summary && (
          <section key="summary">
              <p className="leading-relaxed" style={{fontSize: getSectionStyles('summary').font.sm}}>{personalInfo.summary}</p>
          </section>
      ),
      experience: experience.length > 0 && (
          <section key="experience" style={{marginTop: getSectionStyles('experience').s(6)}}>
            <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, borderColor: theme.colors.primary + '50', fontSize: getSectionStyles('experience').font.xl, marginBottom: getSectionStyles('experience').s(4)}}>Experience</h3>
            <div className="flex flex-col relative" style={{gap: getSectionStyles('experience').s(5)}}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: getSectionStyles('experience').font.lg }}>{exp.role}</h4>
                    <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: getSectionStyles('experience').font.sm }}>{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="font-medium" style={{ color: theme.colors.secondary, fontSize: getSectionStyles('experience').font.base }}>{exp.company}</p>
                  <div className="flex flex-col" style={{marginTop: getSectionStyles('experience').s(2), gap: getSectionStyles('experience').s(1)}}>{renderDescription(exp.description, {fontSize: getSectionStyles('experience').font.base})}</div>
                </div>
              ))}
            </div>
          </section>
      ),
      education: education.length > 0 && (
          <section key="education" style={{marginTop: getSectionStyles('education').s(6)}}>
            <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, borderColor: theme.colors.primary + '50', fontSize: getSectionStyles('education').font.xl, marginBottom: getSectionStyles('education').s(4)}}>Education</h3>
             <div className="flex flex-col relative" style={{gap: getSectionStyles('education').s(4)}}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: getSectionStyles('education').font.lg }}>{edu.degree}</h4>
                    <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: getSectionStyles('education').font.sm }}>{edu.startDate} - {edu.endDate}</p>
                  </div>
                  <p className="font-medium" style={{ color: theme.colors.secondary, fontSize: getSectionStyles('education').font.base }}>{edu.institution}</p>
                  <div className="flex flex-col" style={{marginTop: getSectionStyles('education').s(1), gap: getSectionStyles('education').s(1)}}>{renderDescription(edu.description, {fontSize: getSectionStyles('education').font.base})}</div>
                </div>
              ))}
            </div>
          </section>
      ),
      projects: projects.length > 0 && (
          <section key="projects" style={{marginTop: getSectionStyles('projects').s(6)}}>
            <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, borderColor: theme.colors.primary + '50', fontSize: getSectionStyles('projects').font.xl, marginBottom: getSectionStyles('projects').s(4)}}>Projects</h3>
            <div className="flex flex-col relative" style={{gap: getSectionStyles('projects').s(5)}}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: getSectionStyles('projects').font.lg }}>{proj.name}</h4>
                    <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: getSectionStyles('projects').font.sm }}>{proj.date}</p>
                  </div>
                  {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: theme.colors.accent, fontSize: getSectionStyles('projects').font.sm }}>{proj.link}</a>}
                  <div className="flex flex-col" style={{marginTop: getSectionStyles('projects').s(2), gap: getSectionStyles('projects').s(1)}}>{renderDescription(proj.description, {fontSize: getSectionStyles('projects').font.base})}</div>
                </div>
              ))}
            </div>
          </section>
      ),
      skills: skills.length > 0 && (
          <section key="skills">
             <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, borderColor: theme.colors.primary + '50', fontSize: getSectionStyles('skills').font.base, marginBottom: getSectionStyles('skills').s(3)}}>Skills</h3>
             <div className="flex flex-wrap" style={{gap: getSectionStyles('skills').s(2), marginTop: getSectionStyles('skills').s(4)}}>
               {skills.map(skill => (
                 skill.name && <span key={skill.id} className="rounded-full inline-flex items-center" style={{backgroundColor: theme.colors.accent, color: '#fff', fontSize: getSectionStyles('skills').font.xs, padding: `${getSectionStyles('skills').s(1)} ${getSectionStyles('skills').s(3)}`}}>{skill.name}</span>
               ))}
             </div>
          </section>
      ),
      languages: languages.length > 0 && (
          <section key="languages">
             <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.accent, borderColor: theme.colors.accent + '50', fontSize: getSectionStyles('sidebarLanguages').font.base, marginBottom: getSectionStyles('sidebarLanguages').s(3)}}>Languages</h3>
             <div className="flex flex-col" style={{gap: getSectionStyles('sidebarLanguages').s(2), marginTop: getSectionStyles('sidebarLanguages').s(4)}}>
               {languages.map(lang => (
                 lang.name && <div key={lang.id} style={{fontSize: getSectionStyles('sidebarLanguages').font.sm}}>
                   <span>{lang.name}</span>
                   {lang.level && <span className="opacity-75"> – {lang.level}</span>}
                 </div>
               ))}
             </div>
          </section>
      ),
      interests: interests.length > 0 && (
          <section key="interests">
             <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, borderColor: theme.colors.primary + '50', fontSize: getSectionStyles('sidebarInterests').font.base, marginBottom: getSectionStyles('sidebarInterests').s(3)}}>Interests</h3>
             <ul className="list-disc list-inside flex flex-col" style={{marginTop: getSectionStyles('sidebarInterests').s(4), gap: getSectionStyles('sidebarInterests').s(1), fontSize: getSectionStyles('sidebarInterests').font.sm}}>
               {interests.map(interest => (
                 interest.name && <li key={interest.id}>{interest.name}</li>
               ))}
             </ul>
          </section>
      ),
    };
    
    // --- LAYOUTS ---

    if (theme.layout.style === 'three-column') {
      const leftSidebarSections: ReorderableSectionKey[] = ['languages'];
      const middleSections: ReorderableSectionKey[] = ['summary', 'experience', 'education', 'projects'];
      const rightSidebarSections: ReorderableSectionKey[] = ['skills', 'interests'];

      const orderedLeft = sectionOrder.filter(key => leftSidebarSections.includes(key));
      const orderedMiddle = sectionOrder.filter(key => middleSections.includes(key));
      const orderedRight = sectionOrder.filter(key => rightSidebarSections.includes(key));

      const headerStyles = getSectionStyles('header');
      const contactStyles = getSectionStyles('sidebarContact');
      
      if (theme.name === 'Rounded Oblique') {
          const languagesStyles = getSectionStyles('sidebarLanguages');
          const skillsStyles = getSectionStyles('sidebarSkills');
          const interestsStyles = getSectionStyles('sidebarInterests');
          const summaryStyles = getSectionStyles('summary');
          const experienceStyles = getSectionStyles('experience');
          const educationStyles = getSectionStyles('education');
          const projectsStyles = getSectionStyles('projects');
          
          const sectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
              summary: personalInfo.summary && <section key="summary" style={{marginBottom: summaryStyles.s(6)}}><p className="leading-relaxed text-center" style={{fontSize: summaryStyles.font.sm}}>{personalInfo.summary}</p></section>,
              experience: experience.length > 0 && <section key="experience" style={{marginTop: experienceStyles.s(6)}}><h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: experienceStyles.font.xl}}>Experience</h3><div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '50px', transform: 'skewY(-3deg)', marginTop: experienceStyles.s(1), marginBottom: experienceStyles.s(4) }}></div><div className="flex flex-col relative" style={{gap: experienceStyles.s(5)}}>{experience.map((exp) => (<div key={exp.id}><div className="flex justify-between items-baseline"><h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: experienceStyles.font.lg }}>{exp.role}</h4><p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: experienceStyles.font.sm }}>{exp.startDate} - {exp.endDate}</p></div><p className="font-medium" style={{ color: theme.colors.secondary, fontSize: experienceStyles.font.base }}>{exp.company}</p><div className="flex flex-col" style={{marginTop: experienceStyles.s(2), gap: experienceStyles.s(1)}}>{renderDescription(exp.description, {fontSize: experienceStyles.font.base})}</div></div>))}</div></section>,
              education: education.length > 0 && <section key="education" style={{marginTop: educationStyles.s(6)}}><h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: educationStyles.font.xl}}>Education</h3><div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '50px', transform: 'skewY(-3deg)', marginTop: educationStyles.s(1), marginBottom: educationStyles.s(4) }}></div><div className="flex flex-col relative" style={{gap: educationStyles.s(4)}}>{education.map(edu => (<div key={edu.id}><div className="flex justify-between items-baseline"><h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: educationStyles.font.lg }}>{edu.degree}</h4><p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: educationStyles.font.sm }}>{edu.startDate} - {edu.endDate}</p></div><p className="font-medium" style={{ color: theme.colors.secondary, fontSize: educationStyles.font.base }}>{edu.institution}</p></div>))}</div></section>,
              projects: projects.length > 0 && <section key="projects" style={{marginTop: projectsStyles.s(6)}}><h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: projectsStyles.font.xl}}>Projects</h3><div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '50px', transform: 'skewY(-3deg)', marginTop: projectsStyles.s(1), marginBottom: projectsStyles.s(4) }}></div><div className="flex flex-col relative" style={{gap: projectsStyles.s(4)}}>{projects.map(proj => (<div key={proj.id}><div className="flex justify-between items-baseline"><h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: projectsStyles.font.lg }}>{proj.name}</h4><p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: projectsStyles.font.sm }}>{proj.date}</p></div>{proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: theme.colors.accent, fontSize: projectsStyles.font.sm }}>{proj.link}</a>}<div className="flex flex-col" style={{marginTop: projectsStyles.s(2), gap: projectsStyles.s(1)}}>{renderDescription(proj.description, {fontSize: projectsStyles.font.base})}</div></div>))}</div></section>,
              skills: skills.length > 0 && <section key="skills"><h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.accent, fontSize: skillsStyles.font.base }}>Skills</h3><div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '40px', transform: 'skewY(-3deg)', marginTop: skillsStyles.s(1) }}></div><div className="flex flex-wrap" style={{gap: skillsStyles.s(2), marginTop: skillsStyles.s(4)}}>{skills.map(skill => (skill.name && <span key={skill.id} className="rounded-md inline-flex items-center" style={{backgroundColor: theme.colors.accent, color: '#111827', fontWeight: 500, fontSize: skillsStyles.font.xs, padding: `${skillsStyles.s(1)} ${skillsStyles.s(3)}`}}>{skill.name}</span>))}</div></section>,
              languages: languages.length > 0 && <section key="languages"><h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.accent, fontSize: languagesStyles.font.base }}>Languages</h3><div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '40px', transform: 'skewY(-3deg)', marginTop: languagesStyles.s(1) }}></div><div className="flex flex-col" style={{gap: languagesStyles.s(2), marginTop: languagesStyles.s(4)}}>{languages.map(lang => (lang.name && <div key={lang.id} style={{fontSize: languagesStyles.font.sm}}><span>{lang.name}</span>{lang.level && <span className="opacity-75"> – {lang.level}</span>}</div>))}</div></section>,
              interests: interests.length > 0 && <section key="interests"><h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.accent, fontSize: interestsStyles.font.base}}>Interests</h3><div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '40px', transform: 'skewY(-3deg)', marginTop: interestsStyles.s(1) }}></div><ul className="list-disc list-inside flex flex-col" style={{marginTop: interestsStyles.s(4), gap: interestsStyles.s(1), fontSize: interestsStyles.font.sm}}>{interests.map(interest => (interest.name && <li key={interest.id}>{interest.name}</li>))}</ul></section>,
          };

          return (
              <div 
                  className={`w-full h-full ${theme.font} overflow-hidden flex items-center justify-center`} 
                  style={{ backgroundColor: '#0F172A', fontSize: `${globalStyles.baseRem}px` }}
              >
                  <div className="w-full h-[96%] flex gap-4 px-4">
                      {/* Left Column */}
                      <aside 
                          className="w-[28%] h-full flex flex-col rounded-2xl" 
                          style={{ backgroundColor: theme.colors.leftSidebarBackground, color: theme.colors.leftSidebarText, padding: globalStyles.s(8), gap: globalStyles.s(8) }}
                      >
                          {hasPhoto && (
                              <div className="flex justify-center">
                                  <img 
                                      src={personalInfo.photo} 
                                      alt={personalInfo.name} 
                                      className="w-28 h-28 rounded-full object-cover border-4"
                                      style={{borderColor: theme.colors.accent}}
                                  />
                              </div>
                          )}
                          <section>
                              <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.accent, fontSize: contactStyles.font.base }}>Contact</h3>
                              <div style={{ height: '2px', backgroundColor: theme.colors.accent, width: '40px', transform: 'skewY(-3deg)', marginTop: contactStyles.s(1) }}></div>
                              <div className="flex flex-col" style={{ gap: contactStyles.s(3), marginTop: contactStyles.s(4)}}>
                                 <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                                 <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                                 <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                                 <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                              </div>
                          </section>
                           {orderedLeft.map(key => sectionComponents[key])}
                      </aside>

                      {/* Middle Column */}
                      <main className="w-[44%] h-full rounded-2xl" style={{ backgroundColor: theme.colors.background, color: theme.colors.text, padding: `${globalStyles.s(10)} ${globalStyles.s(8)}` }}>
                          <header style={{marginBottom: headerStyles.s(8), textAlign: 'center'}}>
                              <h1 className="font-bold" style={{ color: theme.colors.primary, fontSize: headerStyles.font['4xl'] }}>{personalInfo.name || "Your Name"}</h1>
                              <h2 style={{ color: theme.colors.secondary, fontSize: headerStyles.font['xl'], marginTop: headerStyles.s(1) }}>{personalInfo.title || "Your Title"}</h2>
                          </header>
                          {orderedMiddle.map(key => sectionComponents[key])}
                      </main>
                      
                      {/* Right Column */}
                      <aside 
                          className="w-[28%] h-full flex flex-col rounded-2xl" 
                          style={{ backgroundColor: theme.colors.rightSidebarBackground, color: theme.colors.rightSidebarText, padding: globalStyles.s(8), gap: globalStyles.s(8) }}
                      >
                         {orderedRight.map(key => sectionComponents[key])}
                      </aside>
                  </div>
              </div>
          );
      }
      
      // Default 3-column layout (Tri-Column Impact)
      return (
          <div className={`w-full h-full flex ${theme.font} overflow-hidden`} style={{backgroundColor: theme.colors.background, fontSize: `${globalStyles.baseRem}px`}}>
              {/* Left Column */}
              <aside 
                  className="w-[28%] h-full flex flex-col" 
                  style={{ backgroundColor: theme.colors.leftSidebarBackground, color: theme.colors.leftSidebarText, padding: globalStyles.s(8), gap: globalStyles.s(8) }}
              >
                  {hasPhoto && (
                      <div className="flex justify-center">
                          <img 
                              src={personalInfo.photo} 
                              alt={personalInfo.name} 
                              className="w-32 h-32 rounded-full object-cover border-4"
                              style={{borderColor: theme.colors.accent}}
                          />
                      </div>
                  )}
                  <section>
                      <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.accent, borderColor: theme.colors.accent + '50', fontSize: contactStyles.font.base, marginBottom: contactStyles.s(3)}}>Contact</h3>
                      <div className="flex flex-col" style={{ gap: contactStyles.s(3), marginTop: contactStyles.s(4)}}>
                         <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                         <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                         <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                         <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.leftSidebarText!} style={{fontSize: contactStyles.font.sm, gap: contactStyles.s(3)}}/>
                      </div>
                  </section>
                  {orderedLeft.map(key => sectionComponentMap[key])}
              </aside>

              {/* Middle Column */}
              <main className="w-[44%] h-full" style={{ color: theme.colors.text, padding: `${globalStyles.s(10)} ${globalStyles.s(8)}` }}>
                  <header style={{marginBottom: headerStyles.s(8)}}>
                      <h1 className="font-bold" style={{ color: theme.colors.primary, fontSize: headerStyles.font['5xl'] }}>{personalInfo.name || "Your Name"}</h1>
                      <h2 style={{ color: theme.colors.secondary, fontSize: headerStyles.font['2xl'], marginTop: headerStyles.s(1) }}>{personalInfo.title || "Your Title"}</h2>
                  </header>
                  {orderedMiddle.map(key => sectionComponentMap[key])}
              </main>
              
              {/* Right Column */}
              <aside 
                  className="w-[28%] h-full flex flex-col" 
                  style={{ backgroundColor: theme.colors.rightSidebarBackground, color: theme.colors.rightSidebarText, padding: globalStyles.s(8), gap: globalStyles.s(8) }}
              >
                  {orderedRight.map(key => sectionComponentMap[key])}
              </aside>
          </div>
      );
    }

    if (theme.layout.style === 'two-column') {
      const isCorporate = theme.name === 'Corporate Blue';
      const isEarthy = theme.name === 'Earthy Tones';
      const isRounded = theme.name === 'Rounded Charm';
      const isDeepBlue = theme.name === 'Professional Deep Blue';
      
      let sidebarSections: ReorderableSectionKey[] = ['skills', 'languages', 'interests'];
      let mainSections: ReorderableSectionKey[] = ['summary', 'experience', 'education', 'projects'];
      
      if (theme.name === 'Diagonal Split') {
          sidebarSections = ['skills']; // Only skills in sidebar for this design
          mainSections = ['summary', 'experience', 'education', 'projects', 'languages', 'interests'];
      }

      const orderedSidebar = sectionOrder.filter(key => sidebarSections.includes(key));
      const orderedMain = sectionOrder.filter(key => mainSections.includes(key));
      
      const headerStyles = getSectionStyles('header');
      const sidebarContactStyles = getSectionStyles('sidebarContact');

      if (theme.name === 'Diagonal Split') {
          return (
              <div className={`w-full h-full ${theme.font} ${theme.layout.borderRadius} overflow-hidden flex shadow-lg`} style={{ fontSize: `${globalStyles.baseRem}px` }}>
                  {/* Sidebar */}
                  <aside 
                      className="w-[38%] h-full flex flex-col" 
                      style={{ 
                          background: `linear-gradient(135deg, ${theme.colors.sidebarBackground} 50%, #F1F5F9 50%)`, 
                          color: theme.colors.sidebarText, 
                          padding: globalStyles.s(10), 
                          gap: globalStyles.s(8) 
                      }}
                  >
                      {hasPhoto && (
                          <div className="flex justify-center" style={{marginBottom: globalStyles.s(2)}}>
                              <img 
                                  src={personalInfo.photo} 
                                  alt={personalInfo.name} 
                                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
                              />
                          </div>
                      )}
                      
                      <section>
                          <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: sidebarContactStyles.font.lg, marginBottom: sidebarContactStyles.s(4)}}>Contact</h3>
                          <div className="flex flex-col" style={{gap: sidebarContactStyles.s(3)}}>
                             <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                             <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                             <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                             <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                          </div>
                      </section>
                      
                      {orderedSidebar.map(key => sectionComponentMap[key])}
                  </aside>

                  {/* Main Content */}
                  <main 
                      className="w-[62%] h-full" 
                      style={{ 
                          color: theme.colors.text, 
                          padding: globalStyles.s(10), 
                          background: `linear-gradient(135deg, ${theme.colors.background} 50%, #F8FAFC 50%)` 
                      }}
                  >
                      <header style={{marginBottom: headerStyles.s(8)}}>
                          <h1 className="font-bold" style={{ color: theme.colors.primary, fontSize: headerStyles.font['5xl'] }}>{personalInfo.name || "Your Name"}</h1>
                          <h2 style={{ color: theme.colors.secondary, fontSize: headerStyles.font['2xl'], marginTop: headerStyles.s(1) }}>{personalInfo.title || "Your Title"}</h2>
                      </header>
                      {orderedMain.map(key => sectionComponentMap[key])}
                  </main>
              </div>
          );
      }
      
      if (isDeepBlue) {
          mainSections = ['summary', 'education', 'experience', 'projects'];
          return (
              <div className={`w-full h-full flex ${theme.font} overflow-hidden`} style={{backgroundColor: theme.colors.background, fontSize: `${globalStyles.baseRem}px`}}>
                  {/* Sidebar */}
                  <aside 
                      className="w-[35%] h-full flex flex-col" 
                      style={{ backgroundColor: theme.colors.sidebarBackground, color: theme.colors.sidebarText, padding: globalStyles.s(8), gap: globalStyles.s(6) }}
                  >
                      {hasPhoto && (
                          <div className="flex justify-center" style={{marginBottom: globalStyles.s(2)}}>
                              <img 
                                  src={personalInfo.photo} 
                                  alt={personalInfo.name} 
                                  className="w-32 h-32 rounded-full object-cover border-4"
                                  style={{borderColor: '#FFFFFF'}}
                              />
                          </div>
                      )}
                      
                      <section>
                          <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: sidebarContactStyles.font.sm, marginBottom: sidebarContactStyles.s(3)}}>Contact</h3>
                          <div className="flex flex-col" style={{ gap: sidebarContactStyles.s(3), marginTop: sidebarContactStyles.s(2)}}>
                             <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}}/>
                             <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}}/>
                             <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}}/>
                             <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}}/>
                          </div>
                      </section>

                      {sectionOrder.filter(key => sidebarSections.includes(key)).map(key => sectionComponentMap[key])}
                  </aside>

                  {/* Main Content */}
                  <main className="w-[65%] h-full relative" style={{ color: theme.colors.text, padding: globalStyles.s(10) }}>
                      <div className="absolute top-0 right-8 h-36 w-16 rounded-b-full" style={{backgroundColor: theme.colors.primary}}></div>

                      <header style={{marginBottom: headerStyles.s(8), marginTop: headerStyles.s(12)}}>
                          <h1 className="font-bold uppercase tracking-wider" style={{ color: theme.colors.primary, fontSize: headerStyles.font['4xl'] }}>{personalInfo.name || "Your Name"}</h1>
                          <h2 style={{ color: theme.colors.secondary, fontSize: headerStyles.font.xl, marginTop: headerStyles.s(1) }}>{personalInfo.title || "Your Title"}</h2>
                      </header>
                      {sectionOrder.filter(key => mainSections.includes(key)).map(key => sectionComponentMap[key])}
                  </main>
              </div>
          );
      }
      
      const borderRadius = theme.layout.borderRadius;
      let sidebarBorderRadius = '';
      let mainContentBorderRadius = '';

      if (borderRadius) {
          const radiusSuffix = borderRadius.substring('rounded'.length);
          sidebarBorderRadius = `rounded-l${radiusSuffix}`;
          mainContentBorderRadius = `rounded-r${radiusSuffix}`;
      }

      return (
          <div className={`w-full h-full flex ${theme.font} ${isRounded ? 'shadow-lg' : ''}`} style={{backgroundColor: theme.colors.background, fontSize: `${globalStyles.baseRem}px`}}>
              {/* Sidebar */}
              <aside 
                  className={`w-[38%] h-full p-8 flex flex-col ${sidebarBorderRadius}`} 
                  style={{ backgroundColor: theme.colors.sidebarBackground, color: theme.colors.sidebarText, padding: globalStyles.s(8), gap: globalStyles.s(8) }}
              >
                  {hasPhoto && (
                      <div className="flex justify-center">
                          <img 
                              src={personalInfo.photo} 
                              alt={personalInfo.name} 
                              className={`rounded-full object-cover border-4 ${isCorporate ? 'w-36 h-36' : 'w-40 h-40'}`}
                              style={{borderColor: theme.colors.accent}}
                          />
                      </div>
                  )}
                  
                  <section>
                      <h3 className={theme.layout.sectionTitleStyle} style={{color: isCorporate ? theme.colors.sidebarText : theme.colors.accent, fontSize: sidebarContactStyles.font.lg, marginBottom: sidebarContactStyles.s(4)}}>Contact</h3>
                      {isRounded && <div className="h-0.5 w-10" style={{backgroundColor: theme.colors.accent, marginBottom: sidebarContactStyles.s(3)}}></div>}
                      <div className="flex flex-col" style={{gap: sidebarContactStyles.s(3)}}>
                         <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                         <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                         <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                         <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.sidebarText!} style={{fontSize: sidebarContactStyles.font.sm, gap: sidebarContactStyles.s(3)}} />
                      </div>
                  </section>
                  
                  {orderedSidebar.map(key => sectionComponentMap[key])}
              </aside>

              {/* Main Content */}
              <main className={`w-[62%] h-full ${mainContentBorderRadius}`} style={{ color: theme.colors.text, padding: globalStyles.s(10) }}>
                  <header style={{marginBottom: headerStyles.s(8)}}>
                      <h1 className={`font-bold ${isEarthy ? '[font-family:Lora,serif]' : ''}`} style={{ color: theme.colors.primary, fontSize: isEarthy ? headerStyles.font['6xl'] : headerStyles.font['5xl'] }}>{personalInfo.name || "Your Name"}</h1>
                      <h2 style={{ color: theme.colors.secondary, fontSize: headerStyles.font['2xl'], marginTop: headerStyles.s(1) }}>{personalInfo.title || "Your Title"}</h2>
                  </header>
                  {orderedMain.map(key => sectionComponentMap[key])}
              </main>
          </div>
      );
    }

    // Fallback to single column layout for existing themes
    const headerStyles = getSectionStyles('header');
    const isCentered = theme.layout.headerAlignment === 'text-center';
    const getSingleColSectionTitleStyles = (section: 'summary' | 'experience' | 'education' | 'projects' | 'skills' | 'languages' | 'interests'): React.CSSProperties => {
      const s = getSectionStyles(section).s;
      const font = getSectionStyles(section).font;
      let styles: React.CSSProperties = { fontSize: font.xl, marginBottom: s(4), paddingBottom: s(1) };
      switch (theme.name) {
        case 'Modern Professional':
          return { ...styles, color: theme.colors.secondary, borderBottom: `2px solid ${theme.colors.secondary}40` };
        case 'Classic Elegance':
          return { ...styles, fontSize: font.lg, color: theme.colors.text, borderBottom: `1px solid ${theme.colors.textSecondary}`, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: s(2) };
        case 'Creative Tech':
          return { ...styles, fontSize: font['2xl'], color: theme.colors.secondary, borderBottom: 'none', fontWeight: 300 };
        default:
          return { ...styles, color: theme.colors.secondary, borderBottom: `2px solid ${theme.colors.secondary}40` };
      }
    };

    const singleColSectionComponents: Record<ReorderableSectionKey, React.ReactNode> = {
      summary: personalInfo.summary && (
          <section key="summary">
              <h3 style={getSingleColSectionTitleStyles('summary')}>Summary</h3>
              <p className="leading-relaxed" style={{fontSize: getSectionStyles('summary').font.sm}}>{personalInfo.summary}</p>
          </section>
      ),
      experience: experience.length > 0 && (
          <section key="experience" style={{marginTop: getSectionStyles('experience').s(6)}}>
            <h3 style={getSingleColSectionTitleStyles('experience')}>Experience</h3>
            <div className="flex flex-col" style={{gap: getSectionStyles('experience').s(5)}}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: getSectionStyles('experience').font.lg }}>{exp.role}</h4>
                    <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: getSectionStyles('experience').font.sm }}>{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="font-medium italic" style={{ color: theme.colors.secondary, fontSize: getSectionStyles('experience').font.base }}>{exp.company}</p>
                  <div className="flex flex-col" style={{marginTop: getSectionStyles('experience').s(2), gap: getSectionStyles('experience').s(1)}}>{renderDescription(exp.description, {fontSize: getSectionStyles('experience').font.base})}</div>
                </div>
              ))}
            </div>
          </section>
      ),
      education: education.length > 0 && (
          <section key="education" style={{marginTop: getSectionStyles('education').s(6)}}>
            <h3 style={getSingleColSectionTitleStyles('education')}>Education</h3>
            <div className="flex flex-col" style={{gap: getSectionStyles('education').s(4)}}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: getSectionStyles('education').font.lg }}>{edu.degree}</h4>
                    <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: getSectionStyles('education').font.sm }}>{edu.startDate} - {edu.endDate}</p>
                  </div>
                  <p className="font-medium italic" style={{ color: theme.colors.secondary, fontSize: getSectionStyles('education').font.base }}>{edu.institution}</p>
                  <div className="flex flex-col" style={{marginTop: getSectionStyles('education').s(1), gap: getSectionStyles('education').s(1)}}>{renderDescription(edu.description, {fontSize: getSectionStyles('education').font.base})}</div>
                </div>
              ))}
            </div>
          </section>
      ),
      projects: projects.length > 0 && (
          <section key="projects" style={{marginTop: getSectionStyles('projects').s(6)}}>
            <h3 style={getSingleColSectionTitleStyles('projects')}>Projects</h3>
            <div className="flex flex-col" style={{gap: getSectionStyles('projects').s(5)}}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: getSectionStyles('projects').font.lg }}>{proj.name}</h4>
                    <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: getSectionStyles('projects').font.sm }}>{proj.date}</p>
                  </div>
                  {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="font-medium italic" style={{ color: theme.colors.accent, fontSize: getSectionStyles('projects').font.sm }}>{proj.link}</a>}
                  <div className="flex flex-col" style={{marginTop: getSectionStyles('projects').s(2), gap: getSectionStyles('projects').s(1)}}>{renderDescription(proj.description, {fontSize: getSectionStyles('projects').font.base})}</div>
                </div>
              ))}
            </div>
          </section>
      ),
      skills: skills.length > 0 && (
          <section key="skills" style={{marginTop: getSectionStyles('skills').s(6)}}>
            <h3 style={getSingleColSectionTitleStyles('skills')}>Skills</h3>
            <div className="flex flex-wrap" style={{gap: getSectionStyles('skills').s(2)}}>
              {skills.map(skill => (
                skill.name && <span key={skill.id} className="text-white rounded-full inline-flex items-center" style={{backgroundColor: theme.colors.accent, fontSize: getSectionStyles('skills').font.sm, padding: `${getSectionStyles('skills').s(1)} ${getSectionStyles('skills').s(3)}`}}>{skill.name}</span>
              ))}
            </div>
          </section>
      ),
      languages: languages.length > 0 && (
          <section key="languages" style={{marginTop: getSectionStyles('languages').s(6)}}>
              <h3 style={getSingleColSectionTitleStyles('languages')}>Languages</h3>
              <div className="flex flex-wrap" style={{gap: `${getSectionStyles('languages').s(2)} ${getSectionStyles('languages').s(4)}`}}>
                  {languages.map(lang => (
                  lang.name && <div key={lang.id} style={{fontSize: getSectionStyles('languages').font.sm}}>
                      <span>{lang.name}</span>
                      {lang.level && <span className="opacity-75"> – {lang.level}</span>}
                  </div>
                  ))}
              </div>
          </section>
      ),
      interests: interests.length > 0 && (
          <section key="interests" style={{marginTop: getSectionStyles('interests').s(6)}}>
              <h3 style={getSingleColSectionTitleStyles('interests')}>Interests</h3>
              <div className="flex flex-wrap" style={{gap: getSectionStyles('interests').s(2)}}>
                  {interests.map(interest => (
                  interest.name && <span key={interest.id} className="rounded-full inline-flex items-center" style={{backgroundColor: theme.colors.accent + '20', color: theme.colors.accent, fontSize: getSectionStyles('interests').font.sm, padding: `${getSectionStyles('interests').s(1)} ${getSectionStyles('interests').s(3)}`}}>{interest.name}</span>
                  ))}
              </div>
          </section>
      ),
    }


    return (
      <div id="cv-render-content" className={`w-full h-full ${theme.font}`} style={{ backgroundColor: theme.colors.background, fontSize: `${globalStyles.baseRem}px`, padding: globalStyles.s(10) }}>
        <header className={`flex ${isCentered ? 'flex-col items-center' : 'flex-row items-center'}`} style={{ marginBottom: headerStyles.s(8), gap: headerStyles.s(8) }}>
          {hasPhoto && (
              <div className={`flex-shrink-0 ${isCentered ? 'mb-4' : ''}`}>
                  <img src={personalInfo.photo} alt={personalInfo.name} className="w-28 h-28 rounded-full object-cover border-4" style={{borderColor: theme.colors.accent + '50'}} />
              </div>
          )}
          <div className={`${theme.layout.headerAlignment} flex-grow`}>
              <h1 className="font-bold" style={{ color: theme.colors.primary, fontSize: headerStyles.font['5xl'] }}>{personalInfo.name || "Your Name"}</h1>
              <h2 style={{ color: theme.colors.secondary, fontSize: headerStyles.font['2xl'], marginTop: headerStyles.s(1) }}>{personalInfo.title || "Your Title"}</h2>
              <div className={`flex items-center flex-wrap ${isCentered ? 'justify-center' : ''}`} style={{ marginTop: headerStyles.s(4), gap: `${headerStyles.s(2)} ${headerStyles.s(6)}` }}>
                  <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.textSecondary} style={{fontSize: headerStyles.font.sm, gap: headerStyles.s(2)}}/>
                  <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.textSecondary} style={{fontSize: headerStyles.font.sm, gap: headerStyles.s(2)}}/>
                  <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.textSecondary} style={{fontSize: headerStyles.font.sm, gap: headerStyles.s(2)}}/>
                  <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.textSecondary} style={{fontSize: headerStyles.font.sm, gap: headerStyles.s(2)}}/>
              </div>
          </div>
        </header>

        <main style={{ color: theme.colors.text, fontSize: globalStyles.font.base }}>
          {sectionOrder.map(key => singleColSectionComponents[key])}
        </main>
      </div>
    );
  }

  return (
    <div id="cv-preview" className="w-[210mm] h-[297mm] bg-white shadow-2xl rounded-lg overflow-hidden">
      {renderCvContent()}
    </div>
  );
};