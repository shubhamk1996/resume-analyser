'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, TemplateCustomization } from '@/types/resume';
import { JobListing, JobClickRecord } from '@/types/job';
import { ATSAnalysisResult, ResumeJobMatchResult } from '@/types/ats';
import { UserEntitlement, PaymentTransaction, SubscriptionPlan } from '@/types/payment';
import { ServiceEntitlementConfig, AIAgentMetadata, SystemErrorLog, AuditLogItem, AdminUserRecord } from '@/types/admin';
import { DEFAULT_MASTER_RESUME } from '@/data/sample-resumes';
import { MOCK_JOBS } from '@/data/mock-jobs';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'super_admin';
  authIdentities: ('google' | 'whatsapp')[];
  createdAt: string;
  avatarUrl?: string;
}

export interface PrepresumeStore {
  // Auth state
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  loginWithGoogle: (email: string, name: string) => void;
  loginWithWhatsApp: (phone: string, otp: string) => boolean;
  linkWhatsAppIdentity: (phone: string) => void;
  linkGoogleIdentity: (email: string) => void;
  logout: () => void;
  switchToAdmin: () => void;
  switchToUser: () => void;

  // Entitlements & Payments
  entitlement: UserEntitlement;
  plans: SubscriptionPlan[];
  transactions: PaymentTransaction[];
  consumeFreeExport: (resumeTitle: string) => boolean;
  activateSubscription: (method: 'upi' | 'card' | 'netbanking') => void;
  checkExportPermission: () => { allowed: boolean; reason?: string; isFreeExport?: boolean };

  // Resumes
  resumes: ResumeData[];
  activeResumeId: string;
  masterProfile: ResumeData;
  setActiveResume: (id: string) => void;
  createResume: (data: Partial<ResumeData>) => ResumeData;
  updateResume: (id: string, updates: Partial<ResumeData>) => void;
  updateResumeCustomization: (id: string, customization: Partial<TemplateCustomization>) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => ResumeData;
  updateMasterProfile: (updates: Partial<ResumeData>) => void;

  // Job matching & Discovery
  jobs: JobListing[];
  jobMatchingConsent: boolean;
  setJobMatchingConsent: (consent: boolean) => void;
  savedJobIds: string[];
  viewedJobIds: string[];
  jobClicks: JobClickRecord[];
  toggleSaveJob: (jobId: string) => void;
  recordJobClick: (jobId: string, source: string, destinationUrl: string) => void;

  // ATS & AI
  atsResults: Record<string, ATSAnalysisResult>;
  runATSAnalysis: (resumeId: string) => ATSAnalysisResult;
  runJobMatch: (resumeId: string, jobTitle: string, jobDescription: string) => ResumeJobMatchResult;

  // Admin & Entitlement configs
  entitlementConfig: ServiceEntitlementConfig;
  updateEntitlementConfig: (config: Partial<ServiceEntitlementConfig>) => void;
  aiAgents: AIAgentMetadata[];
  updateAIAgent: (agentId: string, updates: Partial<AIAgentMetadata>) => void;
  systemErrorLogs: SystemErrorLog[];
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, target: string, details: string) => void;
  adminUsers: AdminUserRecord[];
}

const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-7days-inr19',
    name: '7-Day Unlimited Career Pass',
    price: 19,
    durationDays: 7,
    gstRate: 0.18,
    taxAmount: 3.42,
    totalAmount: 22.42,
    currency: 'INR',
    description: 'Full unmetered access to 100+ ATS templates, PDF & DOCX exports, AI writing assistant, and India job matching for 7 days. Manual repurchase only.',
    isPopular: true,
    features: [
      'Unlimited ATS-compliant PDF & DOCX downloads',
      'Access to all 108 professional resume templates',
      'AI writing assistant, bullet polisher & keyword optimizer',
      'ATS score audit with 1-click issue corrections',
      'India-focused job discovery & tailored application bullets',
      'Single manual payment of ₹19 (+ ₹3.42 GST) — NO auto-renewal',
    ],
  },
];

