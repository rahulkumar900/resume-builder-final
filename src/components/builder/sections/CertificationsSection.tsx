'use client';

import React, { useState } from 'react';
import { CertificationItem } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Plus, Trash2, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const CertificationsSection: React.FC<
  SectionComponentProps<CertificationItem[]>
> = ({ data = [], onChange, hideHeader = false }) => {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...data, newCert]);
  };

  const updateCertification = (
    index: number,
    updated: Partial<CertificationItem>
  ) => {
    const next = [...data];
    next[index] = { ...next[index], ...updated };
    onChange(next);
  };

  const removeCertification = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-5">
      {!hideHeader && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">
            Licenses &amp; Certifications
          </h2>
          <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
            Accreditations, professional credentials, and honors
          </p>
        </div>
      )}

      {data.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200/60 dark:border-amber-800">
            <Award className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-foreground">
              No certifications added yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">
              Add your industry certificates, licenses, online courses, and awards.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={addCertification}
              className="gap-1.5 font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((c, idx) => {
          const isCollapsed = collapsedIds.has(c.id);

          return (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
            >
              {/* Collapsible Accordion Header */}
              <div
                onClick={() => toggleCollapse(c.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                    #{idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                      {c.name || 'Untitled Certification'}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-muted-foreground block truncate">
                      {[c.issuer, c.date].filter(Boolean).join(' • ') || 'No details added yet'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(idx)}
                    className="h-8 w-8 hover:text-rose-600"
                    title="Delete certification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggleCollapse(c.id)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer"
                    title={isCollapsed ? 'Expand item' : 'Collapse item'}
                  >
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Form Body */}
              {!isCollapsed && (
                <div className="p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  <div className="space-y-4 sm:space-y-4.5 pt-3">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Certificate Name</label>
                      <Input
                        type="text"
                        value={c.name}
                        placeholder="e.g. AWS Certified Solutions Architect"
                        onChange={(e) => updateCertification(idx, { name: e.target.value })}
                        className="h-10 text-sm font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Issuer / Organization</label>
                      <Input
                        type="text"
                        value={c.issuer}
                        placeholder="e.g. Amazon Web Services"
                        onChange={(e) => updateCertification(idx, { issuer: e.target.value })}
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Year / Date</label>
                      <Input
                        type="text"
                        value={c.date}
                        placeholder="e.g. 2024"
                        onChange={(e) => updateCertification(idx, { date: e.target.value })}
                        className="h-10 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.length > 0 && (
        <button
          type="button"
          onClick={addCertification}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          <span>Add Another Certification</span>
        </button>
      )}
    </div>
  );
};
