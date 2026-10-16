import * as React from 'react';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xs',
      className
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt = 'Avatar', ...props }, ref) => (
  <img
    ref={ref}
    alt={alt}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-600 uppercase text-sm',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
