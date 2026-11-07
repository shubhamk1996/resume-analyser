import { ResumeData } from '@/types/resume';

export const DEFAULT_MASTER_RESUME: ResumeData = {
  id: 'resume-master-001',
  userId: 'usr-default-demo',
  title: 'Full Stack Engineer Resume',
  targetRole: 'Senior Full Stack Engineer',
  targetIndustry: 'Technology & Internet',
  selectedTemplateId: 'tpl-software-developer-1',
  atsScore: 94,
  lastAnalyzedAt: new Date().toISOString(),
  createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
  isMasterProfile: true,
  customization: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10.5,
    lineHeight: 1.35,
    sectionSpacing: 14,
    margins: 20,
    primaryColor: '#0F172A',
    accentColor: '#0D9488',
    headingColor: '#0F172A',
    textColor: '#334155',
    bulletStyle: 'disc',
    headerLayout: 'left',
    dateAlignment: 'right',
    showPhoto: false,
  },
  personalInfo: {
    fullName: 'Aarav Sharma',
    headline: 'Senior Full Stack Software Engineer | Next.js, TypeScript & Distributed Systems',
    email: 'aarav.sharma.tech@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka, India',
    linkedin: 'linkedin.com/in/aaravsharma-dev',
    github: 'github.com/aaravsharma',
    portfolio: 'aaravsharma.dev',
    summary: 'High-impact Full Stack Engineer with 4+ years of hands-on experience building low-latency, scalable web applications for high-growth tech platforms. Proven track record optimizing web performance (sub-2s LCP), architecting distributed microservices handling 2M+ daily requests, and leading cross-functional frontend initiatives with React, Next.js, Node.js, and PostgreSQL.',
  },
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Full Stack Engineer',
      company: 'Growfin Technologies',
      location: 'Bengaluru, India',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      bulletPoints: [
        'Architected real-time merchant onboarding portal using Next.js App Router, TypeScript, and Tailwind CSS, reducing drop-off rates by 28%.',
        'Engineered high-throughput event processing pipelines with Node.js, Kafka, and PostgreSQL, handling over 3.5 million daily financial ledger updates.',
        'Mentored 6 junior engineers on unit testing, state management, and semantic accessibility, achieving 92% automated test coverage across sprint deliverables.',
        'Integrated automated ATS resume and document validation pipelines cutting applicant screening time by 45%.'
      ],
    },
    {
      id: 'exp-2',
      jobTitle: 'Software Engineer',
      company: 'Infosys Limited',
      location: 'Hyderabad, India',
      startDate: '2021-06',
      endDate: '2022-12',
      isCurrent: false,
      bulletPoints: [
        'Developed reusable UI components for enterprise banking clients using React, Redux Toolkit, and RESTful APIs, used by 120,000+ branch employees.',
        'Optimized client-side bundle size by 35% through dynamic code-splitting and memoization, decreasing initial page load from 4.1s to 1.8s.',
        'Collaborated with product managers to deliver 14 consecutive bi-weekly sprints on time with zero P1 production bugs.'
      ],
    },
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science and Engineering',
      institution: 'National Institute of Technology (NIT) Karnataka, Surathkal',
      location: 'Mangaluru, India',
      startDate: '2017-08',
      endDate: '2021-05',
      gradeOrCgpa: '8.8 / 10 CGPA',
      achievements: [
        'Dean List for Academic Excellence (2019, 2020)',
        'Head of Web Development Committee, Incident National Fest'
      ],
    },
  ],
  skills: [
    {
      category: 'Frontend & UI',
      skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'HTML5/CSS3', 'Web Accessibility (a11y)'],
    },
    {
      category: 'Backend & Databases',
      skills: ['Node.js', 'Express', 'Go', 'PostgreSQL', 'NeonDB', 'Redis', 'REST APIs', 'GraphQL'],
    },
    {
      category: 'Cloud & DevOps',
      skills: ['Docker', 'AWS (S3, EC2)', 'Cloudflare Workers', 'CI/CD (GitHub Actions)', 'Vercel', 'Git'],
    },
    {
      category: 'Methodologies & Testing',
      skills: ['Agile / Scrum', 'Jest', 'Playwright', 'System Design', 'Performance Optimization'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Distributed Real-Time Collaborative Canvas',
      role: 'Lead Architect & Developer',
      technologies: ['Next.js', 'WebSockets', 'Canvas API', 'Redis Pub/Sub', 'Tailwind CSS'],
      startDate: '2023-04',
      endDate: '2023-09',
      url: 'https://github.com/aaravsharma/collaborative-canvas',
      bulletPoints: [
        'Designed multi-user synchronized whiteboard with conflict-free replicated data types (CRDTs) supporting up to 50 concurrent sketchers.',
        'Achieved sub-20ms broadcast latency across geographically distributed users using Redis pub/sub clusters.'
      ],
    },
    {
      id: 'proj-2',
      title: 'DevMetrics — GitHub Team Velocity Tracker',
      role: 'Solo Creator',
      technologies: ['TypeScript', 'GraphQL API', 'PostgreSQL', 'Chart.js'],
      startDate: '2022-03',
      endDate: '2022-07',
      url: 'https://github.com/aaravsharma/devmetrics',
      bulletPoints: [
        'Automated pull request cycle-time telemetry, PR review bottlenecks, and test flakiness monitoring for 15+ engineering repositories.',
        'Adopted by 4 internal product squads, reducing average pull request merge turnaround from 3.2 days to 1.1 days.'
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: '2023-08',
      credentialUrl: 'https://aws.amazon.com/verification',
      credentialId: 'AWS-SAA-8849201',
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Front-End Developer Specialization',
      issuer: 'Meta / Coursera',
      issueDate: '2022-01',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Prize Winner — Smart India Hackathon (SIH)',
      description: 'Built an AI-driven disaster relief supply chain dispatch tracker selected as the national winning project among 1,200 teams.',
      date: '2020',
    },
    {
      id: 'ach-2',
      title: 'Growfin Innovation Award (Q3 2023)',
      description: 'Recognized by VP of Engineering for spearheading web vitals optimization across checkout gateways.',
      date: '2023',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', name: 'Hindi', proficiency: 'Native' },
    { id: 'lang-3', name: 'Kannada', proficiency: 'Professional' },
  ],
  customSections: [],
  sectionOrder: ['summary', 'experiences', 'skills', 'projects', 'educations', 'certifications', 'achievements', 'languages'],
  visibleSections: {
    summary: true,
    experiences: true,
    skills: true,
    projects: true,
    educations: true,
    certifications: true,
    achievements: true,
    languages: true,
  },
};
