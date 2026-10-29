'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ResumeData, TemplateId } from '@/types/resume';
import { getTemplateSignatureFont } from '@/lib/templates';
import { ResumeRenderer } from '@/components/resume-templates/ResumeRenderer';

interface TemplateCardRealPreviewProps {
  templateId: TemplateId;
  themeColor?: string;
  customRole?: string;
  customName?: string;
  scale?: number;
  className?: string;
}

const DEMO_AVATARS: Record<string, string> = {
  prawira: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  chastain: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  santoso: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  rahadian: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  stockholm: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  ats: '',
  dublin: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  sydney: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  vienna: '',
  madrid: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  traditional: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  naukri: '',
  fresher: '',
  sarkari: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  canvapastel: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  canvanotebook: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  canvaeditorial: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  canvaretro: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  canvaaesthetic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
};

export const TemplateCardRealPreview: React.FC<TemplateCardRealPreviewProps> = ({
  templateId,
  themeColor = '#2563eb',
  customRole,
  customName,
  scale: explicitScale,
  className = '',
}) => {
  const resumeData = useMemo<ResumeData>(() => {
    const role = customRole || (
      templateId === 'sarkari' ? 'Assistant Executive Engineer' :
      templateId === 'fresher' ? 'Software Development Engineer' :
      templateId === 'naukri' ? 'Senior Technical Specialist' :
      templateId === 'harvard' ? 'Investment Banking Associate' :
      templateId === 'harvard_tech' ? 'Distributed Systems Engineer' :
      templateId === 'harvard_experienced' ? 'Engagement Manager & Strategy Lead' :
      templateId === 'silicon' ? 'Senior Staff Software Engineer' :
      templateId === 'oxford' ? 'Vice President of Operations' :
      templateId === 'canva' ? 'Lead Creative Director' :
      templateId === 'europass' ? 'International Project Manager' :
      templateId === 'novoresume' ? 'Full Stack Tech Lead' :
      templateId === 'cascade' ? 'Senior Business Analyst' :
      templateId === 'flow' ? 'Cloud Solutions Architect' :
      templateId === 'toronto' ? 'Growth Marketing Lead' :
      templateId === 'enhancv' ? 'Engineering Team Lead' :
      templateId === 'canvapastel' ? 'Early Childhood Educator & Creator' :
      templateId === 'canvanotebook' ? 'Senior Graphic & Brand Designer' :
      templateId === 'canvaeditorial' ? 'Digital Marketer & Strategist' :
      templateId === 'canvaretro' ? 'Creative Graphic & Visual Designer' :
      templateId === 'canvaaesthetic' ? 'Brand Stylist & Creative Director' :
      templateId === 'ribbon' ? 'Lead Product Designer' :
      templateId === 'marigold' ? 'Lead Product Designer & Design Architect' :
      templateId === 'stamp' ? 'Computer Science Graduate & Software Engineer' :
      'Senior Product Designer'
    );
    const name = customName || (
      templateId === 'prawira' ? 'Muhammad Prawira' :
      templateId === 'santoso' ? 'Rudian Santoso' :
      templateId === 'traditional' ? 'Arun Kumar Sharma' :
      templateId === 'naukri' ? 'Rahul Verma' :
      templateId === 'fresher' ? 'Aarav Patel' :
      templateId === 'sarkari' ? 'Suresh Chandra Sharma' :
      templateId === 'harvard' ? 'Jonathan E. Vance' :
      templateId === 'harvard_tech' ? 'Nathaniel K. Brooks' :
      templateId === 'harvard_experienced' ? 'Catherine L. Sterling' :
      templateId === 'silicon' ? 'Alex Chen' :
      templateId === 'oxford' ? 'Alistair Sterling' :
      templateId === 'canva' ? 'Chloe Deschanel' :
      templateId === 'europass' ? 'Matteo Rossi' :
      templateId === 'cascade' ? 'David K. Miller' :
      templateId === 'novoresume' ? 'Marcus Lindberg' :
      templateId === 'toronto' ? 'Elias Thorne' :
      templateId === 'enhancv' ? 'Sophie Martinez' :
      templateId === 'flow' ? 'Julian Weber' :
      templateId === 'canvapastel' ? 'Laura Bennet' :
      templateId === 'canvanotebook' ? 'Olivia Wilson' :
      templateId === 'canvaeditorial' ? 'Estelle Darcy' :
      templateId === 'canvaretro' ? 'Rachelle Beaudry' :
      templateId === 'canvaaesthetic' ? 'Clara Sterling' :
      templateId === 'ribbon' ? 'Aarav Menon' :
      templateId === 'marigold' ? 'Aarav Menon' :
      templateId === 'stamp' ? 'Meera Das' :
      'Olivia Winata'
    );

    return {
      id: `preview-${templateId}`,
      title: `${name} - Resume`,
      status: 'completed',
      updatedAt: 'Just now',
      templateId,
      themeColor,
      fontFamily: getTemplateSignatureFont(templateId),
      spacing: 'normal',
      personalInfo: {
        fullName: name,
        jobTitle: role,
        email: 'olivia.winata@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'https://oliviawinata.design',
        linkedin: 'linkedin.com/in/oliviawinata',
        github: 'github.com/oliviaw',
        avatarUrl: DEMO_AVATARS[templateId] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        summary: `Accomplished ${role} with 6+ years driving product strategy, high-conversion UI/UX systems, and cross-functional leadership. Proven track record of improving engagement by 35% and mentoring multidisciplinary engineering teams.`,
      },
      experience: [
        {
          id: 'exp-1',
          role: `Lead ${role}`,
          company: 'Stripeflow Labs',
          location: 'San Francisco, CA',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded modern design architecture across 12 product teams, lifting deployment speed by 28%.',
            'Conducted 40+ user interviews to redesign checkout flow, improving conversion by 32%.',
          ],
        },
        {
          id: 'exp-2',
          role: `Senior ${role}`,
          company: 'Apex Media Tech',
          location: 'New York, NY',
          startDate: 'Jun 2019',
          endDate: 'Dec 2021',
          current: false,
          highlights: [
            'Engineered responsive interfaces for 2.4M active users on iOS, Android, and web.',
            'Collaborated with engineering to build reusable accessible component libraries.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science / HCI',
          school: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          graduationDate: '2019',
          gpa: '3.9 / 4.0',
          highlights: ['Dean\'s Honors List', 'President of Design Innovation Club'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Core Competencies',
          items: ['UI/UX Design', 'Design Systems', 'Figma', 'React', 'TypeScript', 'WCAG AAA'],
        },
        {
          id: 'sk-2',
          category: 'Methodologies',
          items: ['Agile / Scrum', 'Rapid Prototyping', 'User Research', 'A/B Testing'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Lumina Design System',
          technologies: ['Figma Tokens', 'React', 'Tailwind CSS'],
          link: undefined,
          highlights: ['Open-source UI kit with 40+ accessible components and 1.2k GitHub stars.'],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Nielsen Norman Group UX Master Certified',
          issuer: 'NN/g',
          date: '2023',
        },
      ],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Native' },
        { id: 'lang-2', language: 'Indonesian', proficiency: 'Bilingual' },
      ],
    };
  }, [templateId, themeColor, customRole, customName]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredScale, setMeasuredScale] = useState<number>(0.44);

  useEffect(() => {
    if (explicitScale || !containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setMeasuredScale(width / 794);
        }
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [explicitScale]);

  const activeScale = explicitScale || measuredScale;

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[794/1123] overflow-hidden bg-white shadow-sm border border-slate-200/90 rounded-[3px] select-none pointer-events-none ${className}`}
      style={
        explicitScale
          ? {
              width: `${Math.round(794 * explicitScale)}px`,
              height: `${Math.round(1123 * explicitScale)}px`,
            }
          : undefined
      }
    >
      <div
        style={{
          width: '794px',
          height: '1123px',
          transform: `scale(${activeScale})`,
          transformOrigin: 'top left',
        }}
        className="absolute top-0 left-0 bg-white"
      >
        <ResumeRenderer data={resumeData} activePage={1} disableGhostDOM={true} />
      </div>
    </div>
  );
};
