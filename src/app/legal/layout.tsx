import React from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Link from 'next/link';

const LEGAL_LINKS = [
  { title: 'Privacy Policy', href: '/legal/privacy' },
  { title: 'Terms & Conditions', href: '/legal/terms' },
  { title: 'AI Usage Disclaimer', href: '/legal/ai-disclaimer' },
  { title: 'Resume & Job Disclaimer', href: '/legal/job-disclaimer' },
  { title: 'Refund & Cancellation', href: '/legal/refund' },
  { title: 'Cookie Policy', href: '/legal/cookies' },
  { title: 'Grievance Officer (IT Rules)', href: '/legal/grievance' },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex-1 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar legal links */}
            <aside className="md:col-span-3 space-y-2">
              <div className="p-4 rounded-lg bg-card border border-border space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Compliance & Policies
                </h3>
                <nav className="flex flex-col space-y-1">
                  {LEGAL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary p-2 rounded transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-4 rounded-lg bg-secondary/40 border border-border text-[11px] text-muted-foreground space-y-1.5">
                <p className="font-semibold text-foreground">Indian Regulatory Notice</p>
                <p>Compliant with Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) Act frameworks.</p>
              </div>
            </aside>

            {/* Main Legal Content */}
            <main className="md:col-span-9 bg-card p-6 sm:p-10 rounded-xl border border-border shadow-xs">
              {children}
            </main>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
