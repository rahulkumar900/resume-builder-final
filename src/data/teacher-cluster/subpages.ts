import { ResumeData } from '@/types/resume';
import {
  FRESHER_TEACHER_RESUME,
  EXPERIENCED_TEACHER_RESUME,
  PRIMARY_TEACHER_RESUME,
  PGT_TEACHER_RESUME,
  TGT_TEACHER_RESUME,
} from './samples';

export interface SubPageSection {
  heading: string;
  body: string;
  bullets?: string[];
  copyableSnippet?: {
    label: string;
    text: string;
  };
  copyableSnippets?: Array<{
    label: string;
    text: string;
  }>;
}

export interface SubPageData {
  slug: string;
  path: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroSubtitle: string;
  primaryCtaText: string;
  sample: ResumeData;
  sampleTitle: string;
  sampleDescription: string;
  sections: SubPageSection[];
  skillsGrouped: Array<{ group: string; items: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaSubtitle: string;
}

export const TEACHER_SUBPAGES: Record<string, SubPageData> = {
  freshers: {
    slug: 'freshers',
    path: '/resume-for-teacher-job/freshers',
    badge: 'Fresher & No Experience Guide',
    metaTitle: 'Resume for Teacher Job for Freshers (2026)',
    metaDescription:
      'Create a resume for teacher job for freshers with no experience. Includes B.Ed./D.El.Ed. samples, internship tips, and free Word & PDF downloads.',
    keywords: [
      'resume for teacher job for freshers',
      'teacher resume with no experience',
      'bed fresher resume format',
      'fresher teacher resume objective',
      'teaching practice resume sample',
    ],
    h1: 'Resume for Teacher Job for Freshers (With Examples)',
    heroSubtitle:
      'Applying for your first teaching job? Create a professional teacher resume even if you have no previous work experience.',
    primaryCtaText: 'Create Fresher Teacher Resume',
    sample: FRESHER_TEACHER_RESUME,
    sampleTitle: 'Fresher Teacher Resume Sample (B.Ed. & CTET)',
    sampleDescription:
      'Follows the ideal fresher section order: Personal Info → Summary → Education → Internship / Teaching Practice → Skills → Certifications → Academic Projects.',
    sections: [
      {
        heading: '1. How to Write a Resume Without Teaching Experience',
        body: 'You do not need several years of formal school employment to demonstrate your teaching potential. Your education, teaching practice, internships, academic projects, and subject knowledge can all help build a strong application. For freshers, a Combination Resume format works best.',
        bullets: [
          'Recommended Fresher Section Order: Contact Information → Professional Summary → Educational Qualifications → Teaching Certifications → Teaching Skills → Internship or Teaching Practice → Academic Projects → Achievements → Languages.',
          'Place Education before any work or internship experience so principals immediately see your B.Ed., D.El.Ed., and graduation scores.',
          'What if you have no internship? Highlight your academic qualifications, teaching-related coursework, subject knowledge, lesson-planning assignments, educational projects, communication skills, volunteer tutoring, and relevant certifications.',
          'Never create fictional employment history or present supervised teaching practice as full-time employment.',
        ],
      },
      {
        heading: '2. Fresher Teacher Resume Objective & Summary Examples',
        body: 'Keep your summary concise (2–4 sentences), avoid first-person pronouns ("I", "my"), and mention your degree, subject specialization, and student-centred approach.',
        copyableSnippets: [
          {
            label: 'B.Ed. Graduate Fresher Summary',
            text: 'Motivated and dedicated B.Ed. graduate with a strong foundation in educational psychology, lesson planning, and student-centred teaching methodologies. Skilled in classroom management, interactive learning activities, and student assessment. Eager to create an engaging and supportive learning environment that encourages academic growth and student development.',
          },
          {
            label: 'Primary / D.El.Ed. Fresher Objective',
            text: 'Enthusiastic D.El.Ed. graduate and CTET Paper I qualified fresher with practical experience in foundational literacy, phonics, and activity-based learning. Skilled in storytelling, visual aid preparation, and creating joyful, child-centred classrooms for Classes 1–5.',
          },
        ],
      },
      {
        heading: '3. Educational Qualifications (B.Ed., D.El.Ed., Graduation)',
        body: 'For freshers, Education is your strongest qualification. List degrees in reverse-chronological order with university/board name, year of completion, percentage/CGPA, and pedagogy subjects.',
        copyableSnippet: {
          label: 'Complete Education Section Example for Freshers',
          text: 'Bachelor of Education (B.Ed.) – English & Social Science Pedagogy | Patna University, Bihar | 2023 | 78%\nBachelor of Science (B.Sc.) – Mathematics | Magadh University, Bihar | 2021 | 75%\nIntermediate (Class 12) | Bihar School Examination Board | 2018 | 82%\nMatriculation (Class 10) | Bihar School Examination Board | 2016 | 85%',
        },
      },
      {
        heading: '4. CTET and TET Qualifications',
        body: 'If you have qualified CTET (Paper I for Classes 1–5 or Paper II for Classes 6–8) or a State TET/STET, list the exam name, paper, status, and year clearly.',
        bullets: [
          'Include only qualifications you have actually earned.',
          'Clearly distinguish between completed, qualified, and currently pursuing certifications (e.g., "B.Ed. – Currently Pursuing, Expected 2026").',
          'Check specific eligibility criteria because requirements vary by school, board, state, and recruitment authority.',
        ],
        copyableSnippet: {
          label: 'Certifications Section Example',
          text: '• Central Teacher Eligibility Test (CTET) – Paper II Qualified (CBSE, 2024)\n• Bachelor of Education (B.Ed.) – Patna University, 2023\n• Certificate in Educational Technology – 2022',
        },
      },
      {
        heading: '5. Internship and Teaching Practice Examples',
        body: 'B.Ed. and D.El.Ed. programs include teaching practice, classroom observation, and school internships. Label it clearly as Teaching Intern or Teaching Practice and use the bullet formula: Action Verb + Teaching Activity + Method + Outcome.',
        copyableSnippets: [
          {
            label: 'Example 1: Teaching Intern (Government Middle School)',
            text: 'Teaching Intern | Government Middle School, Patna (January 2023 – March 2023)\n• Assisted experienced teachers in delivering classroom lessons.\n• Prepared lesson plans for English and Social Science.\n• Conducted supervised teaching sessions for students in Classes 6–8.\n• Used charts, visual aids, and group activities to support student understanding.\n• Observed classroom management techniques and student assessment methods.',
          },
          {
            label: 'Example 2: Teaching Practice (B.Ed. Practicum)',
            text: 'Teaching Practice | ABC Government School, Patna (February 2024 – April 2024)\n• Conducted supervised classroom teaching sessions for students in Classes 6–8.\n• Prepared lesson plans for English and Social Science.\n• Used interactive teaching techniques to encourage student participation.\n• Assisted in evaluating student assignments and classroom activities.\n• Maintained a positive classroom environment during practice sessions.',
          },
        ],
      },
      {
        heading: '6. Academic Projects & Teaching Materials for Freshers',
        body: 'Academic projects prove your ability to plan lessons, create visual learning materials, and design assessments—even before your first full-time job.',
        bullets: [
          'Development of interactive teaching materials & visual flashcards.',
          'Preparation of structured lesson plans & digital learning resources.',
          'Educational action-research projects & classroom activity design.',
        ],
        copyableSnippet: {
          label: 'Sample Project Entry',
          text: 'Project: Activity-Based Mathematics Learning\n• Designed interactive activities to explain basic mathematical concepts.\n• Prepared visual learning materials to support student understanding.\n• Developed practice exercises to evaluate students’ learning progress.',
        },
      },
      {
        heading: '7. Formatting & Common Mistakes Freshers Must Avoid',
        body: 'Keep your fresher resume to one clean A4 page using readable fonts (Arial, Calibri, Georgia, Cambria) at 10–12 pt body size and 0.5–1 inch margins.',
        bullets: [
          'Do not write generic summaries like "I want to become a good teacher".',
          'Do not omit B.Ed./D.El.Ed. or CTET/TET details.',
          'Do not include unnecessary personal details like religion, marital status, or full street address unless requested.',
          'Always export as a clean, selectable-text PDF and proofread carefully for spelling or grammar errors.',
        ],
      },
    ],
    skillsGrouped: [
      {
        group: 'Instructional & Classroom Skills',
        items: ['Lesson Planning & Preparation', 'Activity-Based Learning', 'Child-Centred Teaching', 'Classroom Management', 'Student Assessment'],
      },
      {
        group: 'Communication & EdTech Skills',
        items: ['MS Word & PowerPoint', 'Google Classroom', 'Smart Board Tools', 'Online Teaching Platforms', 'Verbal & Written Communication'],
      },
    ],
    faqs: [
      {
        question: 'What if I am still pursuing my B.Ed. and have no internship yet?',
        answer:
          'Write "Bachelor of Education (B.Ed.) – Pursuing (Expected Completion: 2026)" in your Education section, and highlight micro-teaching sessions, lesson-planning coursework, academic projects, and any private home tutoring.',
      },
      {
        question: 'Should a fresher teacher resume be one page?',
        answer:
          'Yes. A clean, single-page A4 resume is ideal for freshers so principals can scan your B.Ed., CTET, internship, and skills effortlessly.',
      },
      {
        question: 'Can I include home tuition or coaching center experience?',
        answer:
          'Yes! List it professionally under Teaching Practice or Tutoring Experience, specifying the classes taught, subjects covered, and how you helped students improve.',
      },
      {
        question: 'Should a fresher teacher resume include a photograph?',
        answer:
          'A photograph is generally not necessary for most private-sector and international teaching applications unless the school specifically requests one.',
      },
    ],
    ctaTitle: 'Ready to Land Your First Teaching Job?',
    ctaSubtitle: 'Load our pre-formatted Fresher Teacher resume template and export your clean PDF in minutes.',
  },

  experienced: {
    slug: 'experienced',
    path: '/resume-for-teacher-job/experienced',
    badge: 'Experienced Educators (2–10+ Years)',
    metaTitle: 'Resume for Experienced Teacher: Format (2026)',
    metaDescription:
      'Build a resume for experienced teacher roles with 2, 5 & 10+ year samples. Showcase classroom results, board exam prep & free Word/PDF export.',
    keywords: [
      'resume for experienced teacher',
      'experienced teacher resume format',
      'teacher resume summary examples',
      'senior school teacher cv sample',
    ],
    h1: 'Resume for Experienced Teacher: Format and Examples',
    heroSubtitle:
      'Showcase your teaching experience, subject expertise, classroom achievements, and professional qualifications with a well-structured teacher resume.',
    primaryCtaText: 'Create Experienced Teacher Resume',
    sample: EXPERIENCED_TEACHER_RESUME,
    sampleTitle: 'Experienced Teacher Resume Sample (6+ Years)',
    sampleDescription:
      'Follows the Reverse-Chronological order: Personal Info → Summary → Teaching Experience → Education → Skills → Certifications → Achievements.',
    sections: [
      {
        heading: '1. Best Format & Section Order for Experienced Teachers',
        body: 'For experienced teachers, a Reverse-Chronological resume is generally the strongest choice because it lists your most recent teaching job first and highlights career progression. If you are applying for Academic Coordinator or Curriculum Lead roles, a Combination format works well.',
        bullets: [
          'Recommended Experienced Section Order: Contact Information → Professional Summary → Teaching Experience → Education → Skills → Certifications → Achievements.',
          'Length: Teachers with 1–5 years of experience can use 1–2 pages; senior teachers with substantial achievements can use 2 pages cleanly.',
          'Never remove important teaching experience or qualifications just to force everything onto one page.',
        ],
      },
      {
        heading: '2. Professional Summary Examples (2, 5 & 10+ Years)',
        body: 'Keep your summary to 2–4 crisp sentences, avoid first-person pronouns ("I"), and highlight your years of experience, subject depth, and teaching methodology.',
        copyableSnippets: [
          {
            label: 'Experienced Secondary Teacher Summary (5+ Years)',
            text: 'Dedicated Mathematics Teacher with 5+ years of experience teaching secondary-level students. Skilled in curriculum planning, classroom management, differentiated instruction, and student performance assessment. Experienced in developing engaging lesson plans and supporting students in improving their mathematical understanding and academic performance.',
          },
          {
            label: 'Primary Teacher Summary (3+ Years)',
            text: 'Enthusiastic Primary School Teacher with 3 years of experience teaching foundational subjects to young learners. Skilled in activity-based learning, classroom management, lesson preparation, and child-centred teaching methods. Committed to creating a positive classroom environment that supports students’ academic, social, and emotional development.',
          },
          {
            label: 'English Teacher Summary',
            text: 'Qualified English Teacher with experience teaching grammar, reading comprehension, writing, and spoken English. Skilled in developing interactive lessons, improving students’ communication abilities, and assessing language development. Passionate about helping students build confidence and achieve academic success.',
          },
        ],
      },
      {
        heading: '3. Sample Experience Descriptions for 2, 5, and 10+ Years',
        body: 'Tailor your bullet points to match your seniority. Include job title, school name, location, employment dates, classes/grades taught, and subjects handled.',
        copyableSnippets: [
          {
            label: '2 Years Experience Example (Primary / Middle School)',
            text: 'Primary Teacher | Bright Future School, Patna (June 2022 – March 2024)\n• Taught English, Mathematics, and Environmental Studies to students in Classes 1–5.\n• Designed engaging classroom activities, storytelling, and visual aids to improve foundational learning.\n• Evaluated students through classroom exercises, assignments, and periodic assessments.\n• Maintained individual student progress records and communicated learning needs to parents.',
          },
          {
            label: '5 Years Experience Example (Secondary TGT)',
            text: 'Mathematics Teacher | ABC Public School, Patna (April 2020 – Present)\n• Teach Mathematics to students in Classes 8–10 using interactive and problem-solving-based teaching methods.\n• Prepare structured lesson plans aligned with the prescribed school curriculum.\n• Conduct regular assessments to evaluate student understanding and academic progress.\n• Provide additional academic support to students who require improvement in mathematical concepts.\n• Maintain classroom discipline and communicate with parents regarding student performance.',
          },
          {
            label: '10+ Years Experience Example (Senior Subject Teacher / Coordinator)',
            text: 'Senior Mathematics Teacher & Department Coordinator | Delhi Public School (2015 – Present)\n• Lead secondary Mathematics instruction across Classes 9–12, mentoring 4 junior faculty members on syllabus pacing.\n• Spearhead board examination preparation through diagnostic mock tests, item analysis, and remedial workshops.\n• Develop standardized question banks and competency-based assessment rubrics aligned with board guidelines.\n• Coordinate inter-school academic exhibitions, olympiad coaching, and parent-teacher academic reviews.',
          },
        ],
      },
      {
        heading: '4. How to Write Better Experience Bullets & Highlight Student Performance',
        body: 'Avoid writing only general responsibilities. Transform weak duty lines using Action Verb + Teaching Activity + Method + Outcome, and include genuine numbers wherever possible.',
        bullets: [
          'Weak: "Responsible for teaching students." → Stronger: "Designed interactive English and Mathematics lessons for 40 primary-level students, using storytelling and activity-based learning to improve classroom participation."',
          'Weak: "Checked students’ homework." → Stronger: "Evaluated weekly assignments and conducted individual feedback sessions to identify learning gaps and support student improvement."',
          'Genuine numbers to include: Number of students taught, number of classes handled, number of subjects taught, improvement in assessment results, number of lesson plans developed, and school activities led.',
          'Never invent academic results or student performance statistics.',
        ],
      },
      {
        heading: '5. Educational Qualifications, Certifications & Awards',
        body: 'For experienced teachers, place Education after Teaching Experience. Include continuous professional development workshops, CTET/TET, and school awards.',
        bullets: [
          'Awards & Achievements: "Received the Best Teacher Award for outstanding classroom performance in 2024", "Recognized for organizing an inter-school science exhibition", "Successfully coordinated annual school cultural activities".',
          'Additional Contributions: Extracurricular coordination, student counselling, sports coaching, educational workshops, and debate/cultural activity coordination.',
        ],
      },
    ],
    skillsGrouped: [
      {
        group: 'Instruction, Assessment & Management',
        items: ['Curriculum Development', 'Differentiated Instruction', 'Student Performance Analysis', 'Board Exam Preparation', 'Classroom & Behaviour Management'],
      },
      {
        group: 'Communication & Educational Technology',
        items: ['Parent-Teacher Communication', 'Mentoring & Collaboration', 'Smart Classroom Tools', 'Google Workspace & Classroom', 'MS Excel & PowerPoint'],
      },
    ],
    faqs: [
      {
        question: 'Which resume format is best for experienced teachers?',
        answer:
          'A reverse-chronological format is best because it puts your most recent school, subjects taught, and teaching achievements right at the top where principals expect them.',
      },
      {
        question: 'Should an experienced teacher resume be 1 or 2 pages?',
        answer:
          'Teachers with 1–5 years of experience typically use 1–2 pages. Senior educators with 7–10+ years, multiple school roles, workshops, and achievements should use a clean 2-page layout without shrinking fonts below 10 pt.',
      },
      {
        question: 'How do I show student improvement without exaggerating?',
        answer:
          'Describe the concrete action you took and real figures—such as the number of students supported in remedial sessions, quiz completion rates, or verified board pass outcomes.',
      },
      {
        question: 'What is the best file format when applying to private schools?',
        answer:
          'PDF with selectable text is strongly recommended because it preserves margins, headings, and page breaks on every device. Only send Word (.doc) if the school specifically requests it.',
      },
    ],
    ctaTitle: 'Upgrade Your Teaching Career Today',
    ctaSubtitle: 'Present your classroom leadership and student impact cleanly with our Scholar / Teacher template.',
  },

  'primary-teacher': {
    slug: 'primary-teacher',
    path: '/resume-for-teacher-job/primary-teacher',
    badge: 'Primary School Teacher (PRT • Classes 1–5)',
    metaTitle: 'Resume for Primary Teacher Job (PRT 2026)',
    metaDescription:
      'Create a resume for primary teacher job (PRT Classes 1–5) highlighting D.El.Ed./B.Ed., CTET Paper I, phonics & activity-based learning. Free PDF.',
    keywords: [
      'resume for primary teacher job',
      'primary school teacher resume word format',
      'prt teacher resume sample',
      'fresher primary teacher resume',
    ],
    h1: 'Resume for Primary Teacher Job: Format and Examples',
    heroSubtitle:
      'Highlight your foundational literacy & numeracy skills, activity-based learning methods, classroom management, and D.El.Ed. / CTET Paper I credentials.',
    primaryCtaText: 'Create Primary Teacher Resume',
    sample: PRIMARY_TEACHER_RESUME,
    sampleTitle: 'Primary School Teacher (PRT) Resume Sample',
    sampleDescription:
      'Tailored for Classes 1–5 educators, showcasing foundational English, Math, EVS, phonics, storytelling, and parent communication.',
    sections: [
      {
        heading: 'Primary Teacher Qualifications (D.El.Ed., B.Ed. & CTET Paper I)',
        body: 'Schools hiring for Classes 1–5 look for specific primary eligibility credentials alongside patience and child psychology awareness.',
        bullets: [
          'Diploma in Elementary Education (D.El.Ed.), B.El.Ed., or B.Ed. (as per current board norms).',
          'Central Teacher Eligibility Test (CTET) – Paper I or State TET Paper I.',
          'Optional specializations: Nursery Teacher Training (NTT), Montessori training, or Phonics certification.',
        ],
      },
      {
        heading: 'Activity-Based Learning & Classroom Management Examples',
        body: 'Primary principals value teachers who make foundational concepts joyful while maintaining a safe, disciplined classroom:',
        copyableSnippet: {
          label: 'Primary Teacher Experience Bullet Examples',
          text: '• Taught English, Mathematics, and Environmental Studies to 38 primary students in Classes 1–4.\n• Designed interactive storytelling, phonics, and sensory group activities to build foundational literacy and numeracy.\n• Maintained individual student progress records and communicated learning milestones to parents during PTMs.',
        },
      },
      {
        heading: 'Fresher vs. Experienced Primary Teacher Approach',
        body: 'If you are a fresher primary teacher, highlight your D.El.Ed. teaching practice, chart/flashcard creation, and storytelling skills. Experienced PRTs should highlight student reading progress, morning assembly coordination, and parent satisfaction.',
      },
    ],
    skillsGrouped: [
      {
        group: 'Primary Teaching Skills',
        items: ['Foundational Literacy & Numeracy', 'Activity-Based Learning', 'Phonics & Storytelling', 'Child-Centred Instruction', 'Creative Visual Aids'],
      },
      {
        group: 'Classroom & Parent Care',
        items: ['Classroom Discipline', 'Patience & Empathy', 'Individual Progress Tracking', 'Parent-Teacher Communication'],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a PRT and TGT resume?',
        answer:
          'A PRT (Classes 1–5) resume emphasizes foundational literacy, numeracy, phonics, play-way methods, and D.El.Ed./CTET Paper I. A TGT (Classes 6–10) resume focuses on single-subject depth, B.Ed., and CTET Paper II.',
      },
      {
        question: 'Should I mention art, craft, and storytelling on a primary teacher CV?',
        answer:
          'Yes! Visual aids, storytelling, rhymes, and classroom activity design are essential day-to-day competencies for primary school teachers.',
      },
    ],
    ctaTitle: 'Build Your Primary Teacher Resume Free',
    ctaSubtitle: 'Customize our PRT sample with your D.El.Ed., CTET Paper I, and classroom activities.',
  },

  'pgt-teacher': {
    slug: 'pgt-teacher',
    path: '/resume-for-teacher-job/pgt-teacher',
    badge: 'Post Graduate Teacher (PGT • Classes 11–12)',
    metaTitle: 'Resume for PGT Teacher Job: Format & Samples',
    metaDescription:
      'Build a resume for PGT teacher job (Classes 11–12) highlighting Master’s degree, B.Ed., board exam results & lab work. Free Word & PDF download.',
    keywords: [
      'resume for pgt teacher job',
      'pgt teacher resume format',
      'senior secondary teacher cv sample',
      'pgt physics chemistry maths resume',
    ],
    h1: 'Resume for PGT Teacher Job: Format and Examples',
    heroSubtitle:
      'Showcase your postgraduate subject specialization, B.Ed. qualification, senior secondary (Classes 11–12) teaching experience, and board examination preparation.',
    primaryCtaText: 'Create PGT Teacher Resume',
    sample: PGT_TEACHER_RESUME,
    sampleTitle: 'PGT Teacher Resume Sample (Classes 11 & 12)',
    sampleDescription:
      'Designed for Senior Secondary specialists highlighting M.Sc./M.A., B.Ed., Class 12 board prep, and practical lab supervision.',
    sections: [
      {
        heading: 'Mandatory PGT Qualifications & Subject Specialization',
        body: 'PGT positions (Classes 11–12) require advanced academic depth. Clearly state your Master’s specialization and B.Ed. in your header and Education section.',
        bullets: [
          'Postgraduate degree (M.Sc., M.A., M.Com.) in the exact teaching subject.',
          'Bachelor of Education (B.Ed.) with relevant subject pedagogy.',
          'State PGT eligibility certifications or CBSE Senior Practical Examiner experience, if applicable.',
        ],
      },
      {
        heading: 'Board Examination Preparation & Practical Supervision',
        body: 'Senior secondary principals look for teachers who can pace the Class 11–12 syllabus smoothly, design assertion-reason tests, and supervise board practical exams.',
        copyableSnippet: {
          label: 'PGT Experience Bullet Examples',
          text: '• Deliver senior secondary CBSE Physics curriculum across 4 sections of Classes 11 and 12 (150+ students).\n• Conducted structured board exam revision tests, assertion-reason practice modules, and pre-board evaluations.\n• Supervised senior physics laboratory practicals, ensuring apparatus readiness and strict safety adherence during internal and board practical exams.',
        },
      },
    ],
    skillsGrouped: [
      {
        group: 'Senior Secondary Instruction',
        items: ['Class 11–12 Syllabus Delivery', 'Board Exam Preparation', 'Question Bank Authoring', 'Laboratory Practical Supervision', 'Academic Counseling'],
      },
      {
        group: 'Tools & Evaluation',
        items: ['Virtual Lab Simulations', 'Smart Interactive Boards', 'Pre-Board Item Analysis', 'Google Classroom'],
      },
    ],
    faqs: [
      {
        question: 'Is CTET required for PGT teaching jobs?',
        answer:
          'Generally, CTET Paper I and II cover Classes 1–8. For PGT (Classes 11–12), schools primarily require a Master’s degree in the subject plus B.Ed., though some state boards conduct specific PGT eligibility tests.',
      },
      {
        question: 'Should PGT teachers include research papers or question banks authored?',
        answer:
          'Yes. Mentioning study modules, assertion-reason booklets, or academic papers demonstrates deep subject mastery expected at the senior secondary level.',
      },
    ],
    ctaTitle: 'Ready to Apply for Senior Secondary Roles?',
    ctaSubtitle: 'Load our PGT resume template with pre-built Class 11–12 board and lab sections.',
  },

  'tgt-teacher': {
    slug: 'tgt-teacher',
    path: '/resume-for-teacher-job/tgt-teacher',
    badge: 'Trained Graduate Teacher (TGT • Classes 6–10)',
    metaTitle: 'Resume for TGT Teacher Job: Format & Samples',
    metaDescription:
      'Create a resume for TGT teacher job (Classes 6–10) highlighting graduation, B.Ed., CTET Paper II, lesson planning & free Word/PDF download.',
    keywords: [
      'resume for tgt teacher job',
      'tgt teacher resume format',
      'tgt science maths english resume sample',
      'secondary school teacher cv format',
    ],
    h1: 'Resume for TGT Teacher Job: Format and Examples',
    heroSubtitle:
      'Highlight your graduation and B.Ed. credentials, CTET Paper II qualification, secondary-level teaching (Classes 6–10), lesson planning, and student assessment.',
    primaryCtaText: 'Create TGT Teacher Resume',
    sample: TGT_TEACHER_RESUME,
    sampleTitle: 'TGT Teacher Resume Sample (Classes 6–10)',
    sampleDescription:
      'Built for secondary school educators balancing subject depth, lesson planning, unit assessments, and Class 10 board readiness.',
    sections: [
      {
        heading: 'TGT Qualifications: Graduation, B.Ed. & CTET Paper II',
        body: 'TGT educators teach middle and secondary classes (Classes 6–10). Make sure your graduation subjects, B.Ed. pedagogy subjects, and CTET Paper II status are immediately clear.',
        bullets: [
          'Bachelor’s degree (B.A. / B.Sc. / B.Com.) in the relevant teaching subject.',
          'Bachelor of Education (B.Ed.) from a recognized university.',
          'CTET Paper II or State TET Paper II qualification.',
        ],
      },
      {
        heading: 'Secondary-Level Teaching, Lesson Planning & Assessment',
        body: 'Show how you bridge middle-school concepts to Class 10 board readiness through structured planning and regular assessments:',
        copyableSnippet: {
          label: 'TGT Experience Bullet Examples',
          text: '• Deliver Science curriculum (Physics, Chemistry, Biology) to 160+ students across Classes 6–10.\n• Prepare weekly lesson plans, lab demonstrations, and interactive visual presentations to clarify scientific concepts.\n• Conduct unit tests, review notebooks, and provide structured feedback to improve student assessment outcomes.',
        },
      },
    ],
    skillsGrouped: [
      {
        group: 'Secondary Teaching Skills',
        items: ['Subject Specialization', 'Structured Lesson Planning', 'Student Assessment & Grading', 'Classroom Management', 'Science/Math Lab Demonstrations'],
      },
      {
        group: 'EdTech & Co-Curricular',
        items: ['Google Classroom', 'Smart Board Instruction', 'Quizizz / Formative Quizzes', 'Science Fair & Olympiad Mentoring'],
      },
    ],
    faqs: [
      {
        question: 'Which CTET paper is needed for TGT roles?',
        answer:
          'CTET Paper II (or equivalent State TET Paper II) qualifies candidates to teach upper primary / middle school classes (Classes 6–8) and is widely requested for TGT positions in CBSE and private schools.',
      },
      {
        question: 'Can a fresher B.Ed. graduate apply for TGT jobs?',
        answer:
          'Yes! If you hold a Bachelor’s degree, B.Ed., and CTET Paper II, you can apply for entry-level TGT openings by highlighting your Classes 6–8 teaching practice internship.',
      },
    ],
    ctaTitle: 'Build Your TGT Teacher Resume Free',
    ctaSubtitle: 'Start with our TGT template and highlight your subject mastery and CTET Paper II.',
  },
};
