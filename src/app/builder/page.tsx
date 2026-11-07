'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { usePrepresumeStore } from '@/lib/store';
import { ResumeStructurePanel } from '@/components/builder/resume-structure-panel';
import { ResumeA4Preview } from '@/components/builder/resume-a4-preview';
import { AIAssistantPanel } from '@/components/builder/ai-assistant-panel';
import { TemplateCustomizerDialog } from '@/components/builder/template-customizer-dialog';
import { UploadParseDialog } from '@/components/builder/upload-parse-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Download,
  Palette,
  Upload,
  ChevronDown,
  Layers,
  Save,
  CheckCircle2,
  Printer,
  Crown,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';

function ResumeBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get('id');
  const modeParam = searchParams.get('mode');

  const {
    resumes,
    activeResumeId,
    setActiveResume,
    updateResume,
    updateResumeCustomization,
    createResume,
    checkExportPermission,
    consumeFreeExport,
  } = usePrepresumeStore();

  const currentResume =
    resumes.find((r) => r.id === (resumeIdParam || activeResumeId)) || resumes[0];

  const [zoom, setZoom] = useState(85);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(modeParam === 'upload');
  const [selectedFieldForAI, setSelectedFieldForAI] = useState<{
    section: string;
    title: string;
    content: string;
  } | null>(null);

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  useEffect(() => {
    if (resumeIdParam && resumeIdParam !== activeResumeId) {
      setActiveResume(resumeIdParam);
    }
  }, [resumeIdParam, activeResumeId, setActiveResume]);

  const handleResumeChange = (updates: any) => {
    setSaveStatus('saving');
    updateResume(currentResume.id, updates);
    setTimeout(() => {
      setSaveStatus('saved');
    }, 300);
  };

  const handleExport = (format: 'pdf' | 'docx') => {
    const perm = checkExportPermission();

    if (!perm.allowed) {
      toast.error(perm.reason || 'Export requires an active pass.');
      router.push('/pricing');
      return;
    }

    if (perm.isFreeExport) {
      const consumed = consumeFreeExport(currentResume.title);
      if (consumed) {
        toast.success('Congratulations! Consumed your 1-time lifetime free document export.');
      }
    } else {
      toast.success('Exporting with your active ₹19 pass...');
    }

    if (format === 'pdf') {
      window.print();
    } else {
      // Generate Word DOCX format
      const docxContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>${currentResume.title}</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.3; }
          h1 { font-size: 18pt; text-transform: uppercase; color: #0F172A; }
          h2 { font-size: 12pt; text-transform: uppercase; border-bottom: 2px solid #0D9488; color: #0F172A; }
          .meta { color: #64748B; font-size: 9.5pt; }
        </style>
        </head>
        <body>
          <h1>${currentResume.personalInfo.fullName}</h1>
          <p class="meta">${currentResume.personalInfo.email} | ${currentResume.personalInfo.phone} | ${currentResume.personalInfo.location}</p>
          <h2>Professional Summary</h2>
          <p>${currentResume.personalInfo.summary || ''}</p>
          <h2>Work Experience</h2>
          ${currentResume.experiences.map((e) => `<div><strong>${e.jobTitle}</strong> - ${e.company} (${e.startDate} - ${e.endDate || 'Present'})<ul>${e.bulletPoints.map((b) => `<li>${b}</li>`).join('')}</ul></div>`).join('')}
          <h2>Education</h2>
          ${currentResume.educations.map((ed) => `<p><strong>${ed.degree}</strong>, ${ed.institution} (${ed.startDate} - ${ed.endDate})</p>`).join('')}
          <h2>Skills</h2>
          ${currentResume.skills.map((s) => `<p><strong>${s.category}:</strong> ${s.skills.join(', ')}</p>`).join('')}
        </body>
        </html>
      `;
      const blob = new Blob([docxContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentResume.title.replace(/\s+/g, '_')}.doc`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Downloaded Word document (.doc) successfully!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      {/* Builder Sub-Header Controls */}
      <div className="h-14 border-b border-border bg-card px-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          {/* Resume Switcher Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs font-semibold gap-1.5 border-border">
                <FileText className="h-3.5 w-3.5 text-accent" />
                <span className="max-w-[140px] truncate">{currentResume.title}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 text-xs">
              {resumes.map((r) => (
                <DropdownMenuItem
                  key={r.id}
                  onClick={() => setActiveResume(r.id)}
                  className={`cursor-pointer ${r.id === currentResume.id ? 'font-bold text-accent' : ''}`}
                >
                  {r.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Save Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono hidden sm:flex">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>{saveStatus === 'saved' ? 'Auto-Saved' : 'Saving...'}</span>
          </div>
        </div>

        {/* Center / Right Control Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setUploadOpen(true)}
            className="h-8 text-xs font-semibold gap-1.5 border-border"
          >
            <Upload className="h-3.5 w-3.5 text-blue-600" />
            Upload &amp; Parse
          </Button>

          <Link href={`/ats-checker?id=${currentResume.id}`}>
            <Button size="sm" variant="outline" className="h-8 text-xs font-semibold gap-1.5 border-border">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              ATS Audit ({currentResume.atsScore || 94}%)
            </Button>
          </Link>

          <Link href="/builder/ai">
            <Button size="sm" variant="outline" className="h-8 text-xs font-semibold gap-1.5 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Guided AI Chat
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={() => handleExport('pdf')}
            className="h-8 text-xs font-bold bg-primary text-primary-foreground gap-1.5 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF / DOCX
          </Button>
        </div>
      </div>

      {/* THREE-PANEL STUDIO CANVAS */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-120px)] overflow-hidden">
        {/* LEFT PANEL: RESUME STRUCTURE */}
        <div className="hidden md:block md:col-span-3 h-full overflow-hidden">
          <ResumeStructurePanel
            resume={currentResume}
            onChange={handleResumeChange}
            onSelectFieldForAI={(field) => setSelectedFieldForAI(field)}
          />
        </div>

        {/* CENTER PANEL: LIVE A4 PREVIEW */}
        <div className="col-span-12 md:col-span-6 h-full overflow-hidden">
          <ResumeA4Preview
            resume={currentResume}
            zoom={zoom}
            onZoomChange={setZoom}
            onOpenCustomizer={() => setCustomizerOpen(true)}
            onExport={handleExport}
          />
        </div>

        {/* RIGHT PANEL: AI ASSISTANT */}
        <div className="hidden md:block md:col-span-3 h-full overflow-hidden">
          <AIAssistantPanel
            selectedField={selectedFieldForAI}
            onApplyChange={(newVal) => {
              if (selectedFieldForAI?.section === 'Professional Summary') {
                handleResumeChange({
                  personalInfo: { ...currentResume.personalInfo, summary: newVal },
                });
              } else {
                // Apply to first bullet of first experience
                const expCopy = [...currentResume.experiences];
                if (expCopy[0] && expCopy[0].bulletPoints[0]) {
                  expCopy[0].bulletPoints[0] = newVal;
                  handleResumeChange({ experiences: expCopy });
                }
              }
            }}
            onClose={() => setSelectedFieldForAI(null)}
          />
        </div>
      </main>

      {/* Style Customizer Dialog */}
      <TemplateCustomizerDialog
        open={customizerOpen}
        onOpenChange={setCustomizerOpen}
        customization={currentResume.customization}
        onUpdate={(updates) => updateResumeCustomization(currentResume.id, updates)}
      />

      {/* Upload Parser Dialog */}
      <UploadParseDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onParsedSuccess={(data) => {
          createResume(data);
        }}
      />
    </div>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading Prepresume Studio...</div>}>
      <ResumeBuilderContent />
    </Suspense>
  );
}
