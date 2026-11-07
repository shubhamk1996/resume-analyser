import React from 'react';

export default function JobDisclaimerPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Resume and Job Data Disclaimer
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Requirement Section 16.4 &amp; 22.5 | India Job Discovery Engine
        </p>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
        <strong>Important Clarification:</strong> Prepresume indexes job opportunities for the Indian employment market from authorized public career portals, verified employers, and integration endpoints. Please read this statement regarding application status and listing freshness.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. Clicks Are Not Formal Job Applications</h2>
        <p>
          Clicking on an &ldquo;Apply on Official Portal&rdquo; link on Prepresume directs you to the external career site operated by the respective employer or ATS provider (e.g., Swiggy, Razorpay, Zoho, Flipkart, Workday, Lever). Prepresume records this click for your personal Viewed Jobs telemetry and platform analytics.
        </p>
        <p className="font-semibold text-foreground">
          Under no circumstances does Prepresume label a clicked job as &ldquo;Applied&rdquo;. You must complete and submit your job application on the employer official portal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Rolling 72-Hour Window and Job Expiry</h2>
        <p>
          The &ldquo;Latest Jobs&rdquo; tab displays listings published within the rolling 72-hour window based on the original publication timestamp verified from the data source. Job openings in India fluctuate rapidly; employers may close or expire listings without prior notification. Prepresume does not guarantee that any listed job opening remains active or unfulfilled.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. Independence from Employers</h2>
        <p>
          Prepresume is an independent career technology platform and is not affiliated, endorsed, or partnered with employers whose listings appear on the platform unless explicitly labeled as &ldquo;Prepresume Verified Employer&rdquo;. Trademarks, logos, and corporate brand names belong exclusively to their respective owners.
        </p>
      </section>
    </article>
  );
}
