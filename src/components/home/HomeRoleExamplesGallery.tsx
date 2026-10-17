'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Layers, Briefcase, GraduationCap, Code } from 'lucide-react';

const FLAGSHIP_ROLES = [
  {
    id: 'sde',
    title: 'Senior Software Engineer',
    category: 'Engineering & Cloud',
    atsScore: 98,
    template: 'silicon',
    templateName: 'Silicon Tech SDE',
    icon: Code,
    bullets: [
      'Architected distributed microservices handling 14M daily requests on AWS EKS, reducing p99 API latency by 42%.',
      'Engineered real-time Kafka event streaming pipeline cutting data synchronization lag from 18m to under 350ms.',
      'Mentored 6 junior engineers and spearheaded automated CI/CD migration, saving 22 developer-hours weekly.',
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'AWS', 'Kafka'],
  },
  {
    id: 'pm',
    title: 'Lead Product Manager',
    category: 'Product & Growth',
    atsScore: 97,
    template: 'prawira',
    templateName: 'Prawira Modern',
    icon: Layers,
    bullets: [
      'Spearheaded enterprise B2B workflow revamp from discovery to launch, generating $2.4M ARR within 6 months.',
      'Conducted 45+ customer discovery interviews, boosting core feature activation by 34% and NPS from +28 to +61.',
      'Orchestrated cross-functional squads across design, engineering, and sales with zero deadline slippages.',
    ],
    skills: ['Product Discovery', 'User Journey Mapping', 'A/B Testing', 'SQL', 'Roadmapping', 'Jira'],
  },
  {
    id: 'fresher',
    title: 'Campus Graduate / Fresher',
    category: 'Freshers & Entry-Level',
    atsScore: 99,
    template: 'fresher',
    templateName: 'Fresher Campus A4',
    icon: GraduationCap,
    bullets: [
      'Built full-stack e-commerce portal utilizing Next.js, Tailwind CSS, and Stripe API with 99.9% uptime on Vercel.',
      'Secured 1st place in National Smart India Hackathon among 1,200+ engineering teams with AI logistics model.',
      'Maintained 8.9/10 CGPA in Computer Science with coursework in Operating Systems, Algorithms, and System Design.',
    ],
    skills: ['Python', 'Java', 'Data Structures', 'Next.js', 'PostgreSQL', 'Git', 'REST APIs'],
  },
  {
    id: 'data',
    title: 'Data & Analytics Specialist',
    category: 'Data Science & BI',
    atsScore: 96,
    template: 'harvard',
    templateName: 'Harvard Academic',
    icon: Briefcase,
    bullets: [
      'Engineered automated ETL pipelines in dbt and BigQuery processing 80GB daily transaction telemetry.',
      'Developed churn prediction model (LightGBM) achieving 0.89 AUC, identifying $650k in at-risk quarterly revenue.',
      'Built executive Tableau dashboards providing C-suite real-time cohort visibility across 18 markets.',
    ],
    skills: ['Python', 'SQL', 'BigQuery', 'Tableau', 'dbt', 'Pandas', 'Predictive Modeling'],
  },
];

export function HomeRoleExamplesGallery() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState(FLAGSHIP_ROLES[0].id);

  const selected = FLAGSHIP_ROLES.find((r) => r.id === activeRole) || FLAGSHIP_ROLES[0];
  const IconComponent = selected.icon;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Curated Role Blueprints</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Proven Resumes for High-Demand Roles<span className="text-emerald-700 dark:text-emerald-400">.</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Start from recruiter-approved templates pre-filled with high-scoring Google X-Y-Z metric bullets.
        </p>

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {FLAGSHIP_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeRole === role.id
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-white/80 dark:bg-[#161614] text-slate-700 dark:text-slate-300 border border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500'
              }`}
            >
              <span>{role.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Role Showcase Card */}
      <div className="bg-white/90 dark:bg-[#161614] rounded-3xl border border-border p-6 sm:p-10 shadow-xl backdrop-blur-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  {selected.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {selected.title}
                </h3>
              </div>
            </div>

            {/* Bullets List */}
            <div className="space-y-3 bg-background p-5 sm:p-6 rounded-2xl border border-border">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Pre-Written Verified STAR Accomplishments:
              </span>
              <ul className="space-y-2.5">
                {selected.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keyword Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Target ATS Keywords Included:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-black/[0.06] dark:border-white/[0.06]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Metrics & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full bg-background p-6 rounded-2xl border border-border space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                  Parser Benchmark
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {selected.atsScore}/100 ATS Score
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                  Optimal Architecture
                </span>
                <span className="font-serif text-lg font-bold text-slate-900 dark:text-white block">
                  {selected.templateName}
                </span>
                <span className="text-xs text-slate-500">
                  Engineered to prevent 2-column parsing traps in enterprise Applicant Tracking Systems.
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  router.push(`/create?template=${selected.template}&targetRole=${encodeURIComponent(selected.title)}`);
                }}
                className="w-full py-3 px-5 rounded-full text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Use This Role Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/examples"
                className="block text-center text-xs font-mono uppercase text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                Browse all 20+ role examples &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
