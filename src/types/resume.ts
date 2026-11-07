export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  headline?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bulletPoints: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  gradeOrCgpa?: string;
  achievements?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  bulletPoints: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export interface TemplateCustomization {
  fontFamily: 'DM Sans' | 'Plus Jakarta Sans' | 'Inter' | 'Merriweather' | 'JetBrains Mono';
  fontSize: number; // pt or rem equivalent (10, 10.5, 11, 11.5, 12)
  lineHeight: number; // 1.2, 1.3, 1.4, 1.5
  sectionSpacing: number; // 8, 12, 16, 20
  margins: number; // 16, 20, 24, 28 (px)
  primaryColor: string; // Hex color code
  accentColor: string;
  headingColor: string;
  textColor: string;
  bulletStyle: 'disc' | 'circle' | 'dash' | 'arrow';
  headerLayout: 'left' | 'center' | 'split';
  dateAlignment: 'right' | 'below';
  showPhoto: boolean;
}

export interface ResumeData {
  id: string;
  userId: string;
  title: string;
  targetRole: string;
  targetIndustry?: string;
  selectedTemplateId: string;
  customization: TemplateCustomization;
  personalInfo: PersonalInfo;
  experiences: WorkExperience[];
  educations: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
  customSections: CustomSection[];
  sectionOrder: string[]; // e.g. ['summary', 'experiences', 'skills', 'projects', 'educations', 'certifications', 'achievements', 'languages']
  visibleSections: Record<string, boolean>;
  atsScore?: number;
  lastAnalyzedAt?: string;
  createdAt: string;
  updatedAt: string;
  isMasterProfile?: boolean;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: 
    | 'Professional'
    | 'Modern'
    | 'Minimal'
    | 'Executive'
    | 'Student'
    | 'Fresher'
    | 'Technical'
    | 'Software Developer'
    | 'Data Analyst'
    | 'Engineering'
    | 'Marketing'
    | 'Finance'
    | 'Sales'
    | 'HR'
    | 'Management'
    | 'Creative'
    | 'Corporate'
    | 'Academic';
  description: string;
  atsRating: number; // e.g. 98%
  atsClassification: 'Highly Compatible' | 'ATS Certified' | 'Standard Safe';
  isPopular?: boolean;
  isNew?: boolean;
  defaultCustomization: Partial<TemplateCustomization>;
  tags: string[];
}
