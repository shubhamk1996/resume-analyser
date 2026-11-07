'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    category: 'Subscription & Pricing',
    questions: [
      {
        q: 'What is the price of Prepresume?',
        a: 'The standard full-access pass is ₹19 for 7 consecutive days. With standard 18% GST (₹3.42), the total payable amount is ₹22.42 INR.',
      },
      {
        q: 'Will my credit card or bank account be debited automatically after 7 days?',
        a: 'No. There is zero recurring auto-renewal. Every purchase is 100% manual. Once 7 days expire, access pauses until you intentionally choose to repurchase.',
      },
      {
        q: 'How does the 1-time lifetime free document export work?',
        a: 'Every registered account gets one free download of their generated resume in either PDF or DOCX format. No payment information is required to claim this download.',
      },
      {
        q: 'Which payment methods are accepted via Razorpay?',
        a: 'Razorpay accepts UPI (Google Pay, PhonePe, Paytm, BHIM, CRED), Indian debit cards, credit cards, and major net banking portals.',
      },
    ],
  },
  {
    category: 'ATS & Resume Engine',
    questions: [
      {
        q: 'What makes Prepresume templates ATS-compliant?',
        a: 'Our templates are built using linear single-column layouts, standard hierarchical headings (Work Experience, Education, Skills), vector selectable text, and zero unparseable graphic tables or floating text boxes.',
      },
      {
        q: 'Can I export in Microsoft Word (.DOCX) format?',
        a: 'Yes. Prepresume generates both vector PDFs and valid Word DOCX files with all semantic styles and margins preserved.',
      },
      {
        q: 'Does an ATS score guarantee I will get hired?',
        a: 'No. The ATS score is a diagnostic metric analyzing software parseability and keyword relevance. Hiring decisions remain the prerogative of human hiring managers.',
      },
    ],
  },
  {
    category: 'India Job Discovery & Privacy',
    questions: [
      {
        q: 'What is the 72-hour window on job listings?',
        a: 'Our Latest Jobs tab only displays opportunities published in the previous rolling 72 hours from verified Indian tech and corporate sources.',
      },
      {
        q: 'Is my resume automatically sent to recruiters?',
        a: 'No. Resume-based job matching requires explicit user consent in your dashboard. We do not sell or broadcast your resume to third-party databases.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true });

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="border-accent text-accent">Help Center</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Everything you need to know about ATS compliance, payments, and our AI career platform.
            </p>
          </div>

          <div className="space-y-8">
            {FAQS.map((cat, catIdx) => (
              <div key={cat.category} className="space-y-3">
                <h2 className="text-base font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-2">
                  {cat.category}
                </h2>
                <div className="space-y-2.5">
                  {cat.questions.map((q, qIdx) => {
                    const key = `${catIdx}-${qIdx}`;
                    const isOpen = !!openItems[key];
                    return (
                      <div key={q.q} className="border border-border rounded-lg bg-card overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="w-full p-4 text-left flex justify-between items-center text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors"
                        >
                          <span>{q.q}</span>
                          <ChevronRight
                            className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ml-2 ${
                              isOpen ? 'rotate-90 text-accent' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/60">
                            {q.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
