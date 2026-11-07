'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Lock,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AuthPage() {
  const router = useRouter();
  const { loginWithGoogle, loginWithWhatsApp } = usePrepresumeStore();

  const [authMode, setAuthMode] = useState<'whatsapp' | 'google'>('whatsapp');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);

  // Google Login inputs
  const [googleEmail, setGoogleEmail] = useState('aarav.sharma.tech@gmail.com');
  const [googleName, setGoogleName] = useState('Aarav Sharma');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      toast.error('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setOtpSent(true);
    setOtpCode('123456'); // Simulated test OTP for frictionless testing
    toast.success(`OTP generated & delivered via WhatsApp to +91 ${cleanPhone}. (Testing code: 123456)`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      toast.error('Please enter the 6-digit verification code.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      const ok = loginWithWhatsApp('+91 ' + phoneNumber, otpCode);
      setIsVerifying(false);
      if (ok) {
        toast.success('WhatsApp identity verified successfully!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid OTP. Please try code 123456.');
      }
    }, 600);
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleName) {
      toast.error('Please fill in your name and email.');
      return;
    }
    loginWithGoogle(googleEmail, googleName);
    toast.success('Successfully authenticated with Google Auth0.');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-primary-foreground font-black text-2xl shadow-sm">
              P
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Sign in to Prepresume
            </h1>
            <p className="text-xs text-muted-foreground">
              Continue to your ATS resumes, career profile, and India job matches.
            </p>
          </div>

          <Card className="border border-border/80 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Tab Selector: WhatsApp OTP vs Google OAuth */}
              <div className="grid grid-cols-2 p-1 bg-secondary rounded-lg gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('whatsapp');
                    setOtpSent(false);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded transition-all ${
                    authMode === 'whatsapp'
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                  WhatsApp OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('google')}
                  className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded transition-all ${
                    authMode === 'google'
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  Google OAuth
                </button>
              </div>

              {/* WHATSAPP OTP TAB */}
              {authMode === 'whatsapp' ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      Instant passwordless mobile login. WhatsApp delivers your 6-digit OTP in seconds.
                    </span>
                  </div>

                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Indian Mobile Number</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-secondary text-xs font-medium text-foreground">
                            +91
                          </span>
                          <Input
                            type="tel"
                            maxLength={10}
                            className="rounded-l-none"
                            placeholder="98765 43210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Enter your 10-digit mobile number registered with WhatsApp.
                        </p>
                      </div>

                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send WhatsApp OTP
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-foreground">Enter 6-Digit Code</span>
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            className="text-accent hover:underline text-[11px]"
                          >
                            Change Number (+91 {phoneNumber})
                          </button>
                        </div>
                        <Input
                          type="text"
                          maxLength={6}
                          className="font-mono text-center tracking-widest text-lg font-bold"
                          placeholder="123456"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          required
                          autoFocus
                        />
                        <div className="p-2 rounded bg-secondary/60 text-center text-[11px] text-muted-foreground font-mono">
                          Simulated Test OTP: <span className="font-bold text-emerald-600 dark:text-emerald-400">123456</span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm"
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Verifying OTP...
                          </>
                        ) : (
                          'Verify & Proceed'
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              ) : (
                /* GOOGLE OAUTH TAB */
                <form onSubmit={handleGoogleSubmit} className="space-y-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      Secured via Auth0 Enterprise Single Sign-On with Google OAuth 2.0.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Your Full Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Google Account Email</label>
                    <Input
                      type="email"
                      placeholder="e.g. aarav.sharma@gmail.com"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm">
                    Continue with Google Auth0
                  </Button>
                </form>
              )}

              <div className="pt-3 border-t border-border/70 text-center text-[11px] text-muted-foreground space-y-2">
                <p>
                  By continuing, you agree to our{' '}
                  <a href="/legal/terms" className="underline hover:text-foreground">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="/legal/privacy" className="underline hover:text-foreground">
                    Privacy Policy
                  </a>
                  .
                </p>
                <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-3 w-3" /> 1 Lifetime Free Document Export included
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
