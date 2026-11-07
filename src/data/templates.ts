import { ResumeTemplate } from '@/types/resume';

const CATEGORIES: ResumeTemplate['category'][] = [
  'Professional',
  'Modern',
  'Minimal',
  'Executive',
  'Student',
  'Fresher',
  'Technical',
  'Software Developer',
  'Data Analyst',
  'Engineering',
  'Marketing',
  'Finance',
  'Sales',
  'HR',
  'Management',
  'Creative',
  'Corporate',
  'Academic',
];

const FONTS: ('DM Sans' | 'Plus Jakarta Sans' | 'Inter' | 'Merriweather' | 'JetBrains Mono')[] = [
  'Plus Jakarta Sans',
  'DM Sans',
  'Inter',
  'Merriweather',
  'JetBrains Mono',
];

const COLOR_PALETTES = [
  { primary: '#0F172A', accent: '#0D9488', heading: '#0F172A', text: '#334155' }, // Slate & Teal
  { primary: '#1E293B', accent: '#2563EB', heading: '#0F172A', text: '#334155' }, // Deep Blue
  { primary: '#18181B', accent: '#059669', heading: '#18181B', text: '#3F3F46' }, // Zinc & Emerald
  { primary: '#0C4A6E', accent: '#0284C7', heading: '#0C4A6E', text: '#334155' }, // Ocean Cyan
  { primary: '#27272A', accent: '#D97706', heading: '#18181B', text: '#3F3F46' }, // Charcoal Amber
  { primary: '#111827', accent: '#4F46E5', heading: '#111827', text: '#374151' }, // Classic Indigo
];

// Generate 108 carefully structured ATS-ready templates
export const RESUME_TEMPLATES: ResumeTemplate[] = [];

let idCounter = 1;

CATEGORIES.forEach((category, catIdx) => {
  // 6 templates per category = 18 * 6 = 108 templates!
  const variants = [
    { suffix: 'Standard ATS', atsScore: 98, desc: 'High-parsing priority format with linear column flow and semantic headings.' },
    { suffix: 'Compact Pro', atsScore: 97, desc: 'Optimized whitespace for dense 1-page impact with maximum keyword density.' },
    { suffix: 'Executive Clean', atsScore: 99, desc: 'Refined header hierarchy with chronological timeline structure.' },
    { suffix: 'Modern Linear', atsScore: 96, desc: 'Sleek single-column design certified against Workday, Taleo, and Greenhouse.' },
    { suffix: 'Keyword Focused', atsScore: 98, desc: 'Enhanced technical skills matrix and quantified achievements showcase.' },
    { suffix: 'Corporate Elite', atsScore: 97, desc: 'Boardroom-ready typography with crisp dividers and standardized section titles.' },
  ];

  variants.forEach((v, vIdx) => {
    const id = `tpl-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${vIdx + 1}`;
    const palette = COLOR_PALETTES[(catIdx + vIdx) % COLOR_PALETTES.length];
    const font = FONTS[(catIdx + vIdx) % FONTS.length];

    RESUME_TEMPLATES.push({
      id,
      name: `${category} ${v.suffix}`,
      category,
      description: `${v.desc} Designed specifically for ${category} roles in Indian and multinational enterprises.`,
      atsRating: v.atsScore,
      atsClassification: v.atsScore >= 98 ? 'Highly Compatible' : 'ATS Certified',
      isPopular: (catIdx + vIdx) % 7 === 0,
      isNew: (catIdx + vIdx) % 11 === 0,
      tags: [category, 'Single Column', 'ATS Optimized', 'Print Safe'],
      defaultCustomization: {
        fontFamily: font,
        fontSize: 10.5,
        lineHeight: 1.35,
        sectionSpacing: 14,
        margins: 20,
        primaryColor: palette.primary,
        accentColor: palette.accent,
        headingColor: palette.heading,
        textColor: palette.text,
        bulletStyle: 'disc',
        headerLayout: vIdx % 2 === 0 ? 'left' : 'center',
        dateAlignment: 'right',
        showPhoto: false, // Default false for true ATS safety
      },
    });
    idCounter++;
  });
});
