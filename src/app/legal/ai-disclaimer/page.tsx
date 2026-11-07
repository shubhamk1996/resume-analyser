import React from 'react';

export default function AIDisclaimerPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          AI Usage and Accuracy Disclaimer
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Requirement Section 22.4 | Product Architecture Version 3.0
        </p>
      </div>

      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
        <strong>Mandatory Advisory:</strong> Generative artificial intelligence produces predictive textual suggestions. It does not replace human professional judgment and does not verify empirical facts.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. User Verification Responsibility</h2>
        <p>
          You are solely responsible for reviewing and certifying the accuracy of all content generated, rewritten, or suggested by Prepresume AI agents. The platform will never intentionally fabricate employment dates, degree names, technical credentials, or business metrics. However, LLM models (including Groq GPT OSS 120B) may hallucinate or generate non-factual statements if given ambiguous prompts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Indicative Nature of ATS Compatibility Scores</h2>
        <p>
          The ATS compatibility score (e.g. 94/100) provided by our ATS Analyzer Agent is a diagnostic analysis based on standardized industry parsing guidelines (single-column text parsing, semantic heading recognition, standard bullet punctuation, and keyword presence). It represents algorithmic compliance, <strong>NOT</strong> a guarantee of selection, shortlist status, or interview offers from any specific employer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. No Employment Guarantees</h2>
        <p>
          Prepresume is a document productivity and career technology software provider. We do not act as an employment agency, headhunter, staffing firm, or recruiter. Using our resume builder or AI writing assistant does not guarantee job placement or recruitment response rates.
        </p>
      </section>
    </article>
  );
}
