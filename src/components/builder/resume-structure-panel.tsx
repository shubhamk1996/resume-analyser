'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Globe,
  Award,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
} from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  resume: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
  onSelectFieldForAI: (field: { section: string; title: string; content: string }) => void;
}

export function ResumeStructurePanel({ resume, onChange, onSelectFieldForAI }: Props) {
  const [expandedSection, setExpandedSection] = useState<string>('personal');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? '' : id);
  };

  const handleUpdatePersonal = (key: string, val: string) => {
    onChange({
      personalInfo: { ...resume.personalInfo, [key]: val },
    });
  };

  const handleAddExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      jobTitle: 'Software Engineer',
      company: 'Tech Enterprise',
      location: 'Bengaluru, India',
      startDate: '2023-01',
      endDate: 'Present',
      isCurrent: true,
      bulletPoints: ['Engineered scalable web applications achieving 30% performance boost.'],
    };
    onChange({ experiences: [newExp, ...resume.experiences] });
    toast.success('Added new work experience');
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      degree: 'B.Tech / B.E.',
      fieldOfStudy: 'Computer Science',
      institution: 'University / Institute',
      location: 'India',
      startDate: '2019',
      endDate: '2023',
    };
    onChange({ educations: [...resume.educations, newEdu] });
    toast.success('Added new education qualification');
  };

  const handleAddProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: 'Cloud Service Architecture',
      role: 'Lead Developer',
      technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
      bulletPoints: ['Designed low-latency microservices with automated failover.'],
    };
    onChange({ projects: [newProj, ...resume.projects] });
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border overflow-hidden select-none">
      <div className="p-3.5 border-b border-border bg-secondary/30 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <GripVertical className="h-3.5 w-3.5 text-accent" />
          Resume Structure &amp; Sections
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          {resume.experiences.length + resume.educations.length + resume.skills.length} Items
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* SECTION: PERSONAL INFO & SUMMARY */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('personal')}
            className="w-full p-3 flex justify-between items-center text-xs font-bold text-foreground hover:bg-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-accent" />
              Personal Info &amp; Summary
            </span>
            {expandedSection === 'personal' ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSection === 'personal' && (
            <div className="p-3 pt-0 space-y-3 text-xs border-t border-border/50">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-muted-foreground">Full Name</label>
                <Input
                  className="h-8 text-xs"
                  value={resume.personalInfo.fullName}
                  onChange={(e) => handleUpdatePersonal('fullName', e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-muted-foreground">Professional Headline</label>
                <Input
                  className="h-8 text-xs"
                  value={resume.personalInfo.headline || ''}
                  onChange={(e) => handleUpdatePersonal('headline', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-muted-foreground">Email</label>
                  <Input
                    className="h-8 text-xs"
                    value={resume.personalInfo.email}
                    onChange={(e) => handleUpdatePersonal('email', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-muted-foreground">Phone (+91)</label>
                  <Input
                    className="h-8 text-xs"
                    value={resume.personalInfo.phone}
                    onChange={(e) => handleUpdatePersonal('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-muted-foreground">Location</label>
                  <Input
                    className="h-8 text-xs"
                    value={resume.personalInfo.location}
                    onChange={(e) => handleUpdatePersonal('location', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-muted-foreground">LinkedIn</label>
                  <Input
                    className="h-8 text-xs"
                    value={resume.personalInfo.linkedin || ''}
                    onChange={(e) => handleUpdatePersonal('linkedin', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-semibold text-muted-foreground">Summary</label>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectFieldForAI({
                        section: 'Professional Summary',
                        title: 'Summary Optimization',
                        content: resume.personalInfo.summary || '',
                      })
                    }
                    className="text-[10px] text-accent font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Sparkles className="h-3 w-3" /> Optimize in AI Panel
                  </button>
                </div>
                <Textarea
                  rows={3}
                  className="text-xs resize-none"
                  value={resume.personalInfo.summary || ''}
                  onChange={(e) => handleUpdatePersonal('summary', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION: WORK EXPERIENCE */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="w-full p-3 flex justify-between items-center text-xs font-bold text-foreground hover:bg-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-accent" />
              Work Experience ({resume.experiences.length})
            </span>
            {expandedSection === 'experience' ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSection === 'experience' && (
            <div className="p-3 pt-0 space-y-3 text-xs border-t border-border/50">
              {resume.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-2.5 rounded bg-secondary/30 border border-border/60 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-accent">#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = resume.experiences.filter((e) => e.id !== exp.id);
                        onChange({ experiences: copy });
                        toast.info('Experience removed');
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      className="h-7 text-xs"
                      placeholder="Title"
                      value={exp.jobTitle}
                      onChange={(e) => {
                        const copy = [...resume.experiences];
                        copy[idx].jobTitle = e.target.value;
                        onChange({ experiences: copy });
                      }}
                    />
                    <Input
                      className="h-7 text-xs"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const copy = [...resume.experiences];
                        copy[idx].company = e.target.value;
                        onChange({ experiences: copy });
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    {exp.bulletPoints.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-1.5 items-center">
                        <Input
                          className="h-7 text-[11px]"
                          value={b}
                          onChange={(e) => {
                            const copy = [...resume.experiences];
                            copy[idx].bulletPoints[bIdx] = e.target.value;
                            onChange({ experiences: copy });
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onSelectFieldForAI({
                              section: 'Experience Bullet',
                              title: `${exp.company} Bullet #${bIdx + 1}`,
                              content: b,
                            })
                          }
                          title="Polish this bullet with Google XYZ formula"
                          className="p-1 rounded hover:bg-secondary text-accent"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Button
                size="sm"
                variant="outline"
                onClick={handleAddExperience}
                className="w-full text-xs font-semibold gap-1.5 h-8"
              >
                <Plus className="h-3.5 w-3.5" /> Add Experience
              </Button>
            </div>
          )}
        </div>

        {/* SECTION: EDUCATION */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('education')}
            className="w-full p-3 flex justify-between items-center text-xs font-bold text-foreground hover:bg-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent" />
              Education ({resume.educations.length})
            </span>
            {expandedSection === 'education' ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSection === 'education' && (
            <div className="p-3 pt-0 space-y-3 text-xs border-t border-border/50">
              {resume.educations.map((edu, idx) => (
                <div key={edu.id} className="p-2.5 rounded bg-secondary/30 border border-border/60 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      className="h-7 text-xs"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const copy = [...resume.educations];
                        copy[idx].degree = e.target.value;
                        onChange({ educations: copy });
                      }}
                    />
                    <Input
                      className="h-7 text-xs"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => {
                        const copy = [...resume.educations];
                        copy[idx].institution = e.target.value;
                        onChange({ educations: copy });
                      }}
                    />
                  </div>
                </div>
              ))}

              <Button
                size="sm"
                variant="outline"
                onClick={handleAddEducation}
                className="w-full text-xs font-semibold gap-1.5 h-8"
              >
                <Plus className="h-3.5 w-3.5" /> Add Education
              </Button>
            </div>
          )}
        </div>

        {/* SECTION: SKILLS */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            className="w-full p-3 flex justify-between items-center text-xs font-bold text-foreground hover:bg-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              Skills Matrix ({resume.skills.length} categories)
            </span>
            {expandedSection === 'skills' ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSection === 'skills' && (
            <div className="p-3 pt-0 space-y-2.5 text-xs border-t border-border/50">
              {resume.skills.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-[10px] font-bold text-foreground">{cat.category}</label>
                  <Input
                    className="h-7 text-[11px]"
                    value={cat.skills.join(', ')}
                    onChange={(e) => {
                      const copy = [...resume.skills];
                      copy[idx].skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      onChange({ skills: copy });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION: PROJECTS */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('projects')}
            className="w-full p-3 flex justify-between items-center text-xs font-bold text-foreground hover:bg-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              Projects ({resume.projects.length})
            </span>
            {expandedSection === 'projects' ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSection === 'projects' && (
            <div className="p-3 pt-0 space-y-2 text-xs border-t border-border/50">
              {resume.projects.map((p, idx) => (
                <div key={p.id} className="p-2 rounded bg-secondary/30 border border-border/60 space-y-1.5">
                  <Input
                    className="h-7 text-xs font-semibold"
                    placeholder="Project Name"
                    value={p.title}
                    onChange={(e) => {
                      const copy = [...resume.projects];
                      copy[idx].title = e.target.value;
                      onChange({ projects: copy });
                    }}
                  />
                  <Input
                    className="h-7 text-[11px]"
                    placeholder="Technologies (comma separated)"
                    value={p.technologies.join(', ')}
                    onChange={(e) => {
                      const copy = [...resume.projects];
                      copy[idx].technologies = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      onChange({ projects: copy });
                    }}
                  />
                </div>
              ))}

              <Button
                size="sm"
                variant="outline"
                onClick={handleAddProject}
                className="w-full text-xs font-semibold gap-1.5 h-8"
              >
                <Plus className="h-3.5 w-3.5" /> Add Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
