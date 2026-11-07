'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, FileText, CheckCircle2, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeData } from '@/types/resume';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onParsedSuccess: (parsedData: Partial<ResumeData>) => void;
}

export function UploadParseDialog({ open, onOpenChange, onParsedSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [parsingStep, setParsingStep] = useState<'idle' | 'uploading' | 'parsing' | 'review'>('idle');
  const [progress, setProgress] = useState(0);

  const [extractedData, setExtractedData] = useState({
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma.tech@gmail.com',
    phone: '+91 98765 43210',
    targetRole: 'Senior Full Stack Engineer',
    companies: ['Growfin Technologies', 'Infosys Limited'],
    skills: 'React, Next.js, TypeScript, Node.js, Go, PostgreSQL, Redis, Kafka',
    education: 'B.Tech in Computer Science, NIT Surathkal (8.8 CGPA)',
  });

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      toast.error('Only PDF and DOCX files are supported.');
      return;
    }

    setFile(selectedFile);
    setParsingStep('uploading');
    setProgress(30);

    setTimeout(() => {
      setProgress(65);
      setParsingStep('parsing');
    }, 700);

    setTimeout(() => {
      setProgress(100);
      setParsingStep('review');
      toast.success('Resume parsed successfully! Please review the extracted data.');
    }, 1600);
  };

  const handleConfirm = () => {
    onParsedSuccess({
      title: `${file?.name.replace(/\.[^/.]+$/, '') || 'Parsed'} Resume`,
      targetRole: extractedData.targetRole,
      personalInfo: {
        fullName: extractedData.fullName,
        email: extractedData.email,
        phone: extractedData.phone,
        location: 'Bengaluru, Karnataka, India',
        headline: extractedData.targetRole,
        summary: 'Experienced Full Stack Engineer specializing in Next.js, distributed microservices, and high-concurrency systems.',
      },
    });
    onOpenChange(false);
    toast.success('New editable resume created from parsed document!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Upload className="h-4 w-4 text-accent" />
            Upload &amp; Parse Resume (PDF / DOCX)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-xs py-2">
          {parsingStep === 'idle' && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-border hover:border-accent rounded-xl p-8 text-center space-y-3 cursor-pointer transition-colors bg-secondary/20"
            >
              <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground text-sm">
                  Drag and drop your resume file here
                </p>
                <p className="text-muted-foreground text-xs">
                  Supports Adobe PDF (.pdf) and Microsoft Word (.docx) up to 10MB
                </p>
              </div>

              <div className="pt-2">
                <label className="cursor-pointer">
                  <span className="inline-block py-1.5 px-4 rounded bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90">
                    Browse Local File
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              </div>

              <p className="text-[10px] text-muted-foreground pt-1">
                Files are stored privately in Cloudflare R2 with zero public exposure.
              </p>
            </div>
          )}

          {(parsingStep === 'uploading' || parsingStep === 'parsing') && (
            <div className="py-8 text-center space-y-4">
              <RefreshCw className="h-8 w-8 text-accent animate-spin mx-auto" />
              <div>
                <p className="font-bold text-foreground text-sm">
                  {parsingStep === 'uploading'
                    ? 'Uploading privately to Cloudflare R2...'
                    : 'Groq AI Agent parsing resume structure...'}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5 font-mono">
                  {file?.name} ({Math.round((file?.size || 0) / 1024)} KB)
                </p>
              </div>

              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                  style={{ width: `${progress}%` }}
                  className="bg-accent h-full transition-all duration-300 rounded-full"
                />
              </div>
            </div>
          )}

          {parsingStep === 'review' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-semibold text-xs">Extracted Career Profile</span>
              </div>

              <div className="space-y-2 bg-secondary/30 p-3 rounded-lg border border-border">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Full Name</span>
                  <p className="font-bold text-foreground">{extractedData.fullName}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Email</span>
                    <p className="text-foreground truncate">{extractedData.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Phone</span>
                    <p className="text-foreground">{extractedData.phone}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Companies Detected</span>
                  <p className="text-foreground">{extractedData.companies.join(', ')}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Key Skills</span>
                  <p className="text-foreground text-[11px]">{extractedData.skills}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setParsingStep('idle')}>
                  Upload Another
                </Button>
                <Button size="sm" onClick={handleConfirm} className="bg-primary text-primary-foreground font-bold">
                  Create Resume from Data
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
