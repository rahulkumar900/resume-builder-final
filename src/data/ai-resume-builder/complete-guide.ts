export const COMPLETE_AI_RESUME_GUIDE = {
  introParagraphs: [
    'A resume in 2026 is evaluated by two distinct gatekeepers: automated Applicant Tracking Systems (ATS) and human executive recruiters who scan each applicant profile in less than 6 seconds.',
    'Generic AI chatbots like standard ChatGPT often generate robotic clichés such as "dynamic go-getter" or "synergistic team player", which trigger red flags for recruiters and fail automated ATS keyword parsing.',
    'A modern, high-converting resume requires quantified achievements built with Google’s X-Y-Z formula, rigorous technical keyword alignment with the target job description, and clean vector layout formatting.',
    'In this comprehensive guide, you will learn how to leverage our free AI resume builder to write recruiter-grade bullet points, choose the optimal ATS format, avoid common AI pitfalls, and export interview-winning resumes in PDF and Microsoft Word (.docx).',
  ],

  section1: {
    title: '1. Understand How AI and ATS Systems Screen Your Resume',
    intro:
      'Over 98% of Fortune 500 corporations and 70% of high-growth companies use Applicant Tracking Systems (such as Workday, Taleo, Greenhouse, Lever, and iCIMS) to screen candidates before human review.',
    howAtsWorks: [
      {
        label: 'Text Extraction & Tokenization',
        desc: 'The ATS strips visual styling and parses raw text into standardized tokens for candidate profiling.',
      },
      {
        label: 'Semantic Keyword Matching',
        desc: 'The parser compares candidate skills, tools, and job titles against the employer’s job description requirements.',
      },
      {
        label: 'Experience & Date Calculation',
        desc: 'The system computes your total years of relevant domain experience from reverse-chronological employment dates.',
      },
      {
        label: 'Candidate Ranking & Relevancy Scoring',
        desc: 'Resumes with high semantic keyword parity and clear section headers are scored highest and delivered to recruiters.',
      },
    ],
    fiveQualities: [
      {
        label: 'ATS-Compliant Structure',
        desc: 'Standardized headings (Experience, Education, Skills) that every parser reads flawlessly.',
      },
      {
        label: 'Google X-Y-Z Metrics',
        desc: 'Quantified business results proving real-world competence and operational scale.',
      },
      {
        label: 'Role-Specific Keywords',
        desc: 'Precise technical terms and industry tools extracted directly from the target job posting.',
      },
      {
        label: 'Cliché-Free Phrasing',
        desc: 'Clear, authoritative action verbs without repetitive ChatGPT buzzwords or fluff.',
      },
      {
        label: 'Flawless Typography & Margins',
        desc: 'Clean single or dual-column layouts with proportional whitespace and zero overlapping text.',
      },
    ],
    reminder:
      'Recruiters do not reject resumes because they used AI; they reject resumes that sound generic, lack measurable metrics, or fail basic ATS parsing standards.',
  },

  section2: {
    title: '2. Customize Your Resume for the Job Description with AI',
    intro:
      'Submitting a generic resume to dozens of job listings yields low response rates. Our resume builder AI enables you to tailor your resume to any job description in seconds:',
    stepsToTailor: [
      'Paste the complete target Job Description into our AI Studio editor.',
      'Allow our semantic parser to identify required hard skills, tools, frameworks, and certifications.',
      'Review real-time keyword matching: green tags represent matched skills, while amber tags indicate critical gaps.',
      'Use the AI writer to naturally weave missing keywords into your bullet points without keyword stuffing.',
      'Check your recalculated ATS match score, targeting 85% to 98% alignment before submitting.',
    ],
    techExample: [
      'Target Job Posting: "Looking for a Backend Engineer with TypeScript, PostgreSQL, microservices, and Docker."',
      'Weak Resume Bullet: "Worked on server backend and wrote database queries."',
      'AI-Tailored Bullet: "Engineered scalable TypeScript microservices and optimized PostgreSQL queries, reducing database query latency by 34% across 4 production services."',
    ],
    marketingExample: [
      'Target Job Posting: "Seeking a Growth Marketer proficient in Google Ads, Meta Ads, CAC optimization, and HubSpot."',
      'Weak Resume Bullet: "Handled digital marketing campaigns and managed ad spend."',
      'AI-Tailored Bullet: "Managed $45K monthly budget across Google and Meta ad channels, reducing customer acquisition cost (CAC) by 27% and generating 1,400+ qualified MQLs."',
    ],
    tip: 'Never fabricate experience or add tools you cannot speak about intelligently in an interview. Tailoring means highlighting the genuine overlapping skills you already possess.',
  },

  section3: {
    title: '3. Choose the Right Resume Format for AI & ATS Screening',
    intro:
      'The layout format you choose determines how cleanly Applicant Tracking Systems parse your credentials and how rapidly recruiters spot your qualifications:',
    formats: [
      {
        name: 'A. Reverse-Chronological Resume Format (Recommended)',
        desc: 'Presents your most recent work experience first and progresses backwards. It is the universally preferred format for both ATS parsers and hiring managers.',
        suitableFor: [
          'Experienced professionals with 2 to 15+ years in a continuous field.',
          'Candidates seeking standard corporate promotions or lateral moves.',
          'Engineers, accountants, marketers, teachers, and sales professionals.',
        ],
        atsRating: '99% ATS Compatibility',
      },
      {
        name: 'B. Combination / Hybrid Resume Format',
        desc: 'Pairs a prominent core competencies and skills matrix at the top with a detailed reverse-chronological work history below.',
        suitableFor: [
          'College freshers and B.Tech graduates highlighting academic projects.',
          'Career changers transferring technical proficiencies to a new domain.',
          'Senior professionals with multifaceted technical leadership backgrounds.',
        ],
        atsRating: '95% ATS Compatibility',
      },
      {
        name: 'C. Functional (Skills-Based) Resume Format',
        desc: 'Groups achievements entirely by skill category, minimizing chronological employment dates.',
        suitableFor: [
          'Candidates with severe employment gaps or irregular freelance histories.',
          'Freelance consultants focusing on broad capability domains.',
        ],
        atsRating: 'Caution: Many older ATS parsers struggle to extract employment timelines.',
      },
    ],
    verdict:
      'For maximum ATS pass rates and recruiter trust, use the Reverse-Chronological or Combination layout. Our free AI resume builder automatically enforces these structures across all 50+ templates.',
  },

  section4: {
    title: '4. Essential Sections of an AI-Generated Resume (A to K)',
    sections: [
      {
        letter: 'A',
        name: 'Contact Information Header',
        guidelines:
          'Place full name, professional email address, mobile phone number, city/state, LinkedIn profile URL, and portfolio/GitHub link at the very top. Avoid full street addresses, photos (for US/tech roles), or marital status.',
        example:
          'Alex Morgan | San Francisco, CA | alex.morgan@email.com | (555) 234-5678 | linkedin.com/in/alexmorgan | github.com/alexmorgan',
      },
      {
        letter: 'B',
        name: 'Professional Summary',
        guidelines:
          'A 3-line elevator pitch highlighting your title, total years of experience, core technical specialties, and one major quantified career achievement. Avoid first-person pronouns (I, me, my).',
        example:
          'Senior Software Engineer with 6+ years of experience architecting distributed cloud systems. Proven track record of scaling high-throughput APIs to 10M+ daily users and reducing AWS infrastructure spend by 28%. Expert in TypeScript, Go, PostgreSQL, and Kubernetes.',
      },
      {
        letter: 'C',
        name: 'Work Experience & Google X-Y-Z Achievements',
        guidelines:
          'The core of your resume. List job title, employer, city/state, and month/year dates. Follow each role with 3 to 5 bullet points constructed using Google’s X-Y-Z metric formula.',
        example:
          'Senior Product Manager | Acme Corp | Austin, TX | March 2022 – Present\n• Spearheaded AI search feature launch, improving user search-to-checkout conversion by 22% and generating $680K in incremental Q3 revenue.\n• Orchestrated cross-functional squad of 12 engineers and designers, delivering quarterly roadmap on time across 4 consecutive sprints.',
      },
      {
        letter: 'D',
        name: 'Technical & Professional Skills Taxonomy',
        guidelines:
          'Organize skills into logical sub-categories (e.g., Languages, Frameworks, Databases, Tools) rather than an unstructured keyword blob. This helps both ATS parsers and human skimmers.',
        example:
          '• Languages: TypeScript, Python, SQL, Go\n• Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS\n• Cloud & DevOps: AWS (ECS, S3, RDS), Docker, CI/CD pipelines, Kubernetes\n• Tools & Databases: PostgreSQL, Redis, Git, Jira, Postman',
      },
      {
        letter: 'E',
        name: 'Projects & Portfolio Highlights',
        guidelines:
          'Essential for freshers, career switchers, and engineers. Detail 2 to 3 projects with project name, tech stack used, core feature implemented, and measured result or test coverage.',
        example:
          'Distributed Task Queue Engine (Go, Redis, Docker)\n• Architected concurrent worker pool processing 15,000 asynchronous jobs/min with automated exponential backoff.\n• Achieved 92% unit test coverage using Go testing suite and Docker integration tests.',
      },
      {
        letter: 'F',
        name: 'Education & Academic Qualifications',
        guidelines:
          'List degree name, major/specialization, institution name, graduation year, and GPA/CGPA (if above 3.5/4.0 or 8.0/10 and graduated within the past 3 years). Experienced candidates should keep this concise.',
        example:
          'Bachelor of Science in Computer Science | University of California, Berkeley | 2018 – 2022 | GPA: 3.82/4.0',
      },
      {
        letter: 'G',
        name: 'Certifications & Credentials',
        guidelines:
          'Include accredited, recognized industry credentials with issuing body and issue date. High-value credentials often serve as primary ATS filter parameters.',
        example:
          '• AWS Certified Solutions Architect – Associate (Amazon Web Services, 2024)\n• Certified Scrum Product Owner (Scrum Alliance, 2023)',
      },
      {
        letter: 'H',
        name: 'Honors, Awards & Hackathons',
        guidelines:
          'Highlight company-wide recognitions, dean’s honors, hackathon placements, or competitive scholarship wins to distinguish yourself from peer applicants.',
        example:
          '• 1st Place Winner – Global FinTech Hackathon 2023 (out of 140+ participating teams)\n• Employee of the Year – Excellence in Innovation (Acme Corp, 2023)',
      },
      {
        letter: 'I',
        name: 'Publications & Open Source Contributions',
        guidelines:
          'Showcase peer-reviewed papers, conference presentations, or active open-source repositories to validate deep technical authority.',
        example:
          '• Contributor, Open-Source React Component Library (12K+ GitHub stars, 3 merged PRs)\n• Co-Author, "Optimizing Neural Network Latency on Edge Hardware" – IEEE Proceedings (2023)',
      },
      {
        letter: 'J',
        name: 'Leadership & Extracurricular Activities',
        guidelines:
          'Demonstrate interpersonal collaboration, mentorship, committee leadership, or volunteer initiatives that showcase team culture fit.',
        example:
          '• Lead Organizer, SF Tech Meetup (hosted 8 monthly technical workshops for 300+ attendees)\n• Peer Mentor, Code in the Community (guided 24 junior developers in Python fundamentals)',
      },
      {
        letter: 'K',
        name: 'Languages & Global Competencies',
        guidelines:
          'List foreign languages with recognized proficiency levels (Native, Fluent, Professional Working, Intermediate). Important for multinational corporations.',
        example:
          '• English (Native / Full Professional)\n• Spanish (Fluent / Professional Working)\n• German (Conversational / Intermediate)',
      },
    ],
  },

  section5: {
    title: '5. How to Write an AI Resume with No Experience (Freshers & Career Changers)',
    intro:
      'Writing a compelling resume when you have zero full-time corporate experience is one of the biggest challenges job seekers face. Our resume builder AI helps freshers convert academic coursework and capstone projects into professional qualifications:',
    fresherPriorityOrder: [
      {
        step: '1. Prominent Education & Coursework',
        detail:
          'Position your degree, university, GPA, and relevant upper-level technical coursework near the top to establish foundational domain knowledge.',
      },
      {
        step: '2. Dedicated Academic & Personal Projects',
        detail:
          'Treat major class projects, hackathons, and personal builds with the same rigor as employment experience, detailing architecture, tools, and testing.',
      },
      {
        step: '3. Internships & Supervised Practicums',
        detail:
          'Include summer internships, research assistantships, or unpaid teaching practice, focusing on deliverables produced.',
      },
      {
        step: '4. Technical Skills Taxonomy',
        detail:
          'Highlight hands-on familiarity with programming languages, industry tools, version control (Git), and software suites.',
      },
      {
        step: '5. Campus Leadership & Extracurriculars',
        detail:
          'Mention student club management, organizing campus tech festivals, or volunteer tutoring to prove soft skills and work ethic.',
      },
    ],
    fresherBulletExample: {
      before: 'Made an Android app for final year project with my team.',
      after:
        'Developed native Android fitness tracker app in Kotlin for 400+ campus test users, integrating Google Fit API, SQLite local caching, and Coroutines for background sync.',
    },
  },

  section6: {
    title: '6. Master Google’s X-Y-Z Resume Bullet Formula with AI',
    intro:
      'Laszlo Bock, former SVP of People Operations at Google, popularized the gold standard for describing accomplishments on a resume: "Accomplished [X], as measured by [Y], by doing [Z]".',
    formulaExplanation: [
      {
        part: '[X] Accomplished What?',
        meaning: 'Start with a punchy, decisive past-tense action verb describing the business or technical objective you completed.',
      },
      {
        part: '[Y] Measured by What?',
        meaning: 'Provide quantifiable evidence—percentage lift, dollar revenue, time saved, error rate reduction, or transaction volume.',
      },
      {
        part: '[Z] By Doing What?',
        meaning: 'Specify the exact methodology, tools, algorithms, or architectural patterns you applied to achieve the result.',
      },
    ],
    examples: [
      {
        role: 'Software Engineer',
        text: 'Automated CI/CD deployment across 8 microservices, reducing deployment cycle times by 44% and eliminating 16 hours of manual dev overhead per sprint by authoring GitHub Actions workflows.',
      },
      {
        role: 'Product Manager',
        text: 'Launched self-service customer checkout funnel, increasing mobile conversion rates from 2.8% to 4.1% and adding $320K in monthly GMV by redesigning the 1-click payment flow.',
      },
      {
        role: 'Data Analyst',
        text: 'Engineered automated customer churn prediction pipeline, improving retention campaign precision by 31% and identifying $1.2M in at-risk accounts using Python and BigQuery ML.',
      },
      {
        role: 'Marketing Lead',
        text: 'Orchestrated multi-channel SEO content expansion across 120 key buyer intent topics, growing organic website traffic by 185% and inbound demo requests by 64% over 9 months.',
      },
    ],
  },

  section7: {
    title: '7. Resume Typography, Layout & Formatting Standards',
    intro:
      'Visual clarity and strict mathematical pagination determine whether your resume gets read or discarded. Follow these ATS-verified typography guidelines:',
    fonts: ['Arial', 'Calibri', 'Inter', 'Source Sans 3', 'Helvetica', 'Garamond', 'Georgia'],
    fontSizes: [
      { element: 'Candidate Full Name', size: '20 – 24 pt (Bold)' },
      { element: 'Section Headings (H2)', size: '12 – 14 pt (Uppercase, Bold)' },
      { element: 'Job Titles & Degrees', size: '10.5 – 11.5 pt (Bold / Semi-bold)' },
      { element: 'Body Text & Bullet Points', size: '9.5 – 10.5 pt (Regular)' },
      { element: 'Dates, Locations & Badges', size: '8.5 – 9.5 pt (Muted / Regular)' },
    ],
    marginsAndSpacing:
      'Use 0.5-inch to 0.75-inch margins on all sides. Never reduce margins below 0.4 inches to prevent physical print truncation and ATS edge-parsing errors.',
    pageLengthRules: [
      '1 Page: Standard for freshers, college students, and professionals with under 5 years of experience.',
      '2 Pages: Standard for mid-to-senior professionals with 6 to 15+ years of extensive relevant experience.',
      '3+ Pages: Reserved exclusively for academic CVs, medical specialists, and executive federal/board appointments.',
    ],
  },

  section8: {
    title: '8. Make Your Resume 100% ATS-Friendly: Technical Rules',
    intro:
      'Avoid common technical formatting pitfalls that cause Applicant Tracking Systems to scramble or reject candidate files:',
    dosAndDonts: [
      {
        type: 'DO',
        rule: 'Export as vector PDF or standard Microsoft Word (.docx)',
        reason: 'Both formats preserve machine-readable text streams that modern ATS parsers ingest cleanly.',
      },
      {
        type: 'DO',
        rule: 'Use standard section titles (Experience, Education, Skills)',
        reason: 'Creative titles like "Where I Have Been" or "My Superpowers" confuse automated parsers.',
      },
      {
        type: 'DO',
        rule: 'Format dates consistently (e.g. "Jan 2022 – Present")',
        reason: 'Consistent date formats enable parsers to calculate total experience duration without calculation errors.',
      },
      {
        type: 'DON’T',
        rule: 'Do not use Photoshop, Canva, or raster PNG/JPG exports',
        reason: 'Image-based resumes have no searchable text and score 0 on ATS keyword scans.',
      },
      {
        type: 'DON’T',
        rule: 'Avoid embedding crucial text inside graphical tables or text boxes',
        reason: 'Many older parsers skip floating shapes and multi-nested tables entirely.',
      },
      {
        type: 'DON’T',
        rule: 'Do not hide white keywords in the margins',
        reason: 'Modern ATS systems detect hidden text tricks and instantly disqualify candidate profiles for unethical tampering.',
      },
    ],
  },

  section9: {
    title: '9. 10 Common AI Resume Mistakes to Avoid',
    mistakes: [
      {
        title: '1. Accepting Unedited Robotic AI Outputs',
        desc: 'Chatbots frequently overuse buzzwords like "spearheaded synergy" or "orchestrated excellence". Always review AI bullets to ensure they sound like authentic human accomplishments.',
      },
      {
        title: '2. Hallucinating Numbers & Fabricated Metrics',
        desc: 'Never let an AI invent percentages or dollar figures you cannot defend during technical interview rounds. Use real benchmarks from your work.',
      },
      {
        title: '3. Keyword Stuffing Without Context',
        desc: 'Listing every skill from a job description without demonstrating how you applied it in your work history looks suspicious to human screeners.',
      },
      {
        title: '4. Omitting the Google X-Y-Z Formula',
        desc: 'Describing daily duties rather than business outcomes makes you look like a passive employee rather than a high-impact contributor.',
      },
      {
        title: '5. Using Complex Multi-Column Tables',
        desc: 'Complex nested tables frequently scramble parsed text order in older ATS software like Taleo.',
      },
      {
        title: '6. Forgetting to Update Contact Details',
        desc: 'An outdated phone number, broken LinkedIn link, or unprofessional email address (e.g. coolguy99@...) can ruin an otherwise flawless application.',
      },
      {
        title: '7. Submitting Inconsistent Date Ranges',
        desc: 'Missing months or overlapping employment dates without clarification cause calculation errors in ATS tenure algorithms.',
      },
      {
        title: '8. Ignoring A4 / Letter Page Boundary Overflow',
        desc: 'Having 2 lines of text spill over onto an accidental second page looks careless. Our studio automatically prevents awkward page overflow.',
      },
      {
        title: '9. Writing in the First Person ("I", "My", "We")',
        desc: 'Professional resumes should always be written in the implied third-person active voice ("Engineered...", "Managed...", not "I managed...").',
      },
      {
        title: '10. Relying Exclusively on One File Format',
        desc: 'Always keep both a vector PDF (for online job portals) and a clean Word (.docx) file (for recruiters and staffing agencies) ready to deploy.',
      },
    ],
  },

  section10: {
    title: '10. Action Verbs Directory for AI Resume Writing',
    intro:
      'Replace weak verbs like "helped", "handled", "worked on", or "responsible for" with high-impact power verbs categorized by professional function:',
    categories: [
      {
        name: 'Technical & Engineering',
        verbs: 'Architected, Engineered, Deployed, Automated, Refactored, Scaled, Integrated, Containerized, Debugged, Provisioned, Benchmarked',
      },
      {
        name: 'Leadership & Strategy',
        verbs: 'Spearheaded, Directed, Orchestrated, Chaired, Mentored, Mobilized, Pioneered, Championed, Formulated, Realigned',
      },
      {
        name: 'Efficiency & Optimization',
        verbs: 'Streamlined, Accelerated, Consolidated, Reduced, Eliminated, Standardized, Revamped, Restructured, Overhauled',
      },
      {
        name: 'Revenue & Growth',
        verbs: 'Maximized, Generated, Expanded, Boosted, Outperformed, Negotiated, Cultivated, Captured, Labeled, Upsold',
      },
      {
        name: 'Analysis & Data',
        verbs: 'Quantified, Evaluated, Forecasted, Extracted, Synthesized, Modelled, Validated, Diagnosed, Interpreted, Surveyed',
      },
      {
        name: 'Communication & Collaboration',
        verbs: 'Coordinated, Authored, Negotiated, Facilitated, Partnered, Presented, Liaised, Campaigned, Published',
      },
    ],
  },

  section11: {
    title: '11. Final Pre-Submission Resume Checklist',
    intro:
      'Before clicking submit on your dream job application, run through this 3-tier quality control checklist:',
    contentChecklist: [
      'Contact information is 100% accurate with working phone and active LinkedIn/GitHub links.',
      'Professional summary mentions target job title and key quantitative achievements.',
      'Work experience bullets strictly adhere to Google’s X-Y-Z formula (Action Verb + Metric + Method).',
      'Target job description keywords are naturally incorporated without awkward keyword stuffing.',
      'Education, degrees, certifications, and graduation years are verified and accurate.',
    ],
    formattingChecklist: [
      'Resume strictly fits 1 page (for < 5 yrs experience) or 2 pages (for 6+ yrs experience) with zero dangling lines.',
      'ATS-safe typography used (10-12pt body text, 12-14pt headings, 0.5-0.75 inch margins).',
      'Bullet points are uniformly indented and styled with standard circular or square bullets.',
      'No text is trapped inside non-standard tables, graphics, text boxes, or image raster layers.',
    ],
    finalReviewChecklist: [
      'Spell-check and grammar verified with zero grammatical errors or punctuation inconsistencies.',
      'File exported in both high-resolution vector PDF and editable Microsoft Word (.docx).',
      'File named professionally (e.g. "Firstname_Lastname_Resume_2026.pdf").',
    ],
  },

  conclusion: [
    'Building an ATS-compliant, recruiter-ready resume does not have to take days or cost hundreds of dollars in recurring subscriptions.',
    'By leveraging our free AI resume builder, you combine executive-level Google X-Y-Z metric phrasing with automated keyword matching and print-ready typography.',
    'Take control of your job search today: generate your personalized resume, optimize for your target role, and download your free PDF and Word documents in minutes.',
  ],
};
