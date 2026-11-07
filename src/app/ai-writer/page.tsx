'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sparkles,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
  Info,
  Sliders,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AIWriterPage() {
  const { resumes, activeResumeId, runJobMatch, updateResume } = usePrepresumeStore();
  const currentResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer');
  const [company, setCompany] = useState('Swiggy / Top Tech India');
  const [jobDescription, setJobDescription] = useState(
    `We are looking for a Senior Full Stack Engineer (3-6 years) to architect resilient microservices and high-throughput web frontends.
Required Skills: React, Next.js, TypeScript, Node.js, Go, PostgreSQL, Redis, AWS.
Preferred Skills: Kafka event streaming, Docker, Kubernetes, CI/CD pipelines.
Responsibilities: Design low-latency order checkout flows, reduce client-side LCP below 2s, lead sprint code reviews.`
  );

  const [matchResult, setMatchResult] = useState<any>(null);
  const [isMatching, setIsMatching] = useState(false);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setTimeout(() => {
      const res = runJobMatch(currentResume.id, jobTitle, jobDescription);
      setMatchResult(res);
      setIsMatching(false);
      toast.success('Job description analyzed and matched with verified profile!');
    }, 500);
  };

  const handleApplyTailoredSummary = () => {
    if (matchResult?.tailoredSummaryDraft) {
      updateResume(currentResume.id, {
        personalInfo: {
          ...currentResume.personalInfo,
          summary: matchResult.tailoredSummaryDraft,
        },
      });
      toast.success('Applied tailored executive summary to your resume draft!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-accent text-accent">
                  Module 12, 14 &amp; 15
                </Badge>
                <span className="text-xs text-muted-foreground">Groq AI Match Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                AI Resume Tailoring &amp; Job Description Matcher
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Paste any job description from LinkedIn, Naukri, or career portals to identify skill gaps and generate tailored bullets.
              </p>
            </div>

            <Link href="/builder">
              <Button size="sm" variant="outline" className="text-xs font-semibold gap-1.5 border-border">
                <Sliders className="h-3.5 w-3.5 text-accent" /> Open 3-Panel Editor
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input Form */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-accent" />
                    Target Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleMatch} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Target Role Title</label>
                      <Input
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Company Name</label>
                      <Input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Flipkart, Swiggy, Cred"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Job Description Text</label>
                      <Textarea
                        rows={8}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste responsibilities, required qualifications, and tools..."
                        required
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isMatching}
                      className="w-full bg-primary text-primary-foreground font-bold text-xs"
                    >
                      {isMatching ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
                          Matching against {currentResume.title}...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5 mr-2" /> Compare Resume &amp; Generate Tailored Suggestions
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Match Analysis Output */}
            <div className="lg:col-span-7 space-y-6">
              {!matchResult ? (
                <div className="h-full min-h-[350px] rounded-xl border border-dashed border-border bg-card flex flex-col items-center justify-center p-8 text-center space-y-3">
                  <Sparkles className="h-10 w-10 text-accent/60" />
                  <h3 className="font-bold text-foreground text-sm">No Job Description Analyzed Yet</h3>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Enter the job requirements on the left to extract skill overlap, identify missing ATS keywords, and get tailored bullet suggestions.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Score Dial */}
                  <Card className="border border-border p-5">
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Algorithmic Match Score
                        </span>
                        <h2 className="text-2xl font-black text-foreground mt-0.5">
                          {matchResult.jobTitle}
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                          {matchResult.matchScore}%
                        </span>
                        <span className="text-xs text-muted-foreground block font-semibold">
                          Relevance Overlap
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                          Matching Skills Verified ({matchResult.matchingSkills.length})
                        </span>
                        <p className="text-foreground text-[11px] font-medium">
                          {matchResult.matchingSkills.join(', ')}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">
                          Missing ATS Keywords ({matchResult.missingSkills.length})
                        </span>
                        <p className="text-foreground text-[11px] font-medium">
                          {matchResult.missingSkills.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Tailored Summary Draft */}
                  <Card className="border border-border p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" /> Tailored Executive Summary Draft
                      </span>
                      <Button
                        size="sm"
                        onClick={handleApplyTailoredSummary}
                        className="h-7 text-xs bg-accent text-accent-foreground font-bold hover:bg-accent/90"
                      >
                        Apply to Resume
                      </Button>
                    </div>

                    <p className="text-xs text-foreground bg-secondary/30 p-3 rounded-md border border-border leading-relaxed">
                      &ldquo;{matchResult.tailoredSummaryDraft}&rdquo;
                    </p>
                  </Card>

                  {/* Tailored Experience Bullet Suggestions */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Targeted Bullet Point Enhancements
                    </h3>

                    {matchResult.tailoredSuggestions.map((sug: any, idx: number) => (
                      <Card key={idx} className="border border-border p-4 space-y-2 text-xs">
                        <span className="text-[10px] font-bold text-accent">{sug.section}</span>
                        <div className="p-2.5 rounded bg-secondary/30 border border-border">
                          <span className="text-[10px] uppercase text-muted-foreground font-bold">Suggested Phrasing:</span>
                          <p className="text-foreground font-medium mt-0.5">&ldquo;{sug.tailored}&rdquo;</p>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          <strong>Why:</strong> {sug.reason}
                        </p>
                      </Card>
                    ))}
                  </div>

                  {/* Disclaimer */}
                  <div className="p-3 rounded-lg bg-secondary/40 text-[11px] text-muted-foreground flex items-start gap-2 border border-border">
                    <Info className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{matchResult.disclaimer}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