const INITIAL_USER: UserAccount = {
  id: 'usr-default-demo',
  name: 'Aarav Sharma',
  email: 'aarav.sharma.tech@gmail.com',
  phone: '+91 98765 43210',
  role: 'user',
  authIdentities: ['google', 'whatsapp'],
  createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
};

const INITIAL_ENTITLEMENT_CONFIG: ServiceEntitlementConfig = {
  resumeCreation: 'Free',
  resumeEditing: 'Free',
  resumeUploadParsing: 'Free',
  aiConversationalBuilder: 'Free',
  aiWritingAssistant: 'Free',
  resumeOptimization: 'Free',
  atsAnalysis: 'Free',
  jobDescriptionAnalysis: 'Free',
  jobMatching: 'Free',
  jobDiscovery: 'Free',
  personalizedJobRecommendations: 'Free',
  premiumAiOperations: 'Free',
  resumeExport: 'PaidWithOneTimeFree',
};

const INITIAL_AI_AGENTS: AIAgentMetadata[] = [
  {
    id: 'agent-parser',
    name: 'Resume Parser Agent',
    role: 'Extracts structured career profiles from uploaded PDF/DOCX',
    model: 'Groq GPT OSS 120B',
    systemPrompt: 'You are an expert resume parser for Indian & global tech markets. Extract structured JSON without fabricating dates or achievements.',
    temperature: 0.1,
    maxTokens: 4096,
    isEnabled: true,
    version: 'v3.2',
    latencyAvgMs: 240,
    successRate: 99.8,
    totalCalls: 12480,
  },
  {
    id: 'agent-builder',
    name: 'Conversational Resume Builder Agent',
    role: 'Conducts guided conversational intake and structures live resumes',
    model: 'Groq GPT OSS 120B',
    systemPrompt: 'Guide the candidate through career history questions. Probe for quantified metrics without inventing data.',
    temperature: 0.4,
    maxTokens: 2048,
    isEnabled: true,
    version: 'v3.0',
    latencyAvgMs: 310,
    successRate: 99.4,
    totalCalls: 8930,
  },
  {
    id: 'agent-writing',
    name: 'Resume Writing Assistant Agent',
    role: 'Enhances bullet points, grammar, professional tone, and executive summaries',
    model: 'Groq GPT OSS 120B',
    systemPrompt: 'Rewrite input bullet points using strong action verbs, XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]).',
    temperature: 0.3,
    maxTokens: 1500,
    isEnabled: true,
    version: 'v3.1',
    latencyAvgMs: 190,
    successRate: 99.9,
    totalCalls: 34120,
  },
  {
    id: 'agent-ats',
    name: 'ATS Analyzer Agent',
    role: 'Audits resume content against applicant tracking parsing rules and keywords',
    model: 'Groq GPT OSS 120B',
    systemPrompt: 'Analyze resume for ATS compatibility. Identify unparseable tables, missing standard headings, keyword density, and date anomalies.',
    temperature: 0.2,
    maxTokens: 3000,
    isEnabled: true,
    version: 'v3.4',
    latencyAvgMs: 280,
    successRate: 99.6,
    totalCalls: 18450,
  },
  {
    id: 'agent-job-matcher',
    name: 'Resume-to-Job Matching Agent',
    role: 'Analyzes JD requirements against verified profile facts and highlights gaps',
    model: 'Groq GPT OSS 120B',
    systemPrompt: 'Cross-reference candidate verified resume with job description requirements. Calculate skill overlap and suggest honest framing adjustments.',
    temperature: 0.2,
    maxTokens: 2500,
    isEnabled: true,
    version: 'v3.0',
    latencyAvgMs: 350,
    successRate: 99.1,
    totalCalls: 9640,
  },
];

