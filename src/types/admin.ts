export interface ServiceEntitlementConfig {
  resumeCreation: 'Free' | 'Paid' | 'Disabled';
  resumeEditing: 'Free' | 'Paid' | 'Disabled';
  resumeUploadParsing: 'Free' | 'Paid' | 'Disabled';
  aiConversationalBuilder: 'Free' | 'Paid' | 'Disabled';
  aiWritingAssistant: 'Free' | 'Paid' | 'Disabled';
  resumeOptimization: 'Free' | 'Paid' | 'Disabled';
  atsAnalysis: 'Free' | 'Paid' | 'Disabled';
  jobDescriptionAnalysis: 'Free' | 'Paid' | 'Disabled';
  jobMatching: 'Free' | 'Paid' | 'Disabled';
  jobDiscovery: 'Free' | 'Paid' | 'Disabled';
  personalizedJobRecommendations: 'Free' | 'Paid' | 'Disabled';
  premiumAiOperations: 'Free' | 'Paid' | 'Disabled';
  resumeExport: 'PaidWithOneTimeFree' | 'PaidOnly' | 'Free';
}

export interface AIAgentMetadata {
  id: string;
  name: string;
  role: string;
  model: string; // e.g. "Groq GPT OSS 120B" / "Llama-3.3-70b-versatile"
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  isEnabled: boolean;
  version: string;
  latencyAvgMs: number;
  successRate: number; // percentage, e.g. 99.4%
  totalCalls: number;
}

export interface SystemErrorLog {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  service: 'auth' | 'ai' | 'payments' | 'ats' | 'pdf' | 'jobs' | 'database';
  category: string;
  message: string;
  requestId: string;
  userId?: string;
  retryCount: number;
  status: 'open' | 'investigating' | 'resolved';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  target: string;
  details: string;
  ipAddress: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  signupDate: string;
  authIdentities: ('google' | 'whatsapp')[];
  status: 'active' | 'suspended';
  subscriptionStatus: 'active' | 'expired' | 'none';
  subscriptionExpiresAt?: string;
  hasUsedFreeExport: boolean;
  totalResumes: number;
  totalExports: number;
  lastActive: string;
}
