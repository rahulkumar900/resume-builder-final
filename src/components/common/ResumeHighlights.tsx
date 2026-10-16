'use client';

import React from 'react';
import { RichText } from '@/components/common/RichText';
import { cn, normalizeHighlights } from '@/lib/utils';

interface ResumeHighlightsProps {
  highlights?: string[];
  className?: string;
  itemClassName?: string;
}

export const ResumeHighlights: React.FC<ResumeHighlightsProps> = ({
  highlights,
  className,
  itemClassName,
}) => {
  if (!highlights || highlights.length === 0) return null;

  const normalized = normalizeHighlights(highlights);
  if (normalized.length === 0) return null;

  return (
    <ul className={cn('list-disc list-outside pl-4 space-y-1 text-[12.5px] leading-normal', className)}>
      {normalized.map((h, i) => (
        <li key={i} data-ghost-bullet={i} className={cn(itemClassName)}>
          <RichText content={h} as="span" />
        </li>
      ))}
    </ul>
  );
};
