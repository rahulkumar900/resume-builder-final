'use client';

import React from 'react';
import { X, Check, Rocket, Sparkles } from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubscribe = () => {
    fireConfetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    alert('🎉 Congratulations! You have unlocked Kindley Pro with unlimited templates and exports.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e2538] text-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-slate-950 font-black">
              <Rocket className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upgrade to Kindley Pro</h3>
              <p className="text-xs text-slate-400">Unlock your full career potential</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pricing Card */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Pro Annual Plan
              </div>
              <div className="text-2xl font-black text-white mt-0.5">
                $9 <span className="text-xs font-normal text-slate-400">/ month</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/40">
              Save 40%
            </span>
          </div>

          {/* Features */}
          <div className="space-y-3 text-xs">
            {[
              'Access to all 15+ Premium Executive & Creative Templates',
              'Unlimited Puppeteer Vector PDF Downloads in crisp A4 resolution',
              'Unlimited AI Resume Scoring & ATS Optimization scans',
              'Custom fonts, typography scalers, and custom color themes',
              'Cover letter builder integration and job portal sync',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 text-slate-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleSubscribe}
            className="w-full py-3 bg-[#4ade80] hover:bg-[#22c55e] text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Unlock Pro Access Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
