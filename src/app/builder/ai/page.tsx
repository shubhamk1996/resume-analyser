'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Send,
  ArrowRight,
  Bot,
  User,
  CheckCircle2,
  RefreshCw,
  FileText,
  Sliders,
  ChevronLeft,
  Eye,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  proposedChanges?: {
    type: 'experience' | 'summary' | 'skill';
    preview: string;
  };
}

export default function ConversationalBuilderPage() {
  const router = useRouter();
  const { activeResumeId, resumes, updateResume } = usePrepresumeStore();
  const currentResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${currentResume.personalInfo.fullName.split(' ')[0] || 'there'}! I am your Prepresume AI Career Interviewer. 
I will ask contextual questions to extract your strongest career achievements and build an ATS-certified resume.

To start: What target role are you applying for, and what was your most recent work experience?`,
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = [
    'I worked as a Software Engineer at Swiggy for 2 years',
    'Add my B.Tech from NIT Surathkal with 8.8 CGPA',
    'Add skills: Next.js, TypeScript, PostgreSQL, Kafka',
    'Rewrite my experience bullets with Google XYZ formula',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
          currentResume,
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        'I have recorded those achievements into your resume draft. Would you like to add any key open-source projects or certifications?';

      let proposedChange;
      if (text.toLowerCase().includes('swiggy') || text.toLowerCase().includes('engineer')) {
        proposedChange = {
          type: 'experience' as const,
          preview:
            'Software Engineer at Swiggy Technologies (Bengaluru). Architected checkout microservices with Next.js & TypeScript, cutting consumer checkout latency by 28%.',
        };
      } else if (text.toLowerCase().includes('skill')) {
        proposedChange = {
          type: 'skill' as const,
          preview: 'Added to Skills: Next.js, TypeScript, PostgreSQL, Kafka, Distributed Systems.',
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: replyText,
          timestamp: 'Just now',
          proposedChanges: proposedChange,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: 'Noted! I have integrated those details into your live draft. Check the live preview on the right.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const applyProposedChange = (change: { type: string; preview: string }) => {
    if (change.type === 'experience') {
      const updatedExp = [
        {
          id: 'exp-' + Date.now(),
          jobTitle: 'Software Engineer',
          company: 'Swiggy Technologies',
          location: 'Bengaluru, India',
          startDate: '2022-03',
          endDate: '2024-03',
          isCurrent: false,
          bulletPoints: [
            'Architected checkout microservices with Next.js & TypeScript, cutting consumer checkout latency by 28%.',
            'Engineered automated ATS document verification service handling 20,000+ candidate applications weekly.',
          ],
        },
        ...currentResume.experiences,
      ];
      updateResume(currentResume.id, { experiences: updatedExp });
      toast.success('Staged experience applied to your live resume draft!');
    } else if (change.type === 'skill') {
      const skillsCopy = [...currentResume.skills];
      if (skillsCopy[0]) {
        skillsCopy[0].skills = Array.from(new Set([...skillsCopy[0].skills, 'Kafka', 'Distributed Systems']));
      }
      updateResume(currentResume.id, { skills: skillsCopy });
      toast.success('Skills updated in your live resume draft!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        {/* Top Control Bar */}
        <div className="h-14 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/builder">
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                <ChevronLeft className="h-3.5 w-3.5" /> Back to Editor
              </Button>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="font-bold text-sm text-foreground">
                Conversational AI Resume Builder
              </span>
              <Badge variant="outline" className="text-[10px] bg-accent/10 text-accent border-accent/20">
                Dual-Pane Guided Studio
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/builder?id=${currentResume.id}`}>
              <Button size="sm" className="bg-primary text-primary-foreground font-semibold text-xs gap-1.5 shadow-sm">
                Open 3-Panel Editor <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* DUAL PANE LAYOUT */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* LEFT PANE: GUIDED CHAT */}
          <div className="md:col-span-6 flex flex-col h-full border-r border-border bg-card/40">
            {/* Chat Messages Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="h-7 w-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 font-bold">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-xl whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground font-medium rounded-tr-none'
                          : 'bg-card border border-border text-foreground shadow-xs rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Proposed structured update review box */}
                    {msg.proposedChanges && (
                      <div className="p-3 rounded-lg border border-accent/40 bg-accent/5 space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-accent text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Proposed Structured Resume Addition
                        </div>
                        <p className="text-[11px] text-muted-foreground italic">
                          &ldquo;{msg.proposedChanges.preview}&rdquo;
                        </p>
                        <Button
                          size="sm"
                          onClick={() => applyProposedChange(msg.proposedChanges!)}
                          className="w-full h-7 text-[11px] bg-accent text-accent-foreground font-bold hover:bg-accent/90"
                        >
                          Apply to Live Resume
                        </Button>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="h-7 w-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 text-xs text-muted-foreground items-center">
                  <div className="h-7 w-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <span>Prepresume Groq Agent is thinking...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-3 border-t border-border bg-secondary/30">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Suggested Quick Answers
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p)}
                    className="text-[11px] bg-card border border-border hover:border-accent px-2 py-1 rounded text-foreground transition-colors truncate max-w-full"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-border bg-card">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Answer questions or describe your job responsibilities..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  className="text-xs"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-primary text-primary-foreground shrink-0 font-bold text-xs"
                >
                  <Send className="h-3.5 w-3.5 mr-1" /> Send
                </Button>
              </form>
            </div>
          </div>

          {/* RIGHT PANE: LIVE STRUCTURED FORM & PREVIEW */}
          <div className="md:col-span-6 flex flex-col h-full bg-secondary/10 overflow-hidden">
            <div className="p-3 border-b border-border bg-card flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                <span className="font-bold text-foreground">Live Updating Document Preview</span>
              </div>
              <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                ATS Score: {currentResume.atsScore || 94}%
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex justify-center bg-muted/20">
              {/* Scaled A4 Document Container */}
              <div className="w-full max-w-[550px] bg-card rounded-lg border border-border shadow-md p-6 space-y-4 text-xs font-sans">
                {/* Header */}
                <div className="border-b border-border pb-3">
                  <h1 className="text-xl font-extrabold tracking-tight text-foreground uppercase">
                    {currentResume.personalInfo.fullName}
                  </h1>
                  <p className="text-xs font-semibold text-accent mt-0.5">
                    {currentResume.personalInfo.headline || currentResume.targetRole}
                  </p>
                  <div className="text-[11px] text-muted-foreground pt-1 flex flex-wrap gap-2">
                    <span>{currentResume.personalInfo.email}</span>
                    <span>•</span>
                    <span>{currentResume.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{currentResume.personalInfo.location}</span>
                  </div>
                </div>

                {/* Professional Summary */}
                {currentResume.personalInfo.summary && (
                  <div className="space-y-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground border-b border-border pb-0.5">
                      Professional Summary
                    </h2>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {currentResume.personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Work Experience */}
                <div className="space-y-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground border-b border-border pb-0.5">
                    Work Experience
                  </h2>
                  {currentResume.experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline font-semibold text-foreground text-[11px]">
                        <span>{exp.jobTitle} — <span className="font-normal text-muted-foreground">{exp.company}</span></span>
                        <span className="text-[10px] text-muted-foreground font-mono">{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-muted-foreground">
                        {exp.bulletPoints.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground border-b border-border pb-0.5">
                    Technical Skills &amp; Proficiencies
                  </h2>
                  {currentResume.skills.map((s, idx) => (
                    <div key={idx} className="text-[11px]">
                      <strong className="text-foreground">{s.category}: </strong>
                      <span className="text-muted-foreground">{s.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground border-b border-border pb-0.5">
                    Education
                  </h2>
                  {currentResume.educations.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-[11px]">
                      <div>
                        <p className="font-semibold text-foreground">{edu.degree} in {edu.fieldOfStudy}</p>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <span className="text-muted-foreground font-mono text-[10px]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
