import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative w-full">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-slate-200 dark:border-input bg-white dark:bg-card pl-10 pr-3.5 py-2 text-sm text-slate-900 dark:text-foreground shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-slate-200 dark:border-input bg-white dark:bg-card px-3.5 py-2 text-sm text-slate-900 dark:text-foreground shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
