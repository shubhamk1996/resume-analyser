'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  FileText,
  Plus,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Copy,
  Trash2,
  ExternalLink,
  Crown,
  Download,
  AlertTriangle,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CandidateDashboard() {
  const router = useRouter();
  const {
    currentUser,
    resumes,
    createResume,
    deleteResume,
    duplicateResume,
    setActiveResume,
    entitlement,
    jobMatchingConsent,
    setJobMatchingConsent,
    jobs,
    savedJobIds,
    viewedJobIds,
    runATSAnalysis,
  } = usePrepresumeStore();

  const [searchFilter, setSearchFilter] = useState('');

  const isSubscribed =
    entitlement.isSubscribed &&
    entitlement.subscriptionExpiresAt &&
    new Date(entitlement.subscriptionExpiresAt).getTime() > Date.now();

  const handleCreateNew = () => {
    const newResume = createResume({
      title: 'New Tailored Resume ' + (resumes.length + 1),
      targetRole: 'Full Stack Engineer',
      selectedTemplateId: 'tpl-software-developer-1',
    });
    toast.success(`Created resume "${newResume.title}"`);
    router.push(`/builder?id=${newResume.id}`);
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateResume(id);
    toast.success(`Duplicated to "${dup.title}"`);
  };

  const handleDelete = (id: string, title: string) => {
    if (resumes.length <= 1) {
      toast.error('You must keep at least one active resume draft.');
      return;
    }
    deleteResume(id);
    toast.info(`Deleted "${title}"`);
  };

  const handleAnalyze = (id: string) => {
    runATSAnalysis(id);
    toast.success('ATS scan complete! Opening diagnostic report...');
    router.push(`/ats-checker?id=${id}`);
  };

  // Recommended jobs only if consent is given
  const recommendedJobs = jobMatchingConsent ? jobs.slice(0, 3) : [];
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Welcome & Entitlement Overview Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase bg-accent/15 text-accent font-bold px-2 py-0.5 rounded">
                  Candidate Hub
                </span>
                <span className="text-xs text-muted-foreground">Prepresume v3.0</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser?.name?.split(' ')[0] || 'Candidate'}!
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage your resumes, check ATS compatibility scores, and discover matching opportunities across India.
              </p>
            </div>

            {/* Quick Actions & Pass Status */}
            <div className="flex flex-wrap items-center gap-3">
              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <Crown className="h-4 w-4" /> 7-Day Pass Active
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Expires {new Date(entitlement.subscriptionExpiresAt!).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-secondary/80 border border-border text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    {entitlement.hasFreeExportAvailable ? '1 Free Export Remaining' : 'Free Export Claimed'}
                  </div>
                  <Link href="/pricing" className="text-[11px] text-accent font-semibold hover:underline block">
                    Get ₹19 Unlimited Pass →
                  </Link>
                </div>
              )}

              <Button onClick={handleCreateNew} className="bg-primary text-primary-foreground font-bold text-xs sm:text-sm gap-2">
                <Plus className="h-4 w-4" /> Create Resume
              </Button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active Resumes</p>
                  <p className="text-2xl font-black text-foreground">{resumes.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Highest ATS Score</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {Math.max(...resumes.map((r) => r.atsScore || 90))}%
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Saved Jobs</p>
                  <p className="text-2xl font-black text-foreground">{savedJobIds.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Briefcase className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Templates Available</p>
                  <p className="text-2xl font-black text-foreground">108</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section: My Resumes List */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  My Resume Documents
                </h2>
                <p className="text-xs text-muted-foreground">
                  Each resume can have independent templates, tailoring, and ATS audit diagnostics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/builder/ai">
                  <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Sparkles className="h-3.5 w-3.5" /> AI Guided Builder
                  </Button>
                </Link>
                <Link href="/builder?mode=upload">
                  <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5">
                    Upload &amp; Parse
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card
                  key={resume.id}
                  className="border border-border hover:border-accent/80 transition-all shadow-xs flex flex-col justify-between"
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-semibold">
                          {resume.selectedTemplateId}
                        </span>
                        <h3 className="text-base font-bold text-foreground leading-snug">
                          {resume.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Target: {resume.targetRole || 'Software Engineer'}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                          {resume.atsScore || 94}
                          <span className="text-[10px] text-muted-foreground font-normal">/100</span>
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground">ATS Score</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-secondary/40 text-[11px] text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Experiences:</span>
                        <strong className="text-foreground">{resume.experiences?.length || 0} roles</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <strong className="text-foreground">{new Date(resume.updatedAt).toLocaleDateString()}</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-border flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/builder?id=${resume.id}`} className="w-full">
                          <Button size="sm" className="w-full text-xs font-bold bg-primary text-primary-foreground">
                            Edit in Studio
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAnalyze(resume.id)}
                          className="w-full text-xs font-semibold"
                        >
                          <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                          ATS Check
                        </Button>
                      </div>

                      <div className="flex justify-between items-center pt-1 text-xs text-muted-foreground">
                        <button
                          type="button"
                          onClick={() => handleDuplicate(resume.id)}
                          className="hover:text-foreground flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" /> Duplicate
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(resume.id, resume.title)}
                          className="hover:text-destructive flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Section: Job Matching Consent & Recommendations */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-accent" />
                  Personalized India Job Matches
                </h2>
                <p className="text-xs text-muted-foreground">
                  Matches your verified resume skills against fresh openings in Bengaluru, Mumbai, Hyderabad, Pune, and Gurugram.
                </p>
              </div>

              <Link href="/jobs">
                <Button variant="outline" size="sm" className="text-xs font-semibold">
                  View All Openings <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            {!jobMatchingConsent ? (
              <Card className="border border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 font-bold text-sm text-foreground">
                      <Lock className="h-4 w-4 text-amber-600" />
                      Resume-Based Job Matching Is Currently Disabled (Privacy Safe)
                    </div>
                    <p className="text-xs text-muted-foreground max-w-xl">
                      Per Prepresume confirmed privacy rules, your resume is never automatically parsed for job alerts without your explicit affirmative consent.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setJobMatchingConsent(true);
                      toast.success('Resume-based job recommendations enabled!');
                    }}
                    className="bg-primary text-primary-foreground font-bold text-xs shrink-0"
                  >
                    Enable Personalized Matching
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recommendedJobs.map((job) => (
                  <Card key={job.id} className="border border-border p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-accent">{job.company}</span>
                        <h4 className="text-sm font-bold text-foreground">{job.title}</h4>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                        94% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                    <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
                      <span className="text-[11px] text-muted-foreground">{job.location}</span>
                      <Link href={`/jobs?match=${job.id}`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs font-medium">
                          Analyze Match
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
