'use client';

import React, { useRef } from 'react';
import { ResumeData } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Download,
  Palette,
  FileCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  resume: ResumeData;
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  onOpenCustomizer: () => void;
  onExport: (format: 'pdf' | 'docx') => void;
}

export function ResumeA4Preview({
  resume,
  zoom,
  onZoomChange,
  onOpenCustomizer,
  onExport,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { customization } = resume;
  const p = resume.personalInfo;

  return (
    <div className="h-full flex flex-col bg-muted/40 overflow-hidden">
      {/* Top Floating Toolbar */}
      <div className="h-12 border-b border-border bg-card px-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] bg-secondary text-foreground font-mono">
            A4 Standard (210 × 297 mm)
          </Badge>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Template: <strong>{resume.selectedTemplateId}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center border border-border rounded-md bg-secondary/30 px-1 py-0.5 text-xs">
            <button
              onClick={() => onZoomChange(Math.max(60, zoom - 10))}
              className="p-1 text-muted-foreground hover:text-foreground"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="w-12 text-center font-mono font-semibold text-[11px]">
              {zoom}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(130, zoom + 10))}
              className="p-1 text-muted-foreground hover:text-foreground"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={onOpenCustomizer}
            className="h-8 text-xs font-semibold gap-1.5 border-border"
          >
            <Palette className="h-3.5 w-3.5 text-accent" />
            Customize Styles
          </Button>

          <Button
            size="sm"
            onClick={() => onExport('pdf')}
            className="h-8 text-xs font-bold bg-primary text-primary-foreground gap-1.5 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export Document
          </Button>
        </div>
      </div>

      {/* A4 Document Stage (Scrollable) */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start"
      >
        <div
          id="resume-a4-document"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            fontFamily: customization?.fontFamily || 'Plus Jakarta Sans, sans-serif',
            fontSize: `${customization?.fontSize || 10.5}pt`,
            lineHeight: customization?.lineHeight || 1.35,
            padding: `${customization?.margins || 20}px`,
            color: customization?.textColor || '#334155',
          }}
          className="w-[794px] min-h-[1123px] bg-white text-slate-800 shadow-2xl border border-slate-300 rounded-sm relative selection:bg-teal-100 selection:text-teal-900 print:shadow-none print:border-none print:m-0"
        >
          {/* Header Layout */}
          <div
            className={`border-b border-slate-300 pb-4 mb-4 ${
              customization?.headerLayout === 'center' ? 'text-center' : 'text-left'
            }`}
          >
            <h1
              style={{ color: customization?.primaryColor || '#0F172A' }}
              className="text-2xl font-extrabold tracking-tight uppercase"
            >
              {p.fullName || 'YOUR NAME'}
            </h1>
            <p
              style={{ color: customization?.accentColor || '#0D9488' }}
              className="text-sm font-semibold mt-0.5"
            >
              {p.headline || resume.targetRole}
            </p>
            <div className="text-xs text-slate-600 mt-1.5 flex flex-wrap gap-x-3 gap-y-1 items-center justify-start">
              <span>{p.email}</span>
              {p.phone && <span>• {p.phone}</span>}
              {p.location && <span>• {p.location}</span>}
              {p.linkedin && <span>• {p.linkedin}</span>}
              {p.github && <span>• {p.github}</span>}
              {p.portfolio && <span>• {p.portfolio}</span>}
            </div>
          </div>

          {/* Professional Summary */}
          {p.summary && (
            <div style={{ marginBottom: `${customization?.sectionSpacing || 14}px` }}>
              <h2
                style={{
                  color: customization?.headingColor || '#0F172A',
                  borderColor: customization?.accentColor || '#0D9488',
                }}
                className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2"
              >
                Professional Summary
              </h2>
              <p className="text-xs leading-relaxed text-slate-700">{p.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {resume.experiences.length > 0 && (
            <div style={{ marginBottom: `${customization?.sectionSpacing || 14}px` }}>
              <h2
                style={{
                  color: customization?.headingColor || '#0F172A',
                  borderColor: customization?.accentColor || '#0D9488',
                }}
                className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2.5"
              >
                Work Experience
              </h2>
              <div className="space-y-3">
                {resume.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                      <span>
                        {exp.jobTitle}{' '}
                        <span className="font-medium text-slate-600">
                          — {exp.company}
                        </span>
                      </span>
                      <span className="text-[11px] font-normal text-slate-500 font-mono">
                        {exp.startDate} – {exp.endDate || 'Present'}
                        {exp.location && ` | ${exp.location}`}
                      </span>
                    </div>
                    <ul
                      style={{
                        listStyleType: customization?.bulletStyle || 'disc',
                      }}
                      className="pl-5 space-y-1 text-xs text-slate-700"
                    >
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {resume.skills.length > 0 && (
            <div style={{ marginBottom: `${customization?.sectionSpacing || 14}px` }}>
              <h2
                style={{
                  color: customization?.headingColor || '#0F172A',
                  borderColor: customization?.accentColor || '#0D9488',
                }}
                className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2"
              >
                Skills &amp; Proficiencies
              </h2>
              <div className="space-y-1.5 text-xs">
                {resume.skills.map((s, idx) => (
                  <div key={idx} className="flex">
                    <span className="font-bold text-slate-900 w-36 shrink-0">
                      {s.category}:
                    </span>
                    <span className="text-slate-700">{s.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div style={{ marginBottom: `${customization?.sectionSpacing || 14}px` }}>
              <h2
                style={{
                  color: customization?.headingColor || '#0F172A',
                  borderColor: customization?.accentColor || '#0D9488',
                }}
                className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2"
              >
                Technical Projects
              </h2>
              <div className="space-y-2">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{proj.title}</span>
                      {proj.url && (
                        <span className="text-[11px] text-teal-700 font-mono underline">
                          {proj.url.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {proj.technologies?.length > 0 && (
                      <p className="text-[11px] text-slate-500 font-mono">
                        Tech Stack: {proj.technologies.join(', ')}
                      </p>
                    )}
                    {proj.bulletPoints?.map((b, bIdx) => (
                      <p key={bIdx} className="text-slate-700 pl-3">
                        • {b}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.educations.length > 0 && (
            <div style={{ marginBottom: `${customization?.sectionSpacing || 14}px` }}>
              <h2
                style={{
                  color: customization?.headingColor || '#0F172A',
                  borderColor: customization?.accentColor || '#0D9488',
                }}
                className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2"
              >
                Education
              </h2>
              <div className="space-y-2">
                {resume.educations.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-xs">
                    <div>
                      <p className="font-bold text-slate-900">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-slate-600">
                        {edu.institution}
                        {edu.gradeOrCgpa && ` • ${edu.gradeOrCgpa}`}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Achievements */}
          {resume.certifications?.length > 0 && (
            <div>
              <h2
                style={{
                  color: customization?.headingColor || '#0F172A',
                  borderColor: customization?.accentColor || '#0D9488',
                }}
                className="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2"
              >
                Certifications &amp; Credentials
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                {resume.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <span>
                      <strong>{cert.name}</strong> — {cert.issuer}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Page Boundary Tag */}
          <div className="absolute bottom-2 right-4 text-[9px] font-mono text-slate-400 select-none print:hidden">
            Page 1 of 1 • Prepresume ATS Verified
          </div>
        </div>
      </div>
    </div>
  );
}
