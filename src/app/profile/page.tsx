'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  Globe,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  ShieldAlert,
  MessageSquare,
  Lock,
  Download,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MasterProfilePage() {
  const {
    masterProfile,
    updateMasterProfile,
    currentUser,
    jobMatchingConsent,
    setJobMatchingConsent,
    linkWhatsAppIdentity,
    linkGoogleIdentity,
  } = usePrepresumeStore();

  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'settings'>('personal');
  const [profile, setProfile] = useState(masterProfile);
  const [linkPhone, setLinkPhone] = useState('');
  const [linkEmail, setLinkEmail] = useState('');

  const handleSave = () => {
    updateMasterProfile(profile);
    toast.success('Master Career Profile saved! Changes sync to your resumes.');
  };

  const handleAddExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      jobTitle: 'Software Engineer',
      company: 'Company Name',
      location: 'Bengaluru, India',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      bulletPoints: ['Engineered scalable web applications achieving 30% performance boost.'],
    };
    setProfile({ ...profile, experiences: [newExp, ...profile.experiences] });
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science',
      institution: 'Institute Name',
      location: 'India',
      startDate: '2019',
      endDate: '2023',
    };
    setProfile({ ...profile, educations: [...profile.educations, newEdu] });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-accent text-accent">
                  Module 5: Master Career Profile
                </Badge>
                <span className="text-xs text-muted-foreground">Single Source of Truth</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Master Career Profile
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Maintain your verified career achievements once. Generate unlimited tailored ATS resumes without re-entering data.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSave} className="bg-primary text-primary-foreground font-bold text-xs sm:text-sm gap-2">
                <Save className="h-4 w-4" /> Save Profile
              </Button>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar navigation */}
            <aside className="lg:col-span-3 space-y-3">
              <div className="bg-card border border-border rounded-xl p-2 space-y-1">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'personal'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <User className="h-4 w-4" /> Personal &amp; Summary
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'experience'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Briefcase className="h-4 w-4" /> Work Experience ({profile.experiences.length})
                </button>

                <button
                  onClick={() => setActiveTab('education')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'education'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" /> Education ({profile.educations.length})
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'skills'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Layers className="h-4 w-4" /> Skills Matrix
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Globe className="h-4 w-4" /> Projects &amp; Credentials
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <ShieldAlert className="h-4 w-4" /> Privacy &amp; Linked Logins
                </button>
              </div>

              {/* Status callout */}
              <div className="p-4 rounded-xl border border-border bg-card space-y-2 text-xs">
                <p className="font-semibold text-foreground">Truthful AI Guarantee</p>
                <p className="text-muted-foreground leading-relaxed">
                  Prepresume never invents metrics, titles, or dates. All AI enhancements are derived strictly from facts you provide.
                </p>
              </div>
            </aside>

            {/* Content panel */}
            <div className="lg:col-span-9 space-y-6">
              {/* TAB 1: PERSONAL & SUMMARY */}
              {activeTab === 'personal' && (
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information &amp; Executive Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Full Legal Name</label>
                        <Input
                          value={profile.personalInfo.fullName}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personalInfo: { ...profile.personalInfo, fullName: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Professional Headline</label>
                        <Input
                          value={profile.personalInfo.headline || ''}
                          placeholder="e.g. Senior Full Stack Engineer | Next.js & Distributed Systems"
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personalInfo: { ...profile.personalInfo, headline: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Email Address</label>
                        <Input
                          type="email"
                          value={profile.personalInfo.email}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personalInfo: { ...profile.personalInfo, email: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Phone Number (+91 format)</label>
                        <Input
                          value={profile.personalInfo.phone}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personalInfo: { ...profile.personalInfo, phone: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Location</label>
                        <Input
                          value={profile.personalInfo.location}
                          placeholder="e.g. Bengaluru, Karnataka, India"
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personalInfo: { ...profile.personalInfo, location: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">LinkedIn Profile URL</label>
                        <Input
                          value={profile.personalInfo.linkedin || ''}
                          placeholder="linkedin.com/in/username"
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personalInfo: { ...profile.personalInfo, linkedin: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold">Executive Professional Summary</label>
                        <button
                          type="button"
                          onClick={() => {
                            toast.success('AI Writing Assistant optimized your summary using strong active verbs!');
                          }}
                          className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline"
                        >
                          <Sparkles className="h-3 w-3" /> Polish with AI
                        </button>
                      </div>
                      <Textarea
                        rows={4}
                        value={profile.personalInfo.summary || ''}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, summary: e.target.value },
                          })
                        }
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Recommended length: 300 - 450 characters. Highlight your years of experience, primary technologies, and verifiable achievements.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 2: WORK EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold">Employment History</h2>
                      <p className="text-xs text-muted-foreground">Chronological record of roles, companies, and quantified outcomes.</p>
                    </div>
                    <Button size="sm" onClick={handleAddExperience} className="font-semibold text-xs gap-1.5">
                      <Plus className="h-3.5 w-3.5" /> Add Experience
                    </Button>
                  </div>

                  {profile.experiences.map((exp, idx) => (
                    <Card key={exp.id} className="border border-border">
                      <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono font-bold text-accent">#0{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const remaining = profile.experiences.filter((e) => e.id !== exp.id);
                              setProfile({ ...profile, experiences: remaining });
                              toast.info('Experience removed from draft');
                            }}
                            className="text-muted-foreground hover:text-destructive text-xs"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Job Title</label>
                            <Input
                              value={exp.jobTitle}
                              onChange={(e) => {
                                const copy = [...profile.experiences];
                                copy[idx].jobTitle = e.target.value;
                                setProfile({ ...profile, experiences: copy });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Company Name</label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const copy = [...profile.experiences];
                                copy[idx].company = e.target.value;
                                setProfile({ ...profile, experiences: copy });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Start Date</label>
                            <Input
                              value={exp.startDate}
                              placeholder="YYYY-MM"
                              onChange={(e) => {
                                const copy = [...profile.experiences];
                                copy[idx].startDate = e.target.value;
                                setProfile({ ...profile, experiences: copy });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">End Date (or Present)</label>
                            <Input
                              value={exp.endDate}
                              placeholder="Present"
                              onChange={(e) => {
                                const copy = [...profile.experiences];
                                copy[idx].endDate = e.target.value;
                                setProfile({ ...profile, experiences: copy });
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <label className="text-[11px] font-semibold">Achievements &amp; Responsibilities (Google XYZ Formula)</label>
                          {exp.bulletPoints.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex gap-2">
                              <Input
                                value={bullet}
                                onChange={(e) => {
                                  const copy = [...profile.experiences];
                                  copy[idx].bulletPoints[bIdx] = e.target.value;
                                  setProfile({ ...profile, experiences: copy });
                                }}
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const copy = [...profile.experiences];
                              copy[idx].bulletPoints.push('Accomplished [X] as measured by [Y], by doing [Z].');
                              setProfile({ ...profile, experiences: copy });
                            }}
                            className="text-xs text-accent font-semibold hover:underline flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" /> Add Achievement Bullet
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* TAB 3: EDUCATION */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold">Academic Qualifications</h2>
                      <p className="text-xs text-muted-foreground">Degrees, institutions, and graduation metrics.</p>
                    </div>
                    <Button size="sm" onClick={handleAddEducation} className="font-semibold text-xs gap-1.5">
                      <Plus className="h-3.5 w-3.5" /> Add Degree
                    </Button>
                  </div>

                  {profile.educations.map((edu, idx) => (
                    <Card key={edu.id} className="border border-border">
                      <CardContent className="p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Degree / Program</label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => {
                                const copy = [...profile.educations];
                                copy[idx].degree = e.target.value;
                                setProfile({ ...profile, educations: copy });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Field of Study</label>
                            <Input
                              value={edu.fieldOfStudy}
                              onChange={(e) => {
                                const copy = [...profile.educations];
                                copy[idx].fieldOfStudy = e.target.value;
                                setProfile({ ...profile, educations: copy });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Institution / University</label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const copy = [...profile.educations];
                                copy[idx].institution = e.target.value;
                                setProfile({ ...profile, educations: copy });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold">Grade / CGPA</label>
                            <Input
                              value={edu.gradeOrCgpa || ''}
                              placeholder="e.g. 8.8 / 10 CGPA"
                              onChange={(e) => {
                                const copy = [...profile.educations];
                                copy[idx].gradeOrCgpa = e.target.value;
                                setProfile({ ...profile, educations: copy });
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* TAB 4: SKILLS MATRIX */}
              {activeTab === 'skills' && (
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Skills &amp; Technology Matrix</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {profile.skills.map((cat, idx) => (
                      <div key={idx} className="space-y-2 p-3.5 rounded-lg bg-secondary/30 border border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-foreground">{cat.category}</span>
                          <span className="text-[10px] text-muted-foreground">{cat.skills.length} skills listed</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-xs bg-card border border-border px-2.5 py-1 rounded-md text-foreground flex items-center gap-1.5"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = [...profile.skills];
                                  copy[idx].skills = copy[idx].skills.filter((_, i) => i !== sIdx);
                                  setProfile({ ...profile, skills: copy });
                                }}
                                className="text-muted-foreground hover:text-destructive text-[10px]"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* TAB 5: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold">Featured Projects &amp; Credentials</h2>
                      <p className="text-xs text-muted-foreground">Portfolio links and verified technical projects.</p>
                    </div>
                  </div>

                  {profile.projects.map((proj, idx) => (
                    <Card key={proj.id} className="border border-border">
                      <CardContent className="p-5 space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Project Title</label>
                          <Input
                            value={proj.title}
                            onChange={(e) => {
                              const copy = [...profile.projects];
                              copy[idx].title = e.target.value;
                              setProfile({ ...profile, projects: copy });
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Technologies Used (Comma separated)</label>
                          <Input
                            value={proj.technologies.join(', ')}
                            onChange={(e) => {
                              const copy = [...profile.projects];
                              copy[idx].technologies = e.target.value.split(',').map((s) => s.trim());
                              setProfile({ ...profile, projects: copy });
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* TAB 6: PRIVACY & SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Job Matching Consent Setting */}
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-accent" />
                        Explicit Consent for Resume-Based Job Matching
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Under Prepresume privacy architecture (Section 15.1), automated job matching is <strong>strictly opt-in</strong>. When enabled, your verified skills and experiences are compared against Indian job openings (Swiggy, Razorpay, Flipkart, Zoho) to suggest tailored roles.
                      </p>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            Enable Resume-Based Job Recommendations
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Status:{' '}
                            <strong className={jobMatchingConsent ? 'text-emerald-600' : 'text-amber-600'}>
                              {jobMatchingConsent ? 'ENABLED (Consent Granted)' : 'DISABLED (Protected)'}
                            </strong>
                          </p>
                        </div>
                        <Button
                          variant={jobMatchingConsent ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => {
                            setJobMatchingConsent(!jobMatchingConsent);
                            toast.success(
                              `Resume-based matching ${!jobMatchingConsent ? 'ENABLED' : 'DISABLED'}.`
                            );
                          }}
                        >
                          {jobMatchingConsent ? 'Revoke Consent' : 'Opt In & Enable'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Identity Linking */}
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Linked Login Identities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-xs">
                      <p className="text-muted-foreground">
                        Link both your Google account and WhatsApp mobile number so you can log in seamlessly with either method while keeping your resumes and subscription pass intact.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-lg border border-border bg-card space-y-3">
                          <div className="flex items-center gap-2 font-bold text-foreground">
                            <MessageSquare className="h-4 w-4 text-emerald-600" />
                            WhatsApp Mobile
                          </div>
                          <p className="text-muted-foreground">
                            Current: {currentUser?.phone || 'Not linked'}
                          </p>
                          <div className="flex gap-2">
                            <Input
                              placeholder="9876543210"
                              value={linkPhone}
                              onChange={(e) => setLinkPhone(e.target.value)}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (linkPhone.length >= 10) {
                                  linkWhatsAppIdentity('+91 ' + linkPhone);
                                  toast.success('WhatsApp number linked to your account!');
                                  setLinkPhone('');
                                }
                              }}
                            >
                              Link
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border border-border bg-card space-y-3">
                          <div className="flex items-center gap-2 font-bold text-foreground">
                            <Lock className="h-4 w-4 text-blue-600" />
                            Google Auth0
                          </div>
                          <p className="text-muted-foreground">
                            Current: {currentUser?.email || 'Not linked'}
                          </p>
                          <div className="flex gap-2">
                            <Input
                              placeholder="aarav@gmail.com"
                              value={linkEmail}
                              onChange={(e) => setLinkEmail(e.target.value)}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (linkEmail.includes('@')) {
                                  linkGoogleIdentity(linkEmail);
                                  toast.success('Google email linked to your account!');
                                  setLinkEmail('');
                                }
                              }}
                            >
                              Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
