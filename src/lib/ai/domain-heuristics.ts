/**
 * @file domain-heuristics.ts
 * @description Rich offline knowledge base providing domain-aware, section-tailored suggestions.
 *
 * SOLID Principles Alignment:
 * - Single Responsibility Principle (SRP): Encapsulates heuristic-based suggestion generation
 *   without network dependencies or UI concerns.
 * - Open-Closed Principle (OCP): Designed with modular industry dictionaries that can be extended
 *   with new domains without modifying existing generator algorithms.
 * - Liskov Substitution Principle (LSP): Fully adheres to `IAiSuggestionProvider`, making it
 *   interchangeable with remote LLM providers.
 */

import {
  AiSectionType,
  AiSuggestionRequest,
  AiSuggestionResponse,
  AiTone,
  IAiSuggestionProvider,
  SeniorityLevel,
  SkillGroupSuggestion,
} from './types';

interface RoleDomainArchetype {
  matchKeywords: string[];
  skills: {
    coreTechnical: string[];
    frameworksAndTools: string[];
    methodologiesAndSoft: string[];
  };
  metricsBullets: (role: string, company: string) => string[];
  leadershipBullets: (role: string, company: string) => string[];
  technicalBullets: (role: string, company: string) => string[];
  summaries: (role: string, seniority: string) => string[];
}

