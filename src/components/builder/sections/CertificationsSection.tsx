'use client';

import React, { useState } from 'react';
import { CertificationItem } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Plus, Trash2, ChevronDown, ChevronUp, Award, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MobileFullscreenItemModal } from '@/components/builder/MobileFullscreenItemModal';

export const CertificationsSection: React.FC<
  SectionComponentProps<CertificationItem[]>
> = ({ data = [], onChange, hideHeader = false }) => {
  const [expandedDesktopIds, setExpandedDesktopIds] = useState<Set<string>>(new Set());
  const [mobileEditingId, setMobileEditingId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileEditingId(id);
    } else {
      setExpandedDesktopIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
  };

  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...data, newCert]);
    setMobileEditingId(newCert.id);
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

  const mobileEditingIndex = data.findIndex((item) => item.id === mobileEditingId);
  const mobileEditingItem = mobileEditingIndex !== -1 ? data[mobileEditingIndex] : null;

  const renderCertificationForm = (c: CertificationItem, idx: number) => (
    <div className="space-y-4 sm:space-y-4.5 pt-1">
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
  );

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
              className="gap-1.5 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((c, idx) => {
          const isExpandedDesktop = expandedDesktopIds.has(c.id);

          return (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
            >
              {/* Header */}
              <div
                onClick={() => handleItemClick(c.id)}
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
                  {/* Mobile-only prominent Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileEditingId(c.id);
                    }}
                    className="lg:hidden min-h-[36px] px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition-colors mr-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(idx)}
                    className="h-8 w-8 hover:text-rose-600"
                    title="Delete certification"
                    aria-label="Delete certification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {/* Desktop-only accordion expand chevron */}
                  <button
                    type="button"
                    onClick={() => handleItemClick(c.id)}
                    className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-muted dark:hover:text-slate-200 ml-1 cursor-pointer transition-colors"
                    title={isExpandedDesktop ? 'Collapse item' : 'Expand item'}
                    aria-label={isExpandedDesktop ? 'Collapse certification' : 'Expand certification'}
                  >
                    {isExpandedDesktop ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Desktop-only inline expanded form */}
              {isExpandedDesktop && (
                <div className="hidden lg:block p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  {renderCertificationForm(c, idx)}
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

      {/* Mobile-only Full-screen Form Modal */}
      {mobileEditingItem && (
        <MobileFullscreenItemModal
          isOpen={Boolean(mobileEditingItem)}
          onClose={() => setMobileEditingId(null)}
          title={mobileEditingItem.name || 'Certification Details'}
          subtitle={mobileEditingItem.issuer || 'Certifications & Licenses'}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this certification?')) {
              removeCertification(mobileEditingIndex);
              setMobileEditingId(null);
            }
          }}
          deleteLabel="Delete Certification"
        >
          {renderCertificationForm(mobileEditingItem, mobileEditingIndex)}
        </MobileFullscreenItemModal>
      )}
    </div>
  );
};
