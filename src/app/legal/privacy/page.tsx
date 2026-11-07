import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Effective Date: November 7, 2026 | Last Updated: November 7, 2026 | Version 3.0
        </p>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
        <strong>Executive Summary:</strong> Prepresume respects your privacy. We store your resume and personal data securely on Cloudflare R2 and NeonDB PostgreSQL. We do not sell your personal data. We do not disclose your resume to prospective employers unless you explicitly opt in to resume-based job matching.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
        <p>We collect information to provide AI-powered resume building, ATS diagnostic scoring, and career intelligence:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>Authentication Data:</strong> Full name, verified email address via Google OAuth (Auth0), and Indian mobile phone numbers (+91) for WhatsApp OTP session authorization.</li>
          <li><strong>Master Career Profile Information:</strong> Work history, job titles, educational qualifications, verified skills, project links, certifications, and languages explicitly supplied or confirmed by you.</li>
          <li><strong>Uploaded Resumes:</strong> PDF and DOCX files uploaded for parsing. Files are retained securely in private Cloudflare R2 object storage.</li>
          <li><strong>Payment &amp; Transaction Metadata:</strong> Order IDs, payment transaction references, tax calculations, and status from Razorpay. We do not store or process debit/credit card numbers or UPI PINs on our servers.</li>
          <li><strong>Activity &amp; Click Analytics:</strong> Job click telemetry, ATS scan frequencies, template preferences, and session timestamps.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Purpose of Processing</h2>
        <p>Your data is processed strictly for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li>To construct and format your editable resumes across 108+ ATS-compliant templates.</li>
          <li>To conduct server-side ATS diagnostic scans and identify structural or keyword improvements.</li>
          <li>To generate tailored experience bullet points and summaries using Groq AI inference.</li>
          <li>To maintain transaction records for the ₹19 / 7-day subscription pass and enforce the one-time lifetime free export entitlement.</li>
          <li>To deliver security alerts, payment receipts, and OTP verification codes.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. Explicit Consent for Job Matching</h2>
        <p>
          Resume-based job recommendations remain <strong>disabled by default</strong>. Prepresume will only compare your resume against Indian job openings after you explicitly toggle &ldquo;Enable Resume-Based Job Matching&rdquo; in your dashboard. You retain the absolute right to revoke this consent at any time, immediately halting all automated resume matching.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">4. Data Storage and Third-Party Sub-Processors</h2>
        <p>We partner with vetted, enterprise-grade cloud infrastructure providers:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>NeonDB:</strong> Encrypted PostgreSQL serverless cluster with Row Level Security (RLS).</li>
          <li><strong>Cloudflare Inc.:</strong> Edge DNS, Workers compute, and private R2 object storage with zero egress fees.</li>
          <li><strong>Groq Inc.:</strong> Server-side AI model inference. Prompts do not train public models and are retained only for temporary inference execution.</li>
          <li><strong>Razorpay Software Private Limited:</strong> RBI-licensed payment gateway handling UPI, Net Banking, and card processing.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">5. Data Retention &amp; Deletion Rights</h2>
        <p>
          You have the right to request a complete export of your master profile or request permanent deletion of your account and uploaded files. Account deletion requests submitted via your dashboard are processed within 7 business days, permanently scrubbing your resumes and authentication records from NeonDB and R2.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">6. Grievance Officer Contact</h2>
        <p>
          In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, our designated Grievance Officer is reachable at <span className="text-foreground font-mono">grievance@prepresume.com</span>.
        </p>
      </section>
    </article>
  );
}
