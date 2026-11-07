import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Terms and Conditions of Service
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Last Updated: November 7, 2026 | Governing Jurisdiction: Karnataka, India
        </p>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
        Please read these Terms carefully before using www.prepresume.com (&ldquo;Platform&rdquo;, &ldquo;Prepresume&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;). By creating an account or purchasing a pass, you agree to these Terms.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. Eligibility and User Accounts</h2>
        <p>
          You must be at least 18 years of age or possess legal parental authorization to use Prepresume. You agree to provide accurate, truthful, and verified professional background details. You may not impersonate any person or entity or submit fraudulent qualifications or employment histories.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Subscription &amp; Payment Rules</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>Confirmed Pricing:</strong> The standard plan is ₹19 for 7 consecutive days, plus applicable 18% GST (total ₹22.42 INR).</li>
          <li><strong>No Auto-Renewal:</strong> The subscription expires automatically after 7 calendar days. It does not automatically renew or charge your payment method. Continued service requires an intentional, manual repurchase.</li>
          <li><strong>One-Time Free Export Entitlement:</strong> Each unique registered account receives exactly one (1) lifetime successful document export (PDF or DOCX) without charge. After consuming this download, subsequent exports require an active ₹19 pass. Attempting to circumvent this rule via multiple fraudulent duplicate accounts violates these Terms.</li>
          <li><strong>Authorized Payment Methods:</strong> Razorpay processes UPI, debit cards, and credit cards. All payments are settled in Indian Rupees (INR).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. Intellectual Property Rights</h2>
        <p>
          You retain 100% full legal ownership of the personal career content, descriptions, and verified facts you input into Prepresume. Prepresume retains all copyright and intellectual property rights in its platform software, algorithms, 108+ proprietary ATS template designs, and UI styling code. You receive a personal, non-exclusive license to export and use your generated resumes for job application purposes worldwide.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">4. Acceptable Use Policy</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li>Attempt to reverse-engineer, decompile, or extract the underlying prompts or architecture of our Groq AI agents.</li>
          <li>Use automated bots or scrapers to crawl job listings or user data.</li>
          <li>Fabricate employment credentials or misrepresent regulatory licenses.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">5. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by and construed under the laws of the Republic of India. Any legal dispute, arbitration, or proceedings shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
        </p>
      </section>
    </article>
  );
}
