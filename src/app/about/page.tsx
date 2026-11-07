import React from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Target, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-accent text-accent">About Prepresume</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Democratizing ATS Precision for Indian Job Seekers
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              Founded to eliminate the unfair disadvantage qualified candidates face when non-standard resume formats fail corporate applicant tracking systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">Our Mission</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Provide enterprise-grade document engineering and transparent AI writing tools accessible at India-first pricing (₹19/week) with zero recurring debt or hidden traps.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">100% Truthful AI Policy</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our AI agents are architected never to fabricate employment records or degrees. We focus on semantic clarity, Google XYZ action metrics, and ATS linear indexing.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-secondary/40 border border-border space-y-4">
            <h3 className="text-lg font-bold">Technology Architecture</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prepresume is engineered as a modern full-stack Next.js web application deployed with Cloudflare edge compute, NeonDB PostgreSQL persistence, and Groq ultra-low-latency AI inference.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
              <div className="p-2.5 rounded bg-card border border-border">Next.js 16 (React 19)</div>
              <div className="p-2.5 rounded bg-card border border-border">NeonDB PostgreSQL</div>
              <div className="p-2.5 rounded bg-card border border-border">Groq GPT OSS 120B</div>
              <div className="p-2.5 rounded bg-card border border-border">Razorpay UPI & Cards</div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
