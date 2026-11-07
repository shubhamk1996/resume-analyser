import React from 'react';

export default function GrievanceOfficerPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Grievance Redressal Mechanism
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Statutory Disclosure under Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
        </p>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
        In accordance with Indian Information Technology law, Prepresume has appointed a designated Grievance Officer to address user grievances regarding data privacy, account security, unauthorized access, or terms violations.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. Designated Grievance Officer Details</h2>
        <div className="p-4 rounded-lg bg-card border border-border space-y-2 text-xs">
          <p><strong>Name:</strong> Rajeshwar Murthy</p>
          <p><strong>Designation:</strong> Head of Trust, Safety &amp; Regulatory Compliance</p>
          <p><strong>Entity:</strong> Prepresume Technologies India Private Limited</p>
          <p><strong>Official Address:</strong> Outer Ring Road, Bellandur, Bengaluru, Karnataka, 560103, India</p>
          <p><strong>Direct Grievance Email:</strong> <span className="text-accent font-mono">grievance@prepresume.com</span></p>
          <p><strong>Working Hours:</strong> Monday through Friday, 09:30 AM to 06:00 PM IST (excluding national holidays)</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Grievance Filing and Turnaround Timelines</h2>
        <p>
          Upon receiving a complaint with sufficient identifying details, the Grievance Officer will:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li>Acknowledge receipt of the grievance ticket within <strong>24 hours</strong>.</li>
          <li>Investigate and redress the complaint within <strong>15 calendar days</strong> from the date of receipt in accordance with statutory guidelines.</li>
        </ul>
      </section>
    </article>
  );
}
