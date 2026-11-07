'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Upload,
  MessageSquare,
  Sliders,
  AlertTriangle,
  Zap,
  HelpCircle,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { RESUME_TEMPLATES } from '@/data/templates';
import { MOCK_JOBS } from '@/data/mock-jobs';

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const categories = ['All', 'Software Developer', 'Technical', 'Data Analyst', 'Fresher', 'Executive', 'Product'];

  const previewTemplates = RESUME_TEMPLATES.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory || (selectedCategory === 'Product' && t.category === 'Management')
  ).slice(0, 6);

  const faqs = [
    {
      q: 'How does the ₹19 subscription pass work?',
      a: 'The ₹19 pass (+ applicable 18% GST = ₹22.42 total) grants unmetered, unlimited access to all 108+ ATS resume templates, PDF and DOCX export downloads, conversational AI resume generation, and India job matching for 7 consecutive days. It is a strictly manual repurchase. We never store card details and there is NO automatic renewal or hidden recurring charge.',
    },
    {
      q: 'What is the 1-time lifetime free export entitlement?',
      a: 'Every registered account on Prepresume receives one completely free document export (PDF or DOCX) in their account lifetime without needing to enter any payment details. Once you download your first completed resume, subsequent downloads require the ₹19 / 7-day pass or an active subscription.',
    },
    {
      q: 'Why does Prepresume require explicit consent for job matching?',
      a: 'In accordance with Indian privacy standards, your resume content is your private professional property. We never automatically share or index your resume for job recommendations unless you specifically toggle "Enable Resume-Based Job Matching" in your dashboard. You can revoke consent at any time.',
    },
    {
      q: 'Does an ATS score guarantee an interview with an employer?',
      a: 'No. ATS algorithms (such as Workday, Taleo, Greenhouse, or Lever) evaluate document structure, readability, and keyword density. While Prepresume templates and audits are engineered to ensure high parsing accuracy and readability by software, actual interview decisions depend entirely on employer hiring requirements and human recruiter evaluations.',
    },
    {
      q: 'Can I upload my existing PDF or DOCX resume?',
      a: 'Yes. Prepresume includes an intelligent AI Resume Parser that extracts your work experience, education, skills, and projects from your uploaded file into an editable master profile, allowing you to switch templates in seconds.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent/20 selection:text-accent">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-border/60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Top Trust Pills */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card shadow-xs text-xs font-medium text-muted-foreground">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-foreground font-semibold">Engineered for Indian Tech & Corporate Careers</span>
                <span className="text-border">|</span>
                <span className="text-accent font-semibold">108+ ATS Certified Templates</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Build Resumes That Pass <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-700 dark:from-teal-400 dark:via-cyan-300 dark:to-sky-400">
                  Real Recruiter ATS Filters.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Stop losing interviews to unparseable graphics. Create structured, high-impact resumes with dual-pane conversational AI, 1-click ATS scoring, and verified Indian job opportunities.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link href="/builder" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-md gap-2">
                    <FileText className="h-5 w-5" />
                    Create Your Resume
                  </Button>
                </Link>

                <Link href="/templates" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6 border-border hover:bg-secondary font-semibold text-base gap-2">
                    <Layers className="h-5 w-5 text-accent" />
                    Explore 108+ Templates
                  </Button>
                </Link>
              </div>

              {/* Micro-guarantee info */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  1 Lifetime Free Document Export
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ₹19 / 7-Day Pass (No Auto-Renew)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  PDF & Word DOCX Native Downloads
                </span>
              </div>
            </div>

            {/* Interactive Hero Visual Showcase */}
            <div className="mt-14 max-w-5xl mx-auto rounded-xl border border-border/80 bg-card p-3 sm:p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-3 px-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground hidden sm:inline">
                    prepresume-studio://live-ats-engine
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs">
                    ATS Score: 96 / 100
                  </Badge>
                  <Badge variant="outline" className="bg-secondary text-foreground text-xs">
                    Workday & Greenhouse Safe
                  </Badge>
                </div>
              </div>

              {/* 3-way Preview Container */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
                {/* Left Mini Intake */}
                <div className="md:col-span-4 bg-secondary/50 rounded-lg p-4 border border-border/60 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <Sparkles className="h-4 w-4 text-accent" />
                    Conversational AI Assistant
                  </div>
                  <div className="bg-background rounded p-2.5 text-muted-foreground border border-border">
                    <p className="font-semibold text-foreground text-[11px] mb-1">AI Prompt:</p>
                    &ldquo;I worked as a frontend engineer at Swiggy for 2 years optimizing web apps.&rdquo;
                  </div>
                  <div className="bg-accent/10 text-foreground rounded p-2.5 border border-accent/20">
                    <p className="font-semibold text-accent text-[11px] mb-1">Optimized Output (XYZ Formula):</p>
                    &ldquo;Architected consumer checkout microfrontends using Next.js & TypeScript, cutting initial LCP from 3.2s to 1.4s for 4M+ daily users.&rdquo;
                  </div>
                  <div className="pt-1">
                    <Link href="/builder/ai">
                      <Button size="sm" variant="outline" className="w-full text-xs font-semibold border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        Try Conversational Builder
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Center A4 Document Mockup */}
                <div className="md:col-span-8 bg-card rounded-lg p-5 border border-border shadow-xs text-xs space-y-3 font-sans">
                  <div className="border-b border-border pb-3 flex justify-between items-start">
                    <div>
                      <h2 className="text-base font-extrabold tracking-tight text-foreground">
                        AARAV SHARMA
                      </h2>
                      <p className="text-muted-foreground text-[11px]">
                        Senior Full Stack Engineer • Bengaluru, India • +91 98765 43210 • aarav.sharma.tech@gmail.com
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-bold">
                      100% Parsable
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-0.5 mb-1.5">
                      Professional Summary
                    </h3>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      High-impact Full Stack Engineer with 4+ years of experience scaling consumer web platforms. Specialized in Next.js, React, Node.js, and low-latency microservices with verified sub-2.0s web vitals.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-0.5 mb-1.5">
                      Work Experience
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-semibold text-foreground">
                        <span>Growfin Technologies — Senior Full Stack Engineer</span>
                        <span className="text-muted-foreground text-[10px]">2023 - Present | Bengaluru</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
                        <li>Architected real-time merchant onboarding portal with Next.js, reducing drop-off rates by 28%.</li>
                        <li>Built event processing pipelines with Node.js and PostgreSQL, processing 3.5M+ daily ledger transactions.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[11px] text-muted-foreground border-t border-border">
                    <span>Export Formats: <strong>PDF (Vector selectable)</strong> &amp; <strong>DOCX (Word OpenXML)</strong></span>
                    <Link href="/builder" className="text-accent font-semibold hover:underline flex items-center gap-1">
                      Open in Full 3-Panel Editor <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 CREATION MODES */}
        <section className="py-16 md:py-24 bg-secondary/30 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="outline" className="border-accent text-accent">
                Module 6 &amp; 9
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                Three Flexible Ways to Build Your Resume
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Whether you have an existing resume, want structured forms, or prefer natural conversational AI prompts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mode 1 */}
              <Card className="border border-border/80 hover:border-accent/60 transition-all shadow-xs">
                <CardContent className="p-6 space-y-4">
                  <div className="h-11 w-11 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">1. Upload &amp; Intelligent Parse</h3>
                    <p className="text-xs text-muted-foreground mt-1">PDF &amp; DOCX Parsing via AI Agent</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Upload your current resume. Our dedicated AI Parser securely extracts work experiences, education, and skills into your editable Master Profile.
                  </p>
                  <Link href="/builder?mode=upload" className="inline-block pt-2">
                    <Button variant="outline" size="sm" className="font-semibold text-xs gap-1.5">
                      Upload Existing Resume <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Mode 2 */}
              <Card className="border border-border/80 hover:border-accent/60 transition-all shadow-xs">
                <CardContent className="p-6 space-y-4">
                  <div className="h-11 w-11 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Sliders className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">2. Manual Form Builder</h3>
                    <p className="text-xs text-muted-foreground mt-1">Structured 3-Panel Document Studio</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Granular control over each section. Add, reorder, hide or duplicate experiences, projects, certifications, and custom sections with real-time A4 preview.
                  </p>
                  <Link href="/builder" className="inline-block pt-2">
                    <Button variant="outline" size="sm" className="font-semibold text-xs gap-1.5">
                      Open Form Builder <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Mode 3 */}
              <Card className="border border-border/80 hover:border-accent/60 transition-all shadow-xs bg-card relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent px-2 py-0.5 rounded border border-accent/20">
                    AI Powered
                  </span>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="h-11 w-11 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">3. Conversational AI Builder</h3>
                    <p className="text-xs text-muted-foreground mt-1">Dual-Pane Guided Interview</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Chat with our guided AI career interviewer. It asks contextual questions about your projects and responsibilities, populating your resume in real time.
                  </p>
                  <Link href="/builder/ai" className="inline-block pt-2">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs gap-1.5">
                      Start Guided Chat <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ATS CHECKER DEMO SECTION */}
        <section className="py-16 md:py-24 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-5">
                <Badge variant="outline" className="border-accent text-accent">
                  Module 13 &amp; 14
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  Instant ATS Compatibility &amp; Keyword Audit
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Most candidates get filtered out before a human recruiter even sees their resume. Our ATS Analyzer scans your resume against corporate applicant tracking systems (Workday, Taleo, Lever, Greenhouse).
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Parsing Safety Verification</p>
                      <p className="text-xs text-muted-foreground">Detects non-standard fonts, broken column reading orders, and invisible table borders.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Impact &amp; Metric Scoring</p>
                      <p className="text-xs text-muted-foreground">Flags passive bullet points and suggests quantified metric rewrites.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Role Keyword Density</p>
                      <p className="text-xs text-muted-foreground">Recommends missing industry skills and terms tailored for Indian job postings.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/ats-checker">
                    <Button size="lg" className="bg-primary text-primary-foreground font-bold text-sm gap-2">
                      <ShieldCheck className="h-4 w-4" /> Run Free ATS Check
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right ATS Audit Graphic */}
              <div className="lg:col-span-7 bg-card rounded-xl border border-border p-6 shadow-md space-y-5">
                <div className="flex items-center justify-between border-b border-border/80 pb-4">
                  <div>
                    <h3 className="font-bold text-base text-foreground">ATS Compatibility Diagnostic</h3>
                    <p className="text-xs text-muted-foreground">Scanned with Prepresume Groq Engine v3.4</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">94<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                    <span className="text-[11px] font-semibold text-emerald-600">Executive High</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/60">
                    <p className="text-xs text-muted-foreground">Structure</p>
                    <p className="text-lg font-bold text-foreground">98%</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/60">
                    <p className="text-xs text-muted-foreground">Keywords</p>
                    <p className="text-lg font-bold text-foreground">92%</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/60">
                    <p className="text-xs text-muted-foreground">Formatting</p>
                    <p className="text-lg font-bold text-foreground">96%</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/60">
                    <p className="text-xs text-muted-foreground">Impact</p>
                    <p className="text-lg font-bold text-foreground">89%</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    Detected Issue: Bullet Point Lacks Measurable Impact
                  </div>
                  <p className="text-xs text-muted-foreground">
                    &ldquo;Developed UI components for enterprise clients&rdquo; lacks quantifiable metrics.
                  </p>
                  <div className="text-xs p-2 rounded bg-background border border-border text-foreground font-mono">
                    <strong className="text-emerald-600 font-sans">Recommended 1-Click Fix: </strong>
                    &ldquo;Developed 24+ reusable UI components used by 120,000+ branch employees, cutting sprint delivery times by 30%.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 108+ TEMPLATES GALLERY PREVIEW */}
        <section className="py-16 md:py-24 bg-secondary/30 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <Badge variant="outline" className="border-accent text-accent mb-2">
                  Module 10 &amp; 11
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                  108+ ATS-Friendly Resume Templates
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mt-1">
                  Single-column, linear semantic structures tested against modern parsing software. Customize fonts, colors, margins, and section spacing in real time.
                </p>
              </div>
              <Link href="/templates">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold text-xs sm:text-sm">
                  View All 108 Templates <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previewTemplates.map((t) => (
                <Card key={t.id} className="border border-border/80 hover:border-accent transition-all group overflow-hidden bg-card">
                  <div className="p-4 border-b border-border/60 bg-muted/40 flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground truncate">{t.name}</span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]">
                      {t.atsRating}% ATS
                    </Badge>
                  </div>
                  <CardContent className="p-5 space-y-4">
                    {/* Simulated Template Thumbnail */}
                    <div className="h-44 w-full rounded border border-border/70 bg-background p-3 flex flex-col justify-between text-[8px] text-muted-foreground select-none overflow-hidden group-hover:shadow-md transition-shadow">
                      <div className="space-y-1.5">
                        <div className="h-2 w-28 bg-foreground/80 rounded" />
                        <div className="h-1.5 w-40 bg-muted-foreground/40 rounded" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-16 bg-accent rounded" />
                        <div className="h-1 w-full bg-border rounded" />
                        <div className="h-1 w-5/6 bg-border rounded" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-20 bg-accent rounded" />
                        <div className="h-1 w-full bg-border rounded" />
                        <div className="h-1 w-4/5 bg-border rounded" />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {t.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-border/60">
                      <span className="text-[11px] font-mono text-muted-foreground">Category: {t.category}</span>
                      <Link href={`/builder?template=${t.id}`}>
                        <Button size="sm" className="h-8 text-xs font-semibold bg-primary text-primary-foreground">
                          Use Template
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* INDIA JOB DISCOVERY OVERVIEW */}
        <section className="py-16 md:py-24 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <Badge variant="outline" className="border-accent text-accent mb-2">
                  Module 16, 17 &amp; 18
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                  India-Focused Job Discovery (Rolling 72h)
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mt-1">
                  Discover verified opportunities across Bengaluru, Hyderabad, Pune, Mumbai, Gurugram, and Remote India. Match your verified resume skills with explicit privacy consent.
                </p>
              </div>
              <Link href="/jobs">
                <Button className="bg-primary text-primary-foreground font-semibold text-xs sm:text-sm">
                  Explore Tech Jobs <Briefcase className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_JOBS.slice(0, 3).map((job) => (
                <Card key={job.id} className="border border-border/80 hover:border-accent/60 transition-all p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-accent">{job.company}</span>
                        <h3 className="text-base font-bold text-foreground leading-snug">{job.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-secondary text-foreground">
                        {job.workplaceType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {job.experienceRange}
                      </span>
                    </div>

                    {job.salaryRange && (
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {job.salaryRange}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {job.requiredSkills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground text-[11px]">Verified Source: {job.source.split(' ')[0]}</span>
                    <Link href={`/jobs?highlight=${job.id}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs font-medium">
                        Match Resume
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-3.5 rounded-lg bg-secondary/40 border border-border/70 text-xs text-muted-foreground flex items-center justify-between">
              <span>Notice: Clicking an application link redirects to the official employer portal. Prepresume tracks clicks for your activity history and does not represent a submitted application.</span>
              <Link href="/legal/job-disclaimer" className="text-accent hover:underline shrink-0 ml-4">
                Disclaimer Details
              </Link>
            </div>
          </div>
        </section>

        {/* PRICING SECTION (₹19 / 7 DAYS) */}
        <section className="py-16 md:py-24 bg-secondary/30 border-b border-border/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <Badge variant="outline" className="border-accent text-accent">
                Module 18 &amp; 19 — Confirmed Pricing
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                Affordable, Transparent Pricing for Indian Candidates
              </h2>
              <p className="text-muted-foreground text-sm">
                No predatory auto-renewing subscriptions. Pay once, use everything for seven days, and manually repurchase only when you need it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Plan 1: Lifetime Free Export */}
              <Card className="border border-border/80 bg-card p-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Starter Entitlement
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">One-Time Free Export</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-foreground">₹0</span>
                      <span className="text-xs text-muted-foreground">/ lifetime per account</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Test the complete platform. Build, edit, analyze ATS score, and successfully download one full resume without entering any credit card or UPI info.
                  </p>

                  <ul className="space-y-2.5 text-xs text-muted-foreground pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      1 Successful PDF or Word DOCX Export
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      Full access to 108+ ATS-compliant templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      Basic ATS compatibility score audit
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      Master Career Profile storage on NeonDB
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link href="/builder">
                    <Button variant="outline" className="w-full font-bold text-sm">
                      Start with Free Export
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Plan 2: ₹19 7-Day Pass */}
              <Card className="border-2 border-accent bg-card p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl">
                  Recommended Pass
                </div>

                <div className="space-y-4">
                  <div className="inline-block text-xs font-bold uppercase tracking-wider text-accent">
                    7-Day Unlimited Career Pass
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">₹19 Unlimited Pass</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-foreground">₹19</span>
                      <span className="text-xs text-muted-foreground">+ ₹3.42 GST (18%) = ₹22.42 total</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Strictly manual repurchase — NO auto-renewal</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Designed for active job hunters applying across LinkedIn, Naukri, and career portals over a 1-week sprint.
                  </p>

                  <ul className="space-y-2.5 text-xs text-muted-foreground pt-2">
                    <li className="flex items-center gap-2 font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      Unlimited PDF &amp; DOCX downloads for 7 days
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      Groq AI Conversational Resume Builder
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      AI Resume Writing &amp; Metric Bullet Polisher
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      Deep ATS scoring &amp; 1-click issue auto-fix
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      Tailored Job Description Match Analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      Razorpay UPI, Debit &amp; Credit Cards supported
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link href="/pricing">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm shadow-md">
                      Get 7-Day Pass for ₹19
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 md:py-24 border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <Badge variant="outline" className="border-accent text-accent">
                Frequently Asked Questions
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                Everything You Need to Know
              </h2>
              <p className="text-muted-foreground text-sm">
                Transparent answers regarding payments, ATS software, AI accuracy, and privacy.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-border rounded-lg bg-card overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-foreground hover:bg-secondary/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeFaq === idx ? 'rotate-90 text-accent' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground text-center relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Build an Interview-Winning Resume?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Start with your 1-time free document export. No credit card required. Upgrade anytime to the ₹19 pass for 7 days of unmetered AI career tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/builder">
                <Button size="lg" className="bg-background text-foreground hover:bg-secondary font-bold text-base h-12 px-8 shadow-lg">
                  Launch Resume Studio
                </Button>
              </Link>
              <Link href="/ats-checker">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base h-12 px-6">
                  Check ATS Score
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
