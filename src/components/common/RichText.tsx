import React from 'react';
import { cn } from '@/lib/utils';

interface RichTextProps {
  content?: string | null;
  className?: string;
  as?: 'span' | 'p' | 'div';
}

export const RichText: React.FC<RichTextProps> = ({
  content,
  className,
  as: Component = 'div',
}) => {
  if (!content) return null;

  const hasHtml = /<[a-z][\s\S]*>/i.test(content);

  if (hasHtml) {
    return (
      <Component
        className={cn(
          'rich-text-content leading-relaxed',
          '[&_b]:font-bold [&_strong]:font-bold',
          '[&_i]:italic [&_em]:italic',
          '[&_u]:underline',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-1.5',
          '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-1.5',
          '[&_li]:pl-1 [&_li]:leading-relaxed',
          '[&_a]:text-emerald-700 dark:[&_a]:text-emerald-400 [&_a]:underline',
          '[&_p]:mb-1 last:[&_p]:mb-0',
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return <Component className={className}>{content}</Component>;
};
