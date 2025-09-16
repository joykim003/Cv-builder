import React from 'react';
import type { CVData, Theme } from '../types';
import { PhoneIcon, EmailIcon, LocationIcon, WebsiteIcon } from './Icons';

interface CVPreviewProps {
  data: CVData;
  theme: Theme;
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

export const CVPreview: React.FC<CVPreviewProps> = ({ data, theme }) => {
  const { personalInfo, experience, education, skills, languages, interests } = data;
  const hasPhoto = !!personalInfo.photo;

  // Sizing calculations
  const { baseFontSize, headingScale, spacing } = theme.sizing;
  const baseRem = baseFontSize; // in px, for the root element

  const s = (multiplier: number) => `${multiplier * 0.25 * spacing}rem`;

  // Font sizes in rem
  const font = {
    xs: `${0.75 * headingScale}rem`,
    sm: `${0.875 * headingScale}rem`,
    base: '1rem', // This will be `baseFontSize` due to root element styling
    lg: `${1.125 * headingScale}rem`,
    xl: `${1.25 * headingScale}rem`,
    '2xl': `${1.5 * headingScale}rem`,
    '3xl': `${1.875 * headingScale}rem`,
    '4xl': `${2.25 * headingScale}rem`,
    '5xl': `${3.0 * headingScale}rem`,
    '6xl': `${3.75 * headingScale}rem`,
  };


  if (theme.layout.style === 'two-column') {
    const isCorporate = theme.name === 'Corporate Blue';
    const isEarthy = theme.name === 'Earthy Tones';
    const isRounded = theme.name === 'Rounded Charm';
    const isDeepBlue = theme.name === 'Professional Deep Blue';
    
    if (isDeepBlue) {
        return (
            <div className={`w-full h-full flex ${theme.font} overflow-hidden`} style={{backgroundColor: theme.colors.background, fontSize: `${baseRem}px`}}>
                {/* Sidebar */}
                <aside 
                    className="w-[35%] h-full flex flex-col" 
                    style={{ backgroundColor: theme.colors.sidebarBackground, color: theme.colors.sidebarText, padding: s(8), gap: s(6) }}
                >
                    {hasPhoto && (
                        <div className="flex justify-center" style={{marginBottom: s(2)}}>
                            <img 
                                src={personalInfo.photo} 
                                alt={personalInfo.name} 
                                className="w-32 h-32 rounded-full object-cover border-4"
                                style={{borderColor: '#FFFFFF'}}
                            />
                        </div>
                    )}
                    
                    <section>
                        <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.sm, marginBottom: s(3)}}>Contact</h3>
                        <div className="flex flex-col" style={{ gap: s(3), marginTop: s(2)}}>
                           <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}}/>
                           <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}}/>
                           <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}}/>
                           <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}}/>
                        </div>
                    </section>

                    <section>
                       <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.sm, marginBottom: s(3)}}>Languages</h3>
                       <div className="flex flex-col" style={{gap: s(1), marginTop: s(2)}}>
                         {languages.map(lang => (
                           lang.name && <div key={lang.id} style={{fontSize: font.sm}}>
                             <span>{lang.name}</span>
                             {lang.level && <span className="text-gray-600"> – {lang.level}</span>}
                           </div>
                         ))}
                       </div>
                    </section>
                    
                    <section>
                       <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.sm, marginBottom: s(3)}}>Skills</h3>
                       <ul className="list-disc list-inside flex flex-col" style={{marginTop: s(2), gap: s(1), fontSize: font.sm}}>
                         {skills.map(skill => (
                           skill.name && <li key={skill.id}>{skill.name}</li>
                         ))}
                       </ul>
                    </section>

                    <section>
                       <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.sm, marginBottom: s(3)}}>Interests</h3>
                       <div className="flex flex-col" style={{gap: s(1), marginTop: s(2), fontSize: font.sm}}>
                         {interests.map(interest => (
                           interest.name && <p key={interest.id}>{interest.name}</p>
                         ))}
                       </div>
                    </section>
                </aside>

                {/* Main Content */}
                <main className="w-[65%] h-full relative" style={{ color: theme.colors.text, padding: s(10) }}>
                    <div className="absolute top-0 right-8 h-36 w-16 rounded-b-full" style={{backgroundColor: theme.colors.primary}}></div>

                    <header style={{marginBottom: s(8), marginTop: s(12)}}>
                        <h1 className="font-bold uppercase tracking-wider" style={{ color: theme.colors.primary, fontSize: font['4xl'] }}>{personalInfo.name || "Your Name"}</h1>
                        <h2 style={{ color: theme.colors.secondary, fontSize: font.xl, marginTop: s(1) }}>{personalInfo.title || "Your Title"}</h2>
                    </header>
                    
                    <section style={{marginTop: s(8)}}>
                      <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.sm, marginBottom: s(3)}}>Education</h3>
                      <div className="flex flex-col" style={{gap: s(4)}}>
                        {education.map(edu => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-baseline">
                              <h4 className="font-semibold" style={{ color: theme.colors.text, fontSize: font.lg }}>{edu.degree}</h4>
                              <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: font.sm }}>{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p className="font-medium" style={{ color: theme.colors.secondary, fontSize: font.base }}>{edu.institution}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section style={{marginTop: s(8)}}>
                      <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.sm, marginBottom: s(3)}}>Professional Experience</h3>
                       <div className="flex flex-col" style={{gap: s(5)}}>
                        {experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                              <h4 className="font-semibold" style={{ color: theme.colors.text, fontSize: font.lg }}>{exp.role}</h4>
                              <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: font.sm }}>{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="font-medium" style={{ color: theme.colors.secondary, fontSize: font.base }}>{exp.company}</p>
                            <div className="flex flex-col" style={{marginTop: s(2), gap: s(1)}}>{renderDescription(exp.description, {fontSize: font.sm})}</div>
                          </div>
                        ))}
                      </div>
                    </section>
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
        <div className={`w-full h-full flex ${theme.font} ${isRounded ? 'shadow-lg' : ''}`} style={{backgroundColor: theme.colors.background, fontSize: `${baseRem}px`}}>
            {/* Sidebar */}
            <aside 
                className={`w-[38%] h-full p-8 flex flex-col ${sidebarBorderRadius}`} 
                style={{ backgroundColor: theme.colors.sidebarBackground, color: theme.colors.sidebarText, padding: s(8), gap: s(8) }}
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
                    <h3 className={theme.layout.sectionTitleStyle} style={{color: isCorporate ? theme.colors.sidebarText : theme.colors.accent, fontSize: font.lg, marginBottom: s(4)}}>Contact</h3>
                    {isRounded && <div className="h-0.5 w-10" style={{backgroundColor: theme.colors.accent, marginBottom: s(3)}}></div>}
                    <div className="flex flex-col" style={{gap: s(3)}}>
                       <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}} />
                       <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}} />
                       <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}} />
                       <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.sidebarText!} style={{fontSize: font.sm, gap: s(3)}} />
                    </div>
                </section>
                
                <section>
                   <h3 className={theme.layout.sectionTitleStyle} style={{color: isCorporate ? theme.colors.sidebarText : theme.colors.accent, fontSize: font.lg, marginBottom: s(4)}}>Skills</h3>
                   {isRounded && <div className="h-0.5 w-10" style={{backgroundColor: theme.colors.accent, marginBottom: s(3)}}></div>}
                   <div className="flex flex-wrap" style={{gap: s(2)}}>
                     {skills.map(skill => (
                       skill.name && <span key={skill.id} className="rounded-full" style={{backgroundColor: theme.colors.accent, color: (isCorporate || isRounded) ? '#fff' : theme.colors.sidebarText, fontSize: font.xs, padding: `${s(1)} ${s(3)}`}}>{skill.name}</span>
                     ))}
                   </div>
                </section>
            </aside>

            {/* Main Content */}
            <main className={`w-[62%] h-full ${mainContentBorderRadius}`} style={{ color: theme.colors.text, padding: s(10) }}>
                <header style={{marginBottom: s(8)}}>
                    <h1 className={`font-bold ${isEarthy ? '[font-family:Lora,serif]' : ''}`} style={{ color: theme.colors.primary, fontSize: isEarthy ? font['6xl'] : font['5xl'] }}>{personalInfo.name || "Your Name"}</h1>
                    <h2 style={{ color: theme.colors.secondary, fontSize: font['2xl'], marginTop: s(1) }}>{personalInfo.title || "Your Title"}</h2>
                </header>
                
                <section>
                    <p className="leading-relaxed" style={{fontSize: font.sm}}>{personalInfo.summary}</p>
                </section>

                <section style={{marginTop: s(6)}}>
                  <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.xl, marginBottom: s(4)}}>
                    <span style={{backgroundColor: isEarthy ? theme.colors.accent : 'transparent', color: isEarthy ? theme.colors.sidebarText : theme.colors.primary}} className={isEarthy ? 'px-3 py-1' : ''}>
                        Experience
                    </span>
                  </h3>
                  {isRounded && <div className="h-0.5 w-10" style={{backgroundColor: theme.colors.accent, marginBottom: s(3)}}></div>}
                  <div className={`flex flex-col relative ${isCorporate ? 'border-l-2 pl-6' : ''}`} style={{gap: s(5), borderColor: theme.colors.accent + '50', paddingLeft: isCorporate ? s(6) : '0'}}>
                    {experience.map((exp, index) => (
                      <div key={exp.id} className={isCorporate ? 'relative' : ''}>
                        {isCorporate && <div className="absolute top-1 w-3 h-3 rounded-full" style={{backgroundColor: theme.colors.accent, left: `-${s(6)} - 5px`}}></div>}
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: font.lg }}>{exp.role}</h4>
                          <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: font.sm }}>{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="font-medium" style={{ color: theme.colors.secondary, fontSize: font.base }}>{exp.company}</p>
                        <div className="flex flex-col" style={{marginTop: s(2), gap: s(1)}}>{renderDescription(exp.description, {fontSize: font.base})}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section style={{marginTop: s(6)}}>
                  <h3 className={theme.layout.sectionTitleStyle} style={{color: theme.colors.primary, fontSize: font.xl, marginBottom: s(4)}}>
                    <span style={{backgroundColor: isEarthy ? theme.colors.accent : 'transparent', color: isEarthy ? theme.colors.sidebarText : theme.colors.primary}} className={isEarthy ? 'px-3 py-1' : ''}>
                        Education
                    </span>
                  </h3>
                   {isRounded && <div className="h-0.5 w-10" style={{backgroundColor: theme.colors.accent, marginBottom: s(3)}}></div>}
                   <div className={`flex flex-col relative ${isCorporate ? 'border-l-2' : ''}`} style={{gap: s(4), borderColor: theme.colors.accent + '50', paddingLeft: isCorporate ? s(6) : '0'}}>
                    {education.map(edu => (
                      <div key={edu.id} className={isCorporate ? 'relative' : ''}>
                        {isCorporate && <div className="absolute top-1 w-3 h-3 rounded-full" style={{backgroundColor: theme.colors.accent, left: `-${s(6)} - 5px`}}></div>}
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: font.lg }}>{edu.degree}</h4>
                          <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: font.sm }}>{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="font-medium" style={{ color: theme.colors.secondary, fontSize: font.base }}>{edu.institution}</p>
                        <div className="flex flex-col" style={{marginTop: s(1), gap: s(1)}}>{renderDescription(edu.description, {fontSize: font.base})}</div>
                      </div>
                    ))}
                  </div>
                </section>
            </main>
        </div>
    );
  }

  // Fallback to single column layout for existing themes
  const isCentered = theme.layout.headerAlignment === 'text-center';
  const sectionTitleStyles: React.CSSProperties = React.useMemo(() => {
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
  }, [theme, font, s]);

  return (
    <div id="cv-render-content" className={`w-full h-full ${theme.font}`} style={{ backgroundColor: theme.colors.background, fontSize: `${baseRem}px`, padding: s(10) }}>
      <header className={`flex ${isCentered ? 'flex-col items-center' : 'flex-row items-center'}`} style={{ marginBottom: s(8), gap: s(8) }}>
        {hasPhoto && (
            <div className={`flex-shrink-0 ${isCentered ? 'mb-4' : ''}`}>
                <img src={personalInfo.photo} alt={personalInfo.name} className="w-28 h-28 rounded-full object-cover border-4" style={{borderColor: theme.colors.accent + '50'}} />
            </div>
        )}
        <div className={`${theme.layout.headerAlignment} flex-grow`}>
            <h1 className="font-bold" style={{ color: theme.colors.primary, fontSize: font['5xl'] }}>{personalInfo.name || "Your Name"}</h1>
            <h2 style={{ color: theme.colors.secondary, fontSize: font['2xl'], marginTop: s(1) }}>{personalInfo.title || "Your Title"}</h2>
            <div className={`flex items-center flex-wrap ${isCentered ? 'justify-center' : ''}`} style={{ marginTop: s(4), gap: `${s(2)} ${s(6)}` }}>
                <ContactInfoItem icon={<PhoneIcon className="w-4 h-4" />} text={personalInfo.phone} color={theme.colors.textSecondary} style={{fontSize: font.sm, gap: s(2)}}/>
                <ContactInfoItem icon={<EmailIcon className="w-4 h-4" />} text={personalInfo.email} color={theme.colors.textSecondary} style={{fontSize: font.sm, gap: s(2)}}/>
                <ContactInfoItem icon={<LocationIcon className="w-4 h-4" />} text={personalInfo.location} color={theme.colors.textSecondary} style={{fontSize: font.sm, gap: s(2)}}/>
                <ContactInfoItem icon={<WebsiteIcon className="w-4 h-4" />} text={personalInfo.website} color={theme.colors.textSecondary} style={{fontSize: font.sm, gap: s(2)}}/>
            </div>
        </div>
      </header>

      <main style={{ color: theme.colors.text, fontSize: font.base }}>
        <section>
          <h3 style={sectionTitleStyles}>Summary</h3>
          <p className="leading-relaxed" style={{fontSize: font.sm}}>{personalInfo.summary}</p>
        </section>

        <section style={{marginTop: s(6)}}>
          <h3 style={sectionTitleStyles}>Experience</h3>
          <div className="flex flex-col" style={{gap: s(5)}}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: font.lg }}>{exp.role}</h4>
                  <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: font.sm }}>{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="font-medium italic" style={{ color: theme.colors.secondary, fontSize: font.base }}>{exp.company}</p>
                <div className="flex flex-col" style={{marginTop: s(2), gap: s(1)}}>{renderDescription(exp.description, {fontSize: font.base})}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop: s(6)}}>
          <h3 style={sectionTitleStyles}>Education</h3>
          <div className="flex flex-col" style={{gap: s(4)}}>
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold" style={{ color: theme.colors.primary, fontSize: font.lg }}>{edu.degree}</h4>
                  <p className="font-medium" style={{ color: theme.colors.textSecondary, fontSize: font.sm }}>{edu.startDate} - {edu.endDate}</p>
                </div>
                <p className="font-medium italic" style={{ color: theme.colors.secondary, fontSize: font.base }}>{edu.institution}</p>
                <div className="flex flex-col" style={{marginTop: s(1), gap: s(1)}}>{renderDescription(edu.description, {fontSize: font.base})}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop: s(6)}}>
          <h3 style={sectionTitleStyles}>Skills</h3>
          <div className="flex flex-wrap" style={{gap: s(2)}}>
            {skills.map(skill => (
              skill.name && <span key={skill.id} className="text-white rounded-full" style={{backgroundColor: theme.colors.accent, fontSize: font.sm, padding: `${s(1)} ${s(3)}`}}>{skill.name}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};