const DOMAIN_ARCHETYPES: Record<string, RoleDomainArchetype> = {
  software: {
    matchKeywords: ['developer', 'engineer', 'frontend', 'backend', 'full-stack', 'fullstack', 'software', 'web', 'mobile', 'ios', 'android'],
    skills: {
      coreTechnical: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'REST & GraphQL APIs', 'Data Structures'],
      frameworksAndTools: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git / CI/CD'],
      methodologiesAndSoft: ['Agile / Scrum', 'System Design', 'Code Review', 'Test-Driven Development (TDD)', 'Microservices Architecture'],
    },
    metricsBullets: (role, company) => [
      `Architected and shipped distributed web applications at ${company}, reducing page load latency by 45% and boosting Lighthouse performance to 96+.`,
      `Engineered resilient microservices and optimized PostgreSQL database indexing, slashing p99 API response times from 720ms down to 85ms.`,
      `Spearheaded automated CI/CD release pipelines via GitHub Actions, decreasing build deployment cycles from 3 hours down to under 12 minutes.`,
      `Mitigated critical cloud infrastructure costs by 32% ($24,000/yr) through efficient query caching, lazy loading, and compute right-sizing.`,
    ],
    leadershipBullets: (role, company) => [
      `Led an agile engineering squad of 6 developers at ${company}, orchestrating bi-weekly sprints, technical design docs, and cross-functional deliverables.`,
      `Established engineering best practices, type-safety standards, and peer code review guidelines, elevating test coverage from 62% to 88%.`,
      `Mentored 4 associate engineers in modern React patterns and clean architecture, resulting in 2 internal engineering promotions.`,
    ],
    technicalBullets: (role, company) => [
      `Engineered end-to-end type-safe API contracts connecting Next.js App Router frontends with Node.js and PostgreSQL backends.`,
      `Integrated OAuth 2.0, JWT authentication, and role-based access control (RBAC), securing sensitive endpoints for 100,000+ active users.`,
      `Containerized legacy services using Docker and orchestrated zero-downtime rolling deployments on cloud container clusters.`,
    ],
    summaries: (role, seniority) => [
      `Results-driven ${seniority} ${role} with deep expertise in modern TypeScript, full-stack architecture, and high-concurrency cloud systems. Proven history of scaling mission-critical platforms and driving engineering velocity.`,
      `Innovative ${seniority} ${role} specializing in clean code architecture, performance optimization, and resilient microservices. Passionate about engineering excellence, test automation, and developer ergonomics.`,
    ],
  },
  data_ai: {
    matchKeywords: ['data', 'ai', 'machine learning', 'ml', 'scientist', 'analyst', 'deep learning', 'nlp', 'computer vision', 'bi'],
    skills: {
      coreTechnical: ['Python', 'SQL', 'R', 'Machine Learning', 'Statistical Modeling', 'ETL Pipelines', 'Deep Learning'],
      frameworksAndTools: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'Spark', 'BigQuery', 'Snowflake', 'Airflow'],
      methodologiesAndSoft: ['A/B Testing', 'Data Governance', 'Hypothesis Testing', 'Data Storytelling', 'Model Monitoring (MLOps)'],
    },
    metricsBullets: (role, company) => [
      `Developed and productionized predictive ML classification models at ${company}, improving conversion forecasting accuracy by 28%.`,
      `Built automated end-to-end ETL pipelines handling 10M+ daily records in BigQuery, saving 25+ engineering hours of manual reporting weekly.`,
      `Conducted multi-variant A/B experiments and customer churn analyses, delivering insights that unlocked $350k in retained annual revenue.`,
      `Tuned model hyperparameters and latency bottlenecks, cutting batch inference runtime by 60% with zero loss in ROC-AUC accuracy.`,
    ],
    leadershipBullets: (role, company) => [
      `Served as primary data science partner for product leadership at ${company}, translating ambiguous business questions into measurable statistical models.`,
      `Defined enterprise data dictionary, schema standards, and automated data quality checks across multi-tenant data warehouses.`,
    ],
    technicalBullets: (role, company) => [
      `Designed and deployed containerized REST endpoints for low-latency ML model serving using FastAPI, Docker, and cloud inference clusters.`,
      `Implemented feature engineering pipelines and automated drift monitoring to guard model reliability against concept drift.`,
    ],
    summaries: (role, seniority) => [
      `Analytical ${seniority} ${role} with a proven record of transforming petabyte-scale data into actionable business intelligence and high-accuracy predictive ML models.`,
      `Data-first ${seniority} ${role} experienced in statistical experimentation, scalable ETL pipelines, and delivering measurable revenue impact.`,
    ],
  },
  product: {
    matchKeywords: ['product manager', 'pm', 'product owner', 'technical product', 'group product'],
    skills: {
      coreTechnical: ['Product Discovery', 'Roadmap Strategy', 'PRDs & Feature Specs', 'User Research', 'Data Analytics'],
      frameworksAndTools: ['Jira / Linear', 'Figma', 'Mixpanel', 'Amplitude', 'Google Analytics', 'SQL (Basic)', 'Postman'],
      methodologiesAndSoft: ['Agile / Scrum', 'Stakeholder Alignment', 'A/B Testing', 'Customer Journey Mapping', 'GTM Strategy'],
    },
    metricsBullets: (role, company) => [
      `Spearheaded the 0-to-1 launch of ${company}'s flagship feature, achieving 85,000 Monthly Active Users within 90 days of rollout.`,
      `Redesigned onboarding and conversion funnels based on behavioral funnel analytics, driving a 24% increase in free-to-paid conversions.`,
      `Prioritized engineering backlog and sprint goals, boosting delivery predictability from 70% to 94% across 4 cross-functional squads.`,
    ],
    leadershipBullets: (role, company) => [
      `Aligned executive stakeholders, engineering managers, and design leads on multi-quarter product OKRs and technical investment roadmaps.`,
      `Conducted 40+ user feedback interviews and synthesized discovery findings into prioritized customer problem statements.`,
    ],
    technicalBullets: (role, company) => [
      `Authored detailed technical requirements, API data contracts, and edge-case specifications in close collaboration with system architects.`,
    ],
    summaries: (role, seniority) => [
      `Strategic ${seniority} ${role} adept at uniting cross-functional teams around high-impact product visions, data-driven prioritization, and scalable SaaS execution.`,
    ],
  },
  design: {
    matchKeywords: ['designer', 'ui', 'ux', 'product design', 'visual design', 'graphic', 'design system', 'creative'],
    skills: {
      coreTechnical: ['UI/UX Design', 'Design Systems', 'Wireframing & Prototyping', 'User Research', 'Information Architecture'],
      frameworksAndTools: ['Figma', 'Adobe Creative Suite', 'Tokens Studio', 'Miro', 'Principle', 'HTML/CSS Basics', 'WCAG A11y'],
      methodologiesAndSoft: ['Design Thinking', 'Usability Testing', 'Cross-functional Collaboration', 'Interaction Design', 'Micro-interactions'],
    },
    metricsBullets: (role, company) => [
      `Redesigned core mobile and web checkout flows at ${company}, reducing user drop-off by 19% and lifting overall conversion by 14%.`,
      `Built and governed an enterprise Figma design system with 200+ accessible components, decreasing design-to-code cycle times by 35%.`,
      `Conducted 25+ moderated usability testing sessions, surfacing critical UX friction points and resolving 90% of user accessibility blockers.`,
    ],
    leadershipBullets: (role, company) => [
      `Championed human-centered design principles and accessibility (WCAG 2.1 AA) across executive leadership and product pods.`,
      `Mentored junior designers on layout grid systems, typographic hierarchy, and responsive interaction patterns.`,
    ],
    technicalBullets: (role, company) => [
      `Created interactive high-fidelity micro-interaction prototypes in Figma demonstrating states, animations, and responsive breakpoints for engineering handoff.`,
    ],
    summaries: (role, seniority) => [
      `Creative ${seniority} ${role} specializing in intuitive user journeys, accessible design systems, and bridging product strategy with beautiful visual craftsmanship.`,
    ],
  },
  business_finance: {
    matchKeywords: ['finance', 'financial', 'accountant', 'accounting', 'analyst', 'audit', 'banking', 'investment', 'controller'],
    skills: {
      coreTechnical: ['Financial Modeling', 'Budgeting & Forecasting', 'Variance Analysis', 'GAAP / IFRS', 'Cash Flow Management'],
      frameworksAndTools: ['Advanced Excel / VBA', 'QuickBooks', 'NetSuite', 'SAP ERP', 'Power BI / Tableau', 'Bloomberg Terminal'],
      methodologiesAndSoft: ['Risk Assessment', 'Executive Financial Reporting', 'Internal Audit', 'Stakeholder Communication', 'Tax Compliance'],
    },
    metricsBullets: (role, company) => [
      `Managed annual operating budgets totaling $18M at ${company}, maintaining forecast variance under 2.5% across 4 consecutive quarters.`,
      `Identified operational expenditure inefficiencies and negotiated vendor contracts, reducing recurring overhead costs by $210,000 annually.`,
      `Automated month-end financial reconciliation workflows using advanced Excel models, cutting monthly close turnaround time by 3 business days.`,
      `Prepared comprehensive quarterly financial decks and KPI scorecards for presentation to the Board of Directors and executive leadership.`,
    ],
    leadershipBullets: (role, company) => [
      `Spearheaded internal audit readiness and SOX compliance initiatives, achieving 100% clean external audit reviews.`,
      `Advised department heads on capital allocation, headcount planning, and ROI projections for new business expansion proposals.`,
    ],
    technicalBullets: (role, company) => [
      `Built three-statement dynamic financial models and discounted cash flow (DCF) analyses to evaluate potential merger and acquisition opportunities.`,
    ],
    summaries: (role, seniority) => [
      `Detail-oriented ${seniority} ${role} with extensive experience in fiscal governance, corporate budgeting, variance analysis, and driving capital efficiency for growth companies.`,
    ],
  },
  marketing_growth: {
    matchKeywords: ['marketing', 'growth', 'seo', 'sem', 'content', 'social media', 'brand', 'campaign', 'copywriter'],
    skills: {
      coreTechnical: ['Growth Marketing', 'SEO & SEM', 'Paid Performance Ads', 'Conversion Rate Optimization (CRO)', 'Email Automation'],
      frameworksAndTools: ['Google Ads', 'Meta Ads Manager', 'HubSpot', 'Google Analytics 4', 'Semrush', 'Mailchimp', 'Canva'],
      methodologiesAndSoft: ['A/B Testing', 'Copywriting', 'Customer Segmentation', 'Campaign Strategy', 'Brand Storytelling'],
    },
    metricsBullets: (role, company) => [
      `Managed a $45,000 monthly digital ad spend across Meta and Google Ads at ${company}, lowering Customer Acquisition Cost (CAC) by 26% while scaling ROAS to 3.8x.`,
      `Executed comprehensive organic SEO strategy that expanded high-intent search visibility by 140%, driving 80,000+ organic monthly visitors.`,
      `Revamped lifecycle email nurture funnels in HubSpot, boosting click-through rates from 2.1% to 5.4% and recovering $120k in abandoned carts.`,
    ],
    leadershipBullets: (role, company) => [
      `Directed external agency partners, freelance copywriters, and creative designers to ensure cohesive cross-channel brand messaging.`,
    ],
    technicalBullets: (role, company) => [
      `Configured UTM tracking taxonomies, GA4 custom event tracking, and Looker Studio attribution dashboards to track multi-touch user journeys.`,
    ],
    summaries: (role, seniority) => [
      `High-impact ${seniority} ${role} with a proven track record of scaling digital acquisition, optimizing marketing funnels, and accelerating revenue growth through data-driven campaigns.`,
    ],
  },
  sales_bizdev: {
    matchKeywords: ['sales', 'account executive', 'ae', 'business development', 'bdr', 'sdr', 'account manager', 'client relations'],
    skills: {
      coreTechnical: ['B2B Enterprise Sales', 'Pipeline Management', 'Cold Outreach & Discovery', 'Contract Negotiation', 'Account Retention'],
      frameworksAndTools: ['Salesforce', 'HubSpot CRM', 'Outreach.io', 'Apollo.io', 'ZoomInfo', 'LinkedIn Sales Navigator', 'Gong'],
      methodologiesAndSoft: ['MEDDIC / SPIN Selling', 'Relationship Building', 'Objection Handling', 'Executive Presentation', 'Customer Success'],
    },
    metricsBullets: (role, company) => [
      `Exceeded annual sales quota by 135% at ${company}, closing $1.4M in New Annual Recurring Revenue (ARR) across mid-market accounts.`,
      `Pioneered a multi-touch outbound prospecting sequence generating 45+ qualified sales opportunities quarterly with a 28% meeting-to-close rate.`,
      `Shortened the enterprise sales cycle from 90 days to 58 days by implementing structured discovery and mutual action plans.`,
    ],
    leadershipBullets: (role, company) => [
      `Mentored onboarding SDRs on cold call objection handling, pitch cadence, and Salesforce pipeline management hygiene.`,
    ],
    technicalBullets: (role, company) => [
      `Mapped client enterprise software stacks and security prerequisites to tailor customized proof-of-concept (POC) demonstrations.`,
    ],
    summaries: (role, seniority) => [
      `Tenacious ${seniority} ${role} with a consistent record of quota over-achievement, high-value contract negotiation, and cultivating strategic client partnerships.`,
    ],
  },
  operations_management: {
    matchKeywords: ['operations', 'project manager', 'pmp', 'scrum master', 'coordinator', 'supply chain', 'logistics', 'hr', 'human resources'],
    skills: {
      coreTechnical: ['Process Optimization', 'Vendor Management', 'Workflow Automation', 'Risk Mitigation', 'Resource Allocation'],
      frameworksAndTools: ['Asana / Trello', 'Jira', 'Microsoft Project', 'Slack / Notion', 'ERP Software', 'Zapier / Make'],
      methodologiesAndSoft: ['Lean / Six Sigma', 'Change Management', 'Conflict Resolution', 'Cross-Functional Coordination', 'Operational Scalability'],
    },
    metricsBullets: (role, company) => [
      `Overhauled departmental operational workflows at ${company}, reducing turnaround latency by 35% and eliminating $45k in administrative overhead.`,
      `Orchestrated cross-functional operational plans for 12 simultaneous projects, achieving on-time and within-budget delivery across 100% of milestones.`,
      `Negotiated regional supplier and vendor agreements, securing an 18% cost reduction while guaranteeing 99.8% supply fulfillment rates.`,
    ],
    leadershipBullets: (role, company) => [
      `Facilitated company-wide operational alignment workshops and change management transitions for a workforce of 250+ personnel.`,
    ],
    technicalBullets: (role, company) => [
      `Integrated no-code automation workflows via Zapier and custom Webhooks, saving 15 hours of manual data entry per week.`,
    ],
    summaries: (role, seniority) => [
      `Solutions-oriented ${seniority} ${role} experienced in streamlining complex logistics, scaling operational efficiency, and cultivating high-reliability workflows.`,
    ],
  },
};

