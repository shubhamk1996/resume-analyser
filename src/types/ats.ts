export interface ATSIssue {
  id: string;
  category: 'Structure' | 'Keywords' | 'Formatting' | 'Grammar & Clarity' | 'Contact & Metadata' | 'Impact Metrics';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  fixSuggestion: string;
  beforeSnippet?: string;
  afterSnippet?: string;
  autoFixAvailable: boolean;
}

export interface ATSAnalysisResult {
  id: string;
  resumeId: string;
  overallScore: number; // 0 - 100
  ratingBand: 'Poor' | 'Average' | 'Good' | 'ATS Ready' | 'Executive High';
  categoryScores: {
    structure: number;
    keywords: number;
    formatting: number;
    grammar: number;
    impact: number;
  };
  strengths: string[];
  issues: ATSIssue[];
  suggestedKeywords: {
    keyword: string;
    category: string;
    recommendedPlacement: string;
    isMissing: boolean;
  }[];
  parsingSafetyCheck: {
    hasTables: boolean;
    hasTextboxes: boolean;
    standardHeadingsUsed: boolean;
    selectableTextVerified: boolean;
    contactInfoParseable: boolean;
    dateFormatsConsistent: boolean;
  };
  disclaimer: string;
  analyzedAt: string;
}

export interface JobDescriptionAnalysis {
  id: string;
  jobTitle: string;
  company?: string;
  extractedSkills: {
    required: string[];
    preferred: string[];
    tools: string[];
  };
  experienceRequired: string;
  educationRequired: string;
  keyResponsibilities: string[];
}

export interface ResumeJobMatchResult {
  id: string;
  resumeId: string;
  jobTitle: string;
  company?: string;
  matchScore: number; // 0 - 100
  matchingSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  experienceAlignment: {
    level: 'High' | 'Moderate' | 'Low';
    notes: string;
  };
  tailoredSuggestions: {
    section: string;
    original: string;
    tailored: string;
    reason: string;
  }[];
  tailoredSummaryDraft?: string;
  disclaimer: string;
  calculatedAt: string;
}
