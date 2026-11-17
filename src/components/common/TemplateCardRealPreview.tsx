'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ResumeData, TemplateId, EducationItem } from '@/types/resume';
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
    // 1. Determine persona domain
    const isScholar = templateId === 'academic_teaching';
    const isFinance = templateId === 'harvard';
    const isGov = templateId === 'sarkari';
    const isIndianIT = ['naukri', 'traditional'].includes(templateId);
    const isExecutive = ['oxford', 'chastain', 'vienna', 'cascade', 'ledger'].includes(templateId);
    const isCreative = [
      'canva', 'canvapastel', 'canvanotebook', 'canvaeditorial', 'canvaretro',
      'canvaaesthetic', 'ribbon', 'marigold', 'creative_portfolio', 'aurora', 'brutal',
      'blueprint', 'vertical', 'marginalia', 'dossier', 'career_gantt', 'monogram',
      'binder_tabs', 'competency_radar'
    ].includes(templateId);

    // 2. Persona Role & Name selection
    let role = customRole;
    let name = customName;

    if (!role) {
      if (isScholar) role = 'Academic Scholar & Lecturer';
      else if (isFinance) role = 'Investment Banking Associate';
      else if (isGov) role = 'Assistant Executive Engineer';
      else if (isIndianIT) role = 'Senior Technical Specialist';
      else if (isExecutive) role = 'Vice President of Operations';
      else if (templateId === 'fresher' || templateId === 'stamp') role = 'Software Development Engineer';
      else if (isCreative) role = 'Lead Product Designer';
      else role = 'Staff Software Engineer';
    }

    if (!name) {
      if (isScholar) name = 'Dr. Robert M. Davies';
      else if (isFinance) name = 'Jonathan E. Vance';
      else if (isGov) name = 'Suresh Chandra Sharma';
      else if (templateId === 'naukri') name = 'Rahul Verma';
      else if (templateId === 'traditional') name = 'Arun Kumar Sharma';
      else if (templateId === 'fresher') name = 'Aarav Patel';
      else if (templateId === 'silicon') name = 'Alex Chen';
      else if (templateId === 'oxford') name = 'Alistair Sterling';
      else if (templateId === 'canva') name = 'Chloe Deschanel';
      else if (templateId === 'novoresume') name = 'Marcus Lindberg';
      else if (templateId === 'toronto') name = 'Elias Thorne';
      else if (templateId === 'enhancv') name = 'Sophie Martinez';
      else if (templateId === 'flow') name = 'Julian Weber';
      else if (templateId === 'ribbon' || templateId === 'marigold') name = 'Aarav Menon';
      else if (templateId === 'stamp') name = 'Meera Das';
      else name = 'Olivia Winata';
    }

    const safeUsername = name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.');
    const email = `${safeUsername}@example.com`;
    const website = `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    // 3. Domain-specific summaries, experience, skills, and education
    let summary = `Accomplished ${role} with 6+ years designing scalable systems, driving strategic execution, and collaborating with cross-functional leadership teams to achieve high-impact business results.`;
    let exp1Title = role;
    let exp2Title = `Senior ${role.replace(/^(Lead|Senior|Staff|Principal|Head of|Vice President of)\s+/i, '')}`;
    let exp1Company = 'Stripeflow Labs';
    let exp2Company = 'Apex Media Tech';
    let exp1Highlights = [
      'Spearheaded core platform architecture across 12 product squads, increasing delivery velocity by 28%.',
      'Analyzed end-user workflows to optimize onboarding conversion, lifting retention by 32%.',
    ];
    let exp2Highlights = [
      'Engineered responsive web applications supporting 2.4M active users on modern cloud infrastructure.',
      'Mentored 6 junior engineers and authored technical documentation for developer onboarding.',
    ];
    let skills = [
      { id: 'sk-1', category: 'Core Competencies', items: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'] },
      { id: 'sk-2', category: 'Methodologies', items: ['Agile / Scrum', 'CI/CD Pipelines', 'System Design', 'Unit Testing'] },
    ];
    let education: EducationItem[] = [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationDate: '2019',
        gpa: '3.88 / 4.0',
        highlights: ['Dean\'s Honors List', 'President of Engineering Innovation Club'],
      },
    ];

    if (isScholar) {
      summary = `Dedicated academic scholar and university lecturer with 8+ years conducting quantitative research, publishing peer-reviewed papers, and mentoring graduate research fellows.`;
      exp1Title = 'Faculty Lecturer & Researcher';
      exp2Title = 'Postdoctoral Research Fellow';
      exp1Company = 'Department of Economics, State University';
      exp2Company = 'Institute for Quantitative Policy Research';
      exp1Highlights = [
        'Authored 7 peer-reviewed articles published in top-tier academic journals with 450+ cumulative citations.',
        'Delivered lectures and seminars for 220+ undergraduate students across macroeconomics and econometrics.',
      ];
      exp2Highlights = [
        'Secured $140,000 research grant from national foundation to investigate regional labor market transitions.',
        'Supervised 14 undergraduate theses and standardized statistical computational methods in R and Python.',
      ];
      skills = [
        { id: 'sk-1', category: 'Academic Research', items: ['Econometrics', 'Statistical Modeling', 'Peer-Reviewed Publishing', 'Grant Writing'] },
        { id: 'sk-2', category: 'Tools & Analytics', items: ['R', 'Python', 'Stata', 'LaTeX', 'Qualitative Analysis'] },
      ];
      education = [
        {
          id: 'edu-1',
          degree: 'Ph.D. in Economics',
          school: 'Columbia University',
          location: 'New York, NY',
          graduationDate: '2018',
          highlights: ['Doctoral Dissertation Award with Distinction', 'Graduate Teaching Fellow'],
        },
      ];
    } else if (isFinance) {
      summary = `Analytical investment banking associate with rigorous M&A advisory, financial modeling, and debt structuring experience across consumer retail and enterprise software sectors.`;
      exp1Title = 'Investment Banking Associate';
      exp2Title = 'Financial Analyst';
      exp1Company = 'Acme Capital Partners';
      exp2Company = 'Morgan Stanley Financial Group';
      exp1Highlights = [
        'Built comprehensive three-statement, DCF, and LBO financial models supporting $850M enterprise acquisitions.',
        'Drafted confidential information memorandums (CIM) and managed diligence data rooms for 6 live transactions.',
      ];
      exp2Highlights = [
        'Conducted comparable company and precedent transaction valuation benchmarks across 45 target entities.',
        'Created board presentation decks detailing capital structure optimization and debt refinancing alternatives.',
      ];
      skills = [
        { id: 'sk-1', category: 'Financial Expertise', items: ['Financial Modeling', 'DCF Valuation', 'LBO Analysis', 'M&A Due Diligence'] },
        { id: 'sk-2', category: 'Software & Data', items: ['Capital IQ', 'FactSet', 'Bloomberg Terminal', 'Advanced Excel VBA'] },
      ];
      education = [
        {
          id: 'edu-1',
          degree: 'B.A. in Economics & Finance',
          school: 'Harvard University',
          location: 'Cambridge, MA',
          graduationDate: '2020',
          gpa: '3.92 / 4.0',
          highlights: ['Magna Cum Laude', 'Harvard Financial Analysts Club'],
        },
      ];
    } else if (isGov) {
      summary = `Qualified Assistant Executive Engineer with 7+ years of experience supervising public infrastructure projects, tender documentation, CPWD specifications, and structural quality compliance.`;
      exp1Title = 'Assistant Executive Engineer';
      exp2Title = 'Assistant Engineer (Civil)';
      exp1Company = 'Central Public Works Department (CPWD)';
      exp2Company = 'National Highway Infrastructure Authority';
      exp1Highlights = [
        'Supervised execution of ₹45 Crore institutional infrastructure project, ensuring strict compliance with CPWD guidelines.',
        'Reviewed technical bids, prepared detailed estimates, and verified quality control test reports across 18 construction sites.',
      ];
      exp2Highlights = [
        'Conducted structural site audits and verified measurement books for commercial highway expansion corridors.',
        'Coordinated inter-departmental clearances and environmental impact assessments with municipal authorities.',
      ];
      skills = [
        { id: 'sk-1', category: 'Engineering & Public Works', items: ['CPWD Specifications', 'Tender Preparation', 'Project Supervision', 'Structural Audits'] },
        { id: 'sk-2', category: 'Technical Software', items: ['AutoCAD', 'MS Project', 'Quality Control Lab Tests', 'Quantity Surveying'] },
      ];
      education = [
        {
          id: 'edu-1',
          degree: 'B.Tech in Civil Engineering',
          school: 'National Institute of Technology (NIT)',
          location: 'Patna, Bihar',
          graduationDate: '2017',
          gpa: '8.7 / 10.0',
          highlights: ['First Class with Distinction', 'Qualified GATE Examination'],
        },
      ];
    } else if (isIndianIT) {
      summary = `Results-oriented Senior Technical Specialist with 8+ years leading enterprise cloud migrations, full-stack microservices, and cross-functional Agile engineering squads for global Fortune 500 clients.`;
      exp1Title = 'Senior Technical Specialist';
      exp2Title = 'Technology Lead';
      exp1Company = 'Infosys Technologies Ltd';
      exp2Company = 'Tata Consultancy Services';
      exp1Highlights = [
        'Architected Java Spring Boot microservices handling 4.8M daily transactions with 99.98% service uptime.',
        'Led migration of on-premise monolithic payment portal to AWS ECS, saving ₹18 Lakhs annually in server costs.',
      ];
      exp2Highlights = [
        'Delivered high-volume web portals using Angular, REST APIs, and Oracle DB across 4 sprint cycles.',
        'Conducted code reviews and automated JUnit test coverage pipelines to maintain 88%+ test quality standards.',
      ];
      skills = [
        { id: 'sk-1', category: 'Enterprise Stack', items: ['Java', 'Spring Boot', 'Microservices', 'AWS (ECS, S3)', 'PostgreSQL', 'Kafka'] },
        { id: 'sk-2', category: 'Engineering Practices', items: ['Agile / Scrum', 'CI/CD Pipelines', 'System Design', 'SonarQube'] },
      ];
      education = [
        {
          id: 'edu-1',
          degree: 'B.Tech in Information Technology',
          school: 'Vellore Institute of Technology (VIT)',
          location: 'Vellore, Tamil Nadu',
          graduationDate: '2016',
          gpa: '8.9 / 10.0',
          highlights: ['Dean\'s Merit Scholar', 'Merit Scholarship Winner'],
        },
      ];
    } else if (isCreative) {
      summary = `Human-centered Lead Product Designer with 6+ years scaling design systems, conducting user research, and crafting high-conversion digital experiences across iOS, Android, and web platforms.`;
      exp1Title = 'Lead Product Designer';
      exp2Title = 'Senior UI/UX Designer';
      exp1Company = 'Lumina Design Lab';
      exp2Company = 'Creative Wave Studios';
      exp1Highlights = [
        'Built unified multi-brand design system with 60+ accessible tokens, accelerating frontend delivery by 35%.',
        'Conducted 45 moderated user research sessions, redesigning mobile checkout to lift completion by 24%.',
      ];
      exp2Highlights = [
        'Created interactive prototypes and responsive user interfaces for SaaS web application with 300K MAU.',
        'Partnered with product managers and engineers to establish WCAG 2.1 AA accessibility standards.',
      ];
      skills = [
        { id: 'sk-1', category: 'Product Design', items: ['UI/UX Design', 'Design Systems', 'Figma', 'Prototyping', 'User Research', 'WCAG AA'] },
        { id: 'sk-2', category: 'Tools & Handoff', items: ['Figma Tokens', 'Miro', 'HTML/CSS/Tailwind', 'A/B Testing'] },
      ];
      education = [
        {
          id: 'edu-1',
          degree: 'B.Des in Interaction Design',
          school: 'Rhode Island School of Design',
          location: 'Providence, RI',
          graduationDate: '2019',
          gpa: '3.85 / 4.0',
          highlights: ['Faculty Design Honors', 'Lead Designer, Student Showcase'],
        },
      ];
    }

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
        email,
        phone: '+1 (555) 234-5678',
        location: isGov || isIndianIT ? 'New Delhi, India' : 'San Francisco, CA',
        website,
        linkedin: `linkedin.com/in/${safeUsername}`,
        github: isScholar || isFinance || isGov ? undefined : `github.com/${safeUsername.split('.')[0]}`,
        avatarUrl: DEMO_AVATARS[templateId] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        summary,
      },
      experience: [
        {
          id: 'exp-1',
          role: exp1Title,
          company: exp1Company,
          location: isGov || isIndianIT ? 'New Delhi, India' : 'San Francisco, CA',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          highlights: exp1Highlights,
        },
        {
          id: 'exp-2',
          role: exp2Title,
          company: exp2Company,
          location: isGov || isIndianIT ? 'Bengaluru, India' : 'New York, NY',
          startDate: 'Jun 2019',
          endDate: 'Dec 2021',
          current: false,
          highlights: exp2Highlights,
        },
      ],
      education,
      skills,
      projects: [
        {
          id: 'proj-1',
          title: isScholar ? 'National Academic Research Repository' : isFinance ? 'Financial Due Diligence Framework' : 'Open-Source Production System',
          technologies: isScholar ? ['R', 'LaTeX', 'Econometrics'] : isFinance ? ['Excel VBA', 'Capital IQ', 'Valuation Models'] : ['TypeScript', 'React', 'Docker'],
          highlights: ['Publicly documented framework with verified analytical models and 800+ active user downloads.'],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: isScholar ? 'Certified University Teaching Fellow' : isFinance ? 'Chartered Financial Analyst (CFA Level I)' : isGov ? 'Certified Public Works Inspector' : 'AWS Certified Solutions Architect',
          issuer: isScholar ? 'Higher Education Board' : isFinance ? 'CFA Institute' : isGov ? 'Ministry of Housing & Urban Affairs' : 'Amazon Web Services',
          date: '2023',
        },
      ],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Native / Full Professional' },
        { id: 'lang-2', language: isGov || isIndianIT ? 'Hindi' : 'Spanish', proficiency: 'Professional Working' },
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
              contentVisibility: 'auto',
              containIntrinsicSize: `${Math.round(794 * explicitScale)}px ${Math.round(1123 * explicitScale)}px`,
            }
          : {
              contentVisibility: 'auto',
              containIntrinsicSize: '300px 424px',
            }
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