/**
 * Fallback archetype for general professional roles.
 */
const GENERAL_ARCHETYPE: RoleDomainArchetype = {
  matchKeywords: [],
  skills: {
    coreTechnical: ['Strategic Planning', 'Workflow Execution', 'Data Analysis & Reporting', 'Quality Assurance', 'Research'],
    frameworksAndTools: ['Microsoft Office 365', 'Google Workspace', 'Project Management Tools', 'CRM Systems', 'Collaboration Platforms'],
    methodologiesAndSoft: ['Problem Solving', 'Written & Verbal Communication', 'Time Management', 'Critical Thinking', 'Team Collaboration'],
  },
  metricsBullets: (role, company) => [
    `Spearheaded key initiatives as ${role} at ${company}, elevating operational turnaround velocity by 30% and maintaining strict quality standards.`,
    `Implemented standard operating procedures and documentation that saved 8+ team hours weekly on repetitive manual tasks.`,
    `Achieved 99.2% customer satisfaction ratings across 400+ client deliverables, consistently exceeding organizational quarterly benchmarks.`,
  ],
  leadershipBullets: (role, company) => [
    `Coordinated cross-functional stakeholders and team meetings, ensuring transparent communication and timely completion of project deliverables.`,
  ],
  technicalBullets: (role, company) => [
    `Leveraged modern software tooling and digital reporting systems to systematically track metrics, resolve roadblocks, and streamline operations.`,
  ],
  summaries: (role, seniority) => [
    `Dedicated ${seniority} ${role} recognized for high-standard execution, proactive problem-solving, and seamless collaboration across fast-paced environments.`,
  ],
};

