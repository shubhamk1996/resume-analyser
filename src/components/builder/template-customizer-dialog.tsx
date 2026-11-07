'use client';

import React from 'react';
import { TemplateCustomization } from '@/types/resume';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Palette, Check, RotateCcw } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customization: TemplateCustomization;
  onUpdate: (updates: Partial<TemplateCustomization>) => void;
}

const FONTS: TemplateCustomization['fontFamily'][] = [
  'Plus Jakarta Sans',
  'DM Sans',
  'Inter',
  'Merriweather',
  'JetBrains Mono',
];

const PRESET_PALETTES = [
  { name: 'Slate & Teal', primary: '#0F172A', accent: '#0D9488', heading: '#0F172A', text: '#334155' },
  { name: 'Executive Navy', primary: '#1E293B', accent: '#2563EB', heading: '#0F172A', text: '#334155' },
  { name: 'Obsidian Emerald', primary: '#18181B', accent: '#059669', heading: '#18181B', text: '#3F3F46' },
  { name: 'Deep Cyan', primary: '#0C4A6E', accent: '#0284C7', heading: '#0C4A6E', text: '#334155' },
  { name: 'Charcoal Amber', primary: '#27272A', accent: '#D97706', heading: '#18181B', text: '#3F3F46' },
];

export function TemplateCustomizerDialog({
  open,
  onOpenChange,
  customization,
  onUpdate,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4 text-accent" />
            Resume Template Customizer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-xs py-2">
          {/* Preset Palettes */}
          <div className="space-y-2">
            <label className="font-bold text-foreground block">Curated Color Themes</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_PALETTES.map((pal) => (
                <button
                  key={pal.name}
                  type="button"
                  onClick={() =>
                    onUpdate({
                      primaryColor: pal.primary,
                      accentColor: pal.accent,
                      headingColor: pal.heading,
                      textColor: pal.text,
                    })
                  }
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                    customization.accentColor === pal.accent
                      ? 'border-accent bg-accent/10 font-bold'
                      : 'border-border hover:bg-secondary/50'
                  }`}
                >
                  <span className="truncate">{pal.name}</span>
                  <div className="flex gap-1 shrink-0 ml-2">
                    <span
                      style={{ backgroundColor: pal.primary }}
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                    />
                    <span
                      style={{ backgroundColor: pal.accent }}
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Typography Choice */}
          <div className="space-y-2">
            <label className="font-bold text-foreground block">Typography (ATS Certified)</label>
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => onUpdate({ fontFamily: font })}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    customization.fontFamily === font
                      ? 'border-accent bg-accent/10 font-bold'
                      : 'border-border hover:bg-secondary/50'
                  }`}
                >
                  <div style={{ fontFamily: font }} className="text-xs font-semibold">
                    {font}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size & Line Spacing */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Body Font Size</label>
              <select
                aria-label="Body Font Size"
                value={customization.fontSize}
                onChange={(e) => onUpdate({ fontSize: parseFloat(e.target.value) })}
                className="w-full h-8 px-2 rounded border border-border bg-background text-xs"
              >
                <option value={9.5}>Compact (9.5 pt)</option>
                <option value={10}>Standard (10.0 pt)</option>
                <option value={10.5}>Balanced (10.5 pt)</option>
                <option value={11}>Spacious (11.0 pt)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Line Height</label>
              <select
                aria-label="Line Height"
                value={customization.lineHeight}
                onChange={(e) => onUpdate({ lineHeight: parseFloat(e.target.value) })}
                className="w-full h-8 px-2 rounded border border-border bg-background text-xs"
              >
                <option value={1.25}>Tight (1.25)</option>
                <option value={1.35}>Optimal (1.35)</option>
                <option value={1.45}>Airy (1.45)</option>
              </select>
            </div>
          </div>

          {/* Margins & Section Spacing */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Page Margins</label>
              <select
                aria-label="Page Margins"
                value={customization.margins}
                onChange={(e) => onUpdate({ margins: parseInt(e.target.value, 10) })}
                className="w-full h-8 px-2 rounded border border-border bg-background text-xs"
              >
                <option value={16}>Dense (16px)</option>
                <option value={20}>Standard (20px)</option>
                <option value={24}>Wide (24px)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Section Gap</label>
              <select
                aria-label="Section Gap"
                value={customization.sectionSpacing}
                onChange={(e) => onUpdate({ sectionSpacing: parseInt(e.target.value, 10) })}
                className="w-full h-8 px-2 rounded border border-border bg-background text-xs"
              >
                <option value={10}>Compact (10px)</option>
                <option value={14}>Balanced (14px)</option>
                <option value={18}>Generous (18px)</option>
              </select>
            </div>
          </div>

          {/* Bullet Style & Header Layout */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Bullet Style</label>
              <select
                aria-label="Bullet Style"
                value={customization.bulletStyle}
                onChange={(e) => onUpdate({ bulletStyle: e.target.value as any })}
                className="w-full h-8 px-2 rounded border border-border bg-background text-xs"
              >
                <option value="disc">• Solid Circle (ATS standard)</option>
                <option value="circle">○ Open Circle</option>
                <option value="dash">- Hyphen Dash</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Header Alignment</label>
              <select
                aria-label="Header Alignment"
                value={customization.headerLayout}
                onChange={(e) => onUpdate({ headerLayout: e.target.value as any })}
                className="w-full h-8 px-2 rounded border border-border bg-background text-xs"
              >
                <option value="left">Left Aligned (Recommended)</option>
                <option value="center">Center Centered</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-border flex justify-end">
            <Button size="sm" onClick={() => onOpenChange(false)} className="text-xs font-bold">
              Done Customizing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
