import React from 'react';

export default function CookiePolicyPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Cookie &amp; Local Storage Policy
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Requirement Section 22.1 | Prepresume Privacy Framework
        </p>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
        Prepresume uses strictly necessary authentication cookies and client browser local storage to preserve your active resume draft, selected customization themes, and session tokens.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. Types of Storage Technologies Used</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>Essential Session Tokens:</strong> Auth0 and WhatsApp authentication tokens allowing seamless login persistence across page refreshes.</li>
          <li><strong>Local Draft Storage:</strong> Browser local storage (`prepresume-storage-v3`) that caches your in-progress resume edits locally so you never lose work if your internet connection disconnects.</li>
          <li><strong>Theme &amp; Preferences:</strong> Retains dark/light mode and editor zoom preferences.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Third-Party Tracking Disclosures</h2>
        <p>
          We do not sell advertising space to third-party ad networks and do not deploy cross-site tracking pixels that follow your browsing habits across external commercial websites.
        </p>
      </section>
    </article>
  );
}
