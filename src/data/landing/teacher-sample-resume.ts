import { ResumeData } from '@/types/resume';

/**
 * Fresher Teacher Sample Resume (No formal experience / B.Ed Graduate)
 * Section Order: personalInfo (Header) -> summary -> education -> internships -> skills -> certifications -> projects
 */
export const FRESHER_TEACHER_SAMPLE_RESUME: ResumeData = {
  id: 'sample-fresher-teacher-resume',
  title: 'Fresher Teacher Resume - Aakash Sharma (B.Ed / CTET)',
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
    fullName: 'Aakash Sharma',
    jobTitle: 'Aspiring TGT English & Social Studies | B.Ed Graduate | CTET Qualified',
    email: 'aakash.sharma@email.com',
    phone: '+91 91234 56789',
    location: 'Lucknow, Uttar Pradesh',
    linkedin: 'linkedin.com/in/aakash-sharma-edu',
    summary:
      'Motivated, CTET Paper II qualified B.Ed graduate specializing in English and Social Studies. Completed a 16-week intensive student teaching internship at Kendriya Vidyalaya, formulating 40+ interactive lesson plans incorporating multimedia aids and active discussions. Experienced independent tutor with 2 years of proven success guiding middle school students to achieve a 25% improvement in English comprehension.',
  },
  education: [
    {
      id: 'fresh-edu-1',
      degree: 'Bachelor of Education (B.Ed) – English & Social Science Pedagogy',
      school: 'Lucknow University',
      location: 'Uttar Pradesh',
      graduationDate: '2024',
      gpa: '81.4% (First Division)',
      highlights: [
        'Trained in Micro-Teaching, Lesson Planning, NEP 2020 Experiential Pedagogy, and Assessment Rubrics.',
      ],
    },
    {
      id: 'fresh-edu-2',
      degree: 'Bachelor of Arts (B.A.) in English Literature & History',
      school: 'Lucknow University',
      location: 'Uttar Pradesh',
      graduationDate: '2022',
      gpa: '74.2%',
    },
  ],
  internships: [
    {
      id: 'fresh-int-1',
      role: 'Student Teacher (B.Ed Practicum Internship)',
      company: 'Kendriya Vidyalaya, Gomti Nagar',
      location: 'Lucknow, UP',
      startDate: '2023-10',
      endDate: '2024-02',
      current: false,
      highlights: [
        'Conducted daily English and Social Studies classes for 80+ Class 7 & 8 students under senior mentor supervision.',
        'Formulated 40+ comprehensive lesson plans integrating audio-visual storytelling, drama role-play, and vocabulary flashcards that lifted classroom engagement by 30%.',
        'Designed weekly formative quizzes and diagnostic worksheets that helped 14 underperforming students achieve passing grades in term assessments.',
      ],
    },
    {
      id: 'fresh-int-2',
      role: 'Private Academic Tutor (Middle School)',
      company: 'Independent Home Tutoring',
      location: 'Lucknow, UP',
      startDate: '2022-07',
      endDate: '2023-09',
      current: false,
      highlights: [
        'Provided personalized English grammar and literature tutoring to 12 Class 6–8 students, with all candidates securing first-division marks in final school exams.',
      ],
    },
  ],
  experience: [],
  skills: [
    {
      id: 'fresh-sk-1',
      category: 'Pedagogy & Lesson Delivery',
      items: [
        'Lesson Plan Formulation',
        'Activity-Based Learning (NEP 2020)',
        'Phonics & Grammar Pedagogy',
        'Interactive Storytelling',
        'Formative Quiz Design',
      ],
    },
    {
      id: 'fresh-sk-2',
      category: 'EdTech & Digital Tools',
      items: [
        'Google Classroom',
        'MS PowerPoint & Canva for Education',
        'Zoom & Google Meet',
        'Kahoot Interactive Games',
      ],
    },
    {
      id: 'fresh-sk-3',
      category: 'Classroom & Soft Skills',
      items: [
        'Student Rapport Building',
        'Patience & Empathy',
        'Clear Oral & Written Communication',
        'Adaptability',
      ],
    },
  ],
  certifications: [
    {
      id: 'fresh-cert-1',
      name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified',
      issuer: 'CBSE, Delhi',
      date: '2024',
    },
    {
      id: 'fresh-cert-2',
      name: 'Certificate in Digital Pedagogy & Classroom Technology',
      issuer: 'Coursera',
      date: '2023',
    },
    {
      id: 'fresh-cert-3',
      name: 'Certificate of Excellence in Student Teaching',
      issuer: 'Kendriya Vidyalaya',
      date: '2024',
    },
  ],
  projects: [
    {
      id: 'fresh-proj-1',
      title: 'Interactive English Storytelling & Visual Aid Kit (B.Ed Action Research)',
      technologies: ['Canva for Education', 'Flashcards', 'NEP 2020'],
      highlights: [
        'Designed a 20-module visual grammar and vocabulary aid kit tested across 80 Class 7 students, improving reading comprehension test scores by 25%.',
        'Created bilingual audio-visual flashcards and role-play scripts to help ESL learners grasp active/passive voice and tenses.',
      ],
    },
    {
      id: 'fresh-proj-2',
      title: 'Class 6–8 Diagnostic Worksheet & Gamified Quiz Bank',
      technologies: ['Kahoot', 'Google Forms', 'Formative Assessment'],
      highlights: [
        'Developed a structured question bank of 150+ diagnostic MCQs and remedial worksheets for English grammar and Social Science.',
      ],
    },
  ],
  languages: [
    {
      id: 'fresh-lang-1',
      language: 'English',
      proficiency: 'Fluent (Academic Instruction)',
    },
    {
      id: 'fresh-lang-2',
      language: 'Hindi',
      proficiency: 'Native',
    },
  ],
};

