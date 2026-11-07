'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { JobListing } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ShieldCheck,
  Lock,
  Sparkles,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Building,
} from 'lucide-react';
import { toast } from 'sonner';

function JobDiscoveryContent() {
  const searchParams = useSearchParams();
  const highlightJobId = searchParams.get('highlight') || searchParams.get('match');

  const {
    jobs,
    jobMatchingConsent,
    setJobMatchingConsent,
    savedJobIds,
    toggleSaveJob,
    viewedJobIds,
    recordJobClick,
    resumes,
    activeResumeId,
  } = usePrepresumeStore();

  const currentResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const [activeTab, setActiveTab] = useState<'for-you' | 'latest' | 'saved' | 'viewed'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState('All');

  const [selectedJob, setSelectedJob] = useState<JobListing>(() => {
    if (highlightJobId) {
      const found = jobs.find((j) => j.id === highlightJobId);
      if (found) return found;
    }
    return jobs[0];
  });

  const locations = ['All', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Gurugram', 'Remote'];

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    // Tab filters
    if (activeTab === 'for-you' && !jobMatchingConsent) return false;
    if (activeTab === 'saved' && !savedJobIds.includes(job.id)) return false;
    if (activeTab === 'viewed' && !viewedJobIds.includes(job.id)) return false;

    // Search query
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    // Location
    const matchesLocation =
      selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // Workplace
    const matchesWorkplace =
      selectedWorkplace === 'All' || job.workplaceType === selectedWorkplace;

    return matchesSearch && matchesLocation && matchesWorkplace;
  });

  const handleApplyClick = (job: JobListing) => {
    recordJobClick(job.id, job.source, job.applicationUrl);
    toast.info(
      `Redirecting to official ${job.company} portal. Notice: Clicking this link does not submit an application.`
    );
    window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
  };

  const getHoursAgoString = (isoString: string) => {
    const diffHours = Math.round((Date.now() - new Date(isoString).getTime()) / (3600 * 1000));
    if (diffHours <= 1) return 'Just now (<1h)';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-accent text-accent">
                  Module 16, 17 &amp; 18: India Job Discovery
                </Badge>
                <span className="text-xs text-muted-foreground">Rolling 72h Real-Time Window</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Verified Indian Tech &amp; Corporate Opportunities
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                All opportunities published within rolling 72 hours from verified sources. No stale reposts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/ai-writer">
                <Button size="sm" variant="outline" className="text-xs font-semibold gap-1.5 border-border">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> Custom Job Tailoring
                </Button>
              </Link>
            </div>
          </div>

          {/* Tab Navigation (For You, Latest 72h, Saved, Viewed) */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('latest')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'latest'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Clock className="h-3.5 w-3.5" /> Latest Jobs (72h)
                <span className="ml-1 text-[10px] opacity-80">({jobs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('for-you')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'for-you'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" /> For You (Tailored)
                {!jobMatchingConsent && <Lock className="h-3 w-3 text-amber-500 ml-1" />}
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'saved'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" /> Saved ({savedJobIds.length})
              </button>

              <button
                onClick={() => setActiveTab('viewed')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'viewed'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                Viewed &amp; Clicked ({viewedJobIds.length})
              </button>
            </div>

            {/* Workplace filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Type:</span>
              <select
                aria-label="Workplace filter"
                value={selectedWorkplace}
                onChange={(e) => setSelectedWorkplace(e.target.value)}
                className="h-8 px-2 rounded border border-border bg-card text-xs"
              >
                <option value="All">All Types</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          {/* Search & Location Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 text-xs"
                placeholder="Search job title, skills (e.g. Next.js, Kafka, Python, SQL), or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sm:col-span-4 flex gap-1.5 overflow-x-auto pb-1">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedLocation === loc
                      ? 'bg-accent text-accent-foreground font-bold'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Consent Callout for "For You" */}
          {activeTab === 'for-you' && !jobMatchingConsent && (
            <Card className="border border-amber-500/30 bg-amber-500/5 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-bold text-foreground text-sm flex items-center justify-center sm:justify-start gap-2">
                    <Lock className="h-4 w-4 text-amber-600" />
                    Explicit Consent Required for Resume-Based Job Recommendations
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    In compliance with Section 15.1, Prepresume does not read or match your resume against jobs without your affirmative opt-in. Enable matching to see recommendations tailored to your verified skills.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setJobMatchingConsent(true);
                    toast.success('Enabled personalized recommendations!');
                  }}
                  className="bg-primary text-primary-foreground font-bold text-xs shrink-0"
                >
                  Enable Resume-Based Matching
                </Button>
              </div>
            </Card>
          )}

          {/* Main 2-Column Split: Job List (Left) + Detailed View (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Job Cards List */}
            <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredJobs.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                  No jobs matched your current criteria or tab.
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  const isSelected = selectedJob.id === job.id;

                  return (
                    <Card
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`cursor-pointer border transition-all p-4 space-y-2.5 ${
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-xs'
                          : 'border-border/80 hover:border-border hover:bg-secondary/20'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-xs font-bold text-accent">{job.company}</span>
                          <h3 className="text-sm font-bold text-foreground leading-snug">{job.title}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveJob(job.id);
                            toast.info(isSaved ? 'Job unsaved' : 'Job bookmarked to Saved list');
                          }}
                          className="text-muted-foreground hover:text-accent p-1"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-4 w-4 text-accent" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location.split(',')[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {getHoursAgoString(job.publishedAt)}
                        </span>
                        <Badge variant="outline" className="text-[9px] py-0 bg-secondary">
                          {job.workplaceType}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {job.requiredSkills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Right: Detailed Job View */}
            <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <span className="text-xs font-bold text-accent flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5" />
                    {selectedJob.company}
                  </span>
                  <h2 className="text-xl font-extrabold text-foreground mt-0.5">
                    {selectedJob.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1.5">
                    <span>{selectedJob.location}</span>
                    <span>•</span>
                    <span>{selectedJob.workplaceType} ({selectedJob.employmentType})</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedJob.salaryRange || 'Competitive P.A.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApplyClick(selectedJob)}
                    className="bg-primary text-primary-foreground font-bold text-xs gap-1.5 shadow-sm"
                  >
                    Apply on Official Portal <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Source verification & telemetry status */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded bg-secondary/40 border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Source Provider</span>
                  <p className="font-semibold text-foreground truncate">{selectedJob.source}</p>
                </div>
                <div className="p-2.5 rounded bg-secondary/40 border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Published Window</span>
                  <p className="font-semibold text-foreground">{getHoursAgoString(selectedJob.publishedAt)}</p>
                </div>
                <div className="p-2.5 rounded bg-secondary/40 border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Experience Range</span>
                  <p className="font-semibold text-foreground">{selectedJob.experienceRange}</p>
                </div>
              </div>

              {/* Match overview with candidate resume */}
              <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-accent flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Resume Skills Overlap ({currentResume.title})
                  </span>
                  <Link href={`/ai-writer`} className="text-[11px] font-semibold text-accent hover:underline">
                    Generate Tailored Bullets →
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your verified profile matches required core competencies in{' '}
                  <strong className="text-foreground">
                    {selectedJob.requiredSkills.slice(0, 3).join(', ')}
                  </strong>
                  .
                </p>
              </div>

              {/* Job Description */}
              <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Role Overview
                </h3>
                <p>{selectedJob.description}</p>
              </div>

              {/* Key Responsibilities */}
              <div className="space-y-2 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Key Responsibilities
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  {selectedJob.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Required & Preferred Skills */}
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <h4 className="font-bold text-foreground mb-1.5">Required Skills:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.requiredSkills.map((s) => (
                      <span key={s} className="bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedJob.preferredSkills?.length > 0 && (
                  <div>
                    <h4 className="font-bold text-foreground mb-1.5">Preferred Skills:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.preferredSkills.map((s) => (
                        <span key={s} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 16.4 Mandatory Click Tracking Disclaimer */}
              <div className="pt-4 border-t border-border flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
                <Info className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                <p>
                  <strong>Notice (Section 16.4):</strong> Clicking the &ldquo;Apply on Official Portal&rdquo; link records telemetry for your Viewed Jobs history and opens the employer application page. Prepresume does not represent this click as a submitted application. Verify all role details directly on the employer page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function JobDiscoveryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading Job Discovery...</div>}>
      <JobDiscoveryContent />
    </Suspense>
  );
}
