import React, { useState } from 'react';
import type { CVData, Experience, Education, Project, Skill, Language, Interest, ReorderableSectionKey } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { DragHandleIcon } from './Icons';

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  accentColor: string;
  sectionOrder: ReorderableSectionKey[];
  setSectionOrder: React.Dispatch<React.SetStateAction<ReorderableSectionKey[]>>;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string, type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string, rows?: number }> = ({ label, value, onChange, placeholder, rows=4 }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const ImageUploadField: React.FC<{ label: string; photo: string; onPhotoChange: (base64: string) => void; onPhotoRemove: () => void; }> = ({ label, photo, onPhotoChange, onPhotoRemove }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onPhotoChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <div className="mt-1 flex items-center gap-4">
                <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {photo ? (
                        <img src={photo} alt="Profile Preview" className="h-full w-full object-cover" />
                    ) : (
                        <svg className="h-full w-full text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </span>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                >
                    Change
                </button>
                {photo && (
                    <button
                        type="button"
                        onClick={onPhotoRemove}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
};


const SectionWrapper: React.FC<{ 
    id?: string;
    title: string; 
    children: React.ReactNode; 
    isDraggable?: boolean; 
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    onDragOver?: React.DragEventHandler<HTMLDivElement>;
    onDrop?: React.DragEventHandler<HTMLDivElement>;
    onDragEnd?: React.DragEventHandler<HTMLDivElement>;
    isDragging?: boolean;
}> = ({ id, title, children, isDraggable, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) => (
    <div 
        id={id}
        className={`mt-8 transition-opacity duration-300 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
    >
        <div className="flex items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            {isDraggable && (
                <div className="cursor-grab text-gray-400 dark:text-gray-500 mr-2 hover:text-gray-600 dark:hover:text-gray-300">
                    <DragHandleIcon className="w-5 h-5" />
                </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

type DeletableSection = 'experience' | 'education' | 'projects' | 'skills' | 'languages' | 'interests';

export const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData, accentColor, sectionOrder, setSectionOrder }) => {
    const [itemToDelete, setItemToDelete] = useState<{ section: DeletableSection; id: string } | null>(null);
    const [draggedItem, setDraggedItem] = useState<ReorderableSectionKey | null>(null);

    const handleChange = <T extends keyof CVData['personalInfo'],>(section: 'personalInfo', field: T, value: CVData['personalInfo'][T]) => {
        setCvData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    
    const handleArrayChange = <K extends DeletableSection>(section: K, index: number, field: keyof CVData[K][number], value: string) => {
        setCvData(prev => {
            const newArray = [...prev[section]];
            (newArray[index] as any)[field] = value;
            return { ...prev, [section]: newArray };
        });
    };

    const addArrayItem = (section: DeletableSection) => {
        let newItem: Experience | Education | Project | Skill | Language | Interest;
        if(section === 'experience') {
            newItem = { id: uuidv4(), company: '', role: '', startDate: '', endDate: '', description: '' };
        } else if (section === 'education') {
            newItem = { id: uuidv4(), institution: '', degree: '', startDate: '', endDate: '', description: '' };
        } else if (section === 'projects') {
            newItem = { id: uuidv4(), name: '', date: '', link: '', description: '' };
        } else if (section === 'skills') {
            newItem = { id: uuidv4(), name: '' };
        } else if (section === 'languages') {
            newItem = { id: uuidv4(), name: '', level: '' };
        } else { // interests
            newItem = { id: uuidv4(), name: '' };
        }
        setCvData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    };

    const removeArrayItem = (section: DeletableSection, id: string) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            removeArrayItem(itemToDelete.section, itemToDelete.id);
            setItemToDelete(null);
        }
    };
    
    const handleCancelDelete = () => {
        setItemToDelete(null);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, section: ReorderableSectionKey) => {
        setDraggedItem(section);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', section);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetSection: ReorderableSectionKey) => {
        e.preventDefault();
        if (!draggedItem || draggedItem === targetSection) {
            setDraggedItem(null);
            return;
        }

        const currentIndex = sectionOrder.indexOf(draggedItem);
        const targetIndex = sectionOrder.indexOf(targetSection);
        
        const newOrder = Array.from(sectionOrder);
        const [removed] = newOrder.splice(currentIndex, 1);
        newOrder.splice(targetIndex, 0, removed);
        
        setSectionOrder(newOrder);
        setDraggedItem(null);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const sectionComponents: Record<ReorderableSectionKey, { title: string, content: React.ReactNode }> = {
        summary: {
            title: 'Summary',
            content: <TextAreaField label="Professional Summary" value={cvData.personalInfo.summary} onChange={(e) => handleChange('personalInfo', 'summary', e.target.value)} placeholder="Write a brief professional summary..." />
        },
        experience: {
            title: 'Work Experience',
            content: (
                <>
                    {cvData.experience.map((exp, index) => (
                      <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 relative">
                        <InputField label="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                        <InputField label="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                          <InputField label="End Date" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} />
                        </div>
                        <TextAreaField label="Description" value={exp.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} placeholder="- Main responsibilities and achievements..." />
                        <button type="button" onClick={() => setItemToDelete({ section: 'experience', id: exp.id })} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('experience')} style={{backgroundColor: accentColor}} className="w-full py-2 text-white font-semibold rounded-md hover:opacity-90 transition">+ Add Experience</button>
                </>
            )
        },
        education: {
            title: 'Education',
            content: (
                 <>
                    {cvData.education.map((edu, index) => (
                      <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 relative">
                        <InputField label="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
                        <InputField label="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Start Date" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} />
                          <InputField label="End Date" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} />
                        </div>
                        <TextAreaField label="Description" value={edu.description} onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)} placeholder="- Relevant coursework, awards..." />
                        <button type="button" onClick={() => setItemToDelete({ section: 'education', id: edu.id })} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('education')} style={{backgroundColor: accentColor}} className="w-full py-2 text-white font-semibold rounded-md hover:opacity-90 transition">+ Add Education</button>
                </>
            )
        },
        projects: {
            title: 'Projects',
            content: (
                <>
                    {cvData.projects.map((proj, index) => (
                      <div key={proj.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 relative">
                        <InputField label="Project Name" value={proj.name} onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Date / Timeline" value={proj.date} onChange={(e) => handleArrayChange('projects', index, 'date', e.target.value)} placeholder="e.g., 2023" />
                          <InputField label="Link" value={proj.link} onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} placeholder="e.g., github.com/user/repo" />
                        </div>
                        <TextAreaField label="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} placeholder="- Key features and technologies used..." />
                        <button type="button" onClick={() => setItemToDelete({ section: 'projects', id: proj.id })} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('projects')} style={{backgroundColor: accentColor}} className="w-full py-2 text-white font-semibold rounded-md hover:opacity-90 transition">+ Add Project</button>
                </>
            )
        },
        skills: {
            title: 'Skills',
            content: (
                 <>
                    {cvData.skills.map((skill, index) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <InputField label={`Skill ${index + 1}`} value={skill.name} onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)} />
                        <button type="button" onClick={() => setItemToDelete({ section: 'skills', id: skill.id })} className="mt-6 text-red-500 hover:text-red-700">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('skills')} style={{backgroundColor: accentColor}} className="w-full py-2 text-white font-semibold rounded-md hover:opacity-90 transition">+ Add Skill</button>
                </>
            )
        },
        languages: {
            title: 'Languages',
            content: (
                 <>
                    {cvData.languages.map((lang, index) => (
                      <div key={lang.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Language" value={lang.name} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} />
                            <InputField label="Level" value={lang.level} onChange={(e) => handleArrayChange('languages', index, 'level', e.target.value)} placeholder="e.g., Native, Fluent" />
                        </div>
                        <button type="button" onClick={() => setItemToDelete({ section: 'languages', id: lang.id })} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('languages')} style={{backgroundColor: accentColor}} className="w-full py-2 text-white font-semibold rounded-md hover:opacity-90 transition">+ Add Language</button>
                </>
            )
        },
        interests: {
            title: 'Interests',
            content: (
                 <>
                    {cvData.interests.map((interest, index) => (
                      <div key={interest.id} className="flex items-center gap-2">
                        <InputField label={`Interest ${index + 1}`} value={interest.name} onChange={(e) => handleArrayChange('interests', index, 'name', e.target.value)} />
                        <button type="button" onClick={() => setItemToDelete({ section: 'interests', id: interest.id })} className="mt-6 text-red-500 hover:text-red-700">&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('interests')} style={{backgroundColor: accentColor}} className="w-full py-2 text-white font-semibold rounded-md hover:opacity-90 transition">+ Add Interest</button>
                </>
            )
        }
    };


  return (
    <form className="space-y-6 mt-6">
      <div id="personal-info-form" className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Personal Information</h3>
        <div className="space-y-4">
            <ImageUploadField
                label="Profile Photo"
                photo={cvData.personalInfo.photo}
                onPhotoChange={(base64) => handleChange('personalInfo', 'photo', base64)}
                onPhotoRemove={() => handleChange('personalInfo', 'photo', '')}
            />
            <InputField label="Full Name" value={cvData.personalInfo.name} onChange={(e) => handleChange('personalInfo', 'name', e.target.value)} />
            <InputField label="Job Title" value={cvData.personalInfo.title} onChange={(e) => handleChange('personalInfo', 'title', e.target.value)} />
            <InputField label="Phone" type="tel" value={cvData.personalInfo.phone} onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)} />
            <InputField label="Email" type="email" value={cvData.personalInfo.email} onChange={(e) => handleChange('personalInfo', 'email', e.target.value)} />
            <InputField label="Location" value={cvData.personalInfo.location} onChange={(e) => handleChange('personalInfo', 'location', e.target.value)} />
            <InputField label="Website/Portfolio" value={cvData.personalInfo.website} onChange={(e) => handleChange('personalInfo', 'website', e.target.value)} />
        </div>
      </div>
      
      {sectionOrder.map(sectionKey => (
        <SectionWrapper
            key={sectionKey}
            id={`draggable-section-${sectionKey}`}
            title={sectionComponents[sectionKey].title}
            isDraggable
            onDragStart={(e) => handleDragStart(e, sectionKey)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, sectionKey)}
            onDragEnd={handleDragEnd}
            isDragging={draggedItem === sectionKey}
        >
            {sectionComponents[sectionKey].content}
        </SectionWrapper>
      ))}

      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={handleCancelDelete}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
      )}
    </form>
  );
};