import { ResumeData } from '@/types/resume';

/**
 * 1. FRESHER TEACHER SAMPLE (No formal experience / B.Ed Graduate)
 * Section order: personalInfo -> summary -> education -> internships -> skills -> certifications -> projects
 */
export const FRESHER_TEACHER_RESUME: ResumeData = {
  id: 'sample-fresher-teacher',
  title: 'Fresher Teacher Resume - Rahul Kumar (B.Ed / CTET)',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'academic_teaching',
  themeColor: '#7a1f2b',
  fontFamily: 'playfair',
  spacing: 'normal',
  experienceLevel: 'entry',
  sectionOrder: {
    singleColumn: ['summary', 'education', 'internships', 'skills', 'certifications', 'projects'],
  },
  personalInfo: {
    fullName: 'Rahul Kumar',
    jobTitle: 'Aspiring TGT English & Social Science Teacher | B.Ed | CTET Paper II',
    email: 'rahul.kumar@email.com',
    phone: '+91 91234 56789',
    location: 'Patna, Bihar, India',
    linkedin: 'linkedin.com/in/rahulkumar-edu',
    summary:
      'Motivated and dedicated B.Ed. graduate with a strong foundation in educational psychology, lesson planning, and student-centred teaching methodologies. Skilled in classroom management, interactive learning activities, and student assessment. Eager to create an engaging and supportive learning environment that encourages academic growth and student development.',
  },
  education: [
    {
      id: 'fresh-edu-1',
      degree: 'Bachelor of Education (B.Ed.) – English & Social Science Pedagogy',
      school: 'Patna University',
      location: 'Bihar',
      graduationDate: '2024',
      gpa: '78% (First Division)',
      highlights: ['Trained in micro-teaching, lesson plan design, and formative student assessment.'],
    },
    {
      id: 'fresh-edu-2',
      degree: 'Bachelor of Arts (B.A.) – English Literature & History',
      school: 'Magadh University',
      location: 'Bihar',
      graduationDate: '2022',
      gpa: '75%',
    },
  ],
  internships: [
    {
      id: 'fresh-int-1',
      role: 'Teaching Intern (B.Ed. Teaching Practice)',
      company: 'Government Middle School',
      location: 'Patna, Bihar',
      startDate: '2023-11',
      endDate: '2024-02',
      current: false,
      highlights: [
        'Conducted supervised classroom teaching sessions for 75+ students in Classes 6–8.',
        'Prepared 35+ structured lesson plans for English and Social Science aligned with the school syllabus.',
        'Used visual charts, flashcards, and group activities to support student understanding and participation.',
        'Assisted senior teachers in evaluating weekly assignments and maintaining attendance records.',
      ],
    },
  ],
  experience: [],
  skills: [
    {
      id: 'fresh-sk-1',
      category: 'Teaching & Instruction',
      items: [
        'Lesson Planning & Preparation',
        'Activity-Based Learning',
        'Child-Centred Teaching',
        'Classroom Management',
        'Student Assessment',
      ],
    },
    {
      id: 'fresh-sk-2',
      category: 'Educational Technology',
      items: ['MS Word & PowerPoint', 'Google Classroom', 'Smart Board Basics', 'Online Quizzes'],
    },
  ],
  certifications: [
    {
      id: 'fresh-cert-1',
      name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified',
      issuer: 'CBSE',
      date: '2024',
    },
    {
      id: 'fresh-cert-2',
      name: 'Certificate in Educational Technology',
      issuer: 'DIKSHA / NCERT',
      date: '2023',
    },
  ],
  projects: [
    {
      id: 'fresh-proj-1',
      title: 'Activity-Based English & Grammar Learning Kit',
      technologies: ['Visual Flashcards', 'Role-Play Scripts', 'Formative Quizzes'],
      highlights: [
        'Designed interactive grammar activities and visual flashcards to simplify parts of speech for middle-school learners.',
        'Developed diagnostic practice exercises to evaluate student reading comprehension progress.',
      ],
    },
  ],
  languages: [
    { id: 'fresh-lang-1', language: 'English', proficiency: 'Professional Proficiency' },
    { id: 'fresh-lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

/**
 * 2. EXPERIENCED TEACHER SAMPLE (5–7+ Years)
 * Section order: personalInfo -> summary -> experience -> education -> skills -> certifications -> achievements
 */
export const EXPERIENCED_TEACHER_RESUME: ResumeData = {
  id: 'sample-experienced-teacher',
  title: 'Experienced Teacher Resume - Pooja Verma (Mathematics)',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'academic_teaching',
  themeColor: '#7a1f2b',
  fontFamily: 'playfair',
  spacing: 'normal',
  experienceLevel: 'experienced',
  sectionOrder: {
    singleColumn: ['summary', 'experience', 'education', 'skills', 'certifications', 'achievements'],
  },
  personalInfo: {
    fullName: 'Pooja Verma',
    jobTitle: 'Senior Mathematics Teacher (Classes 8–10) | B.Ed. | CTET Qualified',
    email: 'pooja.verma@email.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    linkedin: 'linkedin.com/in/pooja-verma-edu',
    summary:
      'Dedicated Mathematics Teacher with 6+ years of experience teaching secondary-level students across CBSE schools. Skilled in curriculum planning, classroom management, differentiated instruction, and student performance assessment. Experienced in developing engaging lesson plans and supporting students in improving their mathematical understanding and board examination readiness.',
  },
  experience: [
    {
      id: 'exp-t-1',
      role: 'Senior Mathematics Teacher',
      company: 'ABC Public School',
      location: 'New Delhi',
      startDate: '2021-07',
      endDate: '',
      current: true,
      highlights: [
        'Teach Mathematics to 140+ students in Classes 8–10 using interactive and problem-solving-based teaching methods.',
        'Prepared structured lesson plans aligned with the prescribed CBSE curriculum and conducted regular formative assessments.',
        'Provided additional remedial academic support to struggling learners, helping improve term assessment scores.',
        'Communicated regularly with parents during Parent-Teacher Meetings regarding student academic progress and development.',
      ],
    },
    {
      id: 'exp-t-2',
      role: 'Mathematics Teacher',
      company: 'XYZ Academy',
      location: 'Jaipur, Rajasthan',
      startDate: '2018-04',
      endDate: '2021-06',
      current: false,
      highlights: [
        'Delivered daily Mathematics instruction for Classes 6–8 across 4 sections.',
        'Evaluated weekly assignments and conducted individual feedback sessions to identify learning gaps.',
        'Coordinated inter-house mathematics quiz competitions and annual academic exhibitions.',
      ],
    },
  ],
  education: [
    {
      id: 'exp-edu-1',
      degree: 'Bachelor of Education (B.Ed.) – Pedagogy of Mathematics',
      school: 'University of Delhi',
      location: 'New Delhi',
      graduationDate: '2018',
      gpa: '80% (First Division)',
    },
    {
      id: 'exp-edu-2',
      degree: 'Bachelor of Science (B.Sc.) – Mathematics',
      school: 'University of Rajasthan',
      location: 'Jaipur',
      graduationDate: '2016',
      gpa: '77%',
    },
  ],
  skills: [
    {
      id: 'exp-sk-1',
      category: 'Instruction & Assessment',
      items: [
        'Curriculum Implementation',
        'Differentiated Instruction',
        'Board Exam Preparation',
        'Performance Analysis',
        'Remedial Support',
      ],
    },
    {
      id: 'exp-sk-2',
      category: 'EdTech & Administration',
      items: ['Smart Classroom Tools', 'Google Classroom', 'MS Excel Gradebooks', 'Parent Communication'],
    },
  ],
  certifications: [
    {
      id: 'exp-cert-1',
      name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified',
      issuer: 'CBSE',
      date: '2019',
    },
    {
      id: 'exp-cert-2',
      name: 'CBSE Capacity Building Workshop on Competency-Based Assessment',
      issuer: 'CBSE',
      date: '2023',
    },
  ],
  achievements: [
    {
      id: 'exp-ach-1',
      title: 'Best Teacher Recognition for Classroom Performance',
      date: '2024',
      description: 'Recognized by school administration for consistent Class 10 board pass results and remedial mentoring.',
    },
    {
      id: 'exp-ach-2',
      title: 'Inter-School Mathematics Exhibition Coordinator',
      date: '2023',
      description: 'Successfully organized the annual regional mathematics fair with participation from 15 schools.',
    },
  ],
  projects: [],
  languages: [
    { id: 'exp-lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'exp-lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

/**
 * 3. PRIMARY TEACHER (PRT) SAMPLE (Classes 1–5)
 */
export const PRIMARY_TEACHER_RESUME: ResumeData = {
  id: 'sample-primary-teacher',
  title: 'Primary Teacher (PRT) Resume - Ananya Sen',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'academic_teaching',
  themeColor: '#7a1f2b',
  fontFamily: 'playfair',
  spacing: 'normal',
  experienceLevel: 'experienced',
  sectionOrder: {
    singleColumn: ['summary', 'experience', 'education', 'skills', 'certifications', 'achievements'],
  },
  personalInfo: {
    fullName: 'Ananya Sen',
    jobTitle: 'Primary School Teacher (PRT - Classes 1–5) | D.El.Ed. | CTET Paper I',
    email: 'ananya.sen@email.com',
    phone: '+91 97654 32109',
    location: 'Kolkata, West Bengal, India',
    summary:
      'Enthusiastic Primary School Teacher with 3+ years of experience teaching foundational English, Mathematics, and Environmental Studies to young learners (Classes 1–5). Skilled in activity-based learning, phonics instruction, classroom management, and child-centred teaching methods. Committed to creating a positive classroom environment that supports students’ academic, social, and emotional development.',
  },
  experience: [
    {
      id: 'prt-exp-1',
      role: 'Primary School Teacher (PRT)',
      company: 'Bright Future Public School',
      location: 'Kolkata',
      startDate: '2021-06',
      endDate: '',
      current: true,
      highlights: [
        'Teach English, Mathematics, and Environmental Studies to 38 primary students in Classes 1–4.',
        'Designed interactive storytelling, phonics, and sensory group activities to build foundational literacy and numeracy.',
        'Evaluated students through classroom exercises, notebooks, and periodic assessments, maintaining individual progress records.',
        'Collaborated closely with parents during PTMs to share developmental milestones and learning support tips.',
      ],
    },
  ],
  education: [
    {
      id: 'prt-edu-1',
      degree: 'Diploma in Elementary Education (D.El.Ed.)',
      school: 'West Bengal Board of Primary Education',
      location: 'Kolkata',
      graduationDate: '2021',
      gpa: '84% (First Division)',
    },
    {
      id: 'prt-edu-2',
      degree: 'Bachelor of Arts (B.A.) – English',
      school: 'University of Calcutta',
      location: 'Kolkata',
      graduationDate: '2019',
      gpa: '72%',
    },
  ],
  skills: [
    {
      id: 'prt-sk-1',
      category: 'Primary Pedagogy',
      items: [
        'Activity-Based Learning',
        'Phonics & Early Reading',
        'Foundational Numeracy',
        'Storytelling & Visual Aids',
        'Child-Centred Instruction',
      ],
    },
    {
      id: 'prt-sk-2',
      category: 'Classroom & Parent Care',
      items: ['Positive Reinforcement', 'Progress Record Tracking', 'Parent-Teacher Communication', 'Creative Craft Activities'],
    },
  ],
  certifications: [
    {
      id: 'prt-cert-1',
      name: 'Central Teacher Eligibility Test (CTET) – Paper I Qualified',
      issuer: 'CBSE',
      date: '2021',
    },
    {
      id: 'prt-cert-2',
      name: 'Certificate in Foundational Literacy & Numeracy (FLN)',
      issuer: 'NIPUN Bharat / DIKSHA',
      date: '2023',
    },
  ],
  achievements: [
    {
      id: 'prt-ach-1',
      title: 'Annual Cultural & Reading Fair Coordinator',
      date: '2023',
      description: 'Directed primary wing storytelling showcase involving 100% student participation.',
    },
  ],
  projects: [],
  languages: [
    { id: 'prt-lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'prt-lang-2', language: 'Bengali', proficiency: 'Native' },
    { id: 'prt-lang-3', language: 'Hindi', proficiency: 'Conversational' },
  ],
};

/**
 * 4. PGT TEACHER SAMPLE (Classes 11–12 Senior Secondary)
 */
export const PGT_TEACHER_RESUME: ResumeData = {
  id: 'sample-pgt-teacher',
  title: 'PGT Teacher Resume - Rajeev Nambiar (PGT Physics)',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'academic_teaching',
  themeColor: '#7a1f2b',
  fontFamily: 'playfair',
  spacing: 'normal',
  experienceLevel: 'experienced',
  sectionOrder: {
    singleColumn: ['summary', 'experience', 'education', 'skills', 'certifications', 'achievements'],
  },
  personalInfo: {
    fullName: 'Rajeev Nambiar',
    jobTitle: 'Post Graduate Teacher (PGT) Physics | M.Sc. Physics | B.Ed.',
    email: 'rajeev.nambiar@email.com',
    phone: '+91 98450 12345',
    location: 'Bengaluru, Karnataka, India',
    summary:
      'Experienced Post Graduate Teacher (PGT) of Physics with 8+ years of senior secondary (Classes 11–12) teaching experience across CBSE institutions. Skilled in advanced curriculum delivery, board examination preparation, laboratory practical supervision, and analytical problem-solving instruction.',
  },
  experience: [
    {
      id: 'pgt-exp-1',
      role: 'PGT Physics Teacher (Classes 11 & 12)',
      company: 'National Senior Secondary School',
      location: 'Bengaluru',
      startDate: '2019-06',
      endDate: '',
      current: true,
      highlights: [
        'Deliver senior secondary CBSE Physics curriculum across 4 sections of Classes 11 and 12 (150+ students).',
        'Conducted structured board exam revision tests, assertion-reason practice modules, and pre-board evaluations.',
        'Supervised senior physics laboratory practicals, ensuring apparatus readiness and strict safety adherence during internal and board practical exams.',
        'Mentored students preparing for engineering and medical foundation assessments through extra doubt-clearing sessions.',
      ],
    },
    {
      id: 'pgt-exp-2',
      role: 'Physics Lecturer (Higher Secondary)',
      company: 'St. Joseph’s Pre-University College',
      location: 'Bengaluru',
      startDate: '2016-04',
      endDate: '2019-05',
      current: false,
      highlights: [
        'Taught Mechanics, Electromagnetism, and Optics to Class 11–12 science batches.',
        'Developed chapter-wise conceptual question banks and laboratory manuals for senior students.',
      ],
    },
  ],
  education: [
    {
      id: 'pgt-edu-1',
      degree: 'Master of Science (M.Sc.) – Physics',
      school: 'Bangalore University',
      location: 'Karnataka',
      graduationDate: '2015',
      gpa: '79% (First Class)',
    },
    {
      id: 'pgt-edu-2',
      degree: 'Bachelor of Education (B.Ed.) – Physical Science',
      school: 'Regional Institute of Education (RIE)',
      location: 'Mysuru',
      graduationDate: '2016',
      gpa: '81%',
    },
  ],
  skills: [
    {
      id: 'pgt-sk-1',
      category: 'Senior Secondary Instruction',
      items: [
        'Class 11–12 Syllabus Delivery',
        'Board Exam Preparation',
        'Laboratory Practical Supervision',
        'Question Bank Design',
        'Academic Mentoring',
      ],
    },
    {
      id: 'pgt-sk-2',
      category: 'Tools & Assessment',
      items: ['PhET Physics Simulations', 'Smart Interactive Boards', 'MS Excel Performance Tracking', 'Google Classroom'],
    },
  ],
  certifications: [
    {
      id: 'pgt-cert-1',
      name: 'Karnataka State PGT Eligibility Qualification',
      issuer: 'Department of Education',
      date: '2017',
    },
    {
      id: 'pgt-cert-2',
      name: 'CBSE Senior Secondary Practical Examiner Orientation',
      issuer: 'CBSE',
      date: '2022',
    },
  ],
  achievements: [
    {
      id: 'pgt-ach-1',
      title: '100% Class 12 Board Pass Rate Recognition',
      date: '2024',
      description: 'Achieved 100% pass outcome across senior secondary Physics cohorts for 4 consecutive academic sessions.',
    },
  ],
  projects: [],
  languages: [
    { id: 'pgt-lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'pgt-lang-2', language: 'Malayalam', proficiency: 'Native' },
  ],
};

/**
 * 5. TGT TEACHER SAMPLE (Classes 6–10)
 */
export const TGT_TEACHER_RESUME: ResumeData = {
  id: 'sample-tgt-teacher',
  title: 'TGT Teacher Resume - Neha Gupta (TGT Science)',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'academic_teaching',
  themeColor: '#7a1f2b',
  fontFamily: 'playfair',
  spacing: 'normal',
  experienceLevel: 'experienced',
  sectionOrder: {
    singleColumn: ['summary', 'experience', 'education', 'skills', 'certifications', 'achievements'],
  },
  personalInfo: {
    fullName: 'Neha Gupta',
    jobTitle: 'Trained Graduate Teacher (TGT) Science | B.Sc. | B.Ed. | CTET Paper II',
    email: 'neha.gupta@email.com',
    phone: '+91 98111 22334',
    location: 'Jaipur, Rajasthan, India',
    summary:
      'Qualified Trained Graduate Teacher (TGT) of Science with 4 years of experience teaching Classes 6–10 under the CBSE curriculum. Skilled in structured lesson planning, hands-on science demonstrations, student assessment, and supporting mixed-ability classrooms.',
  },
  experience: [
    {
      id: 'tgt-exp-1',
      role: 'TGT Science Teacher (Classes 6–10)',
      company: 'St. Xavier’s High School',
      location: 'Jaipur',
      startDate: '2020-07',
      endDate: '',
      current: true,
      highlights: [
        'Deliver Science curriculum (Physics, Chemistry, Biology) to 160+ students across Classes 6–10.',
        'Prepare weekly lesson plans, lab demonstrations, and interactive visual presentations to clarify scientific concepts.',
        'Conduct unit tests, review notebooks, and provide structured feedback to improve student assessment outcomes.',
        'Organize annual school science exhibitions and mentor student teams for district science fairs.',
      ],
    },
  ],
  education: [
    {
      id: 'tgt-edu-1',
      degree: 'Bachelor of Education (B.Ed.) – Biological & Physical Sciences',
      school: 'University of Rajasthan',
      location: 'Jaipur',
      graduationDate: '2020',
      gpa: '80% (First Division)',
    },
    {
      id: 'tgt-edu-2',
      degree: 'Bachelor of Science (B.Sc.) – Chemistry & Biology',
      school: 'Maharani College',
      location: 'Jaipur',
      graduationDate: '2018',
      gpa: '76%',
    },
  ],
  skills: [
    {
      id: 'tgt-sk-1',
      category: 'Secondary Teaching',
      items: [
        'Lesson Planning',
        'Subject Knowledge (Science)',
        'Student Assessment',
        'Classroom Management',
        'Lab Demonstrations',
      ],
    },
    {
      id: 'tgt-sk-2',
      category: 'Digital Tools',
      items: ['Google Classroom', 'MS PowerPoint', 'Smart Board Tools', 'Quizizz'],
    },
  ],
  certifications: [
    {
      id: 'tgt-cert-1',
      name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified',
      issuer: 'CBSE',
      date: '2020',
    },
  ],
  achievements: [
    {
      id: 'tgt-ach-1',
      title: 'District Science Fair Mentor Award',
      date: '2023',
      description: 'Guided Class 9 student team to 2nd position at the District Level Science Exhibition.',
    },
  ],
  projects: [],
  languages: [
    { id: 'tgt-lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'tgt-lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

export function createTeacherResumeFromSample(sample: ResumeData, customTitle?: string): ResumeData {
  return {
    ...sample,
    id: `resume-teacher-${Date.now()}`,
    title: customTitle || sample.title,
    updatedAt: 'Just now',
  };
}
