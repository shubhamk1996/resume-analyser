'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { usePrepresumeStore } from '@/lib/store';
import { RESUME_TEMPLATES } from '@/data/templates';
import { ResumeTemplate } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Layers,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Filter,
  Sliders,
  Sparkles,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

export default function TemplatesCatalogPage() {
  const router = useRouter();
  const { activeResumeId, resumes, updateResume, createResume } = usePrepresumeStore();
  const currentResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');

  const categories = [
    'All',
    'Software Developer',
    'Technical',
    'Data Analyst',
    'Engineering',
    'Fresher',
    'Student',
    'Executive',
    'Professional',
    'Modern',
    'Minimal',
    'Management',
    'Marketing',
    'Finance',
    'Sales',
    'HR',
    'Corporate',
    'Academic',
  ];

  const filteredTemplates = RESUME_TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClassification =
      selectedClassification === 'All' || tpl.atsClassification === selectedClassification;

    return matchesCategory && matchesSearch && matchesClassification;
  });

  const handleSelectTemplate = (template: ResumeTemplate) => {
    if (currentResume) {
      updateResume(currentResume.id, {
        selectedTemplateId: template.id,
        customization: {
          ...currentResume.customization,
          ...template.defaultCustomization,
        },
      });
      toast.success(`Template changed to "${template.name}"!`);
      router.push(`/builder?id=${currentResume.id}`);
    } else {
      const newResume = createResume({
        title: `${template.category} Resume`,
        selectedTemplateId: template.id,
        customization: template.defaultCustomization as any,
      });
      router.push(`/builder?id=${newResume.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              108 Certified ATS-Friendly Templates Available
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              ATS-Optimized Resume Templates Library
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every template is built with linear semantic hierarchy, vector selectable text, and clean headings verified against Taleo, Workday, Greenhouse, and Lever parsing engines.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9 text-xs"
                  placeholder="Search by role (e.g. Software Developer, Data Analyst, Fresher, Executive)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <select
                  aria-label="ATS Classification"
                  className="h-9 px-3 rounded-md border border-border bg-background text-xs font-medium"
                  value={selectedClassification}
                  onChange={(e) => setSelectedClassification(e.target.value)}
                >
                  <option value="All">All ATS Classifications</option>
                  <option value="Highly Compatible">Highly Compatible (98%+)</option>
                  <option value="ATS Certified">ATS Certified (95%+)</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Showing <strong>{filteredTemplates.length}</strong> ATS templates</span>
            <span>All templates accessible under platform entitlement rules</span>
          </div>

          {/* 108 Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((tpl) => (
              <Card
                key={tpl.id}
                className="border border-border/80 hover:border-accent transition-all group overflow-hidden bg-card flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 border-b border-border/60 bg-muted/30 flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground truncate max-w-[180px]">
                      {tpl.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]"
                    >
                      {tpl.atsRating}% Score
                    </Badge>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Simulated Document Preview */}
                    <div className="h-44 w-full rounded border border-border bg-background p-3 flex flex-col justify-between text-[8px] select-none overflow-hidden group-hover:shadow-md transition-shadow relative">
                      <div className="space-y-1">
                        <div
                          style={{ backgroundColor: tpl.defaultCustomization.primaryColor }}
                          className="h-2 w-28 rounded"
                        />
                        <div
                          style={{ backgroundColor: tpl.defaultCustomization.accentColor }}
                          className="h-1.5 w-36 rounded opacity-80"
                        />
                      </div>

                      <div className="space-y-1">
                        <div
                          style={{ backgroundColor: tpl.defaultCustomization.accentColor }}
                          className="h-1.5 w-16 rounded"
                        />
                        <div className="h-1 w-full bg-border rounded" />
                        <div className="h-1 w-5/6 bg-border rounded" />
                        <div className="h-1 w-4/6 bg-border rounded" />
                      </div>

                      <div className="space-y-1">
                        <div
                          style={{ backgroundColor: tpl.defaultCustomization.accentColor }}
                          className="h-1.5 w-20 rounded"
                        />
                        <div className="h-1 w-full bg-border rounded" />
                        <div className="h-1 w-3/4 bg-border rounded" />
                      </div>

                      <div className="absolute top-2 right-2 text-[8px] font-mono font-bold text-muted-foreground uppercase px-1 py-0.5 rounded bg-secondary">
                        {tpl.defaultCustomization.fontFamily}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {tpl.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 pt-0">
                  <Button
                    onClick={() => handleSelectTemplate(tpl)}
                    className="w-full h-8 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Use in 3-Panel Studio <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
