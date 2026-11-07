import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Lock, Award, Heart, Mail } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60 text-card-foreground">
      {/* Trust & Guarantee bar */}
      <div className="border-b border-border/60 py-6 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-foreground">ATS Compliance Verified</p>
              <p>Certified against Taleo, Workday, Greenhouse & Lever algorithms</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Lock className="h-5 w-5 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Indian Data Privacy</p>
              <p>Stored securely on Cloudflare R2 & NeonDB with zero unauthorized data sharing</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-foreground">No Recurring Auto-Debit</p>
              <p>₹19 for 7 days is a 100% manual one-time purchase. No surprise charges</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="h-5 w-5 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-foreground">India Grievance Officer</p>
              <p>Statutory compliance under India IT Rules (Intermediary Guidelines) 2021</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-base">
                P
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              India&apos;s high-precision AI resume creation, ATS scoring, and career intelligence ecosystem. Built for software engineers, product leaders, freshers, and corporate professionals.
            </p>
            <div className="pt-2 text-xs text-muted-foreground space-y-1">
              <p>Operated for www.prepresume.com</p>
              <p>Grievance Contact: <span className="text-foreground font-mono">grievance@prepresume.com</span></p>
              <p>Office: Bengaluru, Karnataka, 560102, India</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Platform Modules
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Compliance & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Company & Help
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory & Disclaimer Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Prepresume Inc. All rights reserved. Registered trademark application in progress.
          </p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Crafted with precision for Indian career aspirants</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
