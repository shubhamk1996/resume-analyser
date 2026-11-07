export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string; // e.g. "Bengaluru, Karnataka", "Hyderabad, Telangana", "Mumbai, Maharashtra", "Gurugram / Delhi-NCR", "Pune", "Remote (India)"
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Contract' | 'Internship' | 'Part-time';
  experienceRange: string; // e.g. "2 - 5 years", "Fresher / 0 - 1 year"
  salaryRange?: string; // e.g. "₹12,00,000 - ₹18,00,000 P.A.", "Not Disclosed"
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  source: 'Naukri Direct API' | 'LinkedIn India' | 'Foundit' | 'Prepresume Verified Employer' | 'Company Career Portal';
  applicationUrl: string;
  publishedAt: string; // ISO 8601 timestamp
  lastVerifiedAt: string;
  expiresAt?: string;
  isActive: boolean;
  matchScore?: number; // Calculated on-demand when user opts in
}

export interface JobFilter {
  query?: string;
  location?: string;
  workplaceType?: string;
  experience?: string;
  tab: 'for-you' | 'latest-72h' | 'saved' | 'viewed';
}

export interface JobClickRecord {
  id: string;
  userId: string;
  jobId: string;
  source: string;
  destinationUrl: string;
  clickedAt: string;
}
