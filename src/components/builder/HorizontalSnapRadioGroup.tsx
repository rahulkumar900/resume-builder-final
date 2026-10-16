'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface HorizontalSnapRadioItem {
  id: string;
  name: string;
  subtitle?: string;
  badge?: string;
  color?: string;
  icon?: React.ReactNode;
}

interface HorizontalSnapRadioGroupProps<T extends HorizontalSnapRadioItem> {
  items: T[];
  activeId: string;
  onSelect: (item: T) => void;
  className?: string;
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
  autoSelectOnScroll?: boolean;
}

export function HorizontalSnapRadioGroup<T extends HorizontalSnapRadioItem>({
  items,
  activeId,
  onSelect,
  className,
  renderItem,
  autoSelectOnScroll = true,
}: HorizontalSnapRadioGroupProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Auto-center active item smoothly on mount or when activeId changes programmatically
  useEffect(() => {
    if (isProgrammaticScroll.current) return;
    const container = containerRef.current;
    if (!container) return;

    const target = container.querySelector<HTMLElement>(`[data-item-id="${activeId}"]`);
    if (target) {
      isProgrammaticScroll.current = true;
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      const timer = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeId]);

  // Detect which item is dead center when user scrolls and auto-select it
  const handleScroll = () => {
    if (!autoSelectOnScroll || isProgrammaticScroll.current) return;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      if (isProgrammaticScroll.current) return;
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const elements = container.querySelectorAll<HTMLElement>('[data-item-id]');
      let closestItem: T | null = null;
      let minDistance = Infinity;

      elements.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elCenter = elRect.left + elRect.width / 2;
        const distance = Math.abs(elCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          const itemId = el.getAttribute('data-item-id');
          const found = items.find((i) => i.id === itemId);
          if (found) {
            closestItem = found;
          }
        }
      });

      if (closestItem && (closestItem as T).id !== activeId) {
        onSelect(closestItem);
      }
    }, 120);
  };

  const handleClick = (item: T) => {
    onSelect(item);
    const container = containerRef.current;
    if (container) {
      const target = container.querySelector<HTMLElement>(`[data-item-id="${item.id}"]`);
      if (target) {
        isProgrammaticScroll.current = true;
        target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 400);
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Center alignment guide shadow fades on left & right edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-[#161614] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#161614] to-transparent z-10" />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn(
          'flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1.5 px-[36%] sm:px-[40%] scroll-smooth snap-x snap-mandatory select-none',
          className
        )}
      >
        {items.map((item) => {
          const isSelected = item.id.toLowerCase() === activeId.toLowerCase();

          if (renderItem) {
            return (
              <div
                key={item.id}
                data-item-id={item.id}
                onClick={() => handleClick(item)}
                className="snap-center shrink-0 cursor-pointer"
              >
                {renderItem(item, isSelected)}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              data-item-id={item.id}
              onClick={() => handleClick(item)}
              className={cn(
                'snap-center shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs transition-all cursor-pointer select-none',
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 font-bold shadow-xs ring-2 ring-emerald-500/40 text-emerald-950 dark:text-emerald-100 scale-[1.03]'
                  : 'border-slate-200 dark:border-border bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-muted text-slate-700 dark:text-slate-200 opacity-75 hover:opacity-100'
              )}
            >
              {/* Radio Indicator */}
              <span
                className={cn(
                  'w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all',
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600'
                    : 'border-slate-300 dark:border-zinc-600 bg-transparent'
                )}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>

              {/* Optional Color Swatch */}
              {item.color && (
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs border border-white dark:border-zinc-800"
                  style={{ backgroundColor: item.color }}
                />
              )}

              {/* Optional Icon */}
              {item.icon && <span className="shrink-0">{item.icon}</span>}

              {/* Name */}
              <span className="font-semibold whitespace-nowrap">{item.name}</span>

              {/* Subtitle / Column Badge */}
              {item.subtitle && (
                <span className="text-[10px] text-slate-400 dark:text-muted-foreground whitespace-nowrap">
                  {item.subtitle}
                </span>
              )}

              {/* Pro Badge */}
              {item.badge && (
                <span className="text-[9px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 px-1 py-0.2 rounded">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
