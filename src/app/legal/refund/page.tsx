import React from 'react';

export default function RefundPolicyPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Refund and Cancellation Policy
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Requirement Section 19.3 &amp; 22.1 | Prepresume Monetization Framework
        </p>
      </div>

      <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
        <strong>Overview:</strong> Prepresume offers a 7-day access pass for ₹19 (excluding GST). Because digital document generation and AI tokens are provisioned instantly upon payment verification, specific conditions govern cancellations and refunds.
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">1. Nature of the 7-Day Pass</h2>
        <p>
          The ₹19 plan is a fixed-term digital utility service for 7 consecutive days. It does not carry recurring subscription renewals. Cancellation during an active 7-day period will not trigger a partial prorated refund, but your access remains active until the expiration timestamp.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Eligible Refund Circumstances</h2>
        <p>A full refund will be processed under the following verifiable conditions:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
          <li><strong>Duplicate Payment:</strong> If your bank account or UPI was charged multiple times for a single 7-day transaction due to network timeouts.</li>
          <li><strong>Technical Gateway Failure:</strong> If Razorpay debited your payment but our server failed to activate your 7-day pass within 2 hours of payment confirmation.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. How to Request a Refund</h2>
        <p>
          Email <span className="text-foreground font-mono">support@prepresume.com</span> or <span className="text-foreground font-mono">billing@prepresume.com</span> with:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
          <li>Your registered email or mobile number</li>
          <li>Razorpay Order ID and Payment ID (e.g., pay_RP_xxx)</li>
          <li>Brief explanation and bank transaction confirmation</li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Eligible refunds are initiated within 48 business hours and credited to your original payment method within 5–7 banking days via Razorpay.
        </p>
      </section>
    </article>
  );
}
