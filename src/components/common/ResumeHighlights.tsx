'use client';

import React from 'react';
import { RichText } from '@/components/common/RichText';
import { cn } from '@/lib/utils';

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

  // Filter out empty or whitespace-only items
  const validHighlights = highlights.filter(
    (h) => h && typeof h === 'string' && h.trim().length > 0
  );
  if (validHighlights.length === 0) return null;

  const rawJoined = validHighlights.join('\n').trim();
  if (!rawJoined) return null;

  // 1. Detect list types in HTML: <ul>, <ol>, <li>
  const hasLi = /<li[^>]*>([\s\S]*?)<\/li>/i.test(rawJoined);
  const isOrdered = /<ol[\s>]/i.test(rawJoined);
  const hasHtml = /<[a-z][\s\S]*>/i.test(rawJoined);

  if (hasLi) {
    // Extract individual <li> contents
    const liMatches = rawJoined.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches && liMatches.length > 0) {
      const items = liMatches.map((li) =>
        li.replace(/^<li[^>]*>/i, '').replace(/<\/li>$/i, '').trim()
      );

      if (isOrdered) {
        return (
          <ol className={cn('list-decimal list-outside pl-4 space-y-1 text-[12.5px] leading-normal', className)}>
            {items.map((item, i) => (
              <li key={i} data-ghost-bullet={i} className={cn(itemClassName)}>
                <RichText content={item} as="span" />
              </li>
            ))}
          </ol>
        );
      }

      return (
        <ul className={cn('list-disc list-outside pl-4 space-y-1 text-[12.5px] leading-normal', className)}>
          {items.map((item, i) => (
            <li key={i} data-ghost-bullet={i} className={cn(itemClassName)}>
              <RichText content={item} as="span" />
            </li>
          ))}
        </ul>
      );
    }
  }

  // 2. If it is HTML but has NO <li> tags (e.g. <p>...</p> or <div>...</div>)
  // This is regular text type from RichText — do NOT force default bullet points!
  if (hasHtml) {
    return (
      <div className={cn('rich-text-block space-y-1 text-[12.5px] leading-normal', className)}>
        <RichText content={rawJoined} />
      </div>
    );
  }

  // 3. Plain text handling (non-HTML)
  // Check if any items start with bullet characters: •, -, *
  const hasBulletSymbol = validHighlights.some((h) =>
    h.split(/\r?\n+/).some((line) => /^[•\-\*]\s+/.test(line.trim()))
  );

  // If items start with bullet characters, parse them into a bullet list
  if (hasBulletSymbol) {
    const bulletItems: string[] = [];
    validHighlights.forEach((h) => {
      const lines = h.split(/\r?\n+/).map((l) => l.trim()).filter(Boolean);
      lines.forEach((line) => {
        bulletItems.push(line.replace(/^[•\-\*]\s*/, '').trim());
      });
    });

    return (
      <ul className={cn('list-disc list-outside pl-4 space-y-1 text-[12.5px] leading-normal', className)}>
        {bulletItems.map((h, i) => (
          <li key={i} data-ghost-bullet={i} className={cn(itemClassName)}>
            <RichText content={h} as="span" />
          </li>
        ))}
      </ul>
    );
  }

  // If there are multiple plain text entries in the highlights array, treat as list items
  if (validHighlights.length > 1) {
    return (
      <ul className={cn('list-disc list-outside pl-4 space-y-1 text-[12.5px] leading-normal', className)}>
        {validHighlights.map((h, i) => (
          <li key={i} data-ghost-bullet={i} className={cn(itemClassName)}>
            <RichText content={h} as="span" />
          </li>
        ))}
      </ul>
    );
  }

  // Single plain text entry without bullet symbols — render as text type from RichText!
  return (
    <div className={cn('text-[12.5px] leading-normal', className)}>
      <RichText content={validHighlights[0]} />
    </div>
  );
};
