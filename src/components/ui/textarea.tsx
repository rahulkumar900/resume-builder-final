import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onFocus, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 280);
      }
      onFocus?.(e);
    };

    return (
      <textarea
        className={cn(
          'flex min-h-[85px] w-full rounded-lg border border-slate-200 dark:border-input bg-white dark:bg-card px-3.5 py-2.5 text-base sm:text-sm text-slate-900 dark:text-foreground leading-relaxed shadow-2xs placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-normal scroll-mt-20 scroll-mb-28',
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
