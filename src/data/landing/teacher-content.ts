import { RoleLandingPageContent } from './types';

export const teacherLandingContent: RoleLandingPageContent = {
  metadata: {
    title: 'Teacher Resume Format for Freshers & Experienced (Word & PDF)',
    description:
      'Start with our Fresher B.Ed teacher resume example, learn step-by-step how to write every essential resume section, and discover the exact extra details experienced teachers must add. Free Word (.doc) and PDF downloads.',
    keywords: [
      'teacher resume builder',
      'resume in teacher job with no experience',
      'resume in teacher job for freshers',
      'teacher resume format',
      'sample cv for teachers in word format',
      'private school teacher resume sample',
      'resume in teacher job in word format',
      'primary school teacher resume word format',
      'private school teacher resume sample with experience',
      'teacher resume format in pdf',
      'bed fresher resume format',
      'prt tgt pgt teacher resume format',
    ],
    canonical: 'https://resumebabu.com/teacher-resume-builder',
    ogImage: 'https://resumebabu.com/og-image.png',
  },

  jsonLd: {
    webApp: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ResumeBabu Teacher Resume Builder & Template Hub',
      description:
        'Step-by-step teacher resume guide starting with fresher B.Ed samples, detailed section-by-section writing instructions, experienced upgrade checklists, and free Word & PDF downloads.',
      url: 'https://resumebabu.com/teacher-resume-builder',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1940',
        bestRating: '5',
        worstRating: '1',
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://resumebabu.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Teacher Resume Format & Builder',
          item: 'https://resumebabu.com/teacher-resume-builder',
        },
      ],
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do freshers write a teacher resume with no formal school experience?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Freshers should place their B.Ed / D.El.Ed education and CTET Paper I/II right below their career objective. Convert your 8-to-16-week Student Teaching Practicum into a structured experience block detailing grades taught, lesson plans drafted, teaching aids created, and any private tutoring or home coaching experience.',
          },
        },
        {
          '@type': 'Question',
          name: 'What extra details should experienced teachers add compared to freshers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Experienced teachers (3+ years) must move beyond lesson planning and prove measurable student outcomes: 100% board exam pass rates, number of subject distinctions, remedial score improvements for weak students, Olympiad/NEET/JEE mentoring, Examination Cell duties, House Master leadership, and question bank authoring.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I download these teacher resume templates in Word (.doc) format?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Every example on this page (Fresher, Experienced, Primary PRT, and PGT) includes a 1-click "Word (.doc)" download button for Microsoft Word and Google Docs, plus direct editing inside the ResumeBabu builder for clean vector PDFs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What sections are mandatory on every teacher resume?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every teacher resume needs 7 core sections: (1) Header with Licensure Title, (2) Career Objective or Summary, (3) Education & B.Ed/D.El.Ed Qualifications, (4) Teaching Experience or Student Practicum, (5) Pedagogical & EdTech Skills, (6) CTET/State TET Certifications, and (7) Co-Curricular & School Leadership.',
          },
        },
      ],
    },
  },

  hero: {
    badge: {
      text: 'Complete Fresher-to-Experienced Teacher Resume Guide • 2026',
    },
    title: 'Teacher Resume Format:',
    highlightedPhrase: 'Fresher Foundation to Experienced Mastery',
    subtitle:
      'Start with our complete Fresher B.Ed resume example (no experience required), follow our section-by-section writing blueprint, and learn the exact extra details experienced educators add to impress school principals.',
    ctaPrimary: {
      text: 'Build Fresher Teacher Resume',
      href: '/create?role=Teacher&template=academic_teaching',
    },
    ctaSecondary: {
      text: 'Jump to Section Guide',
      href: '#how-to-write',
    },
    trustBadges: [
      'Starts with Fresher & No-Experience Samples',
      '7-Section Detailed Writing Blueprint',
      'Extra Details Guide for Experienced Staff',
      'Free Word (.doc) & Vector PDF Downloads',
    ],
  },

  quickStats: [
    {
      value: '26,000+',
      label: 'Educator Resumes Built',
      sublabel: 'Fresh B.Ed graduates to senior PGTs',
    },
    {
      value: '7 Sections',
      label: 'Step-by-Step Blueprint',
      sublabel: 'Exact principal-approved layout order',
    },
    {
      value: 'Word + PDF',
      label: 'Instant Free Downloads',
      sublabel: 'Editable .doc or ATS vector PDF',
    },
  ],

  // RESUME EXAMPLES — STARTING WITH FRESHER FIRST!
  resumeExamples: [
    {
      id: 'fresher-no-experience',
      title: 'Fresher Teacher Resume Sample (No Formal School Experience / B.Ed)',
      roleType: 'Fresher',
      badge: 'Start Here: Best for B.Ed / D.El.Ed Freshers',
      experienceLabel: 'Fresher / No Experience',
      targetRole: 'PRT / TGT English & Social Sciences (Entry-Level)',
      whyThisWorks: {
        measurableImpact:
          'Turns a 16-week B.Ed student teaching practicum and home tutoring into real classroom impact (40+ lesson plans, +25% comprehension scores).',
        credentialsClarity:
          'Places B.Ed pedagogy specialization and CTET Paper II qualification prominently at the top to immediately satisfy school hiring compliance.',
        pedagogicalTech:
          'Showcases fresh digital fluency (Google Classroom, Canva, Kahoot, multimedia aids) which principals actively seek in entry-level hires.',
      },
      resumeData: {
        personalInfo: {
          name: 'Aakash Sharma',
          targetTitle: 'Aspiring TGT English & Social Studies | B.Ed Graduate | CTET Qualified',
          contactLine: '+91 91234 56789 | aakash.sharma@email.com | linkedin.com/in/aakash-sharma-edu',
          location: 'Lucknow, Uttar Pradesh (Open to relocate)',
        },
        summary:
          'Motivated, CTET Paper II qualified B.Ed graduate specializing in English and Social Studies. Completed a 16-week intensive student teaching internship at Kendriya Vidyalaya, formulating 40+ interactive lesson plans incorporating multimedia aids and active discussions. Experienced independent tutor with 2 years of proven success guiding middle school students to achieve a 25% improvement in English comprehension. Dedicated to creating an engaging, student-first learning environment aligned with NEP 2020.',
        experience: [
          {
            role: 'Student Teacher (B.Ed Practicum Internship)',
            institution: 'Kendriya Vidyalaya, Gomti Nagar, Lucknow',
            period: 'October 2023 – February 2024 (16 Weeks)',
            bullets: [
              'Conducted daily English and Social Studies classes for 80+ Class 7 & 8 students under senior mentor supervision.',
              'Formulated 40+ comprehensive lesson plans integrating audio-visual storytelling, drama role-play, and vocabulary flashcards that lifted student classroom engagement by 30%.',
              'Designed weekly formative quizzes and diagnostic worksheets that helped 14 underperforming students achieve passing grades in term assessments.',
              'Assisted senior faculty with morning assembly coordination, discipline supervision, and notebook checking for 120+ students.',
            ],
          },
          {
            role: 'Private Academic Tutor (Middle School)',
            institution: 'Self-Employed / Home Tutoring, Lucknow',
            period: 'July 2022 – September 2023',
            bullets: [
              'Provided personalized English grammar and literature tutoring to 12 Class 6–8 students, with all candidates securing first-division marks in final school exams.',
              'Developed custom weekly practice modules focusing on reading comprehension, essay structure, and pronunciation drills.',
            ],
          },
        ],
        education: [
          {
            degree: 'Bachelor of Education (B.Ed) – English & Social Science Pedagogy',
            institution: 'Lucknow University, Uttar Pradesh',
            year: '2024',
            scoreOrSpecialization: '81.4% (First Division)',
          },
          {
            degree: 'Bachelor of Arts (B.A.) in English Literature & History',
            institution: 'Lucknow University, Uttar Pradesh',
            year: '2022',
            scoreOrSpecialization: '74.2%',
          },
        ],
        certifications: [
          'Central Teacher Eligibility Test (CTET) – Paper II Qualified (CBSE, Jan 2024)',
          'Certificate in Digital Pedagogy & Classroom Technology (Coursera, 2023)',
          'Certificate of Excellence in Student Teaching (Kendriya Vidyalaya, 2024)',
        ],
        skills: {
          pedagogy: [
            'Lesson Plan Formulation',
            'Activity-Based Learning (NEP 2020)',
            'Phonics & Grammar Pedagogy',
            'Interactive Storytelling',
            'Formative Quiz Design',
          ],
          techAndTools: [
            'Google Classroom',
            'MS PowerPoint & Canva for Education',
            'Zoom & Google Meet',
            'Kahoot Interactive Games',
          ],
          softSkills: [
            'Student Rapport Building',
            'Patience & Empathy',
            'Clear Oral & Written Communication',
            'Adaptability',
          ],
        },
        coCurricular: [
          'Captain of College Debate Society; represented University at State Youth Festival 2022.',
          'Volunteer English teacher for underprivileged children under NGO "Shiksha Pratham".',
        ],
      },
    },

    {
      id: 'experienced-private',
      title: 'Experienced Private School Teacher Resume Sample (CBSE / ICSE)',
      roleType: 'Experienced',
      badge: 'Shows Experienced Extra Details',
      experienceLabel: 'Experienced (7+ Years)',
      targetRole: 'Senior TGT Mathematics & Science (Classes 8–10)',
      whyThisWorks: {
        measurableImpact:
          'Demonstrates the crucial "experienced" upgrade: 100% board exam pass rate, 42 distinctions, and +16% batch score improvements.',
        credentialsClarity:
          'Pairs subject mastery (B.Sc, B.Ed, CTET Paper II) with CBSE Capacity Building NEP 2020 certifications.',
        pedagogicalTech:
          'Includes departmental House Mistress leadership, Smartboard modules, GeoGebra simulations, and after-school remedial turnarounds.',
      },
      resumeData: {
        personalInfo: {
          name: 'Pooja Verma',
          targetTitle: 'Senior TGT Mathematics & Science | CTET Paper II Qualified | B.Ed',
          contactLine: '+91 98765 43210 | pooja.verma@email.com | linkedin.com/in/pooja-verma-edu',
          location: 'New Delhi, India (Willing to relocate)',
        },
        summary:
          'Passionate, CTET-qualified TGT Mathematics & Science Educator with 7+ years of experience delivering CBSE and ICSE curricula for Classes 8–10. Proven track record of lifting cohort board averages by 16% and sustaining a 100% board examination pass rate across 5 consecutive academic sessions. Adept at integrating interactive Smartboard visual modules, diagnostic assessment rubrics, and personalized remedial circles to nurture conceptual confidence in diverse learners.',
        experience: [
          {
            role: 'Senior TGT Mathematics Teacher',
            institution: 'Delhi Public School (DPS), R.K. Puram, New Delhi',
            period: 'July 2021 – Present',
            bullets: [
              'Deliver rigorous CBSE Mathematics curriculum across 4 sections of Class 9 & 10 (145+ students annually), achieving 100% board exam pass rate with 42 subject distinctions in 2024.',
              'Integrated GeoGebra visual simulations and Promethean Smart Board modules, increasing daily student active participation and concept retention by 35%.',
              'Formulated bi-weekly diagnostic skill tests and after-school remedial circles that elevated 26 borderline students from 44% to a 71% average in term finals.',
              'Appointed House Mistress (Ganga House): coordinated 12 inter-house cultural and academic events, winning the Overall Champion Trophy for 2023–24.',
            ],
          },
          {
            role: 'TGT Science & Math Teacher',
            institution: 'St. Xavier’s Senior Secondary School, Jaipur',
            period: 'April 2018 – June 2021',
            bullets: [
              'Taught Integrated Science and Mathematics to 160+ students in Classes 7 and 8 adhering to NCERT and state-board guidelines.',
              'Supervised junior physics and chemistry laboratories, orchestrating 30+ hands-on experimental demonstrations per term with zero safety incidents.',
              'Mentored 6 students who qualified for the National Science Olympiad (NSO) regional finals with 2 state ranks.',
              'Conducted quarterly Parent-Teacher Meetings (PTM) with 98% positive parent satisfaction ratings regarding transparent progress feedback.',
            ],
          },
        ],
        education: [
          {
            degree: 'Bachelor of Education (B.Ed) – Pedagogy of Mathematics & Physical Science',
            institution: 'Central Institute of Education (CIE), University of Delhi',
            year: '2018',
            scoreOrSpecialization: 'First Division with Distinction (82%)',
          },
          {
            degree: 'Bachelor of Science (B.Sc) in Mathematics & Physics',
            institution: 'Hansraj College, University of Delhi',
            year: '2016',
            scoreOrSpecialization: '78.5%',
          },
        ],
        certifications: [
          'Central Teacher Eligibility Test (CTET) – Paper II (Elementary) Qualified (CBSE, 2019)',
          'CBSE Capacity Building Workshop on "Experiential Learning & NEP 2020 Implementation" (2023)',
          'Google Certified Educator Level 1 (2022)',
        ],
        skills: {
          pedagogy: [
            'CBSE & ICSE Board Syllabus Planning',
            'Differentiated Instruction',
            'Formative & Diagnostic Assessment',
            'Remedial Learning Plans',
            'Bloom’s Taxonomy Application',
          ],
          techAndTools: [
            'Interactive Smart Boards',
            'Google Classroom & Drive',
            'GeoGebra & PhET Simulations',
            'MS Teams for Education',
            'Kahoot & Quizizz',
          ],
          softSkills: [
            'Classroom Behavioral Management',
            'Parent-Teacher Communication',
            'House Leadership',
            'Student Mentoring',
          ],
        },
        coCurricular: [
          'Convener of Inter-School Mathematics Fair 2023 hosting 300+ students from 18 schools.',
          'Active Member of Examination Paper Setting & Moderation Committee.',
        ],
      },
    },

    {
      id: 'primary-school-prt',
      title: 'Primary School Teacher Resume Sample (PRT - Classes 1 to 5)',
      roleType: 'Primary',
      badge: 'Early Childhood & FLN Specialist',
      experienceLabel: 'Primary (PRT • 4+ Years)',
      targetRole: 'Primary Teacher (PRT) - Classes 1 to 5',
      whyThisWorks: {
        measurableImpact:
          'Documents 92% foundational reading and numeracy proficiency using structured phonics and play-way methods.',
        credentialsClarity:
          'Clearly indicates D.El.Ed and CTET Paper 1, matching the exact regulatory requirements for Classes 1 to 5.',
        pedagogicalTech:
          'Balances early childhood psychology, emotional safety, sensory math kits, and frequent parent touchpoints.',
      },
      resumeData: {
        personalInfo: {
          name: 'Ananya Sen',
          targetTitle: 'Primary Teacher (PRT) | D.El.Ed & CTET Paper I Qualified',
          contactLine: '+91 97654 32109 | ananya.sen@email.com | Kolkata, West Bengal',
          location: 'Kolkata, West Bengal (Open to surrounding regions)',
        },
        summary:
          'Compassionate and creative Primary Teacher (PRT) with 4+ years of classroom experience delivering early childhood education and foundational literacy & numeracy (FLN) for Classes 1–4. Expert in Jolly Phonics, hands-on sensory math manipulative kits, and positive behavioral reinforcement. Proven ability to create a safe, joyful classroom atmosphere where 92% of students achieved grade-level reading milestones within one academic session.',
        experience: [
          {
            role: 'Primary School Teacher (PRT - Grade 2 & 3)',
            institution: 'Modern High School for Girls, Kolkata',
            period: 'June 2021 – Present',
            bullets: [
              'Instruct 38 Grade 2 students in English, Environmental Studies (EVS), and Foundational Mathematics using play-way and activity-based learning.',
              'Pioneered Jolly Phonics multi-sensory reading circles, enabling 92% of learners to transition to independent chapter book reading before the final term.',
              'Designed 20+ tactile math kits (bead counters, number lines, shape tangrams) making early arithmetic and measurement intuitive and fun.',
              'Implemented a positive reinforcement token economy system that cut classroom behavioral distractions by 45%.',
              'Organized annual class theater performances and science exploration fairs involving 100% student participation.',
            ],
          },
          {
            role: 'Pre-Primary & Nursery Teacher',
            institution: 'EuroKids Pre-School, Kolkata',
            period: 'April 2019 – May 2021',
            bullets: [
              'Spearheaded early development curriculum for 25 kindergarten children (ages 3–5) focusing on motor skills, phonemic awareness, and socialization.',
              'Conducted daily interactive puppet shows, rhyme sessions, and sensory sand/water play activities.',
            ],
          },
        ],
        education: [
          {
            degree: 'Diploma in Elementary Education (D.El.Ed)',
            institution: 'West Bengal Board of Primary Education',
            year: '2019',
            scoreOrSpecialization: '84.6% (Rank 4 in District)',
          },
          {
            degree: 'Bachelor of Arts (B.A.) in English',
            institution: 'Calcutta University',
            year: '2017',
            scoreOrSpecialization: '72%',
          },
        ],
        certifications: [
          'Central Teacher Eligibility Test (CTET) – Paper I Qualified (CBSE, 2020)',
          'Certified Jolly Phonics Trainer Certification (2021)',
          'Certificate in Child Psychology & Special Educational Needs (2022)',
        ],
        skills: {
          pedagogy: [
            'Foundational Literacy & Numeracy (FLN)',
            'Jolly Phonics Instruction',
            'Play-Way & Sensory Learning',
            'Socio-Emotional Learning (SEL)',
            'Differentiated Reading Circles',
          ],
          techAndTools: [
            'Smart Interactive Class Display',
            'ClassDojo Parent Communication',
            'YouTube Kids Curated Education',
            'Google Slides for Storytelling',
          ],
          softSkills: [
            'Deep Patience & Empathy',
            'Conflict Resolution for Children',
            'Vibrant Parent Communication',
            'Creative Art & Craft',
          ],
        },
        coCurricular: [
          'Coordinator of Annual Kindergarten Graduation Ceremony.',
          'Conducted Teacher Training Workshop on "Joyful Learning under NEP 2020".',
        ],
      },
    },

    {
      id: 'secondary-pgt-specialist',
      title: 'Senior Secondary PGT Specialist Resume Sample (Classes 11 & 12)',
      roleType: 'Secondary',
      badge: 'Board Distinction & Department Head',
      experienceLabel: 'Senior PGT (9+ Years)',
      targetRole: 'Head of Physics & PGT Specialist (Classes 11–12)',
      whyThisWorks: {
        measurableImpact:
          'Showcases senior board excellence (99.4% pass rate, 52 distinctions) and competitive entrance mentoring (JEE Main/NEET 99th percentiles).',
        credentialsClarity:
          'Features M.Sc Physics with First Class, B.Ed, and state PGT licensure with External Examiner credentials.',
        pedagogicalTech:
          'Demonstrates high-level laboratory safety management, Python numerical simulation, and question bank authoring.',
      },
      resumeData: {
        personalInfo: {
          name: 'Rajeev Nambiar',
          targetTitle: 'PGT Physics | M.Sc Physics, B.Ed | Senior Secondary CBSE/ISC Specialist',
          contactLine: '+91 98450 12345 | rajeev.nambiar@email.com | Bengaluru, Karnataka',
          location: 'Bengaluru, Karnataka (Available immediately)',
        },
        summary:
          'Distinguished PGT Physics Educator with 9+ years of senior secondary (Classes 11–12) teaching experience across elite CBSE and ISC institutions. Proven mentor with 4 students scoring in the 99th percentile of JEE Main / NEET Physics in 2024. Expert in laboratory investigation protocols, assertion-reason problem sets, and modern simulation tools. Authored 3 comprehensive question banks adopted across a 5-school network.',
        experience: [
          {
            role: 'Head of Physics Department & PGT Physics',
            institution: 'National Public School (NPS), Bengaluru',
            period: 'June 2019 – Present',
            bullets: [
              'Lead a 5-member physics faculty and deliver Class 11–12 syllabus for 160+ students across 4 sections.',
              'Achieved a 99.4% CBSE Class 12 board pass rate with 52 subject distinctions (90+ marks) in the 2023–24 board examinations.',
              'Mentored 18 students for JEE Main and Advanced foundation sessions, yielding 4 top-1000 all-India rank qualifications.',
              'Supervised senior physics laboratory: directed 45+ experimental investigations and external CBSE board practical exams with zero audit discrepancies.',
              'Introduced PhET interactive physics simulations for wave optics and electromagnetism, boosting conceptual quiz averages from 62% to 81%.',
            ],
          },
          {
            role: 'PGT Physics Teacher',
            institution: 'Bishop Cotton Boys’ School, Bengaluru',
            period: 'April 2015 – May 2019',
            bullets: [
              'Taught ISC Physics syllabus to 120+ senior students with consistent 100% pass outcomes in Council examinations.',
              'Coordinated the Annual Inter-School Science Colloquium with 500+ student delegates from 24 schools.',
            ],
          },
        ],
        education: [
          {
            degree: 'Master of Science (M.Sc) in Physics',
            institution: 'Bangalore University, Karnataka',
            year: '2014',
            scoreOrSpecialization: 'First Class with Distinction (79.2%)',
          },
          {
            degree: 'Bachelor of Education (B.Ed)',
            institution: 'Regional Institute of Education (RIE), Mysuru',
            year: '2015',
            scoreOrSpecialization: 'First Class (80.5%)',
          },
        ],
        certifications: [
          'State PGT Eligibility Certification (Karnataka, 2016)',
          'CBSE Master Trainer Certification for Senior Physics Practical Assessment',
          'Certificate in Advanced Data & Numerical Modeling for Educators',
        ],
        skills: {
          pedagogy: [
            'Class 12 Board Exam Strategy',
            'JEE / NEET Physics Foundation',
            'Laboratory Safety & Practical Viva Prep',
            'Assertion-Reason Question Design',
            'Curriculum Pacing & Moderation',
          ],
          techAndTools: [
            'PhET Interactive Simulations',
            'Python for Educational Physics',
            'Digital Oscilloscopes & Sensors',
            'Google Classroom & Drive',
          ],
          softSkills: [
            'Departmental Leadership',
            'Parent Counseling & Guidance',
            'Higher Education Career Advisory',
            'Time Management',
          ],
        },
        coCurricular: [
          'Chief Coordinator of Science Exhibition and Robotics Club.',
          'External Examiner appointed by CBSE for Regional Senior Physics Practical Exams.',
        ],
      },
    },
  ],

  // FRESHER / NO EXPERIENCE GUIDE (Appears right after Fresher Resume)
  fresherMasterclass: {
    badge: 'Fresher Foundation Guide',
    title: 'How to Write a Teacher Resume With No Formal School Experience',
    subtitle:
      'Applying for your first teaching job after completing B.Ed or D.El.Ed? Principals do not expect freshers to have 5 years of school employment—here is how to showcase your teaching readiness effectively.',
    strategies: [
      {
        title: 'Convert Your Student Teaching Practicum Into Real Experience',
        description:
          'During your B.Ed or D.El.Ed, you completed 8–16 weeks of real classroom teaching at a host school. Do not bury this inside your Education block. Create an Experience entry titled "Student Teacher (Practicum Internship)" and specify the school name, grade levels taught, number of students, and lesson plans delivered.',
        actionableTip:
          'Write: "Conducted daily English classes for 80+ Class 7 & 8 students; designed 40+ structured lesson plans utilizing flashcards and audio-visual storytelling."',
      },
      {
        title: 'Reframe Home Tutoring, Coaching & Volunteer Teaching',
        description:
          'If you have provided home tuition, worked at a coaching institute, or volunteered with NGOs, include it as "Independent Academic Tutor". School coordinators respect candidates who have actively taught students in any capacity.',
        actionableTip:
          'Quantify the tutoring: "Mentored 12 Class 6–8 students in Science and Math, helping every student achieve first-division marks in final school exams."',
      },
      {
        title: 'Place Education & CTET Qualifications Near the Top',
        description:
          'Freshers should follow the Reverse-Academic Order: place your B.Ed / D.El.Ed and CTET / State TET scores immediately beneath your Career Objective so the principal checks regulatory eligibility in 3 seconds.',
        actionableTip:
          'Explicitly list your B.Ed teaching methodology subjects (e.g., Pedagogy of Mathematics & Physical Science) and university percentage.',
      },
      {
        title: 'Highlight Modern EdTech Literacy as Your Competitive Edge',
        description:
          'Many veteran staff are still adapting to digital tools. As a recent graduate, your familiarity with Google Classroom, Canva for Education, Kahoot, Smartboards, and MS PowerPoint makes you immediately valuable for modern CBSE/ICSE classrooms.',
        actionableTip:
          'List specific software tools in your skills block rather than generic "Computer Knowledge".',
      },
    ],
    careerObjectives: [
      '"Dedicated and CTET Paper II qualified B.Ed graduate specializing in Mathematics and Physical Sciences. Seeking a TGT position at [School Name] to apply interactive smartboard tools, inquiry-based learning, and personalized remedial tutoring to foster strong foundational math skills in middle school learners."',
      '"Passionate, D.El.Ed certified Primary Teacher (CTET Paper I) with an 84% academic record and 16-week student teaching internship at Kendriya Vidyalaya. Eager to contribute foundational literacy, Jolly Phonics instruction, and joyful play-way activities to nurture early childhood learners at [School Name]."',
      '"High-energy English Literature graduate and B.Ed fresher with proven experience as an independent tutor for Classes 8–10. Committed to utilizing communicative language teaching, multimedia storytelling, and drama role-play to elevate student reading comprehension and public speaking at [School Name]."',
    ],
  },

  // SECTION-BY-SECTION DETAILED WRITING GUIDE (7 CORE SECTIONS)
  howToWriteGuide: {
    badge: 'Detailed Section-by-Section Blueprint',
    title: 'How to Write Every Important Section of a Teacher Resume',
    subtitle:
      'Whether you are a fresh graduate or transitioning into a new school, follow these exact formatting rules for all 7 essential sections of an educator resume.',
    steps: [
      {
        stepNumber: 1,
        sectionName: 'Header & Licensure Headline',
        title: '1. Header & Regulatory Title (Name, Contact & Teaching Credentials)',
        summary:
          'Your header sits at the very top of the page. In teaching recruitment, your eligibility certifications (B.Ed, D.El.Ed, CTET/TET) are mandatory screening checks. Make them impossible to miss.',
        whyPrincipalsCare:
          'Principals and HR coordinators sort applications into subject and eligibility piles (PRT, TGT, PGT) within 5 seconds. If your subject and CTET/B.Ed status aren’t immediately clear, your CV risks being skipped.',
        keyTakeaway:
          'Put your target role, core subject, and B.Ed/CTET status directly beneath your name.',
        bulletTips: [
          'Full Name in bold, clean serif or sans-serif font (18–22pt).',
          'Target Credential Headline: e.g., "TGT Mathematics (CBSE) | B.Ed | CTET Paper II Qualified".',
          'Active Indian phone number (+91), clean professional email (firstname.lastname@gmail.com), LinkedIn URL, and current city/state.',
        ],
        avoidThis:
          'Avoid adding father’s name, religion, caste, marital status, full home street address, or an unprofessional selfie photo unless explicitly mandated by a government gazette.',
        exampleSnippet: {
          label: 'Ideal Educator Header Example',
          content:
            'AAKASH SHARMA | TGT English & Social Studies | B.Ed (81.4%) | CTET Paper II Qualified | +91 91234 56789 | aakash.sharma@email.com | Lucknow, UP',
        },
      },
      {
        stepNumber: 2,
        sectionName: 'Career Objective vs. Professional Summary',
        title: '2. Career Objective (Freshers) vs. Professional Summary (Experienced)',
        summary:
          'This 3–4 line paragraph right under your header acts as your elevator pitch. Freshers write a forward-looking Career Objective highlighting training and enthusiasm; experienced teachers write a backward-looking Summary highlighting years taught and pass rates.',
        whyPrincipalsCare:
          'It reveals your teaching philosophy, communication clarity, and alignment with the school’s board (CBSE, ICSE, IB, or State Board) before they read the rest of the page.',
        keyTakeaway:
          'Never use passive clichés like "To work in a challenging organization where I can grow". Focus on student outcomes and pedagogy.',
        bulletTips: [
          'Line 1: Mention your qualification (B.Ed / CTET) and subject specialization + grade range (e.g. Classes 6–10).',
          'Line 2: Highlight your teaching approach (e.g., NEP 2020 experiential learning, phonics, smartboard visuals).',
          'Line 3: Mention internship/tutoring impact (for freshers) OR board pass rates & distinctions (for experienced).',
        ],
        avoidThis:
          'Avoid writing in the first person ("I am a hardworking teacher who loves kids..."). Use crisp, professional third-person phrasing.',
        exampleSnippet: {
          label: 'Fresher Objective Snippet',
          content:
            '"CTET Paper II qualified B.Ed graduate specializing in English and History. Completed a 16-week teaching practicum at Kendriya Vidyalaya, delivering 40+ multimedia lesson plans. Committed to building interactive, inclusive classrooms aligned with NEP 2020."',
        },
      },
      {
        stepNumber: 3,
        sectionName: 'Education & Pedagogical Degrees',
        title: '3. Education & Teacher Training (B.Ed / D.El.Ed / Graduation)',
        summary:
          'Education is heavily weighted in academic hiring. List your degrees in reverse-chronological order (most recent first) with full institution names, university board, graduation year, and division/CGPA.',
        whyPrincipalsCare:
          'School affiliation norms (CBSE/ICSE/State) strictly verify whether your undergraduate/postgraduate subjects match your B.Ed teaching methodology subjects.',
        keyTakeaway:
          'Always specify your B.Ed pedagogy methodology subjects (e.g., Pedagogy of Physical Science & Mathematics) alongside your overall score.',
        bulletTips: [
          'For Freshers: Place Education directly below your Career Objective (above Experience/Internship).',
          'For Experienced (3+ yrs): Place Education below Teaching Experience.',
          'List B.Ed / M.Ed / D.El.Ed first, followed by Master’s (if applicable) and Bachelor’s degree. Only include Class 10/12 scores if you are a fresher with high marks (85%+).',
        ],
        avoidThis:
          'Do not write just "B.Ed - 2023". Always include University Name, Pedagogy Subjects, and Percentage/Division.',
        exampleSnippet: {
          label: 'Education Entry Format',
          content:
            'Bachelor of Education (B.Ed) – Pedagogy of English & Social Science | Lucknow University | 2024 | 81.4% (First Division)',
        },
      },
      {
        stepNumber: 4,
        sectionName: 'Classroom Experience & Internships',
        title: '4. Teaching Experience (Or B.Ed Practicum & Tutoring for Freshers)',
        summary:
          'This is the heart of your resume. Freshers should list their B.Ed Student Teaching Practicum and Home Tutoring here; experienced teachers list their school employments in reverse-chronological order.',
        whyPrincipalsCare:
          'Administrators already know teachers take attendance and check notebooks. They read this section to see HOW you teach, manage class sizes, handle weak learners, and drive student grades.',
        keyTakeaway:
          'Start every bullet with a strong action verb (Designed, Delivered, Mentored, Pioneered, Restructured) followed by your method and the student outcome.',
        bulletTips: [
          'Include School Name, City, Dates (Month Year – Month Year), and exact Classes/Subjects taught.',
          'Mention class size (e.g., "managed classes of 40+ students across 4 sections").',
          'Freshers: Detail lesson plans drafted, teaching aids/charts created, and mock tests graded during your 16-week internship.',
          'Avoid paragraphs: use 3–5 crisp bullet points per role.',
        ],
        avoidThis:
          'Never write boring duty lists like "Responsible for teaching Science and maintaining discipline."',
        exampleSnippet: {
          label: 'Fresher Practicum Bullet Example',
          content:
            '• Formulated 40+ interactive lesson plans for Class 7 & 8 English integrating drama role-play and vocabulary flashcards, boosting daily student participation by 30%.',
        },
      },
      {
        stepNumber: 5,
        sectionName: 'Pedagogical & EdTech Skills',
        title: '5. Core Pedagogical Skills & Modern EdTech Stack',
        summary:
          'Group your skills cleanly into 2–3 logical categories so both human principals and automated Applicant Tracking Systems (ATS) scan your competencies instantly.',
        whyPrincipalsCare:
          'Post-2020 schools expect educators to blend traditional pedagogy (differentiated learning, CCE evaluation) with interactive Smartboards and digital learning platforms.',
        keyTakeaway:
          'Avoid a messy 20-word paragraph of skills. Separate them into Pedagogy, Digital/EdTech Tools, and Classroom Management.',
        bulletTips: [
          'Pedagogy: Lesson Planning, NEP 2020 Experiential Learning, Differentiated Instruction, Remedial Teaching, Bloom’s Taxonomy.',
          'EdTech Tools: Smart Interactive Whiteboards, Google Classroom, MS Teams, Canva for Education, Kahoot, Quizizz, GeoGebra/PhET.',
          'Classroom Management: Positive Reinforcement, Parent-Teacher Meetings (PTM), Conflict Resolution.',
        ],
        avoidThis:
          'Do not use star ratings or percentage bars like "Patience: 90%" or "MS Word: 4/5 stars". ATS software cannot parse graphics.',
      },
      {
        stepNumber: 6,
        sectionName: 'Licensures & Certifications',
        title: '6. Teacher Licensures & Professional Development Certifications',
        summary:
          'Create a dedicated block for statutory eligibility exams and continuous training workshops. This proves you are legally compliant and actively upgrading your teaching methods.',
        whyPrincipalsCare:
          'CBSE and state boards frequently audit schools for CTET/TET qualified staff. Having verified certifications makes hiring you seamless for the school management.',
        keyTakeaway:
          'Specify exact paper levels (Paper I for Classes 1–5; Paper II for Classes 6–8) and the qualifying year.',
        bulletTips: [
          'List CTET / State TET (UPTET, REET, HTET, KTET) with Paper number and year.',
          'Add CBSE Capacity Building Workshops (NEP 2020, Competency-Based Assessment, Happy Classrooms).',
          'Add EdTech or subject certifications (Google Certified Educator, Jolly Phonics, Coursera Digital Pedagogy).',
        ],
        exampleSnippet: {
          label: 'Certification Format Example',
          content:
            '• Central Teacher Eligibility Test (CTET) – Paper II Qualified (CBSE, 2024)\n• CBSE Capacity Building Program on NEP 2020 & Experiential Learning (2023)',
        },
      },
      {
        stepNumber: 7,
        sectionName: 'Co-Curricular & Institutional Roles',
        title: '7. Co-Curricular Activities & School Committee Leadership',
        summary:
          'Schools operate as vibrant communities beyond textbook lectures. Dedicate a short bottom section to clubs, sports, events, or volunteer initiatives you led in college (freshers) or school (experienced).',
        whyPrincipalsCare:
          'Principals prefer hiring "all-rounder" educators who gladly mentor debate teams, organize Annual Day functions, lead Science Fairs, and manage student Houses.',
        keyTakeaway:
          'Freshers should include college cultural committees, NSS/NCC, debate societies, or NGO literacy drives.',
        bulletTips: [
          'Freshers: Debate Society, College Drama/Theatre, NSS Volunteer teaching, Youth Festival participation.',
          'Experienced: House Master/Mistress, Science Exhibition Convener, Examination Cell Member, Excursion Coordinator.',
        ],
      },
    ],
  },

  // EXPERIENCED TEACHER EXTRA DETAILS SECTION (Dedicated Guide for Experienced Upgrades)
  experiencedExtraDetails: {
    badge: 'For Teachers With 3+ Years Experience',
    title: 'What Extra Details Should Experienced Teachers Add?',
    subtitle:
      'Once you have 3+ years of classroom experience, writing like a fresher ("planned lessons and checked homework") will get you rejected for senior pay scales. Here are the 5 essential extra details experienced teachers must add to command senior TGT, PGT, and HOD offers.',
    comparisonNote: {
      fresherFocus:
        'Freshers prove readiness using B.Ed/D.El.Ed training, student teaching practicum, lesson planning, tutoring, and digital literacy.',
      experiencedFocus:
        'Experienced teachers prove ROI & leadership using board exam pass percentages, distinction counts, weak-learner turnarounds, department coordination, and parent outcomes.',
    },
    extraPillars: [
      {
        title: '1. Quantified Board Examination Results & Distinction Counts',
        badge: 'Highest Impact Metric',
        whyItMatters:
          'School principals judge experienced secondary (TGT) and senior secondary (PGT) teachers primarily by their Class 10 and Class 12 CBSE/ICSE/State Board exam track record.',
        whatToAdd: [
          'Exact batch pass percentage across recent academic sessions (e.g., "100% pass rate for 5 consecutive years").',
          'Number of students scoring 90%+ or 95%+ distinctions in your subject.',
          'Overall class average percentage improvement year-over-year (e.g., "lifted batch average from 68% to 84%").',
        ],
        exampleBullet:
          'Delivered Class 10 CBSE Mathematics syllabus across 4 sections (145 students), sustaining a 100% board pass rate with 42 subject distinctions (90%+).',
      },
      {
        title: '2. Remedial Interventions & Struggling Learner Turnaround',
        badge: 'Differentiated Pedagogy',
        whyItMatters:
          'Anyone can teach toppers. Elite schools want experienced teachers who know how to diagnose learning gaps and rescue academically weak or slow learners before board finals.',
        whatToAdd: [
          'Diagnostic testing strategies used to identify weak students early in the term.',
          'Specific after-school remedial circles, tiered worksheets, or peer-tutoring models.',
          'Measurable score jump for struggling cohorts (e.g., "lifted 22 borderline students from 42% to 69%").',
        ],
        exampleBullet:
          'Formulated weekly diagnostic tests and targeted after-school remedial circles that elevated 26 struggling learners from 44% to a 71% average in term finals.',
      },
      {
        title: '3. Departmental, Examination Cell & House Master Leadership',
        badge: 'Institutional Ownership',
        whyItMatters:
          'To justify higher salary brackets, experienced candidates must demonstrate administrative reliability and campus-wide leadership beyond their 40-minute teaching period.',
        whatToAdd: [
          'Head of Department (HOD) / Subject Coordinator duties (mentoring junior teachers, syllabus pacing).',
          'House Master / House Mistress leadership leading student houses in sports & cultural shields.',
          'Examination Cell oversight, school timetable scheduling, or CBSE Affiliation / NAAC audit documentation.',
        ],
        exampleBullet:
          'Served as House Mistress (Ganga House) managing 350+ students and 14 faculty mentors, winning the Overall Inter-House Rolling Trophy in 2023–24.',
      },
      {
        title: '4. Olympiad, Competitive Entrance & Lab Practical Supervision',
        badge: 'Academic Rigor',
        whyItMatters:
          'Top private schools showcase competitive ranks and practical exam compliance to build school reputation among parents.',
        whatToAdd: [
          'Mentoring students for JEE Main/Advanced, NEET, CUET, NTSE, or SOF/NSO Olympiads.',
          'Senior Science/Computer Laboratory oversight, apparatus inventory, and zero-incident safety record.',
          'Serving as CBSE External Examiner / Answer Sheet Evaluator for board exams.',
        ],
        exampleBullet:
          'Mentored 18 senior students for JEE/NEET Physics foundation, yielding 4 top-1000 ranks, and supervised CBSE Class 12 Board practicals as External Examiner.',
      },
      {
        title: '5. Curriculum Authoring & Parent-Teacher Partnership Metrics',
        badge: 'All-Rounder Excellence',
        whyItMatters:
          'Schools rely on experienced staff to create proprietary study material and smoothly manage sensitive parent interactions.',
        whatToAdd: [
          'Question bank authoring, assertion-reason booklets, or cross-branch study guides.',
          'High PTM attendance, individualized learning plans (ILPs), and conflict resolution.',
          'Leading CBSE Capacity Building Workshops or training junior B.Ed interns.',
        ],
        exampleBullet:
          'Authored 3 standardized assertion-reason Physics question banks adopted across all 4 network school branches and maintained 98% positive PTM parent feedback.',
      },
    ],
  },

  // DUAL FORMAT DOWNLOAD HUB
  formatDownloads: [
    {
      format: 'Word',
      title: 'Teacher Resume Format in Word (.doc)',
      extension: '.doc / .docx',
      badge: '100% Editable Offline',
      description:
        'Download clean, pre-formatted Word templates compatible with Microsoft Word, WPS Office, and Google Docs. Ready for both fresher B.Ed graduates and experienced teachers.',
      features: [
        'Standard 1-inch margins and clean Calibri / Arial ATS typography',
        'Pre-built sections for B.Ed, CTET/TET, Teaching Practicum & Board Results',
        '100% customizable headings, school names, and bullet lists',
        'Opens natively in Microsoft Word and LibreOffice without broken tables',
      ],
      primaryActionText: 'Download Fresher / Teacher Word (.doc)',
    },
    {
      format: 'PDF',
      title: 'Teacher Resume Format in PDF',
      extension: '.pdf',
      badge: 'Print & ATS Ready',
      description:
        'Generate pixel-perfect vector PDF resumes in our Scholar / Academic template guaranteed to maintain clean A4 alignment across every school portal.',
      features: [
        'Guaranteed single-page A4 fit for freshers (and clean 2-page flow for senior faculty)',
        'Crisp vector typography that never blurs when principals print your CV',
        'Embedded structured metadata that passes school ATS screening software',
        'Zero watermarks, zero trial subscriptions, 100% free download',
      ],
      primaryActionText: 'Customize & Export PDF in Builder',
    },
  ],

  // DIFFERENT APPROACHES BY LEVEL
  differentApproaches: {
    badge: 'Grade-by-Grade Role Strategies',
    title: 'Different Resume Approaches by Teaching Level & Role',
    subtitle:
      'Primary teachers, high school board specialists, and senior PGT faculty are evaluated on different criteria. Follow the exact strategy for your target teaching wing:',
    approaches: [
      {
        id: 'prt',
        roleTitle: 'Primary Teacher (PRT - Classes 1 to 5)',
        gradeOrTarget: 'Foundational Stage & Primary Wing (Ages 6–10)',
        badge: 'Foundational Literacy & Numeracy',
        coreStrategy:
          'Principals hiring PRT educators look for patience, child psychology insights, activity-based learning (NEP 2020), phonics, and the ability to build foundational literacy and numeracy (FLN) in young learners.',
        keyFocusAreas: [
          'Play-way method & experiential storytelling',
          'Foundational reading, phonics, and mental math',
          'Classroom behavioral reinforcement & emotional safety',
          'Active parent-teacher communication channels',
        ],
        mandatoryCredentials: [
          'D.El.Ed / D.Ed or B.Ed',
          'CTET Paper I (Classes 1–5) or State TET Paper I',
          'Early Childhood Education / Child Development coursework',
        ],
        sampleSummary:
          'Enthusiastic and CTET Paper I certified Primary Teacher (PRT) with 4+ years of experience fostering foundational literacy and numeracy for Classes 1–4. Expert in NEP 2020 activity-based learning, phonics methodologies, and positive reinforcement that reduced classroom disruption by 40% while nurturing inclusive, joyful learning spaces.',
        sampleBullets: [
          'Spearheaded experiential learning modules for 40+ Class 3 students, lifting foundational reading fluency scores by 30% across one academic term.',
          'Designed 25+ multisensory learning aids and math manipulative kits that made basic geometry and mental arithmetic accessible to young learners.',
          'Organized weekly parent-teacher touchpoints and learning portfolios to track developmental milestones and socio-emotional adaptation.',
        ],
        topSkills: [
          'Activity-Based Learning',
          'Phonics & Early Reading',
          'Foundational Numeracy',
          'Classroom Discipline',
          'Storytelling & Puppetry',
          'NEP 2020 Guidelines',
        ],
      },
      {
        id: 'tgt',
        roleTitle: 'Trained Graduate Teacher (TGT - Classes 6 to 10)',
        gradeOrTarget: 'Middle School & Secondary Wing (Classes 6–10)',
        badge: 'Subject Depth & Board Prep Foundation',
        coreStrategy:
          'TGT educators bridge foundational learning with high-stakes board examination readiness. Principals evaluate subject matter mastery, laboratory experimental skills, structured lesson delivery, and diagnostic remedial support.',
        keyFocusAreas: [
          'Curriculum pacing & syllabus completion',
          'Preparation for Class 10 Board Examinations (CBSE/ICSE)',
          'Science laboratory experiments & mathematical reasoning',
          'Differentiated instruction for mixed-ability classrooms',
        ],
        mandatoryCredentials: [
          'Graduation in relevant subject (B.Sc / B.A.)',
          'Bachelor of Education (B.Ed)',
          'CTET Paper II (Classes 6–8) / State TET Paper II',
        ],
        sampleSummary:
          'Results-driven TGT Mathematics educator with 7 years of classroom experience delivering CBSE & ICSE curricula for Classes 7–10. Adept at turning abstract algebraic and geometric concepts into intuitive visual models using GeoGebra and Smartboard tech. Consistent record of 100% board pass rates with 35+ subject distinctions.',
        sampleBullets: [
          'Instructed 160+ Class 9 & 10 students in CBSE Mathematics, securing 100% pass rates in board finals with 38 students achieving 90%+ scores.',
          'Introduced weekly diagnostic quizzes and targeted remedial sessions that elevated 22 underperforming students to first-class grades.',
          'Mentored school math team to 1st place in Inter-School Sahodaya Mathematics Quiz 2023 competing against 24 regional institutions.',
        ],
        topSkills: [
          'CBSE / ICSE Board Frameworks',
          'Diagnostic Testing',
          'Remedial Learning Plans',
          'Smart Board Pedagogy',
          'STEM Lab Demonstrations',
          'Formative Assessment Design',
        ],
      },
      {
        id: 'pgt',
        roleTitle: 'Post Graduate Teacher (PGT - Classes 11 & 12)',
        gradeOrTarget: 'Senior Secondary Wing (Classes 11–12)',
        badge: 'Board Distinction & Competitive Edge',
        coreStrategy:
          'PGT candidates are scrutinized for advanced subject scholarship, textbook mastery, board exam distinction counts, and the capacity to prepare students for competitive entrance exams (JEE, NEET, CUET, CLAT).',
        keyFocusAreas: [
          'Senior secondary board syllabus depth (Physics, Chem, Math, Bio, Accounts, etc.)',
          'Board practical examination oversight & external viva preparation',
          'Competitive entrance exam conceptual bridge modules',
          'Career counseling & higher-education advisory',
        ],
        mandatoryCredentials: [
          'Post Graduation in specialized subject (M.Sc / M.A. / M.Com with 50%+)',
          'Bachelor of Education (B.Ed)',
          'Subject expertise certification / State PGT exam qualification',
        ],
        sampleSummary:
          'Dedicated PGT Chemistry educator with 9+ years of senior secondary teaching experience for CBSE and ISC boards. Proven track record of producing city toppers and high percentile scores in NEET/JEE Chemistry. Expert in orchestrating organic and inorganic laboratory investigations with an uncompromising safety record.',
        sampleBullets: [
          'Taught Class 11–12 Chemistry across 4 sections (140 students), generating a 99.2% class pass rate and mentoring 4 students who scored in the 99th percentile of NEET Chemistry.',
          'Supervised senior chemistry laboratory curriculum, conducting 50+ practical sessions and external board examination practicals with zero safety infractions.',
          'Authored comprehensive question banks and chapter-wise assertion-reason modules adopted across all 3 school network branches.',
        ],
        topSkills: [
          'Senior Secondary Board Mastery',
          'JEE/NEET Foundation Prep',
          'Advanced Lab Supervision',
          'Board Answer Sheet Evaluation',
          'Curriculum Benchmarking',
          'Career Guidance',
        ],
      },
      {
        id: 'private-school',
        roleTitle: 'Private School Teacher (CBSE, ICSE & Top Chains)',
        gradeOrTarget: 'DPS, Ryan, DAV, Birla & St. Xavier’s Networks',
        badge: 'All-Rounder School Contribution',
        coreStrategy:
          'Leading private schools evaluate complete institutional citizenship: excellent spoken English, parent rapport, organizing mega school events, tech literacy, and stellar board examination outcomes.',
        keyFocusAreas: [
          'Classroom discipline & student engagement',
          'Smartboard technology & hybrid learning',
          'Parent-Teacher relationship building',
          'Annual day, sports day, and inter-school festival coordination',
        ],
        mandatoryCredentials: [
          'B.Ed from a recognized university',
          'CTET Paper II or relevant State TET',
          'Fluent English communication skills',
        ],
        sampleSummary:
          'Dynamic and results-oriented Educator with 6+ years at premier CBSE private institutions. Known for energetic classroom delivery, creative digital presentations, and fostering strong parental partnerships. Served as House In-Charge and Member of the School Examination Board.',
        sampleBullets: [
          'Spearheaded Class 10 Social Science curriculum for 120+ students, producing a 100% board pass outcome with 48 distinctions.',
          'Served as House Master for 350+ students, winning the Inter-House Sports & Cultural Rolling Trophy for two consecutive years.',
          'Conducted structured quarterly PTM meetings with 99% parent attendance and positive feedback on student pastoral care.',
        ],
        topSkills: [
          'Private School Administration',
          'Spoken English Fluency',
          'House Master Duties',
          'Parent Partnership',
          'Digital Pedagogy',
        ],
      },
    ],
  },

  // DO'S AND DON'TS
  dosAndDonts: {
    badge: 'Crucial Rules for Educators',
    title: 'What to Do vs. What NOT to Do on an Educator Resume',
    subtitle:
      'School management boards and principals review hundreds of applications every hiring cycle. Avoid these critical mistakes to protect your candidacy.',
    dos: [
      {
        title: 'Specify Your Board Curriculum & Class Range Explicitly',
        description:
          'Always state whether your experience or B.Ed practicum is aligned with CBSE, ICSE/ISC, State Boards, Cambridge (IGCSE), or IB. A CBSE school looks for NCERT/CCE expertise, while an IB school looks for inquiry-based learning.',
        concreteExample:
          'Good: "TGT Mathematics (Classes 6–10) | CBSE & NCERT Curriculum | B.Ed & CTET Qualified"',
      },
      {
        title: 'Highlight Remedial Education & Inclusive Classroom Methods',
        description:
          'Great educators do not just cater to toppers. Show how you identify learning gaps, conduct diagnostic assessments, and adapt lesson plans for diverse learning paces.',
        concreteExample:
          'Good: "Created tiered worksheets and bi-weekly peer-tutoring circles, elevating 18 struggling students from C-grades to B+."',
      },
      {
        title: 'Provide Verification Details for Licensures (CTET / TET)',
        description:
          'State which papers you cleared (CTET Paper 1 for Primary, Paper 2 for Upper Primary / Elementary) and your qualifying year. This instantly validates your regulatory compliance.',
        concreteExample:
          'Good: "Central Teacher Eligibility Test (CTET) – Paper II (Math & Science) Qualified, CBSE, 2024"',
      },
      {
        title: 'Showcase Digital Teaching Aids & EdTech Competency',
        description:
          'Demonstrate that you can seamlessly leverage interactive smartboards, virtual simulations, and learning management systems (LMS) to enrich conceptual understanding.',
        concreteExample:
          'Good: "Integrated PhET virtual science labs and Google Classroom rubrics, increasing assignment completion by 40%."',
      },
      {
        title: 'Include Extracurricular & Institutional Responsibilities',
        description:
          'Demonstrating leadership in Annual Day productions, Science Fairs, NSS/Debate clubs (for freshers), or examination cell duties (for experienced) proves you contribute to school culture.',
        concreteExample:
          'Good: "Convened Inter-School Science Olympiad 2024 for 450+ participants across 18 regional schools."',
      },
    ],
    donts: [
      {
        title: 'Do NOT Write Pure Job Duty Checklists',
        description:
          'Listing generic tasks like "Checked student homework", "Maintained attendance register", or "Taught English syllabus" tells the principal nothing about your teaching effectiveness.',
        mistakeExample: 'Bad: "Responsible for teaching social science and conducting tests."',
        correctApproach:
          'Better: "Delivered interactive CBSE Social Science syllabus for 150+ Class 9–10 students, achieving a 100% pass rate with 32 distinctions."',
      },
      {
        title: 'Do NOT Bury or Omit Your B.Ed / Teaching Degree Details',
        description:
          'Some candidates put their B.Ed at the very end of their resume. In many schools, an applicant without a visible B.Ed or D.El.Ed is discarded during pre-screening.',
        mistakeExample: 'Bad: B.Ed mentioned on page 2 under random hobbies and achievements.',
        correctApproach:
          'Better: Feature B.Ed and TET credentials prominently in your top summary header and education section.',
      },
      {
        title: 'Do NOT Use Overly Graphic, Multi-Column Bar-Chart Templates',
        description:
          'Heavily stylized graphics with progress bars (e.g., "English: 85%") fail school ATS software and look unprofessional to academic boards. Principals favor clean academic layouts.',
        mistakeExample: 'Bad: Visual skill bars claiming "Patience: 90%, Empathy: 95%".',
        correctApproach:
          'Better: Use clean bullet points and verified credentials on an ATS-friendly layout like ResumeBabu’s Scholar / Teacher template.',
      },
      {
        title: 'Do NOT Include Obsolete Personal Details',
        description:
          'Unless strictly requested by official government recruitment forms, avoid listing marital status, father’s occupation, religion, caste, or attaching an informal selfie.',
        mistakeExample: 'Bad: "Marital Status: Married, Religion: Hindu, DOB: 14/05/1990".',
        correctApproach:
          'Better: Dedicate all resume space to academic qualifications, subject mastery, classroom results, and student accomplishments.',
      },
      {
        title: 'Do NOT Submit the Same Resume for PRT, TGT, and PGT Openings',
        description:
          'A primary teacher (PRT) resume emphasizing advanced calculus looks misaligned, just as a senior secondary (PGT) resume focusing only on nursery rhymes fails to show board rigor.',
        mistakeExample: 'Bad: Submitting a generic "Teacher Resume" to both a kindergarten and a senior secondary school.',
        correctApproach:
          'Better: Tailor your summary, keywords, and sample bullets specifically for the target grade band.',
      },
    ],
  },

  // SKILLS MATRIX
  skillsMatrix: {
    badge: 'Keywords for School ATS',
    title: 'Essential Skills & Keywords for Educator Resumes',
    subtitle:
      'School administrators and automated applicant tracking systems (ATS) filter educator resumes for specific pedagogical and technological terms. Incorporate these naturally:',
    categories: [
      {
        categoryName: 'Pedagogy & Instructional Strategies',
        description: 'Core teaching methodologies that demonstrate pedagogical depth.',
        skills: [
          'Differentiated Instruction',
          'Bloom’s Taxonomy Application',
          'Inquiry-Based Learning',
          'Experiential Learning (NEP 2020)',
          'Remedial Teaching & Support',
          'Curriculum & Syllabus Mapping',
          'Lesson Plan Formulation',
          'Foundational Literacy & Numeracy (FLN)',
          'Micro-Teaching & Active Learning',
          'Competency-Based Education (CBE)',
        ],
      },
      {
        categoryName: 'Classroom & Behavioral Management',
        description: 'Creating safe, disciplined, and inclusive environments for learners.',
        skills: [
          'Positive Behavior Reinforcement',
          'Socio-Emotional Learning (SEL)',
          'Classroom Routine Optimization',
          'Conflict Resolution & Mediation',
          'Inclusive Education Practices',
          'Parent-Teacher Communication (PTM)',
          'Student Safety & Pastoral Care',
          'Individualized Education Plans (IEP)',
          'Child Psychology Awareness',
          'Time & Resource Management',
        ],
      },
      {
        categoryName: 'EdTech & Digital Classrooms',
        description: 'Software platforms and interactive hardware transforming education.',
        skills: [
          'Smart Interactive Whiteboards (Promethean/Smart)',
          'Google Classroom & Google Workspace for Edu',
          'Microsoft Teams for Education',
          'Learning Management Systems (Canvas / Moodle)',
          'Kahoot & Quizizz Gamification',
          'GeoGebra & PhET Simulations',
          'Digital Gradebooks & Attendance Portals',
          'Edpuzzle & Loom Video Lessons',
          'Canva for Educational Design',
          'Virtual Lab Demonstrations',
        ],
      },
      {
        categoryName: 'Assessment, Compliance & Board Operations',
        description: 'Formal evaluation, board exam supervision, and institutional duties.',
        skills: [
          'Formative & Summative Assessments',
          'Continuous and Comprehensive Evaluation (CCE)',
          'CBSE & ICSE Board Exam Preparation',
          'Diagnostic Test Item Analysis',
          'Rubric Creation & Criterion Grading',
          'House Master / House Mistress Duties',
          'Annual Day & Sports Day Coordination',
          'Examination Cell Oversight',
          'Science Exhibition & Fair Mentorship',
          'NAAC / CBSE Accreditation Documentation',
        ],
      },
    ],
  },

  // BULLET FORMULAS
  bulletPointFormulas: {
    badge: 'Bullet Point Transformations',
    title: 'How to Turn Weak Duty Statements into Metric-Driven Achievements',
    subtitle:
      'Study these real before-and-after transformations for both fresher interns and experienced board teachers:',
    comparisons: [
      {
        roleContext: 'Fresher Student Teacher (B.Ed Practicum)',
        weakText: 'Completed teaching internship and taught English to 7th class.',
        strongText:
          'Executed 16-week teaching practicum for 80+ Class 7 & 8 students, drafting 40+ visual lesson plans that elevated classroom quiz participation by 30%.',
        analysis:
          'Proves duration (16 weeks), class scale (80+ students), deliverable count (40+ plans), and measurable student engagement (+30%).',
      },
      {
        roleContext: 'Experienced CBSE Teacher (Class 10 Board Prep)',
        weakText: 'Responsible for teaching science to 10th standard and completing syllabus.',
        strongText:
          'Spearheaded Class 10 CBSE Board preparation for 135 students across 3 sections, securing a 100% pass rate with 46 distinctions and elevating batch average marks by 14%.',
        analysis:
          'Quantifies class scale (135 students), specifies board syllabus (CBSE), and proves tangible academic success (100% pass, 46 distinctions).',
      },
      {
        roleContext: 'Primary School Teacher (Foundational Reading & Phonics)',
        weakText: 'Taught English phonics and helped children read books.',
        strongText:
          'Pioneered interactive Jolly Phonics multisensory reading circles for 38 Class 2 students, advancing 92% of the cohort to grade-level independent reading within two terms.',
        analysis:
          'Highlights a recognized methodology (Jolly Phonics) and delivers clear developmental measurement (92% reached independent reading).',
      },
      {
        roleContext: 'Remedial Learning & Slow Learner Support',
        weakText: 'Took extra classes for weak students after regular school hours.',
        strongText:
          'Formulated targeted remedial intervention plans for 24 struggling learners, utilizing diagnostic skill sheets and peer-learning that raised term exam scores from 42% to 68%.',
        analysis:
          'Explains the methodology (diagnostic sheets, peer-learning) and documents a concrete 26-percentage-point performance surge.',
      },
    ],
  },

  // TOPICAL CLUSTER
  topicalCluster: [
    {
      roleName: 'English Teacher Resume',
      badge: 'PRT, TGT, PGT',
      description:
        'Focus on grammar pedagogy, communicative fluency, literature, essay evaluation, and school debate mentoring.',
      keyRequirement: 'M.A./B.A. English + B.Ed + CTET Paper II',
    },
    {
      roleName: 'Mathematics Teacher Resume',
      badge: 'Classes 6 to 12',
      description:
        'Emphasize abstract problem-solving, GeoGebra visual geometry, board exam 100% pass results, and math Olympiad coaching.',
      keyRequirement: 'B.Sc/M.Sc Mathematics + B.Ed',
    },
    {
      roleName: 'Science / Physics / Chemistry Teacher',
      badge: 'TGT / PGT Science',
      description:
        'Highlight STEM laboratory supervision, safety adherence, CBSE practical examination oversight, and NEET/JEE conceptual foundations.',
      keyRequirement: 'B.Sc/M.Sc in Science Subject + B.Ed',
    },
    {
      roleName: 'Computer Science & Coding Teacher',
      badge: 'Classes 1 to 12',
      description:
        'Showcase Python, Java, Scratch, AI & Robotics curriculum delivery, computer lab maintenance, and school IT infrastructure support.',
      keyRequirement: 'BCA/MCA/B.Tech CS or B.Ed with Computer Pedagogy',
    },
    {
      roleName: 'Pre-Primary & Montessori Teacher',
      badge: 'Nursery, LKG, UKG',
      description:
        'Center around sensory learning, phonics, storytelling, motor skill milestones, and nurturing child psychological comfort.',
      keyRequirement: 'NTT / Montessori Certification or D.El.Ed',
    },
    {
      roleName: 'Special Education Needs (SEN) Teacher',
      badge: 'Inclusive Education',
      description:
        'Highlight Individualized Education Programs (IEP), remedial learning strategies, ADHD/Autism support, and parent-counselor alignment.',
      keyRequirement: 'B.Ed in Special Education + RCI Registration',
    },
  ],

  // RECOMMENDED TEMPLATES
  recommendedTemplates: [
    {
      id: 'academic_teaching',
      name: 'Scholar / Teacher',
      badge: 'Official Teacher Template',
      description:
        'Distinguished academic curriculum vitae featuring classical serif typography, double burgundy header rules, small-caps section banners, and right-aligned dates. Tailored for both fresher B.Ed and experienced teachers.',
      layout: 'single',
      recommendedFor: 'Freshers, PRT, TGT, PGT & Academic Lecturers',
    },
    {
      id: 'fresher',
      name: 'Junior Educator',
      badge: 'Fresher & B.Ed Ready',
      description:
        'Elevates education, teaching practicums, and student internship experience right beneath the summary. Perfect for recent B.Ed and D.El.Ed graduates with no formal job history.',
      layout: 'single',
      recommendedFor: 'B.Ed Freshers, PRT Teachers & Student Interns',
    },
    {
      id: 'classic',
      name: 'Classic Academic',
      badge: 'Principal Favorite',
      description:
        'A formal, authoritative reverse-chronological layout ideal for experienced TGT, PGT, and school coordinators with extensive board track records.',
      layout: 'single',
      recommendedFor: 'Experienced TGT, PGT & School Coordinators',
    },
    {
      id: 'harvard',
      name: 'Harvard Scholar',
      badge: 'Best for Higher-Ed',
      description:
        'Clean academic typography with high editorial clarity. Exceptional for College Lecturers, UGC-NET scholars, and PhD faculty.',
      layout: 'single',
      recommendedFor: 'College Lecturers, Assistant Professors & Research Scholars',
    },
    {
      id: 'ats',
      name: 'Pure ATS Clean',
      badge: '100% Screen Pass',
      description:
        'Strictly formatted single-column structure engineered to pass institutional Applicant Tracking Systems used by top private and international school chains.',
      layout: 'single',
      recommendedFor: 'CBSE, ICSE & International School Applications',
    },
  ],

  // FAQS
  faqSection: {
    badge: 'Answers for Educators',
    title: 'Frequently Asked Questions About Teacher Resumes',
    subtitle:
      'Clear answers for freshers, experienced educators, Word (.doc) downloads, and hiring evaluations.',
    faqs: [
      {
        question: 'How do freshers write a resume for a teacher job with no experience?',
        answer:
          'Freshers should feature their B.Ed / D.El.Ed degrees and CTET / State TET scores right at the top below their Career Objective. Treat your 8-to-16-week Student Teaching Practicum like real work experience: mention the host school, grade levels, lesson plans designed, and teaching aids used. Also include any private home tuition or NGO volunteer teaching.',
      },
      {
        question: 'What extra details should experienced teachers add compared to freshers?',
        answer:
          'Experienced teachers (3+ years) must upgrade from describing basic teaching tasks to proving measurable academic outcomes: include exact Class 10/12 board pass rates (e.g., 100%), count of subject distinctions (90%+), weak-learner remedial grade turnarounds, Olympiad/NEET/JEE mentoring, and institutional leadership roles (HOD, House Master, Exam Cell Member).',
      },
      {
        question: 'How can I download a sample CV for teachers in Word format?',
        answer:
          'Simply click the "Word (.doc)" button on any of our teacher resume examples (Fresher, Experienced, Primary PRT, or Senior PGT). It instantly downloads a clean, pre-formatted Microsoft Word file with standard margins, headings, and bullet points ready for offline editing.',
      },
      {
        question: 'Should a teacher resume be 1 page or 2 pages?',
        answer:
          'For B.Ed freshers, PRTs, and educators with under 5 years of experience, a clean single-page A4 resume is ideal. For senior TGT/PGT faculty, department heads, and lecturers with 7+ years of experience, extensive board track records, workshops, and exam duties, a structured 2-page resume is completely appropriate.',
      },
      {
        question: 'Is ResumeBabu free for teachers to download without watermarks?',
        answer:
          'Yes, 100% free. Both our editable Word (.doc) downloads and our interactive Scholar / Teacher PDF builder export cleanly with zero watermarks, zero credit card checks, and no trial lockouts.',
      },
    ],
  },

  bottomCta: {
    title: 'Ready to Build Your Principal-Approved Teacher Resume?',
    subtitle:
      'Whether you are a fresh B.Ed graduate or a senior board specialist, load our teacher template pre-filled with real educator sections and export in minutes.',
    buttonText: 'Create Teacher Resume Free',
    buttonHref: '/create?role=Teacher&template=academic_teaching',
  },
};