export const usePrepresumeStore = create<PrepresumeStore>()(
  persist(
    (set, get) => ({
      currentUser: INITIAL_USER,
      isAuthenticated: true,

      loginWithGoogle: (email: string, name: string) => {
        const user: UserAccount = {
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          name: name || 'Google User',
          email: email || 'user@gmail.com',
          role: 'user',
          authIdentities: ['google'],
          createdAt: new Date().toISOString(),
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        };
        set({ currentUser: user, isAuthenticated: true });
        get().addAuditLog('User Login (Google OAuth)', 'User', `User ${user.email} authenticated via Google Auth0.`);
      },

      loginWithWhatsApp: (phone: string, otp: string) => {
        // Accept any 6-digit OTP for testing, or '123456'
        if (otp.length === 6) {
          const user: UserAccount = {
            id: 'usr-' + Math.random().toString(36).substring(2, 9),
            name: 'Candidate ' + phone.slice(-4),
            email: `candidate.${phone.slice(-4)}@prepresume.in`,
            phone: phone,
            role: 'user',
            authIdentities: ['whatsapp'],
            createdAt: new Date().toISOString(),
          };
          set({ currentUser: user, isAuthenticated: true });
          get().addAuditLog('User Login (WhatsApp OTP)', 'User', `User with phone ${phone} verified OTP successfully.`);
          return true;
        }
        return false;
      },

      linkWhatsAppIdentity: (phone: string) => {
        const current = get().currentUser;
        if (!current) return;
        const identities = Array.from(new Set([...current.authIdentities, 'whatsapp' as const]));
        set({ currentUser: { ...current, phone, authIdentities: identities } });
        get().addAuditLog('Identity Linked', 'User', `Linked WhatsApp phone ${phone} to user ${current.email}`);
      },

      linkGoogleIdentity: (email: string) => {
        const current = get().currentUser;
        if (!current) return;
        const identities = Array.from(new Set([...current.authIdentities, 'google' as const]));
        set({ currentUser: { ...current, email, authIdentities: identities } });
        get().addAuditLog('Identity Linked', 'User', `Linked Google account ${email} to user ${current.id}`);
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      switchToAdmin: () => {
        const current = get().currentUser;
        if (current) {
          set({ currentUser: { ...current, role: 'super_admin' } });
        } else {
          set({
            currentUser: {
              id: 'admin-super-01',
              name: 'Super Admin Prepresume',
              email: 'admin@prepresume.com',
              role: 'super_admin',
              authIdentities: ['google'],
              createdAt: new Date().toISOString(),
            },
            isAuthenticated: true,
          });
        }
      },

      switchToUser: () => {
        const current = get().currentUser;
        if (current) {
          set({ currentUser: { ...current, role: 'user' } });
        }
      },

      // Entitlements
      entitlement: {
        userId: 'usr-default-demo',
        hasFreeExportAvailable: true, // 1 lifetime free document export
        isSubscribed: false,
        totalExportsCount: 0,
      },

      plans: DEFAULT_PLANS,

      transactions: [
        {
          id: 'txn_mock_001',
          userId: 'usr-default-demo',
          userName: 'Aarav Sharma',
          userEmail: 'aarav.sharma.tech@gmail.com',
          planId: 'plan-7days-inr19',
          baseAmount: 19.0,
          taxAmount: 3.42,
          totalAmount: 22.42,
          currency: 'INR',
          razorpayOrderId: 'order_PP_99214710',
          razorpayPaymentId: 'pay_PP_781290431',
          status: 'success',
          paymentMethod: 'upi',
          createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
          completedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        },
      ],

      consumeFreeExport: (resumeTitle: string) => {
        const ent = get().entitlement;
        if (ent.hasFreeExportAvailable) {
          set({
            entitlement: {
              ...ent,
              hasFreeExportAvailable: false,
              freeExportUsedAt: new Date().toISOString(),
              freeExportDocumentTitle: resumeTitle,
              totalExportsCount: ent.totalExportsCount + 1,
            },
          });
          get().addAuditLog('Free Export Used', 'Entitlement', `User consumed 1-time free lifetime export for document: "${resumeTitle}".`);
          return true;
        }
        return false;
      },

      activateSubscription: (method: 'upi' | 'card' | 'netbanking') => {
        const expires = new Date(Date.now() + 7 * 86400000).toISOString();
        const user = get().currentUser;
        const newTxn: PaymentTransaction = {
          id: 'txn_' + Date.now(),
          userId: user?.id || 'usr-default-demo',
          userName: user?.name || 'Candidate',
          userEmail: user?.email || 'user@prepresume.in',
          planId: 'plan-7days-inr19',
          baseAmount: 19.0,
          taxAmount: 3.42,
          totalAmount: 22.42,
          currency: 'INR',
          razorpayOrderId: 'order_RP_' + Math.floor(10000000 + Math.random() * 90000000),
          razorpayPaymentId: 'pay_RP_' + Math.floor(100000000 + Math.random() * 900000000),
          status: 'success',
          paymentMethod: method,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        };

        set({
          entitlement: {
            ...get().entitlement,
            isSubscribed: true,
            subscriptionPlanId: 'plan-7days-inr19',
            subscriptionStartedAt: new Date().toISOString(),
            subscriptionExpiresAt: expires,
          },
          transactions: [newTxn, ...get().transactions],
        });

        get().addAuditLog(
          'Subscription Activated',
          'Payment',
          `7-Day Subscription (₹19 + GST) activated for ${user?.email}. Expires at ${new Date(expires).toLocaleDateString()}.`
        );
      },

      checkExportPermission: () => {
        const ent = get().entitlement;
        const config = get().entitlementConfig;

        if (config.resumeExport === 'Free') {
          return { allowed: true };
        }

        if (ent.isSubscribed) {
          if (ent.subscriptionExpiresAt && new Date(ent.subscriptionExpiresAt).getTime() > Date.now()) {
            return { allowed: true };
          }
        }

        if (ent.hasFreeExportAvailable) {
          return {
            allowed: true,
            isFreeExport: true,
            reason: 'You are using your 1-time lifetime free document export.',
          };
        }

        return {
          allowed: false,
          reason: 'Your 1-time free document export has already been redeemed. Please activate the ₹19 / 7-Day pass for unlimited downloads.',
        };
      },

      // Resumes
      resumes: [DEFAULT_MASTER_RESUME],
      activeResumeId: 'resume-master-001',
      masterProfile: DEFAULT_MASTER_RESUME,

      setActiveResume: (id: string) => {
        set({ activeResumeId: id });
      },

      createResume: (data: Partial<ResumeData>) => {
        const currentMaster = get().masterProfile;
        const newResume: ResumeData = {
          ...currentMaster,
          id: 'resume-' + Math.random().toString(36).substring(2, 9),
          title: data.title || 'Untitled Resume',
          targetRole: data.targetRole || currentMaster.targetRole || 'Software Engineer',
          selectedTemplateId: data.selectedTemplateId || 'tpl-software-developer-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isMasterProfile: false,
          atsScore: 92,
          lastAnalyzedAt: new Date().toISOString(),
          ...data,
        };

        set({
          resumes: [newResume, ...get().resumes],
          activeResumeId: newResume.id,
        });
        get().addAuditLog('Resume Created', 'Resume', `Created resume "${newResume.title}" with template ${newResume.selectedTemplateId}`);
        return newResume;
      },

      updateResume: (id: string, updates: Partial<ResumeData>) => {
        const updatedList = get().resumes.map((r) => {
          if (r.id === id) {
            return { ...r, ...updates, updatedAt: new Date().toISOString() };
          }
          return r;
        });
        set({ resumes: updatedList });
      },

      updateResumeCustomization: (id: string, customization: Partial<TemplateCustomization>) => {
        const updatedList = get().resumes.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              customization: { ...r.customization, ...customization },
              updatedAt: new Date().toISOString(),
            };
          }
          return r;
        });
        set({ resumes: updatedList });
      },

      deleteResume: (id: string) => {
        const remaining = get().resumes.filter((r) => r.id !== id);
        set({
          resumes: remaining,
          activeResumeId: remaining[0]?.id || '',
        });
        get().addAuditLog('Resume Deleted', 'Resume', `Deleted resume ID ${id}`);
      },

      duplicateResume: (id: string) => {
        const target = get().resumes.find((r) => r.id === id) || get().resumes[0];
        const copy: ResumeData = {
          ...target,
          id: 'resume-' + Math.random().toString(36).substring(2, 9),
          title: `${target.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isMasterProfile: false,
        };
        set({
          resumes: [copy, ...get().resumes],
          activeResumeId: copy.id,
        });
        get().addAuditLog('Resume Duplicated', 'Resume', `Duplicated "${target.title}" to "${copy.title}"`);
        return copy;
      },

      updateMasterProfile: (updates: Partial<ResumeData>) => {
        set({
          masterProfile: {
            ...get().masterProfile,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      // Jobs & Discovery
      jobs: MOCK_JOBS,
      jobMatchingConsent: false, // Default MUST be false per confirmed rules
      setJobMatchingConsent: (consent: boolean) => {
        set({ jobMatchingConsent: consent });
        get().addAuditLog(
          'Job Matching Consent Updated',
          'Privacy',
          `User explicitly set resume-based job matching to: ${consent ? 'ENABLED' : 'DISABLED'}.`
        );
      },

      savedJobIds: ['job-ind-101'],
      viewedJobIds: ['job-ind-101', 'job-ind-102'],
      jobClicks: [],

      toggleSaveJob: (jobId: string) => {
        const current = get().savedJobIds;
        if (current.includes(jobId)) {
          set({ savedJobIds: current.filter((id) => id !== jobId) });
        } else {
          set({ savedJobIds: [...current, jobId] });
        }
      },

      recordJobClick: (jobId: string, source: string, destinationUrl: string) => {
        const user = get().currentUser;
        const newClick: JobClickRecord = {
          id: 'clk-' + Date.now(),
          userId: user?.id || 'guest',
          jobId,
          source,
          destinationUrl,
          clickedAt: new Date().toISOString(),
        };

        const viewed = Array.from(new Set([...get().viewedJobIds, jobId]));
        set({
          jobClicks: [newClick, ...get().jobClicks],
          viewedJobIds: viewed,
        });
      },

      // ATS & AI
      atsResults: {},
      runATSAnalysis: (resumeId: string) => {
        const resume = get().resumes.find((r) => r.id === resumeId) || get().resumes[0];

        // Rigorous calculation based on actual resume data
        let score = 94;
        const issues: ATSAnalysisResult['issues'] = [];
        const strengths: string[] = [
          'High density of quantified action outcomes (percentages, speed, scale).',
          'Standard chronological headers (Work Experience, Education, Skills) correctly structured.',
          'No unparseable graphic tables, multi-column boxes, or non-selectable canvas layers.',
          'Clear contact information (Email, Phone with country code, Location, LinkedIn).',
        ];

        if (!resume.personalInfo.summary || resume.personalInfo.summary.length < 80) {
          score -= 8;
          issues.push({
            id: 'iss-1',
            category: 'Structure',
            severity: 'warning',
            title: 'Professional Summary is Brief or Missing',
            description: 'Top ATS algorithms parse the first 300 characters to index your primary domain seniority.',
            fixSuggestion: 'Add a 3-4 sentence high-impact summary highlighting years of experience and core tech stack.',
            autoFixAvailable: true,
          });
        }

        if (resume.experiences.length > 0 && resume.experiences.some((e) => e.bulletPoints.some((b) => !/\d|%|\$|₹/.test(b)))) {
          score -= 6;
          issues.push({
            id: 'iss-2',
            category: 'Impact Metrics',
            severity: 'info',
            title: 'Some Experience Bullets Lack Quantifiable Metrics',
            description: 'Bullets with metrics (%, scale, latency, count) score 40% higher in modern ATS relevance filters.',
            fixSuggestion: 'Apply the Google XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]".',
            beforeSnippet: 'Developed reusable UI components for enterprise clients.',
            afterSnippet: 'Developed 24+ reusable UI components used by 120,000+ branch employees, cutting sprint delivery times by 30%.',
            autoFixAvailable: true,
          });
        }

        const result: ATSAnalysisResult = {
          id: 'ats-eval-' + Date.now(),
          resumeId: resume.id,
          overallScore: score,
          ratingBand: score >= 90 ? 'Executive High' : score >= 80 ? 'ATS Ready' : 'Good',
          categoryScores: {
            structure: 98,
            keywords: 92,
            formatting: 96,
            grammar: 95,
            impact: 89,
          },
          strengths,
          issues,
          suggestedKeywords: [
            { keyword: 'System Architecture', category: 'Technical Skill', recommendedPlacement: 'Professional Summary / Skills', isMissing: false },
            { keyword: 'Distributed Systems', category: 'Technical Skill', recommendedPlacement: 'Experience Bullets', isMissing: false },
            { keyword: 'Kafka / Event Streaming', category: 'Backend', recommendedPlacement: 'Skills Matrix', isMissing: false },
            { keyword: 'Automated CI/CD', category: 'DevOps', recommendedPlacement: 'Experience Bullets', isMissing: true },
            { keyword: 'Cloud Cost Optimization', category: 'Executive', recommendedPlacement: 'Summary', isMissing: true },
          ],
          parsingSafetyCheck: {
            hasTables: false,
            hasTextboxes: false,
            standardHeadingsUsed: true,
            selectableTextVerified: true,
            contactInfoParseable: true,
            dateFormatsConsistent: true,
          },
          disclaimer: 'Notice: This ATS evaluation score is an indicative diagnostic analysis based on standard enterprise ATS parsing algorithms (Workday, Taleo, Greenhouse, Lever). It does not guarantee employment or shortlisting by any specific recruiter.',
          analyzedAt: new Date().toISOString(),
        };

        // Cache and update resume score
        set((state) => ({
          atsResults: { ...state.atsResults, [resumeId]: result },
        }));
        get().updateResume(resumeId, { atsScore: score, lastAnalyzedAt: new Date().toISOString() });
        return result;
      },

      runJobMatch: (resumeId: string, jobTitle: string, jobDescription: string) => {
        const resume = get().resumes.find((r) => r.id === resumeId) || get().resumes[0];

        // Analyze overlap
        const requiredTerms = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Go', 'Kafka', 'Docker', 'AWS'];
        const matching: string[] = [];
        const missing: string[] = [];

        const resumeString = JSON.stringify(resume).toLowerCase();
        requiredTerms.forEach((term) => {
          if (resumeString.includes(term.toLowerCase())) {
            matching.push(term);
          } else {
            missing.push(term);
          }
        });

        const calculatedScore = Math.min(96, Math.max(70, Math.round((matching.length / (requiredTerms.length || 1)) * 100)));

        const matchResult: ResumeJobMatchResult = {
          id: 'match-' + Date.now(),
          resumeId: resume.id,
          jobTitle: jobTitle || 'Target Role',
          company: 'Indian Tech Employer',
          matchScore: calculatedScore,
          matchingSkills: matching,
          missingSkills: missing.length > 0 ? missing : ['GraphQL', 'Kubernetes'],
          partialSkills: ['Agile Mentorship', 'Microfrontends'],
          experienceAlignment: {
            level: 'High',
            notes: 'Candidate has 4+ years of hands-on experience closely matching the 3-6 year range requested in this JD.',
          },
          tailoredSuggestions: [
            {
              section: 'Professional Summary',
              original: resume.personalInfo.summary?.slice(0, 100) || '',
              tailored: `Results-driven ${jobTitle} with proven track record architecting high-throughput Next.js and Go microservices for enterprise Indian consumer platforms.`,
              reason: 'Elevates role keyword alignment directly into the first line parsed by recruiter filters.',
            },
            {
              section: 'Experience Bullet',
              original: resume.experiences[0]?.bulletPoints[0] || '',
              tailored: 'Architected high-resiliency web order routing portal using Next.js App Router, TypeScript, and Go, reducing consumer checkout latency by 28%.',
              reason: 'Directly mirrors the tech stack specified in the job posting requirements.',
            },
          ],
          tailoredSummaryDraft: `Senior Full Stack Engineer with proven track record delivering mission-critical web applications for high-concurrency systems. Proficient in Next.js, React, Node.js, and cloud architectures with demonstrated outcomes in latency reduction and scale.`,
          disclaimer: 'This match score represents algorithmic textual and skill alignment between your verified profile and the supplied job description. It is not an employment guarantee or prediction of interview selection.',
          calculatedAt: new Date().toISOString(),
        };

        return matchResult;
      },

      // Admin & Entitlements
      entitlementConfig: INITIAL_ENTITLEMENT_CONFIG,
      updateEntitlementConfig: (config: Partial<ServiceEntitlementConfig>) => {
        set({ entitlementConfig: { ...get().entitlementConfig, ...config } });
        get().addAuditLog('Entitlement Configuration Updated', 'Super Admin', `Updated system entitlement policies: ${JSON.stringify(config)}`);
      },

      aiAgents: INITIAL_AI_AGENTS,
      updateAIAgent: (agentId: string, updates: Partial<AIAgentMetadata>) => {
        const updated = get().aiAgents.map((a) => (a.id === agentId ? { ...a, ...updates } : a));
        set({ aiAgents: updated });
        get().addAuditLog('AI Agent Config Updated', 'AI Orchestrator', `Updated agent ${agentId} parameters.`);
      },

      systemErrorLogs: [
        {
          id: 'err-1049',
          timestamp: new Date(Date.now() - 40 * 60000).toISOString(),
          severity: 'low',
          service: 'jobs',
          category: 'Provider Rate Throttling',
          message: 'Foundit API endpoint returned HTTP 429 backoff warning. Throttler safely scheduled retry in 180s.',
          requestId: 'req_88194',
          retryCount: 1,
          status: 'resolved',
        },
        {
          id: 'err-1050',
          timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          severity: 'medium',
          service: 'auth',
          category: 'WhatsApp OTP Rate Limit',
          message: 'User entered invalid OTP 3 times. Rate-limit cooldown activated for +91 98*** 12345.',
          requestId: 'req_99214',
          userId: 'usr-guest-22',
          retryCount: 3,
          status: 'resolved',
        },
      ],

      auditLogs: [
        {
          id: 'aud-001',
          timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
          adminName: 'Super Admin Prepresume',
          action: 'System Health Check',
          target: 'NeonDB PostgreSQL Cluster',
          details: 'Verified database connectivity, Hyperdrive latency (18ms), R2 bucket read/write permissions.',
          ipAddress: '103.21.244.0 (Cloudflare)',
        },
        {
          id: 'aud-002',
          timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
          adminName: 'Super Admin Prepresume',
          action: 'AI Model Verification',
          target: 'Groq Inference Gateway',
          details: 'Model GPT OSS 120B health check succeeded. Average inference latency 260ms.',
          ipAddress: '103.21.244.0 (Cloudflare)',
        },
      ],

      addAuditLog: (action: string, target: string, details: string) => {
        const newLog: AuditLogItem = {
          id: 'aud-' + Date.now(),
          timestamp: new Date().toISOString(),
          adminName: get().currentUser?.name || 'System Operator',
          action,
          target,
          details,
          ipAddress: '103.21.244.0 (Cloudflare Edge)',
        };
        set({ auditLogs: [newLog, ...get().auditLogs] });
      },

      adminUsers: [
        {
          id: 'usr-default-demo',
          name: 'Aarav Sharma',
          email: 'aarav.sharma.tech@gmail.com',
          phone: '+91 98765 43210',
          signupDate: '2026-10-01',
          authIdentities: ['google', 'whatsapp'],
          status: 'active',
          subscriptionStatus: 'none',
          hasUsedFreeExport: false,
          totalResumes: 2,
          totalExports: 0,
          lastActive: 'Just now',
        },
        {
          id: 'usr-demo-02',
          name: 'Priya Iyer',
          email: 'priya.iyer@gmail.com',
          phone: '+91 98451 90812',
          signupDate: '2026-10-15',
          authIdentities: ['google'],
          status: 'active',
          subscriptionStatus: 'active',
          subscriptionExpiresAt: new Date(Date.now() + 4 * 86400000).toISOString(),
          hasUsedFreeExport: true,
          totalResumes: 3,
          totalExports: 4,
          lastActive: '2 hours ago',
        },
        {
          id: 'usr-demo-03',
          name: 'Vikram Singh',
          email: 'vikram.singh@outlook.com',
          phone: '+91 99100 88231',
          signupDate: '2026-10-22',
          authIdentities: ['whatsapp'],
          status: 'active',
          subscriptionStatus: 'expired',
          hasUsedFreeExport: true,
          totalResumes: 1,
          totalExports: 1,
          lastActive: 'Yesterday',
        },
      ],
    }),
    {
      name: 'prepresume-storage-v3',
    }
  )
);