/**
 * Experienced Teacher Sample Resume using the 'academic_teaching' (Scholar / Teacher) template.
 * Section Order: personalInfo (Header) -> summary -> experience -> education -> skills -> certifications -> achievements
 */
export const TEACHER_SAMPLE_RESUME: ResumeData = {
  id: 'sample-teacher-resume',
  title: 'Teacher Resume - Pooja Verma (CBSE / TGT)',
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
    jobTitle: 'Senior TGT Mathematics & Science | CTET Paper II Qualified | B.Ed',
    email: 'pooja.verma@email.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    linkedin: 'linkedin.com/in/pooja-verma-edu',
    summary:
      'Passionate, CTET-qualified TGT Mathematics & Science Educator with 7+ years of experience delivering CBSE and ICSE curricula for Classes 8–10. Proven track record of lifting cohort board averages by 16% and sustaining a 100% board examination pass rate across 5 consecutive academic sessions. Adept at integrating interactive Smartboard visual modules, diagnostic assessment rubrics, and personalized remedial circles to nurture conceptual confidence in diverse learners.',
  },
  experience: [
    {
      id: 'teach-exp-1',
      role: 'Senior TGT Mathematics Teacher',
      company: 'Delhi Public School (DPS), R.K. Puram',
      location: 'New Delhi',
      startDate: '2021-07',
      endDate: '',
      current: true,
      highlights: [
        'Deliver rigorous CBSE Mathematics curriculum across 4 sections of Class 9 & 10 (145+ students annually), achieving 100% board exam pass rate with 42 subject distinctions in 2024.',
        'Integrated GeoGebra visual simulations and Promethean Smart Board modules, increasing daily student active participation and concept retention by 35%.',
        'Formulated bi-weekly diagnostic skill tests and after-school remedial circles that elevated 26 borderline students from 44% to a 71% average in term finals.',
        'Appointed House Mistress (Ganga House): coordinated 12 inter-house cultural and academic events, winning the Overall Champion Trophy for 2023–24.',
      ],
    },
    {
      id: 'teach-exp-2',
      role: 'TGT Science & Math Teacher',
      company: 'St. Xavier’s Senior Secondary School',
      location: 'Jaipur, Rajasthan',
      startDate: '2018-04',
      endDate: '2021-06',
      current: false,
      highlights: [
        'Taught Integrated Science and Mathematics to 160+ students in Classes 7 and 8 adhering to NCERT and state-board guidelines.',
        'Supervised junior physics and chemistry laboratories, orchestrating 30+ hands-on experimental demonstrations per term with zero safety incidents.',
        'Mentored 6 students who qualified for the National Science Olympiad (NSO) regional finals with 2 state ranks.',
        'Conducted quarterly Parent-Teacher Meetings (PTM) with 98% positive parent satisfaction ratings regarding transparent progress feedback.',
      ],
    },
  ],
  education: [
    {
      id: 'teach-edu-1',
      degree: 'Bachelor of Education (B.Ed) – Pedagogy of Mathematics & Physical Science',
      school: 'Central Institute of Education (CIE), University of Delhi',
      location: 'New Delhi',
      graduationDate: '2018',
      gpa: 'First Division with Distinction (82%)',
      highlights: [
        'Specialized in Differentiated Instruction, Experiential Pedagogy (NEP 2020), and Continuous & Comprehensive Evaluation (CCE).',
      ],
    },
    {
      id: 'teach-edu-2',
      degree: 'Bachelor of Science (B.Sc) in Mathematics & Physics',
      school: 'Hansraj College, University of Delhi',
      location: 'New Delhi',
      graduationDate: '2016',
      gpa: '78.5%',
    },
  ],
  skills: [
    {
      id: 'teach-skill-1',
      category: 'Pedagogy & Curriculum',
      items: [
        'CBSE & ICSE Syllabus Planning',
        'Differentiated Instruction',
        'Formative & Diagnostic Assessment',
        'Remedial Learning Plans',
        'Bloom’s Taxonomy Application',
      ],
    },
    {
      id: 'teach-skill-2',
      category: 'EdTech & Digital Tools',
      items: [
        'Interactive Smart Boards',
        'Google Classroom & Drive',
        'GeoGebra & PhET Simulations',
        'MS Teams for Education',
        'Kahoot & Quizizz',
      ],
    },
    {
      id: 'teach-skill-3',
      category: 'Classroom & Leadership',
      items: [
        'Classroom Behavioral Management',
        'Parent-Teacher Communication',
        'House Mistress Leadership',
        'Student Mentoring',
      ],
    },
  ],
  certifications: [
    {
      id: 'teach-cert-1',
      name: 'Central Teacher Eligibility Test (CTET) – Paper II (Elementary) Qualified',
      issuer: 'CBSE, Delhi',
      date: '2019',
    },
    {
      id: 'teach-cert-2',
      name: 'CBSE Capacity Building Workshop on Experiential Learning & NEP 2020',
      issuer: 'CBSE Centre of Excellence',
      date: '2023',
    },
    {
      id: 'teach-cert-3',
      name: 'Google Certified Educator Level 1',
      issuer: 'Google for Education',
      date: '2022',
    },
  ],
  achievements: [
    {
      id: 'teach-ach-1',
      title: 'Best Educator Award (100% Board Result Excellence)',
      date: '2024',
      description:
        'Awarded by DPS Management for mentoring 42 students to 90%+ distinctions in CBSE Class 10 Mathematics.',
    },
    {
      id: 'teach-ach-2',
      title: 'Inter-House Champion Trophy Leadership',
      date: '2023',
      description:
        'Led Ganga House (350+ students) to win the Overall Academic & Cultural Rolling Trophy.',
    },
  ],
  projects: [],
  languages: [
    {
      id: 'teach-lang-1',
      language: 'English',
      proficiency: 'Fluent (Professional Academic Instruction)',
    },
    {
      id: 'teach-lang-2',
      language: 'Hindi',
      proficiency: 'Native',
    },
  ],
};

/**
 * Creates a unique fresh clone of the Teacher Sample resume for immediate builder editing.
 */
export function createTeacherResumeFromSample(
  overrideTitle?: string,
  preferFresher = false
): ResumeData {
  const newId = `resume-teacher-${Date.now()}`;
  const source = preferFresher ? FRESHER_TEACHER_SAMPLE_RESUME : TEACHER_SAMPLE_RESUME;
  return {
    ...source,
    id: newId,
    title: overrideTitle || (preferFresher ? 'Fresher Teacher Resume' : 'Teacher Resume - Custom Template'),
    updatedAt: 'Just now',
  };
}
