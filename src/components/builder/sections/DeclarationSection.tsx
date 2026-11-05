'use client';

import React from 'react';
import { DeclarationData, PersonalInfo } from '@/types/resume';
import { FileCheck, MapPin, Calendar, User, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface DeclarationSectionProps {
  data: DeclarationData;
  personalInfo?: PersonalInfo;
  onChange: (updated: DeclarationData) => void;
  onRemove?: () => void;
  hideHeader?: boolean;
}

const PRESET_DECLARATIONS = [
  {
    label: 'Standard',
    text: 'I hereby declare that all the information provided above is true, complete, and correct to the best of my knowledge and belief.',
  },
  {
    label: 'Government & PSU',
    text: 'I hereby declare that the particulars stated above are true, complete, and authentic to the best of my knowledge and belief, and nothing has been concealed or distorted.',
  },
  {
    label: 'Corporate & Executive',
    text: 'I hereby declare that the details furnished above are authentic, accurate, and verifiable to the best of my knowledge.',
  },
];

export const DeclarationSection: React.FC<DeclarationSectionProps> = ({
  data,
  personalInfo,
  onChange,
  onRemove,
  hideHeader = false,
}) => {
  const currentText =
    data.text ??
    'I hereby declare that all the information provided above is true, complete, and correct to the best of my knowledge and belief.';
  const currentPlace = data.place ?? personalInfo?.location ?? '';
  const currentDate = data.date ?? '';
  const currentSignatory = data.signatureName ?? personalInfo?.fullName ?? '';

  const updateField = (field: keyof DeclarationData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleSetToday = () => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    updateField('date', today);
  };

  const handleUseLocation = () => {
    if (personalInfo?.location) {
      updateField('place', personalInfo.location);
    }
  };

  const handleUseFullName = () => {
    if (personalInfo?.fullName) {
      updateField('signatureName', personalInfo.fullName);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {!hideHeader && (
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/40">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Formal Declaration & Signature
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Declare the truthfulness of your resume and add a formal place, date, and signature block.
              </p>
            </div>
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-800/50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Remove Section
            </Button>
          )}
        </div>
      )}

      {/* Preset selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Declaration Statement
          </Label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400">Presets:</span>
            {PRESET_DECLARATIONS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => updateField('text', preset.text)}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-muted dark:hover:bg-muted/80 text-slate-700 dark:text-slate-300 transition-colors font-medium"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <Textarea
          rows={3}
          value={currentText}
          onChange={(e) => updateField('text', e.target.value)}
          placeholder="I hereby declare that all the information provided above is true..."
          className="text-sm leading-relaxed"
        />
      </div>

      {/* Place, Date, Signature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-card border border-slate-200/80 dark:border-border">
        {/* Place */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Place
            </Label>
            {personalInfo?.location && (
              <button
                type="button"
                onClick={handleUseLocation}
                className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                From Profile
              </button>
            )}
          </div>
          <Input
            value={currentPlace}
            onChange={(e) => updateField('place', e.target.value)}
            placeholder="e.g. New Delhi, India"
            className="text-sm"
          />
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Date
            </Label>
            <button
              type="button"
              onClick={handleSetToday}
              className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Today
            </button>
          </div>
          <Input
            value={currentDate}
            onChange={(e) => updateField('date', e.target.value)}
            placeholder="e.g. 12 November 2026"
            className="text-sm"
          />
        </div>

        {/* Signatory Name */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Signatory Name
            </Label>
            {personalInfo?.fullName && (
              <button
                type="button"
                onClick={handleUseFullName}
                className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                From Profile
              </button>
            )}
          </div>
          <Input
            value={currentSignatory}
            onChange={(e) => updateField('signatureName', e.target.value)}
            placeholder="e.g. Vikram Nair"
            className="text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          The declaration block will automatically appear on the final page of your resume in official format.
        </span>
      </div>
    </div>
  );
};
