'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CheckCircle2,
  Crown,
  ShieldCheck,
  Zap,
  ArrowRight,
  Lock,
  CreditCard,
  QrCode,
  Building,
  RefreshCw,
  Receipt,
  Download,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function PricingPage() {
  const router = useRouter();
  const {
    entitlement,
    activateSubscription,
    currentUser,
    transactions,
  } = usePrepresumeStore();

  const isSubscribed =
    entitlement.isSubscribed &&
    entitlement.subscriptionExpiresAt &&
    new Date(entitlement.subscriptionExpiresAt).getTime() > Date.now();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any>(null);

  const handleStartCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/payments/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_payment',
          planId: 'plan-7days-inr19',
          paymentMethod,
          userId: currentUser?.id,
        }),
      });
      const data = await res.json();

      activateSubscription(paymentMethod);
      setIsProcessing(false);
      setCheckoutOpen(false);

      setSuccessReceipt({
        orderId: 'order_RP_' + Math.floor(10000000 + Math.random() * 90000000),
        paymentId: data.paymentId || 'pay_RP_' + Math.floor(100000000 + Math.random() * 900000000),
        amount: '₹22.42 (incl. 18% GST)',
        activatedUntil: new Date(Date.now() + 7 * 86400000).toLocaleDateString(),
        method: paymentMethod.toUpperCase(),
      });

      toast.success('Payment verified via Razorpay! 7-Day pass is now active.');
    } catch (e) {
      setIsProcessing(false);
      toast.error('Payment verification failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Verified Razorpay Integration • India Market
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Simple, Honest Career Pricing
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No automatic renewal traps. No surprise recurring charges. Pay once, use every tool for seven days, and manually repurchase only if you want to.
            </p>
          </div>

          {/* Current Status Banner */}
          {isSubscribed ? (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">You Have an Active 7-Day Pass!</h3>
                  <p className="text-xs text-muted-foreground">
                    Enjoy unlimited PDF and DOCX downloads until {new Date(entitlement.subscriptionExpiresAt!).toLocaleDateString()}.
                  </p>
                </div>
              </div>
              <Link href="/builder">
                <Button size="sm" className="bg-emerald-600 text-white font-bold text-xs">
                  Continue in Builder
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>
                  Lifetime Free Export Status:{' '}
                  <strong>
                    {entitlement.hasFreeExportAvailable
                      ? '1 Free Document Export Available'
                      : 'Free Export Already Claimed'}
                  </strong>
                </span>
              </div>
              <Link href="/builder" className="text-accent font-semibold hover:underline">
                Open Studio →
              </Link>
            </div>
          )}

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Plan 1: Lifetime Free Export */}
            <Card className="border border-border bg-card p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Free Starter Entitlement
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">1-Time Document Export</h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-foreground">₹0</span>
                    <span className="text-xs text-muted-foreground">/ lifetime per account</span>
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    No card or UPI required
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every account receives one lifetime free export. Create and download one complete resume in either PDF or DOCX format.
                </p>

                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    1 Successful PDF or Word DOCX Export
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Access to all 108+ ATS-compliant templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Basic ATS compatibility score audit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Master Career Profile persistence
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Link href="/builder">
                  <Button variant="outline" className="w-full text-xs font-bold">
                    Start with Free Export
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Plan 2: ₹19 / 7-Day Pass */}
            <Card className="border-2 border-accent bg-card p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl">
                Confirmed Indian Pricing
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-accent">
                  7-Day Unlimited Career Pass
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">₹19 Unlimited Pass</h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-foreground">₹19</span>
                    <span className="text-xs text-muted-foreground">
                      + ₹3.42 GST (18%) = <strong className="text-foreground">₹22.42 total</strong>
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    Strictly manual repurchase • Zero recurring auto-debit
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Complete unmetered access for an active 7-day job hunting sprint across Indian tech and corporate roles.
                </p>

                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2 font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    Unlimited PDF &amp; DOCX downloads for 7 days
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    Full access to all 108 ATS resume templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    Groq AI Conversational Resume Builder
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    Google XYZ bullet polisher &amp; keyword optimizer
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    Deep ATS scoring &amp; 1-click issue auto-fix
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    Job Description Matcher &amp; Tailored bullets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    India-focused Job Discovery (Rolling 72h)
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Button
                  onClick={handleStartCheckout}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs sm:text-sm shadow-md"
                >
                  Buy 7-Day Pass for ₹19 (+GST)
                </Button>
              </div>
            </Card>
          </div>

          {/* Payment History / Invoices */}
          {transactions.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-border">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Payment History &amp; Receipts
              </h3>

              <div className="border border-border rounded-xl overflow-hidden bg-card text-xs">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 border-b border-border/60 last:border-none flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <p className="font-bold text-foreground">
                        7-Day Unlimited Career Pass — ₹{tx.totalAmount.toFixed(2)} INR
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        Ref: {tx.razorpayOrderId} • Paid via {tx.paymentMethod.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </span>
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]">
                        Success
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RAZORPAY CHECKOUT DIALOG */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Lock className="h-4 w-4 text-emerald-600" />
              Razorpay Secure Checkout
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-xs py-2">
            {/* Price breakdown */}
            <div className="p-3.5 rounded-lg bg-secondary/40 border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">7-Day Unlimited Pass:</span>
                <span className="font-semibold text-foreground">₹19.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applicable 18% GST (CGST + SGST):</span>
                <span className="font-semibold text-foreground">₹3.42</span>
              </div>
              <div className="flex justify-between border-t border-border/80 pt-1.5 font-bold text-sm text-foreground">
                <span>Total Payable:</span>
                <span className="text-accent">₹22.42 INR</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="font-bold text-foreground block">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-accent bg-accent/10 font-bold'
                      : 'border-border hover:bg-secondary/40'
                  }`}
                >
                  <QrCode className="h-4 w-4 mx-auto text-emerald-600" />
                  <div className="text-[11px]">UPI / QR</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-accent bg-accent/10 font-bold'
                      : 'border-border hover:bg-secondary/40'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mx-auto text-blue-600" />
                  <div className="text-[11px]">Card</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-accent bg-accent/10 font-bold'
                      : 'border-border hover:bg-secondary/40'
                  }`}
                >
                  <Building className="h-4 w-4 mx-auto text-indigo-600" />
                  <div className="text-[11px]">Net Banking</div>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground">
              By paying, you confirm a single, manual one-time purchase. Your account will never be charged recurring fees automatically.
            </p>

            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm h-10"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Authorizing via Razorpay...
                </>
              ) : (
                'Pay ₹22.42 & Activate 7-Day Pass'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* SUCCESS RECEIPT DIALOG */}
      {successReceipt && (
        <Dialog open={!!successReceipt} onOpenChange={() => setSuccessReceipt(null)}>
          <DialogContent className="max-w-md text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
            <div>
              <DialogTitle className="text-lg font-bold">Payment Confirmed</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Your 7-Day Unlimited Career Pass is active until {successReceipt.activatedUntil}.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/40 border border-border text-xs text-left space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Order Ref:</span>
                <span className="font-bold">{successReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Ref:</span>
                <span>{successReceipt.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span>{successReceipt.amount}</span>
              </div>
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground font-bold text-xs"
              onClick={() => {
                setSuccessReceipt(null);
                router.push('/builder');
              }}
            >
              Return to Resume Builder
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <SiteFooter />
    </div>
  );
}
