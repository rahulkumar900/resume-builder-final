'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Briefcase,
  Layers,
  Palette,
  FileText,
  X,
} from 'lucide-react';
import { TemplateId } from '@/types/resume';
import { TEMPLATES, COLOR_PALETTES } from '@/lib/templates';
import { createCustomResume } from '@/lib/storage';
import { getDynamicSections } from '@/lib/onboarding-logic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { JobTitleAutocomplete } from '@/components/builder/JobTitleAutocomplete';

interface NewResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplateId?: TemplateId;
}

const POPULAR_ROLES = [
  'Senior Product Designer',
  'Full Stack Developer',
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'Marketing Specialist',
];

export const NewResumeModal: React.FC<NewResumeModalProps> = ({
  isOpen,
  onClose,
  initialTemplateId = 'prawira',
}) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [targetRole, setTargetRole] = useState('');
  const [resumeTitle, setResumeTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'mid' | 'senior'>('entry');
  const [templateId, setTemplateId] = useState<TemplateId>(initialTemplateId);
  const [themeColor, setThemeColor] = useState<string>('#2563eb');

  if (!isOpen) return null;

  const handleCreate = () => {
    const finalRole = targetRole.trim();
    const finalTitle = resumeTitle.trim() || (finalRole ? `${finalRole} Resume` : 'Untitled Resume');
    const sectionOrder = getDynamicSections(finalRole || 'General', experienceLevel);

    const newResume = createCustomResume({
      title: finalTitle,
      targetRole: finalRole,
      templateId,
      themeColor,
      experienceLevel,
      starterType: 'blank',
      sectionOrder,
    });

    onClose();
    router.push(`/builder/${newResume.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-blue-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Create New Resume</h2>
              <p className="text-xs text-slate-500">
                {step === 1 ? 'Step 1 of 2: Role & Experience' : 'Step 2 of 2: Template & Theme'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {step === 1 ? (
            <div className="space-y-5">
              {/* Target Job Role Input */}
              <div className="space-y-2">
                <Label required className="text-sm font-semibold text-slate-800">
                  What job role are you targeting?
                </Label>
                <JobTitleAutocomplete
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={targetRole}
                  onChange={(val) => {
                    setTargetRole(val);
                    if (!resumeTitle || resumeTitle.includes('Resume')) {
                      setResumeTitle(val ? `${val} Resume` : '');
                    }
                  }}
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-medium text-slate-400 mr-1">Popular:</span>
                  {POPULAR_ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setTargetRole(role);
                        setResumeTitle(`${role} Resume`);
                      }}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        targetRole === role
                          ? 'bg-emerald-50 text-blue-700 border-emerald-300 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-800">
                  Experience Level
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'entry', label: 'Entry Level', desc: '0 - 2 years' },
                    { id: 'mid', label: 'Mid-Level', desc: '3 - 5 years' },
                    { id: 'senior', label: 'Senior / Lead', desc: '6+ years' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setExperienceLevel(lvl.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        experienceLevel === lvl.id
                          ? 'border-blue-600 bg-emerald-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{lvl.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Template Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-800">
                  Select Visual Template
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTemplateId(t.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                        templateId === t.id
                          ? 'border-blue-600 bg-emerald-50/40 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{t.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 capitalize">
                        {t.layout} column layout
                      </div>
                      {templateId === t.id && (
                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Color Palette */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-800">
                  Accent Color
                </Label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {COLOR_PALETTES.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setThemeColor(color.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        themeColor === color.value
                          ? 'scale-115 border-slate-900 shadow-sm'
                          : 'border-white hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {themeColor === color.value && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          {step === 2 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStep(1)}
              className="gap-1.5 text-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => setStep(2)}
              className="gap-1.5 font-semibold px-5 cursor-pointer"
            >
              <span>Choose Template</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleCreate}
              className="gap-1.5 font-bold px-6 bg-emerald-700 hover:bg-emerald-800 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Building</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
