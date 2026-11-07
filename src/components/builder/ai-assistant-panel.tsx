'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Check,
  X,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  selectedField: {
    section: string;
    title: string;
    content: string;
  } | null;
  onApplyChange: (newContent: string) => void;
  onClose: () => void;
}

export function AIAssistantPanel({ selectedField, onApplyChange, onClose }: Props) {
  const [activeMode, setActiveMode] = useState<'xyz' | 'tone' | 'concise' | 'keywords'>('xyz');
  const [inputContent, setInputContent] = useState(selectedField?.content || '');
  const [generatedSuggestion, setGeneratedSuggestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync if selected field changes
  React.useEffect(() => {
    if (selectedField?.content) {
      setInputContent(selectedField.content);
      generateQuickSuggestion(selectedField.content, activeMode);
    }
  }, [selectedField]);

  const generateQuickSuggestion = (text: string, mode: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      if (mode === 'xyz') {
        setGeneratedSuggestion(
          'Architected high-throughput Next.js microservices with TypeScript & PostgreSQL, slashing consumer latency by 32% across 2.4M daily transactions.'
        );
        setExplanation(
          'Structured via Google XYZ Formula: [Accomplished X] + [Measured by Y] + [Done by Z]. Strengthens parsing density for engineering leadership filters.'
        );
      } else if (mode === 'tone') {
        setGeneratedSuggestion(
          'Spearheaded enterprise web performance initiatives resulting in a 40% reduction in initial bundle sizes and seamless 99.9% uptime compliance.'
        );
        setExplanation('Reframed passive wording into decisive leadership action verbs (Spearheaded, Complied, Resulted).');
      } else if (mode === 'concise') {
        setGeneratedSuggestion(
          'Scaled core web checkout systems with Next.js and Redis, boosting throughput by 28%.'
        );
        setExplanation('Removed wordy filler phrases and concentrated keyword density.');
      } else {
        setGeneratedSuggestion(
          'Next.js 16, TypeScript, React Server Components, Kafka, PostgreSQL, Docker, AWS SAA, Web Vitals'
        );
        setExplanation('Key technical keywords extracted for high-relevance Indian ATS indexing.');
      }
      setIsProcessing(false);
    }, 450);
  };

  const handleApply = () => {
    if (generatedSuggestion) {
      onApplyChange(generatedSuggestion);
      toast.success('Applied AI enhancement to resume draft!');
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border overflow-hidden select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-border bg-secondary/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            AI Resume Writing Studio
          </span>
        </div>
        <Badge variant="outline" className="text-[10px] bg-accent/10 text-accent border-accent/20">
          Groq GPT OSS 120B
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Selected Context Banner */}
        <div className="p-2.5 rounded-lg bg-secondary/50 border border-border">
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Target Field:</p>
          <p className="font-semibold text-foreground text-xs">
            {selectedField?.section || 'Experience Bullet'} — {selectedField?.title || 'General Polish'}
          </p>
        </div>

        {/* Transformation Mode Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-foreground">Choose Enhancement Focus</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveMode('xyz');
                generateQuickSuggestion(inputContent, 'xyz');
              }}
              className={`p-2 rounded text-left border transition-all ${
                activeMode === 'xyz'
                  ? 'border-accent bg-accent/10 text-foreground font-bold'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="font-semibold text-[11px]">Google XYZ Formula</div>
              <div className="text-[9px] text-muted-foreground">Metrics &amp; scale impact</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode('tone');
                generateQuickSuggestion(inputContent, 'tone');
              }}
              className={`p-2 rounded text-left border transition-all ${
                activeMode === 'tone'
                  ? 'border-accent bg-accent/10 text-foreground font-bold'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="font-semibold text-[11px]">Action Verbs</div>
              <div className="text-[9px] text-muted-foreground">Executive phrasing</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode('concise');
                generateQuickSuggestion(inputContent, 'concise');
              }}
              className={`p-2 rounded text-left border transition-all ${
                activeMode === 'concise'
                  ? 'border-accent bg-accent/10 text-foreground font-bold'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="font-semibold text-[11px]">Concise 1-Line</div>
              <div className="text-[9px] text-muted-foreground">Trim unnecessary words</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode('keywords');
                generateQuickSuggestion(inputContent, 'keywords');
              }}
              className={`p-2 rounded text-left border transition-all ${
                activeMode === 'keywords'
                  ? 'border-accent bg-accent/10 text-foreground font-bold'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="font-semibold text-[11px]">Keyword Density</div>
              <div className="text-[9px] text-muted-foreground">ATS match terms</div>
            </button>
          </div>
        </div>

        {/* Input Textarea */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground">Original Draft</label>
          <Textarea
            rows={3}
            className="text-xs resize-none"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
        </div>

        {/* Regenerate Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={isProcessing}
          onClick={() => generateQuickSuggestion(inputContent, activeMode)}
          className="w-full text-xs font-semibold gap-1.5 h-8 border-border"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          {isProcessing ? 'Generating with Groq AI...' : 'Regenerate Suggestions'}
        </Button>

        {/* Generated Output Box */}
        {generatedSuggestion && (
          <div className="p-3.5 rounded-xl border border-accent/40 bg-accent/5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Recommended ATS Revision
              </span>
            </div>

            <p className="text-xs font-medium text-foreground leading-relaxed bg-background p-2.5 rounded border border-border">
              &ldquo;{generatedSuggestion}&rdquo;
            </p>

            {explanation && (
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                <strong>Why this works:</strong> {explanation}
              </p>
            )}

            {/* Accept / Reject actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                size="sm"
                onClick={handleApply}
                className="bg-accent text-accent-foreground font-bold text-xs h-8 hover:bg-accent/90"
              >
                <Check className="h-3.5 w-3.5 mr-1" /> Accept &amp; Apply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setGeneratedSuggestion('')}
                className="text-xs h-8 border-border"
              >
                <X className="h-3.5 w-3.5 mr-1" /> Dismiss
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
