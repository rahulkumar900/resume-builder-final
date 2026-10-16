'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  Mail,
  ExternalLink,
  FileJson,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

interface ShareResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onDownloadPdf?: () => void;
  onPrint?: () => void;
}

export const ShareResumeModal: React.FC<ShareResumeModalProps> = ({
  isOpen,
  onClose,
  resume,
  onDownloadPdf,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'export'>('link');
  const [shareUrl, setShareUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const url = `${origin}/print/${resume.id}`;
      setShareUrl(url);

      QRCode.toDataURL(url, {
        width: 220,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((dataUrl) => setQrDataUrl(dataUrl))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [resume.id]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback copy
      const input = document.getElementById('share-link-input') as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    const name = (resume.personalInfo?.fullName || resume.title || 'resume').replace(/[^a-z0-9]/gi, '_');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${name}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const emailSubject = encodeURIComponent(`Resume - ${resume.personalInfo?.fullName || resume.title}`);
  const emailBody = encodeURIComponent(
    `Hi,\n\nPlease find my resume at the link below:\n${shareUrl}\n\nBest regards,\n${resume.personalInfo?.fullName || ''}`
  );
  const mailtoUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    shareUrl
  )}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-card rounded-2xl shadow-2xl border border-slate-200 dark:border-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-border flex items-center justify-between bg-slate-50/70 dark:bg-muted/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-2xs border border-emerald-200 dark:border-emerald-800">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-foreground leading-tight">
                Share &amp; Export Resume
              </h2>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                Public web link, mobile QR code, and data backups
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-border bg-white dark:bg-card px-5 pt-2 gap-4 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'link'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Public Link</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Mobile QR Code</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'export'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup &amp; Export</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Live View &amp; Print Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      id="share-link-input"
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="w-full text-xs font-mono bg-slate-50 dark:bg-muted border border-slate-200 dark:border-border rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 select-all pr-8 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleCopyLink}
                    variant={copied ? 'default' : 'outline'}
                    size="sm"
                    className={`gap-1.5 shrink-0 transition-all ${
                      copied ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </Button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground">
                  Anyone with this link can view and print this resume without needing an account.
                </p>
              </div>

              {/* Action shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-muted text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Open Public View</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-muted text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 dark:border-border">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Resume Public Link QR Code"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-[180px] h-[180px] flex items-center justify-center text-slate-400 text-xs">
                    Generating QR code...
                  </div>
                )}
              </div>
              <div className="space-y-1 max-w-xs">
                <p className="text-xs font-bold text-slate-800 dark:text-foreground">
                  Scan to View &amp; Download on Mobile
                </p>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground">
                  Open your camera app and scan to view, save, or forward this resume right from your phone.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-border bg-slate-50/60 dark:bg-muted/30 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                  <FileJson className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-foreground">Download Raw Resume JSON</h4>
                  <p className="text-[11px] text-slate-500 dark:text-muted-foreground">
                    Export all your structured work history, skills, and settings into a clean JSON file for backup or migrating.
                  </p>
                  <div className="pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleExportJson}
                      className="gap-1.5 text-xs font-semibold bg-white dark:bg-card"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON Backup</span>
                    </Button>
                  </div>
                </div>
              </div>

              {onPrint && (
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-border bg-slate-50/60 dark:bg-muted/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-foreground">Browser Direct Print</h4>
                    <p className="text-[11px] text-slate-500 dark:text-muted-foreground">
                      Open optimized print view to print to hardware printer or save directly as PDF via your browser.
                    </p>
                    <div className="pt-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onPrint}
                        className="gap-1.5 text-xs font-semibold bg-white dark:bg-card"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Open Print View</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-border bg-slate-50/50 dark:bg-muted/20 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400 dark:text-muted-foreground font-medium">
            Resume ID: <code className="font-mono text-slate-600 dark:text-slate-300">{resume.id}</code>
          </span>
          <Button type="button" variant="default" size="sm" onClick={onClose} className="px-4">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
