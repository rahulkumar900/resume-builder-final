'use client';

import React, { useState } from 'react';
import { PersonalInfo } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Camera, Globe, Mail, Phone, MapPin, User, UploadCloud, ChevronDown, ChevronUp } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/common/BrandIcons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { JobTitleAutocomplete } from '@/components/builder/JobTitleAutocomplete';

export const PersonalSection: React.FC<SectionComponentProps<PersonalInfo>> = ({
  data,
  onChange,
  hideHeader = false,
}) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnchorRect, setAiAnchorRect] = useState<DOMRect | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Strip html tags to count words accurately
  const cleanSummaryText = (data.summary || '').replace(/<[^>]*>/g, ' ').trim();
  const words = cleanSummaryText ? cleanSummaryText.split(/\s+/).filter(Boolean).length : 0;

  const initials = data.fullName
    ? data.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'YOU';

  const formBody = (
    <div className="space-y-5">
      {/* Profile Photo Banner & Quick Upload */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-card border border-slate-200/80 dark:border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-muted flex items-center justify-center text-slate-500 shrink-0">
            {data.avatarUrl ? (
              <img src={data.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-xl object-cover" />
            ) : (
              <Camera className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 dark:text-foreground">
              {data.avatarUrl ? 'Photo uploaded' : 'No photo. Most ATS ignore photos; some regions expect one.'}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-muted-foreground">
              {data.avatarUrl ? 'Click Change to replace or remove' : 'Optional • PNG or JPG up to 5MB'}
            </div>
          </div>
        </div>

        <label
          htmlFor="avatar-file-input"
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted hover:bg-slate-50 dark:hover:bg-accent text-xs font-semibold text-slate-700 dark:text-foreground cursor-pointer transition-colors shadow-2xs shrink-0"
        >
          {data.avatarUrl ? 'Change' : 'Add'}
          <input
            id="avatar-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 5 * 1024 * 1024) {
                alert('Image must be less than 5MB');
                return;
              }
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === 'string') {
                  updateField('avatarUrl', reader.result);
                }
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>

      {/* Main Identity & Contact Stack - Clean Relaxed Grid */}
      <div className="space-y-4.5">
        {/* Row 1: Full Name & Headline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Full name
            </Label>
            <Input
              type="text"
              placeholder="e.g. Rahul Kumar"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="h-10 text-sm font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Headline
            </Label>
            <JobTitleAutocomplete
              value={data.jobTitle || ''}
              onChange={(val) => updateField('jobTitle', val)}
              placeholder="e.g. Senior Software Engineer"
              className="h-10 text-sm font-medium"
            />
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="e.g. name@example.com"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Phone Number
            </Label>
            <Input
              type="tel"
              placeholder="e.g. +1 (555) 019-2834"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="h-10 text-sm"
            />
          </div>
        </div>

        {/* Row 3: Location & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Location
            </Label>
            <Input
              type="text"
              placeholder="e.g. San Francisco, CA or Remote"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Website / Portfolio
            </Label>
            <Input
              type="text"
              placeholder="https://yourportfolio.com"
              value={data.website || ''}
              onChange={(e) => updateField('website', e.target.value)}
              className="h-10 text-sm"
            />
          </div>
        </div>

        {/* Row 4: LinkedIn & GitHub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
              <span>LinkedIn Profile</span>
            </Label>
            <Input
              type="text"
              placeholder="linkedin.com/in/username"
              value={data.linkedin || ''}
              onChange={(e) => updateField('linkedin', e.target.value)}
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
              <span>GitHub Profile</span>
            </Label>
            <Input
              type="text"
              placeholder="github.com/username"
              value={data.github || ''}
              onChange={(e) => updateField('github', e.target.value)}
              className="h-10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-xs font-semibold text-slate-700 dark:text-foreground">Professional Summary</Label>
            <p className="text-[11px] text-slate-400 dark:text-muted-foreground">
              A concise 2–3 sentence overview highlighting your core strengths and impact
            </p>
          </div>
        </div>

        <RichTextEditor
          value={data.summary || ''}
          placeholder="Detail your background, core technical capabilities, and measurable impact..."
          minHeight="110px"
          onOpenAiSuggestions={(rect) => {
            setAiAnchorRect(rect || null);
            setIsAiModalOpen(true);
          }}
          aiButtonLabel="AI Suggestions"
          onChange={(html) => updateField('summary', html)}
        />
      </div>

      {/* AI Suggestions Modal */}
      {isAiModalOpen && (
        <AiSuggestionModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          anchorRect={aiAnchorRect}
          type="summary"
          roleContext={data.jobTitle}
          onUpdateRole={(newRole) => updateField('jobTitle', newRole)}
          onInsert={(text, mode) => {
            if (mode === 'replace' || !data.summary) {
              updateField('summary', `<p>${text}</p>`);
            } else {
              updateField('summary', `${data.summary} <p>${text}</p>`);
            }
          }}
        />
      )}
    </div>
  );

  if (hideHeader) {
    return formBody;
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-xs overflow-hidden transition-all">
      {/* Collapsible Card Header (matches screenshot: [RK] Rahul Kumar ^) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            {initials}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-foreground">
              {data.fullName || 'Personal Details'}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-muted-foreground">
              {data.jobTitle || 'Headline, contact information and profile summary'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          title={isOpen ? 'Collapse Section' : 'Expand Section'}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 dark:border-border/60 mt-1">
          {formBody}
        </div>
      )}
    </div>
  );
};

