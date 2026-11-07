'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShieldAlert,
  Users,
  DollarSign,
  FileText,
  Activity,
  Layers,
  Sparkles,
  AlertTriangle,
  History,
  Settings,
  Briefcase,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  Check,
  Server,
  Database,
  Cloud,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SuperAdminPage() {
  const {
    currentUser,
    switchToAdmin,
    switchToUser,
    entitlementConfig,
    updateEntitlementConfig,
    aiAgents,
    updateAIAgent,
    systemErrorLogs,
    auditLogs,
    addAuditLog,
    adminUsers,
    transactions,
    jobs,
    resumes,
  } = usePrepresumeStore();

  const [adminTab, setAdminTab] = useState<
    'overview' | 'users' | 'entitlements' | 'ai-agents' | 'errors' | 'audit' | 'health'
  >('overview');

  const [userSearch, setUserSearch] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
  const [editingPrompt, setEditingPrompt] = useState(aiAgents[0]?.systemPrompt || '');

  // Calculate aggregated stats
  const totalRevenue = transactions.reduce((acc, t) => acc + (t.status === 'success' ? t.totalAmount : 0), 2840.0);
  const totalExports = 1480;
  const freeExportsCount = 920;
  const paidExportsCount = 560;

  const handleUpdateEntitlement = (serviceKey: string, value: string) => {
    updateEntitlementConfig({ [serviceKey]: value } as any);
    toast.success(`Service entitlement for "${serviceKey}" set to "${value}"`);
  };

  const handleSavePrompt = () => {
    updateAIAgent(selectedAgent.id, { systemPrompt: editingPrompt });
    toast.success(`System prompt updated for ${selectedAgent.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Admin Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/10">
                  <ShieldAlert className="h-3.5 w-3.5 mr-1" /> Super Admin Control Console
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">Restricted Access (India Cloudflare Edge)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Prepresume Operations &amp; Intelligence Hub
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage revenue, service entitlements, Groq AI agents, error telemetry, and regulatory audit trails.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  switchToUser();
                  toast.info('Switched to Candidate View');
                }}
                className="text-xs font-semibold"
              >
                Switch to Candidate View
              </Button>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
            {[
              { id: 'overview', label: 'Platform Overview', icon: Activity },
              { id: 'users', label: 'User Directory', icon: Users },
              { id: 'entitlements', label: 'Service Entitlements', icon: Settings },
              { id: 'ai-agents', label: 'Groq AI Agents', icon: Sparkles },
              { id: 'errors', label: 'Error Telemetry', icon: AlertTriangle },
              { id: 'audit', label: 'Audit Logs', icon: History },
              { id: 'health', label: 'System Health', icon: Server },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    adminTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-secondary/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW METRICS */}
          {adminTab === 'overview' && (
            <div className="space-y-6">
              {/* Primary KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border border-border p-4 space-y-1">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Total Registered Candidates</span>
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-black text-foreground">1,842</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">+128 this week</p>
                </Card>

                <Card className="border border-border p-4 space-y-1">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Active ₹19 Subscriptions</span>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-foreground">348</p>
                  <p className="text-[11px] text-muted-foreground font-mono">100% manual repurchase</p>
                </Card>

                <Card className="border border-border p-4 space-y-1">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Total Revenue (Razorpay INR)</span>
                    <DollarSign className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-2xl font-black text-accent">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-muted-foreground">98.8% payment gateway success rate</p>
                </Card>

                <Card className="border border-border p-4 space-y-1">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Total Document Exports</span>
                    <FileText className="h-4 w-4 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-black text-foreground">{totalExports}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Free: {freeExportsCount} | Paid: {paidExportsCount}
                  </p>
                </Card>
              </div>

              {/* Operations Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-border p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Job Discovery Ingestion Status (India 72h)
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-secondary/40">
                      <span>Total Active Indian Listings:</span>
                      <strong>{jobs.length} verified jobs</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary/40">
                      <span>Primary Ingestion Providers:</span>
                      <strong>Naukri Direct API, LinkedIn India, Foundit</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary/40">
                      <span>Candidate Job Clicks Recorded:</span>
                      <strong>420 outbound applications</strong>
                    </div>
                  </div>
                </Card>

                <Card className="border border-border p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Groq AI Inference Telemetry
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-secondary/40">
                      <span>Active Inference Model:</span>
                      <strong>Groq GPT OSS 120B / Llama 3.3</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary/40">
                      <span>Average Inference Latency:</span>
                      <strong className="text-emerald-600 font-mono">240 ms</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary/40">
                      <span>Total AI Requests Processed:</span>
                      <strong>83,620 agent calls</strong>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 2: USER DIRECTORY */}
          {adminTab === 'users' && (
            <Card className="border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Candidate User Directory</CardTitle>
                <div className="w-64">
                  <Input
                    placeholder="Search candidate name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-secondary/40 text-muted-foreground uppercase text-[10px]">
                        <th className="p-3">Candidate</th>
                        <th className="p-3">Identities</th>
                        <th className="p-3">Subscription</th>
                        <th className="p-3">Free Export</th>
                        <th className="p-3">Resumes</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {adminUsers
                        .filter(
                          (u) =>
                            u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                            u.email.toLowerCase().includes(userSearch.toLowerCase())
                        )
                        .map((u) => (
                          <tr key={u.id} className="hover:bg-secondary/20">
                            <td className="p-3">
                              <p className="font-bold text-foreground">{u.name}</p>
                              <p className="text-[11px] text-muted-foreground font-mono">{u.email}</p>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1">
                                {u.authIdentities.map((id) => (
                                  <span
                                    key={id}
                                    className="capitalize px-1.5 py-0.5 rounded bg-secondary text-[10px] font-mono"
                                  >
                                    {id}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-3">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                                  u.subscriptionStatus === 'active'
                                    ? 'bg-emerald-500/10 text-emerald-600'
                                    : 'bg-secondary text-muted-foreground'
                                }`}
                              >
                                {u.subscriptionStatus.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-[11px]">
                                {u.hasUsedFreeExport ? 'Consumed (1/1)' : 'Available (0/1)'}
                              </span>
                            </td>
                            <td className="p-3 font-mono">{u.totalResumes} drafts</td>
                            <td className="p-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-[11px]"
                                onClick={() => {
                                  addAuditLog(
                                    'Admin Resume Inspection',
                                    'User Support',
                                    `Super Admin inspected candidate profile for ${u.email} under authorized support ticket.`
                                  );
                                  toast.success(`Support access logged for ${u.name}`);
                                }}
                              >
                                Support Inspect
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 3: SERVICE ENTITLEMENTS (Module 18.4) */}
          {adminTab === 'entitlements' && (
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4 text-accent" />
                  Granular Service Entitlement Rules (Admin Configurable)
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Section 18.4 requirement: Configure whether individual platform modules are Free, Paid (requiring the ₹19 pass), or Disabled.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  {Object.entries(entitlementConfig).map(([key, val]) => (
                    <div key={key} className="p-3.5 rounded-lg border border-border bg-card space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            val === 'Free'
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : val === 'Paid'
                              ? 'bg-amber-500/10 text-amber-600'
                              : 'bg-blue-500/10 text-blue-600'
                          }`}
                        >
                          {val}
                        </span>
                      </div>

                      <div className="flex gap-1.5 pt-1">
                        {['Free', 'Paid', 'Disabled'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleUpdateEntitlement(key, opt)}
                            className={`flex-1 py-1 rounded text-[10px] font-semibold border transition-all ${
                              val === opt
                                ? 'bg-primary text-primary-foreground border-primary font-bold'
                                : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 4: GROQ AI AGENTS MANAGEMENT */}
          {adminTab === 'ai-agents' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Specialized AI Agents
                </h3>
                {aiAgents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setEditingPrompt(agent.systemPrompt);
                    }}
                    className={`w-full p-3 rounded-lg border text-left transition-all text-xs ${
                      selectedAgent.id === agent.id
                        ? 'border-accent bg-accent/10 shadow-xs'
                        : 'border-border bg-card hover:bg-secondary/40'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-foreground">{agent.name}</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">
                        {agent.latencyAvgMs}ms
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                      {agent.role}
                    </p>
                  </button>
                ))}
              </div>

              <div className="md:col-span-8 bg-card border border-border rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <div>
                    <h2 className="text-base font-bold text-foreground">{selectedAgent.name}</h2>
                    <p className="text-xs text-muted-foreground font-mono">
                      Model: {selectedAgent.model} • Calls: {selectedAgent.totalCalls.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs">
                    Success: {selectedAgent.successRate}%
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    System Instruction Prompt (Version {selectedAgent.version})
                  </label>
                  <Textarea
                    rows={6}
                    className="text-xs font-mono"
                    value={editingPrompt}
                    onChange={(e) => setEditingPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-secondary/40 border border-border">
                    <span className="text-muted-foreground">Temperature:</span>{' '}
                    <strong>{selectedAgent.temperature}</strong>
                  </div>
                  <div className="p-2.5 rounded bg-secondary/40 border border-border">
                    <span className="text-muted-foreground">Max Tokens:</span>{' '}
                    <strong>{selectedAgent.maxTokens}</strong>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button size="sm" onClick={handleSavePrompt} className="text-xs font-bold">
                    Save Prompt Configuration
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ERROR TELEMETRY */}
          {adminTab === 'errors' && (
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  System Error &amp; Exception Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemErrorLogs.map((err) => (
                  <div key={err.id} className="p-3.5 rounded-lg border border-border bg-secondary/20 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-bold uppercase">
                          {err.severity}
                        </span>
                        {err.service.toUpperCase()} — {err.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {new Date(err.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-mono text-[11px] pt-1">
                      {err.message}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* TAB 6: AUDIT LOGS */}
          {adminTab === 'audit' && (
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="h-4 w-4 text-accent" />
                  Regulatory Audit Trail (Section 20.10)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg border border-border bg-card text-xs flex justify-between items-start">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">
                        {log.action} <span className="font-normal text-muted-foreground">— {log.target}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">{log.details}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        Admin: {log.adminName} • IP: {log.ipAddress}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap ml-4">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* TAB 7: SYSTEM HEALTH */}
          {adminTab === 'health' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="flex justify-between items-center font-bold text-foreground">
                  <span className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-emerald-600" /> Cloudflare Workers
                  </span>
                  <span className="text-emerald-600 font-mono text-[10px]">OPERATIONAL</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Edge compute latency: 12ms</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="flex justify-between items-center font-bold text-foreground">
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-emerald-600" /> NeonDB PostgreSQL
                  </span>
                  <span className="text-emerald-600 font-mono text-[10px]">OPERATIONAL</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Connection pool: Healthy (18ms)</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="flex justify-between items-center font-bold text-foreground">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" /> Groq AI Inference
                  </span>
                  <span className="text-emerald-600 font-mono text-[10px]">OPERATIONAL</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Model: GPT OSS 120B (240ms)</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="flex justify-between items-center font-bold text-foreground">
                  <span className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-emerald-600" /> Cloudflare R2 Storage
                  </span>
                  <span className="text-emerald-600 font-mono text-[10px]">OPERATIONAL</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Zero egress private vault</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="flex justify-between items-center font-bold text-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Razorpay Gateway
                  </span>
                  <span className="text-emerald-600 font-mono text-[10px]">OPERATIONAL</span>
                </div>
                <p className="text-muted-foreground text-[11px]">UPI, Debit, Cards verified</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
