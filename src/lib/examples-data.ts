import { ResumeData, TemplateId } from '@/types/resume';

export interface ResumeExample {
  slug: string;
  title: string;
  role: string;
  experienceLevel: string;
  category: 'tech' | 'fresher' | 'data' | 'business' | 'finance' | 'marketing';
  metaDescription: string;
  targetKeywords: string[];
  recommendedTemplate: TemplateId;
  whyItWorks: Array<{ title: string; desc: string }>;
  skillsGrouped: Record<string, string[]>;
  experienceBullets: string[];
  sampleProjects: Array<{ title: string; tech: string; desc: string }>;
  commonMistakes: string[];
  interviewQuestions: Array<{ q: string; tip: string }>;
  sampleResumeData: ResumeData;
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    slug: 'software-engineer-resume',
    title: 'Software Engineer Resume Example & ATS Guide',
    role: 'Software Engineer',
    experienceLevel: '2–5 Years Experience',
    category: 'tech',
    metaDescription: 'Recruiter-approved Software Engineer resume example with microservices scale, cloud architecture metrics, ATS keywords, and 1-click vector A4 template.',
    targetKeywords: [
      'typescript', 'react', 'node.js', 'postgresql', 'redis', 'docker', 'aws eks',
      'microservices', 'rest api', 'ci/cd', 'distributed systems', 'system design',
    ],
    recommendedTemplate: 'prawira',
    whyItWorks: [
      {
        title: 'Quantified System Scale & ROI',
        desc: 'Instead of listing generic tasks, bullet points specify transaction volume (4.2M daily), latency reduction (44%), and infrastructure cost savings (₹18L/yr).',
      },
      {
        title: 'ATS-Optimized Skills Taxonomy',
        desc: 'Categorizes technical competencies into Languages, Frameworks, Databases, and Cloud rather than an unsearchable comma-separated blob.',
      },
      {
        title: 'Production System Ownership',
        desc: 'Clearly demonstrates end-to-end responsibility from API architecture and automated testing to Docker containerization and AWS deployment.',
      },
      {
        title: 'Clean Dual-Column Layout',
        desc: 'Utilizes the Prawira Modern template for high whitespace balance, ensuring recruiters scan core skills in under 6 seconds.',
      },
    ],
    skillsGrouped: {
      'Languages & Core': ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL'],
      'Frontend & Web': ['React.js', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3'],
      'Backend & APIs': ['Node.js', 'Express', 'FastAPI', 'RESTful APIs', 'GraphQL', 'gRPC'],
      'Databases & Caching': ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
      'DevOps & Cloud': ['Docker', 'Kubernetes', 'AWS (EC2, S3, EKS)', 'GitHub Actions', 'CI/CD'],
    },
    experienceBullets: [
      'Architected and deployed high-throughput payments microservice processing 4.2M+ daily transactions with 99.98% uptime on AWS EKS.',
      'Optimized database queries and implemented multi-tier Redis caching, slashing p99 API response latency by 44% during peak flash sales.',
      'Spearheaded migration of monolithic Ruby backend into containerized Node.js services, reducing server infrastructure costs by ₹18 Lakhs/year.',
      'Established automated CI/CD deployment pipelines using GitHub Actions, decreasing production release cycle time from 5 days to 25 minutes.',
      'Conducted 40+ technical system design interviews and mentored 6 junior software engineers on clean architecture and unit testing.',
    ],
    sampleProjects: [
      {
        title: 'Distributed Real-Time Notification Engine',
        tech: 'Node.js, Redis Pub/Sub, WebSockets, Kafka, Docker',
        desc: 'Built an event-driven notification service delivering 120k messages/second across push, email, and SMS with zero packet loss.',
      },
      {
        title: 'E-Commerce Checkout Performance Revamp',
        tech: 'Next.js 14, React, Tailwind CSS, Stripe API',
        desc: 'Redesigned mobile-first checkout flow, reducing cart abandonment rate by 18% and boosting mobile conversion by 26%.',
      },
    ],
    commonMistakes: [
      'Writing generic responsibilities like "Worked on fixing bugs and adding features" instead of measurable accomplishments.',
      'Leaving out specific database scale (e.g. table size, queries per second) and cloud infrastructure tools.',
      'Using non-standard graphical rating bars (e.g. "React: 4/5 stars") which break automated ATS parsers.',
      'Omitting unit testing frameworks (Jest, Mocha, Cypress) that senior interviewers look for.',
    ],
    interviewQuestions: [
      {
        q: 'How did you achieve a 44% reduction in API response latency?',
        tip: 'Discuss database indexing strategies (B-Tree vs Hash), Redis query caching TTLs, connection pooling, and payload minimization.',
      },
      {
        q: 'How do you ensure data consistency across distributed microservices?',
        tip: 'Mention the Saga pattern, idempotent API design, two-phase commit alternatives, and asynchronous event bus architecture via Kafka.',
      },
    ],
    sampleResumeData: {
      id: 'example-software-engineer',
      title: 'Software Engineer - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'prawira',
      themeColor: '#2563eb',
      fontFamily: 'inter',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Rahul Sharma',
        jobTitle: 'Senior Software Engineer',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, Karnataka, India',
        linkedin: 'linkedin.com/in/rahul-sharma',
        github: 'github.com/rahul-dev',
        summary:
          'Software Engineer with 4+ years of expertise architecting high-throughput microservices, scalable REST APIs, and modern React applications. Proven track record reducing infrastructure expenses by ₹18L/yr and slashing p99 latency by 44% across 4M+ daily transactions.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'CloudScale Technologies',
          role: 'Senior Software Engineer',
          location: 'Bengaluru, India',
          startDate: '2022-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected and deployed payments microservice processing 4.2M+ daily transactions with 99.98% uptime on AWS EKS.',
            'Optimized database queries and implemented multi-tier Redis caching, slashing p99 API response latency by 44% during peak flash sales.',
            'Spearheaded migration of monolithic backend into containerized Node.js services, reducing server costs by ₹18 Lakhs/year.',
            'Established automated CI/CD deployment pipelines using GitHub Actions, decreasing release cycle from 5 days to 25 minutes.',
          ],
        },
        {
          id: 'exp-2',
          company: 'InnoTech Solutions',
          role: 'Software Engineer',
          location: 'Pune, India',
          startDate: '2020-07',
          endDate: '2022-02',
          current: false,
          highlights: [
            'Engineered customer onboarding portal in React and TypeScript, accelerating user registration velocity by 32%.',
            'Developed RESTful APIs in Node.js and PostgreSQL supporting 50k concurrent mobile application users.',
            'Authored unit and integration test suites achieving 88% code coverage using Jest and Supertest.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'National Institute of Technology (NIT)',
          degree: 'B.Tech in Computer Science and Engineering',
          location: 'Trichy, India',
          graduationDate: '2020-05',
          gpa: '8.9 / 10',
          highlights: ['Specialization in Distributed Systems and Algorithms', 'Smart India Hackathon (SIH) National Finalist'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Languages & Core',
          items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL'],
        },
        {
          id: 'sk-2',
          category: 'Frameworks & Tools',
          items: ['React.js', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'FastAPI'],
        },
        {
          id: 'sk-3',
          category: 'Databases & Cloud',
          items: ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS (EKS, S3, EC2)', 'Kafka'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Distributed Real-Time Notification Engine',
          technologies: ['Node.js', 'Redis', 'Kafka', 'Docker'],
          highlights: [
            'Built an event-driven notification service delivering 120k messages/second across push, email, and SMS with zero loss.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
      },
    },
  },
  {
    slug: 'btech-fresher-resume',
    title: 'B.Tech / BE Fresher Resume Format (TPO & Campus Approved)',
    role: 'B.Tech Fresher (CS / IT / ECE)',
    experienceLevel: 'Entry Level (0 Years)',
    category: 'fresher',
    metaDescription: 'Strict 1-page B.Tech fresher resume format approved by college Training & Placement (TPO) cells. Standard CGPA tables, SIH hackathons, and LeetCode profile integration.',
    targetKeywords: [
      'data structures', 'algorithms', 'java', 'python', 'c++', 'sql', 'dbms',
      'object oriented programming', 'git', 'github', 'smart india hackathon', 'leetcode',
    ],
    recommendedTemplate: 'traditional',
    whyItWorks: [
      {
        title: 'Strict 1-Page Constraint',
        desc: 'Adheres to universal campus placement cell guidelines across IITs, NITs, and state universities, eliminating spillover onto an awkward second page.',
      },
      {
        title: 'Structured Academic Credentials',
        desc: 'Displays B.Tech CGPA alongside 10th and 12th board percentages clearly in standard tabular form without distracting graphics.',
      },
      {
        title: 'Focus on Verified Projects & Hackathons',
        desc: 'Showcases Smart India Hackathon (SIH), capstone projects, and GitHub repositories with working live links.',
      },
      {
        title: 'Competitive Programming Credibility',
        desc: 'Highlights LeetCode contest ratings (1850+) and CodeChef stars to demonstrate proven problem-solving ability to campus interviewers.',
      },
    ],
    skillsGrouped: {
      'Programming Languages': ['Java', 'C++', 'Python', 'SQL', 'JavaScript'],
      'Core Fundamentals': ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'DBMS', 'Operating Systems', 'Computer Networks'],
      'Web Technologies': ['HTML5', 'CSS3', 'React.js', 'Node.js', 'REST APIs'],
      'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux / Bash'],
    },
    experienceBullets: [
      'Solved 450+ algorithmic coding problems across LeetCode and GeeksforGeeks, maintaining an active contest rating of 1860+ (Knight).',
      'Led a 4-member student engineering team to the Grand Finale of Smart India Hackathon (SIH) 2023 out of 12,000+ participating teams.',
      'Developed full-stack campus placement preparation portal utilized by 1,200+ students with automated mock test evaluation.',
      'Completed 2-month summer internship building automated invoice validation scripts in Python, eliminating 15 hours of weekly manual data entry.',
    ],
    sampleProjects: [
      {
        title: 'AI Smart Campus Attendance System',
        tech: 'Python, OpenCV, Flask, SQLite',
        desc: 'Engineered automated facial recognition attendance logger processing 60 student faces simultaneously with 98.4% accuracy.',
      },
      {
        title: 'Algorithm Visualizer Web App',
        tech: 'React, TypeScript, CSS Transitions',
        desc: 'Interactive visualizer for sorting and graph pathfinding algorithms (Dijkstra, A*) with over 5,000 unique monthly student visitors.',
      },
    ],
    commonMistakes: [
      'Failing to keep the resume strictly to 1 single A4 page.',
      'Omitting 10th and 12th percentages, which are mandatory for campus shortlisting criteria (e.g. 60%+ throughout).',
      'Listing generic skills like "MS Word" or "Hardworking" instead of computer science fundamentals and coding profiles.',
      'Describing academic projects without specifying the exact tech stack and your individual contribution.',
    ],
    interviewQuestions: [
      {
        q: 'Can you explain the time and space complexity of your capstone project algorithm?',
        tip: 'Be precise with Big-O notation for worst, average, and best-case scenarios and explain memory tradeoffs.',
      },
      {
        q: 'What is the difference between an abstract class and an interface in Java?',
        tip: 'Highlight default/static methods in Java 8+, multiple inheritance through interfaces, and when to use one over the other.',
      },
    ],
    sampleResumeData: {
      id: 'example-btech-fresher',
      title: 'B.Tech Fresher - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'traditional',
      themeColor: '#0f172a',
      fontFamily: 'garamond',
      spacing: 'compact',
      personalInfo: {
        fullName: 'Aditya Verma',
        jobTitle: 'B.Tech Computer Science Graduate',
        email: 'aditya.verma@example.com',
        phone: '+91 91234 56789',
        location: 'Pune, Maharashtra, India',
        linkedin: 'linkedin.com/in/aditya-verma',
        github: 'github.com/aditya-code',
        summary:
          'Disciplined Computer Science graduate with strong fundamentals in Data Structures, Algorithms, and Full Stack Development. Solved 450+ problems on LeetCode (Rating: 1865). National Finalist in Smart India Hackathon with proven track record delivering reliable software projects.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'TechCorp India',
          role: 'Software Engineering Intern',
          location: 'Pune, India',
          startDate: '2023-06',
          endDate: '2023-08',
          current: false,
          highlights: [
            'Engineered automated invoice validation scripts in Python, saving 15 hours of manual accounting verification weekly.',
            'Collaborated with backend engineering team to write unit tests for customer REST APIs using PyTest.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'College of Engineering Pune (COEP)',
          degree: 'B.Tech in Computer Science and Engineering',
          location: 'Pune, India',
          graduationDate: '2024-05',
          gpa: '8.85 / 10',
          highlights: ['Ranked in top 5% of class', 'Placement Cell Student Coordinator'],
        },
        {
          id: 'edu-2',
          school: 'Kendriya Vidyalaya (CBSE)',
          degree: 'Class XII (Science Stream - PCM)',
          location: 'Pune, India',
          graduationDate: '2020-05',
          gpa: '94.2%',
          highlights: ['School topper in Computer Science (Python/SQL)'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Programming Languages',
          items: ['Java', 'C++', 'Python', 'SQL', 'JavaScript'],
        },
        {
          id: 'sk-2',
          category: 'Core Fundamentals',
          items: ['Data Structures & Algorithms', 'OOPs', 'DBMS', 'Operating Systems', 'Computer Networks'],
        },
        {
          id: 'sk-3',
          category: 'Web & Tools',
          items: ['React.js', 'Node.js', 'Git', 'GitHub', 'Postman', 'Linux'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Smart India Hackathon - Rural Healthcare Scheduler',
          technologies: ['React', 'Node.js', 'MongoDB', 'Twilio API'],
          highlights: [
            'Built an SMS-based patient appointment scheduler for rural clinics with offline queuing, selected as National Finalist.',
          ],
        },
        {
          id: 'proj-2',
          title: 'Algorithm Sorting Visualizer',
          technologies: ['React', 'TypeScript', 'CSS'],
          highlights: [
            'Designed interactive visual step-through for Merge Sort, Quick Sort, and Dijkstra algorithm with 5,000+ monthly visits.',
          ],
        },
      ],
      certifications: [],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Marathi', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'education', 'skills', 'projects', 'experience'],
      },
    },
  },
  {
    slug: 'frontend-developer-resume',
    title: 'Frontend Developer Resume Example & ATS Keywords',
    role: 'Frontend Developer',
    experienceLevel: '2–4 Years Experience',
    category: 'tech',
    metaDescription: 'High-converting Frontend Developer resume with Next.js, React, Core Web Vitals, performance optimization metrics, and ATS-friendly two-column layout.',
    targetKeywords: [
      'react', 'next.js', 'typescript', 'tailwind css', 'redux', 'core web vitals',
      'lcp', 'fid', 'inp', 'responsive design', 'jest', 'playwright', 'web accessibility', 'wcag',
    ],
    recommendedTemplate: 'stockholm',
    whyItWorks: [
      {
        title: 'Core Web Vitals Metric Focus',
        desc: 'Highlights quantifiable real-world page speed improvements (LCP reduced from 3.8s to 1.2s), which top tech companies prioritize.',
      },
      {
        title: 'Modern Frontend Ecosystem',
        desc: 'Features Next.js 14 App Router, Server Components, TypeScript, and state management frameworks that match recruiter search filters.',
      },
      {
        title: 'Design System & Accessibility',
        desc: 'Mentions reusable component library architecture and WCAG 2.1 AA compliance, showcasing engineering maturity beyond basic styling.',
      },
      {
        title: 'High-Density Sidebar Format',
        desc: 'Stockholm template keeps UI frameworks, testing tools, and design competencies organized without cluttering the project timeline.',
      },
    ],
    skillsGrouped: {
      'Frontend Frameworks': ['React 18', 'Next.js 14 (App Router)', 'Vue.js', 'React Native'],
      'Languages & Typing': ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SASS'],
      'State & Data Fetching': ['Redux Toolkit', 'Zustand', 'React Query (TanStack)', 'GraphQL', 'REST APIs'],
      'Styling & UI Systems': ['Tailwind CSS', 'Radix UI', 'Shadcn/ui', 'Framer Motion', 'Figma to Code'],
      'Testing & Performance': ['Jest', 'React Testing Library', 'Playwright', 'Lighthouse', 'Core Web Vitals'],
    },
    experienceBullets: [
      'Spearheaded frontend migration to Next.js 14 Server Components, slashing Largest Contentful Paint (LCP) from 3.8s to 1.1s and improving SEO traffic by 42%.',
      'Architected company-wide design system of 45+ accessible WCAG-compliant UI components used across 6 web applications, speeding up engineering velocity by 30%.',
      'Engineered state management and caching layer with TanStack Query and Zustand, eliminating redundant network calls by 55%.',
      'Implemented end-to-end automated UI test suite with Playwright, catching 99% of layout regressions prior to production release.',
    ],
    sampleProjects: [
      {
        title: 'High-Performance SaaS Analytics Dashboard',
        tech: 'Next.js 14, TypeScript, Tailwind CSS, Tremor, Recharts',
        desc: 'Built real-time metric visualization dashboard rendering 10,000 data points at 60 FPS with responsive cross-browser support.',
      },
    ],
    commonMistakes: [
      'Only listing "HTML, CSS, JS" without emphasizing modern component architecture (React, Next.js, TypeScript).',
      'Forgetting to mention performance metrics (bundle size reduction, Lighthouse scores, frame rates).',
      'Missing mentions of unit/E2E testing (Jest, Cypress, Playwright).',
      'Not demonstrating accessibility standards (ARIA, keyboard navigation, semantic HTML).',
    ],
    interviewQuestions: [
      {
        q: 'How do Next.js Server Components differ from Client Components in terms of bundle size?',
        tip: 'Explain that Server Component dependencies stay on the server and are never sent to the client browser, drastically shrinking JS bundle weight.',
      },
      {
        q: 'How do you diagnose and fix a slow Interaction to Next Paint (INP) score?',
        tip: 'Mention Chrome DevTools Performance panel, breaking up long JavaScript tasks, using requestIdleCallback or startTransition, and offloading compute to Web Workers.',
      },
    ],
    sampleResumeData: {
      id: 'example-frontend-dev',
      title: 'Frontend Developer - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'stockholm',
      themeColor: '#1e293b',
      fontFamily: 'sourcesans',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Priya Sundaram',
        jobTitle: 'Senior Frontend Developer',
        email: 'priya.sundaram@example.com',
        phone: '+91 98765 12345',
        location: 'Hyderabad, Telangana, India',
        linkedin: 'linkedin.com/in/priya-sundaram',
        github: 'github.com/priya-ui',
        summary:
          'Senior Frontend Developer with 4 years specializing in Next.js, React, TypeScript, and high-performance web applications. Proven track record reducing LCP by 70%, building WCAG-accessible enterprise design systems, and improving user retention across 500k monthly active users.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Swiggy Tech',
          role: 'Frontend Engineer - Customer Web',
          location: 'Hyderabad, India',
          startDate: '2022-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded frontend migration to Next.js 14, slashing LCP from 3.8s to 1.1s and boosting organic SEO conversions by 28%.',
            'Architected company-wide component library (45+ UI components in TypeScript and Tailwind), reducing frontend dev sprint time by 30%.',
            'Implemented client-side caching with TanStack React Query, cutting backend API load by 55% during high-traffic lunch hours.',
            'Collaborated with UX designers to achieve WCAG 2.1 AA accessibility compliance across mobile web and desktop checkout.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'Jawaharlal Nehru Technological University (JNTU)',
          degree: 'B.Tech in Information Technology',
          location: 'Hyderabad, India',
          graduationDate: '2020-05',
          gpa: '8.7 / 10',
          highlights: ['President, Web Development & Open Source Club'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Frontend Frameworks',
          items: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Zustand'],
        },
        {
          id: 'sk-2',
          category: 'Testing & Tools',
          items: ['Jest', 'Playwright', 'Webpack', 'Vite', 'Git', 'Figma'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Interactive Design System Documentation Hub',
          technologies: ['Next.js', 'Storybook', 'Tailwind CSS', 'Radix UI'],
          highlights: [
            'Created comprehensive component documentation with interactive live code playgrounds, adopted by 35 frontend engineers.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Meta Certified Frontend Developer',
          issuer: 'Coursera / Meta',
          date: '2022',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Professional' },
        { id: 'l-2', language: 'Telugu', proficiency: 'Native' },
        { id: 'l-3', language: 'Hindi', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'skills', 'projects', 'education'],
      },
    },
  },
  {
    slug: 'data-analyst-resume',
    title: 'Data Analyst Resume Example & SQL Project Highlights',
    role: 'Data Analyst / Business Intelligence',
    experienceLevel: '1–4 Years Experience',
    category: 'data',
    metaDescription: 'Proven Data Analyst resume template with SQL window functions, Python data wrangling, Tableau dashboard metrics, and ATS-tested layout.',
    targetKeywords: [
      'sql', 'python', 'pandas', 'numpy', 'tableau', 'power bi', 'etl pipelines',
      'excel', 'data modeling', 'business intelligence', 'statistics', 'a/b testing',
    ],
    recommendedTemplate: 'traditional',
    whyItWorks: [
      {
        title: 'Business Metric & Revenue Attribution',
        desc: 'Connects data analysis directly to commercial outcomes: ₹45 Lakhs in cost savings and 14% improvement in customer churn.',
      },
      {
        title: 'Advanced SQL & Data Modeling',
        desc: 'Explicitly mentions complex SQL constructs (CTEs, Window Functions, Stored Procedures, Partitioning) that data engineering managers evaluate.',
      },
      {
        title: 'Dual Capability: Visual + Scripting',
        desc: 'Demonstrates end-to-end expertise spanning automated Python scripts (Pandas, NumPy) and executive-ready Tableau / PowerBI dashboards.',
      },
    ],
    skillsGrouped: {
      'Database & Querying': ['Advanced SQL', 'PostgreSQL', 'MySQL', 'Snowflake', 'BigQuery'],
      'Programming & Scripting': ['Python (Pandas, NumPy, Scikit-learn)', 'R', 'Bash'],
      'BI & Visualization': ['Tableau', 'Power BI', 'Google Looker Studio', 'Excel (Power Query, VBA)'],
      'Analytics & Statistics': ['A/B Testing', 'Hypothesis Testing', 'Cohort Analysis', 'ETL Pipelines', 'Data Cleansing'],
    },
    experienceBullets: [
      'Engineered automated SQL pipelines on Snowflake and BigQuery, updating revenue dashboards daily and saving 12 manual reporting hours per week.',
      'Conducted customer churn cohort analysis identifying 3 key churn indicators, driving product changes that boosted retention by 14%.',
      'Designed 8 interactive executive Tableau dashboards monitoring ₹60+ Crores in annual transaction volume for leadership review.',
      'Partnered with product managers to design and evaluate 25+ statistical A/B tests on landing page conversion.',
    ],
    sampleProjects: [
      {
        title: 'E-Commerce Customer Lifetime Value (CLV) Predictor',
        tech: 'Python, Pandas, Scikit-Learn, Streamlit',
        desc: 'Developed predictive CLV model categorizing 150k shoppers into actionable marketing segments, increasing repeat purchase rates by 19%.',
      },
    ],
    commonMistakes: [
      'Only listing "Excel and SQL" without detailing the complexity (window functions, indexing, automated data pipelines).',
      'Describing charts and graphs without stating the business decision or revenue impact that resulted from the insight.',
      'Missing mentions of A/B testing methodologies and statistical significance.',
    ],
    interviewQuestions: [
      {
        q: 'Can you write a SQL query to find the 2nd highest salary in each department using Window Functions?',
        tip: 'Use DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) in a Common Table Expression (CTE).',
      },
      {
        q: 'How do you determine if an A/B test has reached statistical significance?',
        tip: 'Discuss p-values, alpha levels (usually 0.05), sample size calculation prior to test launch, and avoiding false positives from early stopping.',
      },
    ],
    sampleResumeData: {
      id: 'example-data-analyst',
      title: 'Data Analyst - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'traditional',
      themeColor: '#0f172a',
      fontFamily: 'garamond',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Ananya Deshmukh',
        jobTitle: 'Data Analyst &amp; BI Specialist',
        email: 'ananya.deshmukh@example.com',
        phone: '+91 98989 12345',
        location: 'Pune, Maharashtra, India',
        linkedin: 'linkedin.com/in/ananya-deshmukh',
        github: 'github.com/ananya-data',
        summary:
          'Data Analyst with 3 years extracting actionable insights from multi-terabyte datasets using Advanced SQL, Python, and Tableau. Proven track record reducing reporting overhead by 12 hrs/week and uncovering retention opportunities that lowered churn by 14%.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Razorpay Financial',
          role: 'Data Analyst',
          location: 'Pune, India',
          startDate: '2021-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Engineered automated SQL pipelines on Snowflake and BigQuery, saving 12 manual analyst hours every week.',
            'Conducted customer churn cohort analysis identifying 3 key friction points, lowering churn rate by 14%.',
            'Designed 8 interactive executive Tableau dashboards monitoring ₹60+ Crores in annual merchant settlements.',
            'Collaborated with product teams to design and evaluate 25+ statistical A/B tests on user onboarding.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'Pune University (SPPU)',
          degree: 'B.Sc in Statistics & Computer Science',
          location: 'Pune, India',
          graduationDate: '2021-06',
          gpa: '84%',
          highlights: ['Coursework in Applied Multivariate Statistics, Econometrics, and SQL'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'SQL & Databases',
          items: ['PostgreSQL', 'Snowflake', 'BigQuery', 'Window Functions', 'CTEs', 'Data Modeling'],
        },
        {
          id: 'sk-2',
          category: 'Python & Analytics',
          items: ['Python (Pandas, NumPy)', 'Tableau', 'Power BI', 'A/B Testing', 'Excel (Power Query)'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Customer Lifetime Value (CLV) Segmentation Engine',
          technologies: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'],
          highlights: [
            'Categorized 150,000 active customer accounts into high-value cohorts, increasing target campaign repeat purchase velocity by 19%.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Google Advanced Data Analytics Professional Certificate',
          issuer: 'Google',
          date: '2022',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Marathi', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'education', 'skills', 'projects'],
      },
    },
  },
  {
    slug: 'naukri-resume-format',
    title: 'Naukri.com & Indian IT Placement Resume Format',
    role: 'Full Stack Engineer / IT Professional',
    experienceLevel: '1–6 Years Experience',
    category: 'tech',
    metaDescription: 'ATS resume format optimized for Naukri.com, Instahyre, and Indian recruiters. Includes notice period tags, primary/secondary skills, CTC formatting, and +91 conventions.',
    targetKeywords: [
      'naukri', 'instahyre', 'notice period', 'immediate joiner', 'full stack developer',
      'java', 'spring boot', 'react', 'microservices', 'bengaluru', 'hyderabad', 'pune',
    ],
    recommendedTemplate: 'traditional',
    whyItWorks: [
      {
        title: 'Optimized for Indian Recruiter Search Filters',
        desc: 'Naukri recruiters filter heavily by current designation, primary skills (e.g. Java, Spring Boot, React), notice period, and preferred location.',
      },
      {
        title: 'Notice Period & Relocation Clarity',
        desc: 'Prominently features "Notice Period: Immediate / 30 Days" and relocation flexibility across Bengaluru, Hyderabad, and Pune.',
      },
      {
        title: 'Standard Single-Column Flow',
        desc: 'Guarantees zero text parsing corruption on legacy HR systems, ATS parsers, and campus placement portals.',
      },
    ],
    skillsGrouped: {
      'Primary Tech Stack': ['Java 17', 'Spring Boot', 'Microservices', 'Hibernate / JPA', 'RESTful Web Services'],
      'Frontend Technologies': ['React.js', 'TypeScript', 'Redux', 'HTML5', 'CSS3'],
      'Database & Messaging': ['PostgreSQL', 'Oracle DB', 'Kafka', 'RabbitMQ', 'Redis'],
      'Cloud & DevOps': ['AWS (EC2, S3, RDS)', 'Docker', 'Kubernetes', 'Jenkins', 'Git'],
    },
    experienceBullets: [
      'Developed scalable enterprise banking microservices using Spring Boot and Kafka, handling 2.5M+ daily transaction records.',
      'Migrated legacy monolithic SOAP services to secure RESTful microservices on AWS, reducing deployment downtime by 40%.',
      'Optimized Oracle database queries and indexing strategies, decreasing average report generation response time from 12s to 1.8s.',
      'Active candidate with 30 Days Notice Period, open to relocation across Bengaluru, Hyderabad, Pune, and Gurugram.',
    ],
    sampleProjects: [
      {
        title: 'Core Banking API Gateway & Authorization Service',
        tech: 'Java, Spring Cloud Gateway, JWT, Redis, AWS',
        desc: 'Built high-concurrency API gateway validating OAuth2/JWT tokens with sub-10ms overhead for 45+ internal banking endpoints.',
      },
    ],
    commonMistakes: [
      'Not specifying notice period (recruiters on Naukri skip profiles with unclear or 90-day unnegotiable notice periods).',
      'Using US-formatted phone numbers instead of standard +91 mobile notation.',
      'Missing Indian city and state conventions (e.g. "Bengaluru, Karnataka").',
    ],
    interviewQuestions: [
      {
        q: 'What is your current notice period and can it be bought out?',
        tip: 'State your official notice period clearly (e.g. 30 days or immediate) and confirm willingness to serve notice or adjust dates.',
      },
      {
        q: 'Explain the internal working of HashMap in Java and how collisions are handled in Java 8+.',
        tip: 'Explain hash calculation, bucket index formula, linked list chaining, and the treeification into Red-Black Trees when bucket size exceeds 8.',
      },
    ],
    sampleResumeData: {
      id: 'example-naukri-format',
      title: 'Naukri Format - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'traditional',
      themeColor: '#0f172a',
      fontFamily: 'garamond',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Amit Kumar Verma',
        jobTitle: 'Full Stack Java Developer (30 Days Notice)',
        email: 'amit.verma@example.com',
        phone: '+91 98765 00112',
        location: 'Bengaluru, Karnataka, India',
        linkedin: 'linkedin.com/in/amit-verma-java',
        github: 'github.com/amit-verma',
        summary:
          'Full Stack Java Developer with 4 years building enterprise microservices using Java, Spring Boot, React, and AWS. Notice Period: 30 Days (Serving notice). Experienced optimizing high-concurrency banking APIs and database queries.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Accenture India',
          role: 'Senior Software Engineering Analyst',
          location: 'Bengaluru, India',
          startDate: '2021-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Developed scalable microservices in Java 17 and Spring Boot for financial payments processing 2.5M daily transactions.',
            'Architected event-driven message pipelines using Apache Kafka and Redis for low-latency notifications.',
            'Conducted code reviews and automated CI/CD pipeline deployments using Docker and Jenkins.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'Visvesvaraya Technological University (VTU)',
          degree: 'B.E. in Computer Science and Engineering',
          location: 'Bengaluru, India',
          graduationDate: '2020-06',
          gpa: '8.2 CGPA',
          highlights: ['Active member of IEEE Student Chapter'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Backend & Core',
          items: ['Java 17', 'Spring Boot', 'Microservices', 'Hibernate', 'REST APIs', 'Kafka'],
        },
        {
          id: 'sk-2',
          category: 'Frontend & DB',
          items: ['React.js', 'TypeScript', 'PostgreSQL', 'Oracle DB', 'Redis', 'Docker', 'AWS'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Enterprise Payment Gateway Integration',
          technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'],
          highlights: [
            'Integrated multi-bank payment APIs with automatic retry queues, achieving 99.95% transaction settlement reliability.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Oracle Certified Professional: Java SE 11 Developer',
          issuer: 'Oracle',
          date: '2021',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Kannada', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'skills', 'experience', 'education', 'projects'],
      },
    },
  },
  {
    slug: 'mba-resume',
    title: 'MBA & Product Manager Resume Example',
    role: 'MBA / Product Manager',
    experienceLevel: '2–6 Years Experience',
    category: 'business',
    metaDescription: 'Elite MBA and Product Management resume format for Indian B-school placements and tech unicorn product roles. Features roadmap ownership and growth metrics.',
    targetKeywords: [
      'product management', 'product strategy', 'mba', 'roadmap', 'user research',
      'kpis', 'a/b testing', 'agile', 'scrum', 'sql', 'gtm', 'cross-functional leadership',
    ],
    recommendedTemplate: 'amelia',
    whyItWorks: [
      {
        title: 'Executive Serif Typography',
        desc: 'Amelia Minimal layout offers sophisticated corporate aesthetics favored by consulting firms (McKinsey, BCG) and B-school placement committees (PlaceCom).',
      },
      {
        title: 'Strategic User & Revenue Impact',
        desc: 'Quantifies product lifecycle results: 32% MAU growth, ₹12 Crore incremental revenue, and 25% reduction in onboarding drop-off.',
      },
      {
        title: 'Cross-Functional Leadership Evidence',
        desc: 'Demonstrates ability to steer engineering, design, data science, and marketing stakeholders toward clear OKRs.',
      },
    ],
    skillsGrouped: {
      'Product Strategy': ['Product Vision & Roadmap', 'Go-To-Market (GTM) Strategy', 'Competitive Analysis', 'OKRs / KPIs'],
      'Execution & Discovery': ['User Journey Mapping', 'A/B Testing & Experimentation', 'Customer Discovery', 'Wireframing (Figma)'],
      'Technical & Analytics': ['SQL', 'Google Analytics 4', 'Mixpanel', 'Amplitude', 'Jira / Confluence', 'Agile / Scrum'],
    },
    experienceBullets: [
      'Led product roadmap from concept to launch for consumer mobile app feature, expanding Monthly Active Users (MAU) by 32% within 6 months.',
      'Spearheaded user onboarding experiment restructuring KYC verification, reducing signup drop-off by 24% and unlocking ₹12 Cr in new deposits.',
      'Authored 40+ comprehensive Product Requirement Documents (PRDs) and led sprint planning with 14 engineers and designers.',
      'Conducted 50+ customer discovery interviews to identify top unaddressed user pain points, driving 18% improvement in Net Promoter Score (NPS).',
    ],
    sampleProjects: [
      {
        title: 'One-Click Merchant Onboarding Journey',
        tech: 'Product Discovery, Mixpanel, Figma, SQL',
        desc: 'Redesigned merchant documentation verification flow, reducing total merchant approval turnaround time from 72 hours to 45 minutes.',
      },
    ],
    commonMistakes: [
      'Focusing on technical coding tasks instead of user value, strategic decision-making, and commercial metrics.',
      'Omitting analytical tools (SQL, Mixpanel, Amplitude, A/B testing) that modern product teams require.',
      'Using passive language instead of active product leadership verbs ("Spearheaded", "Architected GTM", "Championed").',
    ],
    interviewQuestions: [
      {
        q: 'How do you prioritize features when engineering bandwidth is limited?',
        tip: 'Explain prioritization frameworks (RICE, Kano Model, MoSCoW) and emphasize tying choices directly to high-level company OKRs.',
      },
      {
        q: 'Tell me about a time an A/B test showed negative results. How did you respond?',
        tip: 'Show intellectual humility, analyze why the hypothesis failed using qualitative user feedback, and iterate toward a better solution.',
      },
    ],
    sampleResumeData: {
      id: 'example-mba-product',
      title: 'MBA Product Manager - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'amelia',
      themeColor: '#1e293b',
      fontFamily: 'playfair',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Neha Patil',
        jobTitle: 'Senior Product Manager',
        email: 'neha.patil@example.com',
        phone: '+91 99887 65432',
        location: 'Mumbai, Maharashtra, India',
        linkedin: 'linkedin.com/in/neha-patil-pm',
        summary:
          'Product Manager with 5 years driving user growth and mobile product strategy. MBA from IIM Indore with background in computer science. Proven record growing MAU by 32%, reducing onboarding friction by 24%, and leading cross-functional teams to deliver ₹12 Cr incremental GMV.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Fintech Unicorn India',
          role: 'Product Manager - Growth &amp; Activation',
          location: 'Mumbai, India',
          startDate: '2021-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded user onboarding experiment restructuring KYC verification, reducing signup drop-off by 24% and unlocking ₹12 Cr in new deposits.',
            'Authored 40+ comprehensive Product Requirement Documents (PRDs) and led agile sprints with 14 engineers and designers.',
            'Analyzed cohort retention in Mixpanel and SQL to identify key activation triggers, boosting 30-day retention by 18%.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'Indian Institute of Management (IIM)',
          degree: 'MBA (Post Graduate Programme in Management)',
          location: 'Indore, India',
          graduationDate: '2021-04',
          gpa: '3.7 / 4.0',
          highlights: ['Dean\'s Merit List', 'Head of Placement Committee (PlaceCom)'],
        },
        {
          id: 'edu-2',
          school: 'VJTI Mumbai',
          degree: 'B.Tech in Computer Engineering',
          location: 'Mumbai, India',
          graduationDate: '2018-05',
          gpa: 'First Class with Distinction',
          highlights: [],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Product & Strategy',
          items: ['Product Roadmapping', 'GTM Strategy', 'User Discovery', 'A/B Testing', 'OKRs & KPIs'],
        },
        {
          id: 'sk-2',
          category: 'Tools & Analytics',
          items: ['SQL', 'Mixpanel', 'Amplitude', 'Figma', 'Jira', 'Agile / Scrum'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Automated Merchant Instant Settlement Flow',
          technologies: ['Mixpanel', 'Figma', 'SQL', 'Agile'],
          highlights: [
            'Reduced merchant settlement processing cycle from 72 hours to 45 minutes, increasing merchant satisfaction score by 35%.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Certified Scrum Product Owner (CSPO)',
          issuer: 'Scrum Alliance',
          date: '2022',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Marathi', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'education', 'skills', 'projects'],
      },
    },
  },


  {
    slug: 'bca-fresher-resume',
    title: 'BCA Fresher Resume Example & IT Placement Guide',
    role: 'BCA Graduate (Software Developer)',
    experienceLevel: 'Fresher (0–1 Year)',
    category: 'fresher',
    metaDescription: 'ATS-compliant resume template and guide for BCA freshers in India. Features core Java, Python, SQL, full-stack projects, and campus interview tips.',
    targetKeywords: [
      'bca fresher resume', 'bca resume format', 'java', 'python', 'sql', 'react',
      'web developer fresher', 'html5', 'css3', 'mysql', 'git', 'tcs nqt', 'infosys fresher'
    ],
    recommendedTemplate: 'ats',
    whyItWorks: [
      {
        title: 'Project-Centric Academic Showcase',
        desc: 'Elevates full-stack software development projects to the top half to demonstrate practical production skills before formal corporate work history.',
      },
      {
        title: 'ATS Core CS Fundamentals',
        desc: 'Highlights Data Structures, Object-Oriented Programming, and RDBMS concepts favored by mass IT recruiters (TCS, Infosys, Wipro, Cognizant).',
      },
      {
        title: 'Verified Coding Certifications',
        desc: 'Lists verifiable credentials on HackerRank and Coursera to prove algorithmic problem-solving ability beyond semester exam marks.',
      },
    ],
    skillsGrouped: {
      'Programming Languages': ['Java (Core & OOPs)', 'Python', 'C++', 'JavaScript (ES6+)'],
      'Web Development': ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'Node.js Basics'],
      'Databases & Tools': ['MySQL', 'MongoDB', 'Git / GitHub', 'VS Code', 'Postman'],
      'CS Fundamentals': ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks'],
    },
    experienceBullets: [
      'Developed responsive single-page web applications utilizing React and RESTful backend APIs during 6-month software development internship.',
      'Designed normalized relational database schemas in MySQL with indexed foreign keys, reducing test query execution time by 32%.',
      'Collaborated in an Agile Scrum team of 4 student developers to deliver sprint milestones via GitHub pull requests and peer code reviews.',
      'Achieved 5-star problem-solving badge on HackerRank by solving 150+ algorithmic challenges in Java and Python.',
    ],
    sampleProjects: [
      {
        title: 'College Campus Placement Portal',
        tech: 'React.js, Node.js, Express, MySQL',
        desc: 'Built a multi-role student placement registration portal with resume upload and automated eligibility filtering for 1,200+ students.',
      },
      {
        title: 'Smart Task & Expense Tracker',
        tech: 'Python, Flask, SQLite, Bootstrap',
        desc: 'Engineered a personal finance tracker with visual charts for monthly spending categories and automated email invoice reminders.',
      },
    ],
    commonMistakes: [
      'Listing high school details instead of focusing on college projects, internships, and technical skills.',
      'Copying generic objective statements like "Seeking a challenging role in a reputed company to utilize my potential".',
      'Omitting GitHub repository links or live deployment links for key academic projects.',
    ],
    interviewQuestions: [
      {
        q: 'Explain the difference between Method Overloading and Method Overriding in Java.',
        tip: 'Highlight compile-time vs runtime polymorphism, signature rules, and practical examples like calculateArea(r) vs @Override toString().',
      },
      {
        q: 'What are database indexes and how do they impact INSERT operations?',
        tip: 'Explain B-Tree lookups reducing SELECT time while slightly increasing INSERT/UPDATE overhead due to index tree rebalancing.',
      },
    ],
    sampleResumeData: {
      id: 'example-bca-fresher',
      title: 'BCA Fresher - Software Developer Resume',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'ats',
      themeColor: '#2563eb',
      fontFamily: 'inter',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Rohan Sharma',
        jobTitle: 'BCA Graduate | Software & Web Developer',
        email: 'rohan.sharma.dev@gmail.com',
        phone: '+91 98765 12340',
        location: 'Bangalore, Karnataka, India',
        linkedin: 'linkedin.com/in/rohansharma-dev',
        github: 'github.com/rohansharma-code',
        summary: 'Detail-oriented BCA graduate (8.4 CGPA) with hands-on proficiency in Java, Python, React.js, and SQL. Completed 6-month software development internship building RESTful micro-services and full-stack web applications. Seeking entry-level Software Engineer role.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Software Development Intern',
          company: 'TechNovus Solutions',
          location: 'Bangalore, India',
          startDate: '2024-01',
          endDate: '2024-06',
          current: false,
          highlights: [
            'Built 14 responsive React UI components integrated with Spring Boot REST APIs for customer onboarding portal.',
            'Authored SQL stored procedures and database migration scripts in MySQL, accelerating batch record processing by 28%.',
            'Participated in daily standups and sprint planning, resolving 22 bug tickets during end-to-end user acceptance testing.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Computer Applications (BCA)',
          school: 'Christ University',
          location: 'Bangalore, India',
          graduationDate: '2024',
          gpa: '8.4 / 10.0 CGPA',
        },
        {
          id: 'edu-2',
          degree: 'Higher Secondary Certificate (Class XII - Science/CS)',
          school: 'Delhi Public School (CBSE)',
          location: 'Bangalore, India',
          graduationDate: '2021',
          gpa: '91.4%',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Programming & Languages',
          items: ['Java', 'Python', 'C++', 'JavaScript (ES6+)', 'SQL'],
        },
        {
          id: 'sk-2',
          category: 'Web & Frameworks',
          items: ['React.js', 'Node.js', 'HTML5', 'CSS3', 'Bootstrap', 'REST APIs'],
        },
        {
          id: 'sk-3',
          category: 'Databases & Tools',
          items: ['MySQL', 'Git & GitHub', 'VS Code', 'Postman', 'Linux'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Campus Recruitment & Placement Automation System',
          technologies: ['React.js', 'Node.js', 'MySQL', 'Express'],
          highlights: [
            'Architected automated eligibility screening module for 1,200+ students based on CGPA and backlogs, cutting placement officer workload by 60%.',
            'Implemented JWT-based secure authentication and resume PDF upload functionality with instant validation.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'HackerRank Problem Solving (Intermediate) Certificate',
          issuer: 'HackerRank',
          date: '2024',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Kannada', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'education', 'skills', 'projects', 'experience', 'certifications'],
      },
    },
  },
  {
    slug: 'bcom-fresher-resume',
    title: 'B.Com Fresher Resume Format (Accounting, GST & Finance)',
    role: 'B.Com Graduate (Accounts & Finance)',
    experienceLevel: 'Fresher (0–1 Year)',
    category: 'finance',
    metaDescription: 'Recruiter-approved B.Com fresher resume format for Indian finance & accounting jobs. Highlights Tally Prime, GST filing, TDS deductions, advanced MS Excel, and auditing.',
    targetKeywords: [
      'bcom fresher resume', 'bcom resume format', 'tally prime', 'gst filing', 'tds returns',
      'ms excel', 'vlookup', 'financial accounting', 'bank reconciliation', 'balance sheet', 'auditing'
    ],
    recommendedTemplate: 'ats',
    whyItWorks: [
      {
        title: 'Core Indian Statutory Compliance Focus',
        desc: 'Explicitly spotlights Indian taxation competencies (GST, GSTR-1, GSTR-3B, TDS Section 194C/J) that corporate accounting teams demand.',
      },
      {
        title: 'Quantitative Analytical Proficiency',
        desc: 'Lists high-demand Advanced Excel skills (Pivot Tables, VLOOKUP, XLOOKUP, Nested IFs) with practical business examples.',
      },
      {
        title: 'Single-Column ATS Compliance',
        desc: 'Uses the classic Harvard/ATS template ensuring standard section headers match ERP and corporate HR scanning parsers.',
      },
    ],
    skillsGrouped: {
      'Accounting & Software': ['Tally Prime', 'Tally.ERP 9', 'SAP FICO Basics', 'QuickBooks', 'Busy Accounting'],
      'Statutory & Taxation': ['GST Filing (GSTR-1, 3B)', 'TDS Compliance', 'Income Tax Filing', 'E-Way Bill Generation'],
      'Spreadsheets & Analysis': ['MS Excel (VLOOKUP, Pivot, XLOOKUP)', 'Financial Statement Analysis', 'Bank Reconciliation (BRS)'],
      'Core Finance Knowledge': ['Double Entry Bookkeeping', 'Auditing Basics', 'Working Capital Management', 'Accounts Payable & Receivable'],
    },
    experienceBullets: [
      'Assisted Chartered Accountants during statutory audits of 8 SME enterprises, examining vouchers and purchase ledger entries.',
      'Prepared monthly Bank Reconciliation Statements (BRS) across 6 active current accounts, resolving ₹12 Lakhs in pending uncleared entries.',
      'Generated GST e-way bills and formatted GSTR-1 and GSTR-3B monthly return filings with 100% statutory timeliness.',
      'Constructed financial statement comparative models in MS Excel utilizing advanced Pivot Tables, reducing manual month-end reporting time by 4 hours.',
    ],
    sampleProjects: [
      {
        title: 'Working Capital Cycle Analysis of FMCG Retailer',
        tech: 'MS Excel, Ratio Analysis, Financial Modeling',
        desc: 'Analyzed 3-year balance sheets of local consumer retail chain, identifying inventory holding bottlenecks and improving cash conversion cycle by 14 days.',
      },
    ],
    commonMistakes: [
      'Listing vague computer knowledge like "MS Office" instead of specific high-value tools like "Advanced Excel (Pivot, VLOOKUP, Macros)".',
      'Failing to mention familiarity with Tally Prime and Indian GST/TDS regulations.',
      'Using decorative tables or multi-colored icons that prevent accounting ERP systems from indexing candidate text.',
    ],
    interviewQuestions: [
      {
        q: 'What is the golden rule of accounting for Real, Personal, and Nominal accounts?',
        tip: 'Debit what comes in, credit what goes out; Debit the receiver, credit the giver; Debit all expenses and losses, credit all incomes and gains.',
      },
      {
        q: 'What is the purpose of preparing a Bank Reconciliation Statement (BRS)?',
        tip: 'To explain and reconcile differences between the cash book balance and the bank passbook balance due to timing differences or errors.',
      },
    ],
    sampleResumeData: {
      id: 'example-bcom-fresher',
      title: 'B.Com Fresher - Accounts & Finance Resume',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'ats',
      themeColor: '#0f172a',
      fontFamily: 'inter',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Ananya Gupta',
        jobTitle: 'B.Com Graduate | Finance & Accounting Associate',
        email: 'ananya.gupta.finance@gmail.com',
        phone: '+91 98112 54321',
        location: 'New Delhi, India',
        linkedin: 'linkedin.com/in/ananyagupta-bcom',
        summary: 'Focused B.Com graduate from Shri Ram College of Commerce (8.2 CGPA) with hands-on knowledge of Tally Prime, Indian GST/TDS compliance, and Advanced MS Excel (Pivot Tables, VLOOKUP). Completed 4-month CA firm article internship auditing accounts payable/receivable. Seeking entry-level Junior Accountant role.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Accounts & Audit Trainee Intern',
          company: 'K. S. Verma & Associates, Chartered Accountants',
          location: 'New Delhi, India',
          startDate: '2024-01',
          endDate: '2024-04',
          current: false,
          highlights: [
            'Processed daily journal vouchers, debit/credit notes, and invoice entries in Tally Prime for 12 corporate clients.',
            'Assisted in reconciling Bank Statements and GSTR-2B purchase ledgers, detecting ₹3.4L in unclaimed Input Tax Credit (ITC).',
            'Prepared draft depreciation schedules and trial balance sheets in MS Excel for statutory year-end audit verification.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Commerce (Honours)',
          school: 'Shri Ram College of Commerce (SRCC), Delhi University',
          location: 'Delhi, India',
          graduationDate: '2024',
          gpa: '8.2 / 10.0 CGPA',
        },
        {
          id: 'edu-2',
          degree: 'Class XII (Commerce with Mathematics - CBSE)',
          school: 'Modern School, Barakhamba Road',
          location: 'New Delhi, India',
          graduationDate: '2021',
          gpa: '94.8%',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Accounting Software & Tools',
          items: ['Tally Prime', 'Tally.ERP 9', 'Advanced MS Excel (Pivot, VLOOKUP, XLOOKUP)', 'SAP FICO Basics'],
        },
        {
          id: 'sk-2',
          category: 'Taxation & Regulatory',
          items: ['GST (GSTR-1, 3B, 2B Reconciliation)', 'TDS Deduction & Filing', 'E-Way Bills', 'Income Tax Filing'],
        },
        {
          id: 'sk-3',
          category: 'Core Competencies',
          items: ['Bank Reconciliation (BRS)', 'Double Entry Bookkeeping', 'Accounts Payable/Receivable', 'Financial Ratios'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Working Capital Cycle Analysis of FMCG Retailer',
          technologies: ['MS Excel', 'Ratio Analysis', 'Financial Modeling'],
          highlights: [
            'Analyzed 3-year balance sheets of local consumer retail chain, identifying inventory holding bottlenecks and improving cash conversion cycle by 14 days.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Certificate in Advanced Tally Prime with GST',
          issuer: 'National Institute of Electronics & Information Technology (NIELIT)',
          date: '2024',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'education', 'skills', 'experience', 'certifications'],
      },
    },
  },
  {
    slug: 'mechanical-engineer-fresher-resume',
    title: 'Mechanical Engineer Fresher Resume Example & CAD Guide',
    role: 'Mechanical Engineer (Fresher)',
    experienceLevel: 'Fresher (0–1 Year)',
    category: 'fresher',
    metaDescription: 'Recruiter-tested Mechanical Engineering fresher resume example. Covers AutoCAD 2D/3D, SolidWorks, CATIA, ANSYS FEA, GD&T, automotive projects, and manufacturing skills.',
    targetKeywords: [
      'mechanical engineer fresher resume', 'mechanical engineering resume format', 'autocad',
      'solidworks', 'catia', 'ansys fea', 'gd&t', 'manufacturing engineering', 'production engineer', 'cnc programming'
    ],
    recommendedTemplate: 'dublin',
    whyItWorks: [
      {
        title: 'CAD & Simulation Software Authority',
        desc: 'Showcases industry-standard design tools (SolidWorks, AutoCAD, ANSYS FEA) with exact geometric dimensioning and tolerancing (GD&T) specifications.',
      },
      {
        title: 'Formula Student & Capstone Hardware Proof',
        desc: 'Highlights physical engineering fabrication (chassis design, thermal cooling, finite element analysis) showing practical workshop capability.',
      },
      {
        title: 'Manufacturing Plant Experience',
        desc: 'Demonstrates familiarity with shop floor production processes, Kaizen, 5S, and assembly line quality control.',
      },
    ],
    skillsGrouped: {
      'CAD & Design Modeling': ['SolidWorks', 'AutoCAD 2D/3D', 'CATIA V5', 'PTC Creo', 'GD&T (ASME Y14.5)'],
      'Simulation & Analysis': ['ANSYS Workbench (Structural & Thermal FEA)', 'MATLAB / Simulink', 'CFD Basics'],
      'Manufacturing & Production': ['CNC Machining Basics', 'Welding & Fabrication', 'DFM / DFA Principles', '3D Printing (Additive)'],
      'Quality & Operations': ['Kaizen & 5S', 'Root Cause Analysis (RCA)', 'Six Sigma Yellow Belt Concepts', 'SPC'],
    },
    experienceBullets: [
      'Designed 3D parametric mechanical components and assembly drawings in SolidWorks, adhering strictly to ASME Y14.5 GD&T standards.',
      'Conducted static structural and modal FEA simulations on vehicle suspension uprights in ANSYS, reducing component mass by 18% while sustaining 3.5G load.',
      'Completed 8-week shop-floor internship at automotive Tier-1 supplier, monitoring CNC milling operations and implementing a 5S inventory board.',
      'Drafted 45+ manufacturing drawings in AutoCAD 2D with detailed bill of materials (BOM), surface finish symbols, and fit tolerances.',
    ],
    sampleProjects: [
      {
        title: 'Design & Analysis of Formula Student Vehicle Chassis',
        tech: 'SolidWorks, ANSYS Workbench, AISI 4130 Steel Tubing',
        desc: 'Engineered spaceframe tubular chassis optimized for torsional rigidity (>1800 Nm/deg) and impact crashworthiness according to SAE safety rules.',
      },
    ],
    commonMistakes: [
      'Focusing purely on textbook theory without listing hands-on CAD software packages or workshop projects.',
      'Omitting GD&T knowledge which manufacturing recruiters consider an essential qualification.',
      'Using unmeasured statements instead of reporting specific weight reductions, FEA stress factors, or safety factor numbers.',
    ],
    interviewQuestions: [
      {
        q: 'What is the difference between Engineering Stress and True Stress?',
        tip: 'Engineering stress divides load by original cross-sectional area; true stress uses the instantaneous cross-sectional area during deformation.',
      },
      {
        q: 'What is the significance of the Factor of Safety (FOS)?',
        tip: 'The ratio of ultimate/yield strength to allowable design stress, compensating for material imperfections, cyclic loading, and unforeseen stress spikes.',
      },
    ],
    sampleResumeData: {
      id: 'example-mech-fresher',
      title: 'Mechanical Engineer Fresher - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'dublin',
      themeColor: '#1e3a8a',
      fontFamily: 'sourcesans',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Vikramaditya Rao',
        jobTitle: 'Mechanical Engineer | CAD & Simulation Specialist',
        email: 'vikram.rao.mech@gmail.com',
        phone: '+91 97654 89012',
        location: 'Pune, Maharashtra, India',
        linkedin: 'linkedin.com/in/vikram-rao-mech',
        summary: 'Passionate Mechanical Engineering graduate (8.1 CGPA) with advanced proficiency in SolidWorks, AutoCAD, ANSYS FEA, and GD&T principles. Former Vehicle Dynamics Lead for Formula Student team with hands-on automotive manufacturing internship experience. Seeking Graduate Engineer Trainee (GET) role.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Graduate Engineering Intern',
          company: 'Bharat Forge Precision Components',
          location: 'Pune, India',
          startDate: '2024-01',
          endDate: '2024-06',
          current: false,
          highlights: [
            'Generated 35+ manufacturing drawings in AutoCAD with strict GD&T tolerances for forged steering knuckle assemblies.',
            'Assisted quality control team in coordinate measuring machine (CMM) dimensional verification, reducing rejection rate by 4.2%.',
            'Participated in Kaizen initiative on the CNC turning cell, reorganizing tool fixtures and saving 7 minutes per shift handover.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.Tech in Mechanical Engineering',
          school: 'Maharashtra Institute of Technology (MIT-WPU), Pune',
          location: 'Pune, India',
          graduationDate: '2024',
          gpa: '8.1 / 10.0 CGPA',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'CAD & Simulation Software',
          items: ['SolidWorks 3D', 'AutoCAD 2D/3D', 'ANSYS Workbench (FEA)', 'CATIA V5', 'GD&T (ASME Y14.5)'],
        },
        {
          id: 'sk-2',
          category: 'Manufacturing & Domain',
          items: ['CNC Machining Basics', 'DFM / DFA', 'Root Cause Analysis', 'Kaizen & 5S', 'BOM Preparation'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Lightweight Tubular Spaceframe Chassis for Formula Student',
          technologies: ['SolidWorks', 'ANSYS FEA', 'AISI 4130 Chromoly Steel'],
          highlights: [
            'Simulated front and side impact crash scenarios in ANSYS, achieving safety factor of 1.7 while trimming 6.4 kg of unnecessary mass.',
            'Fabricated physical prototype utilizing TIG welding, validating torsional rigidity on laser alignment test bench within 2% deviation.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Certified SolidWorks Associate (CSWA) - Mechanical Design',
          issuer: 'Dassault Systèmes',
          date: '2023',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Marathi', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'education', 'skills', 'projects', 'experience', 'certifications'],
      },
    },
  },
  {
    slug: 'cgpa-resume-format',
    title: 'CGPA Resume Format for Indian College Placements',
    role: 'Graduate Trainee (High CGPA Format)',
    experienceLevel: 'Fresher / Campus Placements',
    category: 'fresher',
    metaDescription: 'Optimized CGPA resume format engineered for Indian college placement cells (IIT, NIT, BITS, VIT, Tier-1/2/3 colleges). Features Dean list honors, SIH hackathons, and placement committee compliance.',
    targetKeywords: [
      'cgpa resume format', 'cgpa format resume', 'btech resume format', 'campus placement resume',
      'indian college resume format', 'tier 1 college resume', 'fresher placement format', 'smart india hackathon'
    ],
    recommendedTemplate: 'traditional',
    whyItWorks: [
      {
        title: 'Placement Cell & Recruiter Alignment',
        desc: 'Places Academic CGPA, Rank in Class, and Technical Competitive Standing right at the top header, directly addressing Indian IT & Consulting initial shortlisting criteria.',
      },
      {
        title: 'SIH & Coding Competition Authority',
        desc: 'Spotlights Smart India Hackathon (SIH), ICPC preliminaries, and Codeforces/LeetCode ratings that top Indian product companies value over simple course notes.',
      },
      {
        title: 'Single-Page Dense Academic Formatting',
        desc: 'Uses the prestigious traditional layout with 0.5-inch margins, packing high signal density onto exactly one A4 sheet.',
      },
    ],
    skillsGrouped: {
      'Core Programming': ['C++', 'Java', 'Python', 'SQL (PostgreSQL, MySQL)', 'TypeScript'],
      'Algorithms & CS Theory': ['Data Structures & Algorithms', 'System Design (HLD/LLD)', 'DBMS', 'OS & Concurrency'],
      'Development Stack': ['React.js', 'Next.js', 'Node.js', 'Docker', 'Git & GitHub', 'Linux'],
    },
    experienceBullets: [
      'Maintained a top 5% academic standing (9.2 / 10.0 CGPA) across all 8 semesters of B.Tech Computer Science & Engineering.',
      'Led 6-member student engineering team to 1st Place out of 450+ collegiate teams in Smart India Hackathon (SIH 2024), developing an automated AI crop disease diagnosis app.',
      'Solved 650+ algorithmic problems across LeetCode (Knight rating 1940) and Codeforces (Specialist), demonstrating exceptional algorithmic problem-solving speed.',
      'Served as Department Teaching Assistant for Data Structures laboratory, guiding 70+ junior students on pointers, trees, and dynamic programming.',
    ],
    sampleProjects: [
      {
        title: 'High-Throughput Distributed Peer-to-Peer File Sync Engine',
        tech: 'C++, Socket Programming, Multi-Threading, OpenSSL',
        desc: 'Built a decentralized file synchronization utility transferring encrypted binary chunks with SHA-256 chunk deduplication at 85 MB/s LAN speeds.',
      },
    ],
    commonMistakes: [
      'Converting CGPA to percentage using arbitrary formulas instead of stating the official university grading scale.',
      'Failing to mention class rank or Dean\'s Merit list if CGPA is above 8.5.',
      'Exceeding one page—Indian campus placement committees mandate a single page for all freshers.',
    ],
    interviewQuestions: [
      {
        q: 'How does a Hash Map handle collisions under high load factors in Java?',
        tip: 'Explain separate chaining with linked lists, automatic transition to Red-Black Trees when bucket depth exceeds 8, and rehashing when capacity exceeds 75%.',
      },
    ],
    sampleResumeData: {
      id: 'example-cgpa-format',
      title: 'CGPA Placement Format - Graduate Trainee Resume',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'traditional',
      themeColor: '#0f172a',
      fontFamily: 'garamond',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Aditya S. Kulkarni',
        jobTitle: 'Candidate for Graduate Software Engineer | 9.2 CGPA',
        email: 'aditya.kulkarni.campus@gmail.com',
        phone: '+91 98230 45678',
        location: 'Trichy, Tamil Nadu, India',
        linkedin: 'linkedin.com/in/adityakulkarni-nit',
        github: 'github.com/aditya-kulkarni',
        summary: 'Top 5% B.Tech Computer Science graduate from NIT Trichy (9.2 CGPA) with deep foundations in Data Structures, Algorithms (LeetCode 1940), and Distributed Systems. Winner of Smart India Hackathon (SIH 2024). Seeking Software Development Engineer (SDE-1) campus role.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Software Engineering Summer Intern',
          company: 'Samsung R&D Institute India (SRI-B)',
          location: 'Bangalore, India',
          startDate: '2023-05',
          endDate: '2023-07',
          current: false,
          highlights: [
            'Engineered memory-optimized image caching module in C++ for Android camera middleware, reducing buffer allocation latency by 22%.',
            'Implemented automated Google Test (gTest) unit suites achieving 94% code coverage across core camera pipeline controllers.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.Tech in Computer Science & Engineering',
          school: 'National Institute of Technology (NIT), Tiruchirappalli',
          location: 'Trichy, India',
          graduationDate: '2024',
          gpa: '9.2 / 10.0 CGPA (Top 5% Merit)',
        },
        {
          id: 'edu-2',
          degree: 'All India Senior School Certificate (CBSE Class XII)',
          school: 'The Bishop\'s School',
          location: 'Pune, India',
          graduationDate: '2020',
          gpa: '96.2%',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Core Computer Science',
          items: ['Data Structures & Algorithms', 'Object-Oriented Design', 'Operating Systems', 'DBMS', 'System Design'],
        },
        {
          id: 'sk-2',
          category: 'Languages & Systems',
          items: ['C++', 'Java', 'Python', 'SQL', 'Linux Shell Scripting', 'Git'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'AI Crop Pathogen Detection System (SIH Winner)',
          technologies: ['Python', 'PyTorch', 'FastAPI', 'React Native'],
          highlights: [
            'Trained lightweight MobileNetV3 model recognizing 38 agricultural leaf diseases with 96.4% test accuracy on Indian farm datasets.',
            'Awarded 1st Prize out of 450+ teams at Smart India Hackathon 2024 Grand Finale with ₹1,00,000 cash prize.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'LeetCode Knight Badge (Top 4% Global - Rating 1940)',
          issuer: 'LeetCode',
          date: '2024',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Marathi', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'education', 'skills', 'projects', 'experience', 'certifications'],
      },
    },
  },
  {
    slug: 'backend-developer-resume',
    title: 'Backend Developer Resume Example & System Architecture Guide',
    role: 'Backend Developer (Java / Node.js)',
    experienceLevel: '3–5 Years Experience',
    category: 'tech',
    metaDescription: 'High-scoring Backend Developer resume example with Java Spring Boot, Node.js microservices, Kafka streaming, Redis caching, and PostgreSQL database tuning.',
    targetKeywords: [
      'backend developer resume', 'backend engineer resume', 'java spring boot', 'microservices',
      'node.js', 'postgresql', 'kafka', 'redis', 'docker', 'aws eks', 'system design', 'rest api', 'grpc'
    ],
    recommendedTemplate: 'stockholm',
    whyItWorks: [
      {
        title: 'Microservices & High Concurrency Metrics',
        desc: 'Quantifies transaction rates (18k TPS), database query latency reduction, and message broker throughput on Apache Kafka.',
      },
      {
        title: 'Enterprise Architecture Taxonomy',
        desc: 'Categorizes technical competencies into Cloud Infrastructure, Databases, Messaging Brokers, and Distributed System Design.',
      },
      {
        title: 'Fault Tolerance & Disaster Recovery',
        desc: 'Demonstrates real-world production reliability engineering—circuit breakers (Resilience4j), idempotency, and automated recovery.',
      },
    ],
    skillsGrouped: {
      'Languages & Frameworks': ['Java 17/21', 'Spring Boot 3', 'Node.js', 'Go (Golang)', 'Python'],
      'Databases & Storage': ['PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch'],
      'Messaging & Streaming': ['Apache Kafka', 'RabbitMQ', 'AWS SQS / SNS'],
      'Cloud & DevOps': ['Docker', 'Kubernetes', 'AWS (EC2, ECS, RDS, S3)', 'Terraform', 'CI/CD (GitLab)'],
    },
    experienceBullets: [
      'Architected event-driven order processing microservice in Spring Boot and Kafka, scaling throughput from 2,500 to 18,000 TPS during Diwali festive peak.',
      'Reduced p99 database latency from 180ms to 24ms by introducing multi-tier Redis caching and query indexing on high-cardinality PostgreSQL tables.',
      'Decomposed monolithic legacy billing service into 4 isolated containerized microservices on AWS EKS, shrinking blast radius and accelerating deployments by 4x.',
      'Configured Resilience4j circuit breakers and rate limiters, shielding downstream partner payment gateways and achieving 99.99% system availability.',
    ],
    sampleProjects: [
      {
        title: 'Distributed Transaction Outbox Engine with Kafka CDC',
        tech: 'Java 21, Debezium, Kafka, PostgreSQL, Docker',
        desc: 'Implemented the Transactional Outbox pattern with Debezium Change Data Capture (CDC), guaranteeing zero event loss across distributed microservices.',
      },
    ],
    commonMistakes: [
      'Listing generic CRUD endpoints without mentioning data volumes, queries per second (QPS), or latency profiles.',
      'Ignoring database transaction isolation levels and concurrency control strategies in bullet points.',
      'Failing to mention automated testing tools (JUnit 5, Mockito, Testcontainers) that modern backend leads require.',
    ],
    interviewQuestions: [
      {
        q: 'How do you prevent the Split-Brain scenario in a distributed cluster?',
        tip: 'Discuss quorum consensus algorithms (Raft, Paxos), odd-numbered node configurations, and fencing tokens.',
      },
    ],
    sampleResumeData: {
      id: 'example-backend-developer',
      title: 'Backend Developer - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'stockholm',
      themeColor: '#059669',
      fontFamily: 'sourcesans',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Deepak Nambiar',
        jobTitle: 'Senior Backend Engineer | Distributed Systems & Cloud',
        email: 'deepak.nambiar.backend@gmail.com',
        phone: '+91 98450 78912',
        location: 'Hyderabad, Telangana, India',
        linkedin: 'linkedin.com/in/deepaknambiar-backend',
        github: 'github.com/deepaknambiar-tech',
        summary: 'Accomplished Backend Software Engineer with 4 years of expertise building high-throughput, event-driven microservices in Java 17, Spring Boot, Kafka, and PostgreSQL on AWS. Spearheaded architecture scaling transaction throughput to 18,000 TPS with 99.99% uptime.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Backend Software Engineer',
          company: 'PaySprint Fintech Technologies',
          location: 'Hyderabad, India',
          startDate: '2021-08',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected event-driven payments microservice processing ₹120 Crore in monthly transactions with zero data inconsistency.',
            'Optimized PostgreSQL connection pooling with HikariCP and implemented Redis distributed locks, eliminating race conditions during wallet debits.',
            'Mentored 4 junior engineers on clean architecture, Testcontainers integration testing, and production canary deployments.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.Tech in Information Technology',
          school: 'Jawaharlal Nehru Technological University (JNTU)',
          location: 'Hyderabad, India',
          graduationDate: '2020',
          gpa: '8.3 CGPA',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Backend & Frameworks',
          items: ['Java 17/21', 'Spring Boot', 'Node.js', 'Go', 'REST APIs', 'gRPC', 'Microservices'],
        },
        {
          id: 'sk-2',
          category: 'Data & Caching',
          items: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch', 'Hibernate / JPA'],
        },
        {
          id: 'sk-3',
          category: 'Cloud & Infrastructure',
          items: ['Apache Kafka', 'Docker', 'Kubernetes', 'AWS (EKS, SQS, RDS)', 'GitLab CI/CD'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Distributed Real-Time Rate Limiter & Security Gateway',
          technologies: ['Java 17', 'Redis Lua Scripts', 'Spring Cloud Gateway'],
          highlights: [
            'Engineered token-bucket rate limiter defending APIs from DDoS surges, sustaining 45,000 req/sec with <3ms latency overhead.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Telugu', proficiency: 'Native' },
        { id: 'l-3', language: 'Hindi', proficiency: 'Fluent' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications'],
      },
    },
  },
  {
    slug: 'hr-resume',
    title: 'HR Executive Resume Example & Talent Acquisition Format',
    role: 'HR Executive / Talent Acquisition Specialist',
    experienceLevel: '2–4 Years Experience',
    category: 'business',
    metaDescription: 'Recruiter-approved HR resume format for talent acquisition, employee onboarding, HRMS (Darwinbox/Zoho), payroll, POSH compliance, and campus recruitment.',
    targetKeywords: [
      'hr resume', 'talent acquisition resume', 'human resources resume', 'recruiter resume',
      'naukri resdex', 'linkedin recruiter', 'darwinbox', 'zoho people', 'payroll', 'posh compliance', 'onboarding'
    ],
    recommendedTemplate: 'amelia',
    whyItWorks: [
      {
        title: 'Recruitment Funnel & Metric Clarity',
        desc: 'Highlights quantifiable recruitment KPIs—time-to-fill (24 days), offer acceptance rate (91%), and sourcing cost reduction (₹14 Lakhs).',
      },
      {
        title: 'Modern HR Tech Stack Authority',
        desc: 'Demonstrates hands-on proficiency with Indian HRMS platforms (Darwinbox, Keka, Zoho People) and sourcing portals (Naukri Resdex, Instahyre).',
      },
      {
        title: 'Statutory & People Operations Proficiency',
        desc: 'Details compliance with Indian labor laws, POSH policies, PF/ESI deductions, and end-to-end employee lifecycle management.',
      },
    ],
    skillsGrouped: {
      'Talent Acquisition': ['Technical Sourcing', 'Naukri Resdex', 'LinkedIn Recruiter', 'Instahyre', 'Offer Negotiation'],
      'HR Operations & HRMS': ['Darwinbox', 'Keka HR', 'Zoho People', 'GreytHR', 'Employee Onboarding', 'Exit Interviews'],
      'Statutory & Compliance': ['POSH Act Compliance', 'PF & ESI Basics', 'Labor Law Regulations', 'HR Policy Formulation'],
      'People & Culture': ['Employee Engagement', 'Performance Management (OKRs/KPIs)', 'Conflict Resolution', 'Internal Communications'],
    },
    experienceBullets: [
      'Spearheaded end-to-end tech recruiting pipeline, successfully closing 64 niche engineering and product roles with an average time-to-fill of 24 days.',
      'Achieved a 91% candidate offer-to-join ratio by instituting transparent pre-onboarding engagement workflows and structured competitive benchmarking.',
      'Migrated manual employee records for 450+ employees to Darwinbox HRMS, automating leave tracking, attendance, and payroll reconciliation.',
      'Organized company-wide quarterly pulse surveys and employee engagement workshops, driving a 14% improvement in eNPS (Employee Net Promoter Score).',
    ],
    sampleProjects: [
      {
        title: 'Pan-India Campus Recruitment Drive 2023–24',
        tech: 'Naukri Campus, Google Forms, HackerEarth, Zoom',
        desc: 'Orchestrated virtual campus recruitment across 14 engineering institutions, screening 2,400+ candidates and onboarding 45 graduate engineer trainees.',
      },
    ],
    commonMistakes: [
      'Writing vague statements like "Responsible for hiring candidates" without stating volume, role types, or offer acceptance metrics.',
      'Omitting specific HRMS platforms and candidate screening portals used in daily operations.',
      'Forgetting to mention employee retention or onboarding satisfaction scores.',
    ],
    interviewQuestions: [
      {
        q: 'How do you handle candidates who accept offers but renege before day one?',
        tip: 'Discuss proactive pre-boarding touchpoints, CEO welcome letters, continuous buddy mentorship, and realistic compensation benchmarking.',
      },
    ],
    sampleResumeData: {
      id: 'example-hr-resume',
      title: 'HR Executive - Talent Acquisition Resume',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'amelia',
      themeColor: '#7c3aed',
      fontFamily: 'playfair',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Pooja Deshmukh',
        jobTitle: 'Human Resources Executive | Talent Acquisition & People Ops',
        email: 'pooja.deshmukh.hr@gmail.com',
        phone: '+91 98334 12345',
        location: 'Mumbai, Maharashtra, India',
        linkedin: 'linkedin.com/in/poojadeshmukh-hr',
        summary: 'Results-driven HR professional with 3+ years of experience managing full-lifecycle talent acquisition and employee operations for rapid-growth tech companies. Sourced and closed 60+ technical and business roles with 91% joiner conversion rate. Proficient in Darwinbox, Keka, and Naukri Resdex.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Talent Acquisition & HR Executive',
          company: 'NeoCraft Digital Solutions',
          location: 'Mumbai, India',
          startDate: '2021-07',
          endDate: 'Present',
          current: true,
          highlights: [
            'Managed recruitment pipeline across Engineering, Design, and Sales, hiring 64 full-time professionals with an average time-to-hire of 24 days.',
            'Administered Darwinbox HRMS module for attendance, leave management, and monthly payroll inputs for 380 employees.',
            'Conducted structured exit interviews, synthesizing attrition trends to help leadership reduce 1st-year turnover by 18%.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'MBA in Human Resource Management',
          school: 'Symbiosis Institute of Business Management (SIBM), Pune',
          location: 'Pune, India',
          graduationDate: '2021',
          gpa: '3.6 / 4.0 GPA',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Talent Acquisition',
          items: ['Technical Recruiting', 'LinkedIn Recruiter', 'Naukri Resdex', 'Instahyre', 'Compensation Benchmarking'],
        },
        {
          id: 'sk-2',
          category: 'HR Tech & Platforms',
          items: ['Darwinbox', 'Keka HRMS', 'Zoho People', 'Workday Basics', 'MS Excel (VLOOKUP, Pivot)'],
        },
        {
          id: 'sk-3',
          category: 'Operations & Compliance',
          items: ['POSH Compliance', 'Employee Engagement', 'Onboarding & Induction', 'Exit Analysis'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Pan-India Campus Recruitment Drive 2023–24',
          technologies: ['Naukri Campus', 'Google Forms', 'HackerEarth'],
          highlights: [
            'Orchestrated virtual campus recruitment across 14 engineering institutions, screening 2,400+ candidates and onboarding 45 graduate engineer trainees.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Certified Talent Acquisition Specialist (CTAS)',
          issuer: 'SHRM India',
          date: '2023',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Marathi', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'skills', 'education', 'certifications'],
      },
    },
  },
  {
    slug: 'digital-marketing-resume',
    title: 'Digital Marketing Specialist Resume Example & Portfolio Format',
    role: 'Digital Marketing Specialist (Growth & Performance)',
    experienceLevel: '2–4 Years Experience',
    category: 'marketing',
    metaDescription: 'Data-driven Digital Marketing resume example for Google Ads, Meta Ads, SEO, Google Analytics 4 (GA4), email marketing, and conversion rate optimization (CRO).',
    targetKeywords: [
      'digital marketing resume', 'performance marketing resume', 'seo resume', 'google ads',
      'meta ads manager', 'google analytics 4', 'cro', 'roas', 'hubspot', 'ahrefs', 'content marketing'
    ],
    recommendedTemplate: 'chastain',
    whyItWorks: [
      {
        title: 'ROAS & Revenue Attribution Focus',
        desc: 'Replaces vanity impressions with concrete bottom-line numbers: Return on Ad Spend (3.8x ROAS), CAC reduction, and monthly revenue generated.',
      },
      {
        title: 'Omnichannel Skill Matrix',
        desc: 'Demonstrates expertise across paid acquisition (Meta/Google Ads), organic growth (Technical SEO), and retention marketing (Email/SMS automations).',
      },
      {
        title: 'Modern GA4 & Attribution Tracking',
        desc: 'Shows mastery over Google Tag Manager, Conversion API (CAPI), and GA4 event instrumentation crucial after iOS privacy updates.',
      },
    ],
    skillsGrouped: {
      'Paid Acquisition': ['Google Ads (Search, Performance Max, Display)', 'Meta Ads Manager (Facebook/Instagram)', 'LinkedIn Campaign Manager', 'CBO/ABO Strategies'],
      'Organic & SEO': ['Technical SEO', 'Keyword Research', 'Ahrefs', 'SEMrush', 'On-Page Optimization', 'Content Marketing Strategy'],
      'Analytics & Conversion': ['Google Analytics 4 (GA4)', 'Google Tag Manager (GTM)', 'Hotjar', 'A/B Testing (VWO)', 'Conversion Rate Optimization (CRO)'],
      'Retention & Automation': ['Klaviyo', 'Mailchimp', 'HubSpot CRM', 'Lead Magnet Funnels', 'WhatsApp Business API'],
    },
    experienceBullets: [
      'Managed ₹45 Lakhs quarterly ad spend across Meta Ads and Google Performance Max, sustaining a 3.8x blended ROAS and generating ₹1.7 Crore in attributed revenue.',
      'Engineered complete technical SEO overhaul (core web vitals, schema markup, content clustering), increasing organic non-branded search traffic by 128% in 9 months.',
      'A/B tested mobile landing page hero sections and checkout CTA copies with VWO, lifting cart conversion rate from 2.1% to 3.4%.',
      'Configured server-side Meta Conversions API (CAPI) via Google Tag Manager Server Container, reclaiming 24% previously untracked iOS ad conversions.',
    ],
    sampleProjects: [
      {
        title: 'D2C Skincare Brand Festive Scaling Campaign',
        tech: 'Meta Ads, Shopify, Klaviyo, Google Tag Manager',
        desc: 'Scaled daily spend from ₹15k to ₹80k during Diwali sale while maintaining a 4.1x ROAS and capturing 18,000 new email subscribers.',
      },
    ],
    commonMistakes: [
      'Listing vanity metrics (impressions, follower counts) instead of financial results (CAC, ROAS, conversion rate, pipeline revenue).',
      'Failing to mention specific analytics and tracking tools like GA4 and Google Tag Manager.',
      'Omitting budget scales—recruiters want to know if you managed ₹10,000 or ₹10,00,000 in monthly ad spend.',
    ],
    interviewQuestions: [
      {
        q: 'How would you diagnose a sudden 30% drop in Google Ads conversion rate?',
        tip: 'Check tracking tags/CAPI uptime, landing page server response time, competitor CPC bids, search terms report for irrelevant queries, and seasonal demand.',
      },
    ],
    sampleResumeData: {
      id: 'example-digital-marketing',
      title: 'Digital Marketing Specialist - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'chastain',
      themeColor: '#e11d48',
      fontFamily: 'jakarta',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Tanvi Mathur',
        jobTitle: 'Digital Marketing & Performance Growth Specialist',
        email: 'tanvi.mathur.growth@gmail.com',
        phone: '+91 98710 34567',
        location: 'Gurgaon, Haryana, India',
        linkedin: 'linkedin.com/in/tanvimathur-growth',
        summary: 'Growth-focused Digital Marketer with 3.5 years of experience scaling paid acquisition and organic search for high-growth D2C and SaaS brands. Managed over ₹1.5 Crore in paid advertising with a consistent 3.8x blended ROAS. Expert in Meta Ads, Google Ads, GA4, and Technical SEO.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Performance Marketing Specialist',
          company: 'AuraCraft Lifestyle Brands',
          location: 'Gurgaon, India',
          startDate: '2021-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Scaled quarterly ad budget across Meta and Google Ads to ₹45L, achieving ₹1.7 Crore in quarterly revenue at 3.8x average ROAS.',
            'Boosted organic traffic from 35,000 to 80,000 monthly visitors through comprehensive programmatic SEO content clustering.',
            'Engineered automated abandoned cart recovery email sequence in Klaviyo, generating ₹14 Lakhs in monthly incremental revenue.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Business Administration (BBA - Marketing)',
          school: 'Amity University, Noida',
          location: 'Noida, India',
          graduationDate: '2020',
          gpa: '8.5 CGPA',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Paid Acquisition & Media Buying',
          items: ['Meta Ads Manager', 'Google Ads (Search, PMax)', 'LinkedIn Ads', 'A/B Creative Testing', 'ROAS Optimization'],
        },
        {
          id: 'sk-2',
          category: 'SEO & Analytics',
          items: ['Technical SEO', 'Google Analytics 4 (GA4)', 'Google Tag Manager', 'Ahrefs', 'SEMrush', 'Conversion Rate Optimization'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Full-Funnel Omnichannel Customer Acquisition Campaign',
          technologies: ['Meta Ads', 'GA4', 'Shopify', 'Klaviyo'],
          highlights: [
            'Reduced Customer Acquisition Cost (CAC) by 26% while expanding cold audience reach by 400,000 targeted shoppers.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Google Ads Search & Measurement Certification',
          issuer: 'Google Skillshop',
          date: '2023',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications'],
      },
    },
  },
  {
    slug: 'accountant-resume',
    title: 'Senior Accountant Resume Example & Indian GST/Tax Format',
    role: 'Senior Accountant',
    experienceLevel: '3–6 Years Experience',
    category: 'finance',
    metaDescription: 'Professional Senior Accountant resume format for Indian corporate and CA firms. Highlights Tally Prime, SAP FICO, GST filings (GSTR-1, 3B, 9), TDS, and balance sheet finalization.',
    targetKeywords: [
      'accountant resume', 'senior accountant resume', 'tally prime', 'gst returns',
      'gstr 1', 'gstr 3b', 'tds compliance', 'income tax filing', 'balance sheet finalization', 'mis reports', 'sap fico'
    ],
    recommendedTemplate: 'vienna',
    whyItWorks: [
      {
        title: 'Statutory Indian Tax Mastery',
        desc: 'Highlights comprehensive statutory ownership: GSTR-1/3B filing, Annual GST Audit (GSTR-9), TDS returns (24Q, 26Q), and Advance Tax estimations.',
      },
      {
        title: 'Turnover & Balance Sheet Authority',
        desc: 'Proves scale by specifying annual audit company turnover (₹45 Crore), vendor ledger size, and statutory audit finalization track record.',
      },
      {
        title: 'Executive MIS Reporting',
        desc: 'Demonstrates ability to report directly to CFOs and Managing Directors with monthly Profit & Loss and Cash Flow MIS dashboards.',
      },
    ],
    skillsGrouped: {
      'Accounting Software': ['Tally Prime', 'Tally.ERP 9', 'SAP FICO', 'Busy Accounting', 'MS Excel (Macros, VLOOKUP, Pivot)'],
      'Taxation & Statutory': ['GST (GSTR-1, 3B, 9, 9C)', 'TDS / TCS Compliance (24Q, 26Q)', 'Income Tax Computations', 'PF / ESI Compliance'],
      'Corporate Accounting': ['Balance Sheet Finalization', 'Profit & Loss Reporting', 'Fixed Asset Register', 'Inter-Company Reconciliation'],
      'Audit & Banking': ['Statutory Audit Assistance', 'Internal Audit', 'Working Capital Management', 'Bank LC & BG Processing'],
    },
    experienceBullets: [
      'Spearheaded end-to-end accounting operations and balance sheet finalization for 3 operating manufacturing companies with ₹45 Crore annual turnover.',
      'Prepared and filed monthly GST returns (GSTR-1, GSTR-3B) with 100% timeliness, successfully completing annual GSTR-9 audits with zero penalty notices.',
      'Supervised quarterly TDS computations and filed Form 24Q/26Q returns, reconciling Form 26AS and AIS with company purchase ledgers.',
      'Developed automated executive MIS monthly dashboards in MS Excel, delivering cash flow forecasts and department cost variances to the CFO.',
    ],
    sampleProjects: [
      {
        title: 'Enterprise Migration to Tally Prime & Digital Invoicing',
        tech: 'Tally Prime, NIC E-Invoice Portal, MS Excel',
        desc: 'Led transition of 15,000+ customer and vendor ledgers to Tally Prime with real-time IRN and QR code generation for GST compliance.',
      },
    ],
    commonMistakes: [
      'Failing to mention the company turnover or volume of transactions managed.',
      'Omitting specific GST return numbers (GSTR-1, GSTR-3B, GSTR-9) and TDS forms.',
      'Using informal language rather than established financial accounting terminology (depreciation schedules, trial balance, ledger reconciliation).',
    ],
    interviewQuestions: [
      {
        q: 'How do you handle Input Tax Credit (ITC) reconciliation with GSTR-2B?',
        tip: 'Explain the matching process between purchase register and GSTR-2B, handling timing mismatches, and following up with defaulting vendors.',
      },
    ],
    sampleResumeData: {
      id: 'example-senior-accountant',
      title: 'Senior Accountant - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'vienna',
      themeColor: '#0f172a',
      fontFamily: 'playfair',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Manish Agarwal',
        jobTitle: 'Senior Corporate Accountant | GST, TDS & Audit Specialist',
        email: 'manish.agarwal.accounts@gmail.com',
        phone: '+91 98200 65432',
        location: 'Ahmedabad, Gujarat, India',
        linkedin: 'linkedin.com/in/manishagarwal-accounts',
        summary: 'Seasoned Corporate Accountant with 5+ years of experience overseeing financial accounting, statutory GST/TDS compliance, and balance sheet finalization for manufacturing enterprises with ₹45 Crore turnover. Expert in Tally Prime, SAP FICO, and executive MIS reporting.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Senior Accountant',
          company: 'Navkar Industrial Products Ltd.',
          location: 'Ahmedabad, India',
          startDate: '2021-06',
          endDate: 'Present',
          current: true,
          highlights: [
            'Finalized annual financial statements and trial balances for statutory audit with zero audit qualifications for 3 consecutive years.',
            'Managed monthly GST returns (GSTR-1, 3B) and reconciled ₹3.8 Crore in Input Tax Credit using Tally Prime and Excel VLOOKUP.',
            'Audited vendor payables and processed weekly payment batches of ₹60L while maintaining strict working capital limits.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Master of Commerce (M.Com - Advanced Accounting)',
          school: 'Gujarat University',
          location: 'Ahmedabad, India',
          graduationDate: '2018',
          gpa: '7.8 CGPA',
        },
        {
          id: 'edu-2',
          degree: 'Bachelor of Commerce (B.Com)',
          school: 'H.L. College of Commerce',
          location: 'Ahmedabad, India',
          graduationDate: '2016',
          gpa: 'First Class Distinction',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Accounting & ERP Systems',
          items: ['Tally Prime', 'SAP FICO', 'Tally.ERP 9', 'Advanced MS Excel (Pivot, VLOOKUP, Macros)', 'Busy Accounting'],
        },
        {
          id: 'sk-2',
          category: 'Taxation & Statutory Compliance',
          items: ['GST (GSTR-1, 3B, 9)', 'TDS / TCS Compliance', 'Income Tax Filing', 'E-Invoicing & E-Way Bills'],
        },
        {
          id: 'sk-3',
          category: 'Financial Management',
          items: ['Balance Sheet Finalization', 'MIS Dashboard Reporting', 'Cash Flow Budgeting', 'Bank Reconciliation'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Enterprise Migration to Tally Prime & Digital Invoicing',
          technologies: ['Tally Prime', 'NIC E-Invoice Portal', 'MS Excel'],
          highlights: [
            'Led transition of 15,000+ customer and vendor ledgers to Tally Prime with real-time IRN and QR code generation for GST compliance.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'Certified GST Practitioner (ICAI Course)',
          issuer: 'Institute of Chartered Accountants of India (ICAI)',
          date: '2022',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Hindi', proficiency: 'Native' },
        { id: 'l-3', language: 'Gujarati', proficiency: 'Native' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'skills', 'education', 'certifications'],
      },
    },
  },
  {
    slug: 'sales-resume',
    title: 'B2B Sales Executive Resume Example & Revenue Growth Format',
    role: 'Business Development Executive (B2B SaaS)',
    experienceLevel: '2–5 Years Experience',
    category: 'business',
    metaDescription: 'Targeted Sales resume format for B2B SaaS and Enterprise Account Executives. Features quota achievement (134%), pipeline generation, Salesforce CRM, and deal negotiation.',
    targetKeywords: [
      'sales resume', 'business development resume', 'b2b sales resume', 'saas sales resume',
      'salesforce crm', 'lead generation', 'cold calling', 'pipeline management', 'revenue quota', 'deal closing'
    ],
    recommendedTemplate: 'sydney',
    whyItWorks: [
      {
        title: 'Quota & Closed-Won Revenue Numbers',
        desc: 'Proves high performance through verifiable revenue figures: 134% quota attainment, ₹2.4 Crores ARR closed, and ₹8.5 Lakhs average deal size.',
      },
      {
        title: 'Full-Cycle Sales Methodology',
        desc: 'Demonstrates expertise across the entire funnel: outbound cold prospecting, C-suite discovery calls, objection handling, and executive closing.',
      },
      {
        title: 'CRM Pipeline Governance',
        desc: 'Shows disciplined tracking using Salesforce CRM and HubSpot with accurate quarterly revenue forecasting.',
      },
    ],
    skillsGrouped: {
      'Sales Execution': ['B2B Solution Selling', 'Outbound Cold Prospecting', 'Product Demos', 'Objection Handling', 'Contract Negotiation'],
      'Tools & CRM': ['Salesforce CRM', 'HubSpot Sales Hub', 'LinkedIn Sales Navigator', 'Apollo.io', 'ZoomInfo', 'Gong.io'],
      'Strategic Competencies': ['Pipeline Forecasting', 'Account-Based Marketing (ABM)', 'Customer Success Handover', 'MEDDIC Methodology'],
    },
    experienceBullets: [
      'Consistently surpassed quarterly sales quota by an average of 134%, closing ₹2.4 Crores in new Annual Recurring Revenue (ARR) across Mid-Market accounts.',
      'Sourced and qualified 120+ enterprise leads through targeted LinkedIn Sales Navigator outreach, maintaining a 28% meeting conversion rate.',
      'Delivered 90+ custom SaaS product demonstrations to CXOs and VP of Engineering buyers, converting 34% of qualified demos into closed deals.',
      'Shortened average enterprise deal sales cycle from 75 days to 48 days by implementing the MEDDIC qualification framework.',
    ],
    sampleProjects: [
      {
        title: 'Fintech Enterprise Account Expansion Campaign',
        tech: 'Salesforce, LinkedIn Sales Navigator, ZoomInfo',
        desc: 'Secured multi-year enterprise license contract with Tier-1 NBFC worth ₹48 Lakhs ARR through consultative product demonstrations.',
      },
    ],
    commonMistakes: [
      'Failing to mention percentage quota achievement and actual currency values closed.',
      'Writing about general duties like "called clients" instead of explaining the sales methodology and deal sizes.',
      'Omitting CRM tools like Salesforce and pipeline prospecting platforms.',
    ],
    interviewQuestions: [
      {
        q: 'Walk me through how you qualify an enterprise lead using MEDDIC or BANT.',
        tip: 'Detail the Budget, Authority (Economic Buyer), Need, Timeline, and Metrics. Explain how you confirm the decision maker\'s sign-off process.',
      },
    ],
    sampleResumeData: {
      id: 'example-sales-resume',
      title: 'B2B Sales Executive - Resume Example',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'sydney',
      themeColor: '#0284c7',
      fontFamily: 'outfit',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Rahul Venkatraman',
        jobTitle: 'Senior Business Development Manager | B2B SaaS Sales',
        email: 'rahul.venkat.sales@gmail.com',
        phone: '+91 98400 98765',
        location: 'Bangalore, Karnataka, India',
        linkedin: 'linkedin.com/in/rahulvenkat-sales',
        summary: 'High-performing B2B Sales Professional with 4 years of enterprise software sales experience in Indian and Southeast Asian markets. Closed ₹2.4 Crore in new Annual Recurring Revenue (ARR) with consistent 134% quota achievement. Expert in Salesforce CRM, MEDDIC qualification, and C-suite closing.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Senior Account Executive (B2B SaaS)',
          company: 'CloudMetrics Technologies',
          location: 'Bangalore, India',
          startDate: '2021-07',
          endDate: 'Present',
          current: true,
          highlights: [
            'Exceeded annual quota by 134%, closing 22 new enterprise logos with an average deal size of ₹11 Lakhs ARR.',
            'Built an active sales pipeline of ₹4.8 Crore through outbound LinkedIn Sales Navigator sequences and partner webinars.',
            'Conducted product demos and ROI business case workshops with Chief Technology Officers (CTOs) and Chief Risk Officers.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Business Administration (BBA - International Business)',
          school: 'Loyola College, Chennai',
          location: 'Chennai, India',
          graduationDate: '2019',
          gpa: 'First Class with Distinction',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Sales Execution & Closing',
          items: ['B2B SaaS Sales', 'Enterprise Account Management', 'MEDDIC Qualification', 'Cold Outreach', 'Contract Closing'],
        },
        {
          id: 'sk-2',
          category: 'Tools & CRM',
          items: ['Salesforce CRM', 'HubSpot', 'LinkedIn Sales Navigator', 'ZoomInfo', 'Apollo.io', 'Google Workspace'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Fintech Enterprise Account Expansion Campaign',
          technologies: ['Salesforce', 'LinkedIn Sales Navigator', 'ZoomInfo'],
          highlights: [
            'Secured multi-year enterprise license contract with Tier-1 NBFC worth ₹48 Lakhs ARR through consultative product demonstrations.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'MEDDPICC Enterprise Sales Certified',
          issuer: 'MEDDIC Academy',
          date: '2023',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Tamil', proficiency: 'Native' },
        { id: 'l-3', language: 'Hindi', proficiency: 'Fluent' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'skills', 'education', 'certifications'],
      },
    },
  },
  {
    slug: 'fresher-resume-india',
    title: 'Fresher Resume Format India (Campus & Off-Campus IT Guide)',
    role: 'Associate Software Engineer (Fresher)',
    experienceLevel: '0–1 Years Experience',
    category: 'fresher',
    metaDescription: 'Complete fresher resume format for Indian engineers and graduates. Tailored for TCS, Infosys, Wipro, Accenture, Cognizant, and product startups.',
    targetKeywords: [
      'fresher resume india', 'resume for freshers', 'resume format for freshers', 'it fresher resume',
      'off campus drive resume', 'tcs nqt resume', 'infosys resume', 'btech fresher resume india', 'campus drive resume'
    ],
    recommendedTemplate: 'ats',
    whyItWorks: [
      {
        title: 'Calibrated for Indian Mass Recruiters & Product Startups',
        desc: 'Balanced structure that passes both mass recruiter scanners (TCS, Infosys, Cognizant) and technical screens by Indian product startups.',
      },
      {
        title: 'No Work Experience? High Signal Academics',
        desc: 'Emphasizes practical academic projects, coding assessment percentiles, and technical certifications rather than blank work history.',
      },
      {
        title: 'Standard Clean ATS Formatting',
        desc: 'Ensures zero parsing errors across Indian recruitment portals (Naukri, Foundit, Hirist, eLitmus).',
      },
    ],
    skillsGrouped: {
      'Programming Languages': ['Java', 'Python', 'C++', 'SQL', 'JavaScript'],
      'Web Technologies': ['HTML5', 'CSS3', 'React.js', 'Bootstrap', 'REST APIs Basics'],
      'Core Fundamentals': ['Data Structures & Algorithms', 'DBMS', 'Object-Oriented Programming (OOP)', 'Computer Networks'],
      'Development Tools': ['Git & GitHub', 'VS Code', 'Eclipse', 'MySQL Workbench'],
    },
    experienceBullets: [
      'Completed comprehensive 12-week software engineering academic capstone developing a full-stack campus inventory system in Java and MySQL.',
      'Secured top 3% ranking in TCS National Qualifier Test (TCS NQT 2024) across 85,000+ pan-India engineering candidates.',
      'Solved 200+ algorithm challenges on GeeksforGeeks and LeetCode, mastering Arrays, Linked Lists, Trees, and Dynamic Programming.',
      'Served as Technical Head of College Coding Club, organizing 3 inter-college hackathons with 400+ participating student programmers.',
    ],
    sampleProjects: [
      {
        title: 'Smart Real-Time Bus Tracking App for College Campuses',
        tech: 'Python, Flask, Google Maps API, SQLite',
        desc: 'Engineered GPS bus tracking web application providing real-time location ETA to 3,500 daily student commuters.',
      },
    ],
    commonMistakes: [
      'Including marital status, father\'s name, or passport details—these are obsolete and consume valuable space.',
      'Listing generic personal qualities ("Hardworking, quick learner") instead of verifiable technical skills.',
      'Using broken links or personal social media handles instead of professional LinkedIn and GitHub profiles.',
    ],
    interviewQuestions: [
      {
        q: 'What is the difference between an Abstract Class and an Interface in Java?',
        tip: 'Abstract classes can hold state and method implementations (partial abstraction); interfaces define contracts and support multiple inheritance (full abstraction).',
      },
    ],
    sampleResumeData: {
      id: 'example-fresher-india',
      title: 'Fresher Resume India - Associate Software Engineer',
      status: 'completed',
      updatedAt: 'Just now',
      templateId: 'ats',
      themeColor: '#2563eb',
      fontFamily: 'inter',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Karthik Ramanathan',
        jobTitle: 'Associate Software Engineer | Core Java & Full Stack Fresher',
        email: 'karthik.ramanathan.dev@gmail.com',
        phone: '+91 98412 34567',
        location: 'Chennai, Tamil Nadu, India',
        linkedin: 'linkedin.com/in/karthikraman-dev',
        github: 'github.com/karthikraman-dev',
        summary: 'Enthusiastic and disciplined Computer Science Graduate (8.5 CGPA) with solid foundations in Core Java, Python, SQL, and Data Structures. Scored 96 percentile in TCS NQT 2024. Proven ability to build full-stack web applications with clean, maintainable code. Seeking Associate Software Engineer role.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Web Development Virtual Intern',
          company: 'Cognizant (SmartInternz Program)',
          location: 'Chennai, India',
          startDate: '2024-01',
          endDate: '2024-03',
          current: false,
          highlights: [
            'Built responsive web pages using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility and mobile responsiveness.',
            'Integrated open-source weather REST APIs to display live meteorological forecast data on user dashboard.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.E. in Computer Science & Engineering',
          school: 'Anna University (College of Engineering, Guindy)',
          location: 'Chennai, India',
          graduationDate: '2024',
          gpa: '8.5 / 10.0 CGPA',
        },
        {
          id: 'edu-2',
          degree: 'Higher Secondary Certificate (HSC - Science)',
          school: 'DAV Senior Secondary School',
          location: 'Chennai, India',
          graduationDate: '2020',
          gpa: '93.6%',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Programming & Core CS',
          items: ['Java (Core & OOPs)', 'Python', 'C++', 'Data Structures & Algorithms', 'DBMS', 'Operating Systems'],
        },
        {
          id: 'sk-2',
          category: 'Web & Databases',
          items: ['HTML5', 'CSS3', 'JavaScript', 'React.js Basics', 'MySQL', 'PostgreSQL'],
        },
        {
          id: 'sk-3',
          category: 'Tools & Platforms',
          items: ['Git & GitHub', 'VS Code', 'Eclipse IDE', 'Postman', 'Linux Basics'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Campus Lost & Found Portal with Image Search',
          technologies: ['React.js', 'Python Flask', 'SQLite'],
          highlights: [
            'Engineered web app allowing 4,000+ campus students to report lost belongings, successfully reuniting 60+ items in semester test run.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'TCS National Qualifier Test (TCS NQT) – 96 Percentile',
          issuer: 'Tata Consultancy Services',
          date: '2024',
        },
      ],
      languages: [
        { id: 'l-1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l-2', language: 'Tamil', proficiency: 'Native' },
        { id: 'l-3', language: 'Hindi', proficiency: 'Conversational' },
      ],
      sectionOrder: {
        singleColumn: ['summary', 'education', 'skills', 'projects', 'experience', 'certifications'],
      },
    },
  },
];

export const getResumeExampleBySlug = (slug: string): ResumeExample | undefined => {
  return RESUME_EXAMPLES.find((e) => e.slug === slug);
};