function resolveArchetype(role: string): RoleDomainArchetype {
  const normalized = (role || '').toLowerCase();
  for (const key of Object.keys(DOMAIN_ARCHETYPES)) {
    const arch = DOMAIN_ARCHETYPES[key];
    if (arch.matchKeywords.some((kw) => normalized.includes(kw))) {
      return arch;
    }
  }
  return GENERAL_ARCHETYPE;
}

function resolveSeniorityLabel(level?: SeniorityLevel): string {
  switch (level) {
    case 'entry':
      return 'Early-Career';
    case 'senior':
      return 'Senior';
    case 'lead':
      return 'Lead / Staff';
    case 'mid':
    default:
      return 'Experienced';
  }
}

/**
 * DomainHeuristicProvider implements IAiSuggestionProvider with rich offline knowledge.
 */
export class DomainHeuristicProvider implements IAiSuggestionProvider {
  public async generateSuggestions(request: AiSuggestionRequest): Promise<AiSuggestionResponse> {
    const startTime = performance.now();
    const { section, targetRole, company = 'Organization', projectName = 'Core Project', technologies = [], seniorityLevel = 'mid', tone = 'metrics', userFocusPrompt } = request;

    const archetype = resolveArchetype(targetRole);
    const seniority = resolveSeniorityLabel(seniorityLevel);

    let suggestions: string[] = [];
    let skillGroups: SkillGroupSuggestion[] | undefined = undefined;

    switch (section) {
      case 'skills': {
        // Build 3 high-impact skill categories
        skillGroups = [
          {
            category: 'Core Competencies & Languages',
            items: archetype.skills.coreTechnical,
          },
          {
            category: 'Frameworks, Tools & Platforms',
            items: technologies.length > 0 ? Array.from(new Set([...technologies, ...archetype.skills.frameworksAndTools])) : archetype.skills.frameworksAndTools,
          },
          {
            category: 'Methodologies & Professional Skills',
            items: archetype.skills.methodologiesAndSoft,
          },
        ];
        suggestions = skillGroups.flatMap((g) => g.items);
        break;
      }

      case 'experience': {
        if (tone === 'leadership') {
          suggestions = archetype.leadershipBullets(targetRole, company);
        } else if (tone === 'technical') {
          suggestions = archetype.technicalBullets(targetRole, company);
        } else {
          suggestions = archetype.metricsBullets(targetRole, company);
        }

        // If user provided a specific focus prompt, append a tailored bullet
        if (userFocusPrompt) {
          suggestions.unshift(
            `Spearheaded ${userFocusPrompt} initiatives at ${company}, driving measurable efficiency gains and optimizing delivery cycles.`
          );
        }
        break;
      }

      case 'project': {
        const techStr = technologies.length > 0 ? technologies.join(', ') : 'modern industry stacks';
        if (tone === 'technical') {
          suggestions = [
            `Architected and implemented ${projectName} using ${techStr}, designing modular components and robust API interfaces.`,
            `Configured automated testing and continuous integration pipelines for ${projectName}, achieving 90%+ code coverage.`,
            `Containerized the service architecture and established automated deployments with zero production downtime.`,
          ];
        } else {
          suggestions = [
            `Engineered ${projectName} utilizing ${techStr}, scaling system throughput to support thousands of active users with sub-100ms response times.`,
            `Optimized data fetching and asset bundling in ${projectName}, decreasing initial load times by 48% and scoring 98+ on core performance benchmarks.`,
            `Integrated secure authentication and encrypted data storage across all endpoints in ${projectName}, preventing security regressions.`,
          ];
        }
        break;
      }

      case 'summary':
      default: {
        suggestions = archetype.summaries(targetRole, seniority);
        break;
      }
    }

    const latencyMs = Math.round(performance.now() - startTime);

    return {
      suggestions,
      skillGroups,
      provider: 'heuristic',
      latencyMs,
    };
  }
}
