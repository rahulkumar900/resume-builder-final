'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { ResumeRenderer } from '@/components/resume-templates/ResumeRenderer';

interface DynamicResumeCardPreviewProps {
  resume: ResumeData;
  className?: string;
}

export const DynamicResumeCardPreview: React.FC<DynamicResumeCardPreviewProps> = ({
  resume,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.28);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 794);
        }
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[794/1123] overflow-hidden bg-white select-none pointer-events-none ${className}`}
    >
      <div
        style={{
          width: '794px',
          height: '1123px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="absolute top-0 left-0 bg-white"
      >
        <ResumeRenderer data={resume} activePage={1} />
      </div>
    </div>
  );
};
