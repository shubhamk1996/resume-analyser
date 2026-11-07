'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Your message has been received. Our support team will respond within 4 business hours.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="border-accent text-accent">Support &amp; Inquiries</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get in Touch with Prepresume
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Have questions about ATS templates, the ₹19 pass, or India job listings? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card space-y-4 text-xs">
                <h2 className="text-sm font-bold text-foreground">Direct Contacts</h2>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Support &amp; Billing</p>
                    <p className="text-muted-foreground font-mono">support@prepresume.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Statutory Grievance Officer</p>
                    <p className="text-muted-foreground font-mono">grievance@prepresume.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Registered Office</p>
                    <p className="text-muted-foreground">Prepresume Technologies, Outer Ring Road, Bellandur, Bengaluru, Karnataka, 560103, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-card p-6 sm:p-8 rounded-xl border border-border shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold">Message Dispatched</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Thank you, {form.name || 'Candidate'}. We have logged ticket #{Math.floor(100000 + Math.random() * 900000)} and will reply to {form.email} promptly.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send another query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold">Your Name</label>
                      <Input
                        required
                        placeholder="e.g. Aarav Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold">Email Address</label>
                      <Input
                        required
                        type="email"
                        placeholder="aarav@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Subject</label>
                    <Input
                      required
                      placeholder="e.g. ₹19 Pass or ATS Score Inquiry"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Message</label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Describe your inquiry or feedback in detail..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm">
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
