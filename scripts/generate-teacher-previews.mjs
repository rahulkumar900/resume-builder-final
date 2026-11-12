import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SAMPLES = [
  {
    filename: 'teacher-fresher.webp',
    name: 'Rahul Kumar',
    jobTitle: 'Aspiring TGT English & Social Science Teacher | B.Ed | CTET Paper II',
    contact: 'rahul.kumar@email.com  ·  +91 91234 56789  ·  Patna, Bihar, India',
    summary:
      'Motivated and dedicated B.Ed. graduate with a strong foundation in educational psychology, lesson planning, and student-centred teaching methodologies. Skilled in classroom management, interactive learning activities, and student assessment. Eager to create an engaging and supportive learning environment that encourages academic growth and student development.',
    sections: [
      {
        heading: 'Education',
        items: [
          {
            title: 'Bachelor of Education (B.Ed.) – English & Social Science Pedagogy',
            date: '2024',
            sub: 'Patna University, Bihar · 78% (First Division)',
            bullets: ['Trained in micro-teaching, lesson plan design, and formative student assessment.'],
          },
          {
            title: 'Bachelor of Arts (B.A.) – English Literature & History',
            date: '2022',
            sub: 'Magadh University, Bihar · 75%',
            bullets: [],
          },
        ],
      },
      {
        heading: 'Teaching Internships & Practice',
        items: [
          {
            title: 'Teaching Intern (B.Ed. Teaching Practice)',
            date: 'Nov 2023 – Feb 2024',
            sub: 'Government Middle School, Patna, Bihar',
            bullets: [
              'Conducted supervised classroom teaching sessions for 75+ students in Classes 6–8.',
              'Prepared 35+ structured lesson plans for English and Social Science aligned with the school syllabus.',
              'Used visual charts, flashcards, and group activities to support student understanding and participation.',
              'Assisted senior teachers in evaluating weekly assignments and maintaining attendance records.',
            ],
          },
        ],
      },
      {
        heading: 'Skills',
        skills: [
          { cat: 'Teaching & Instruction', list: 'Lesson Planning · Activity-Based Learning · Child-Centred Teaching · Classroom Management · Student Assessment' },
          { cat: 'Educational Technology', list: 'MS Word & PowerPoint · Google Classroom · Smart Board Basics · Online Quizzes' },
        ],
      },
      {
        heading: 'Certifications',
        certs: [
          { name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified', meta: 'CBSE · 2024' },
          { name: 'Certificate in Educational Technology', meta: 'DIKSHA / NCERT · 2023' },
        ],
      },
      {
        heading: 'Academic Projects',
        items: [
          {
            title: 'Activity-Based English & Grammar Learning Kit',
            date: '2024',
            sub: 'Visual Flashcards · Role-Play Scripts · Formative Quizzes',
            bullets: [
              'Designed interactive grammar activities and visual flashcards to simplify parts of speech for middle-school learners.',
              'Developed diagnostic practice exercises to evaluate student reading comprehension progress.',
            ],
          },
        ],
      },
    ],
  },
  {
    filename: 'teacher-experienced.webp',
    name: 'Pooja Verma',
    jobTitle: 'Senior Mathematics Teacher (Classes 8–10) | B.Ed. | CTET Qualified',
    contact: 'pooja.verma@email.com  ·  +91 98765 43210  ·  New Delhi, India',
    summary:
      'Dedicated Mathematics Teacher with 6+ years of experience teaching secondary-level students across CBSE schools. Skilled in curriculum planning, classroom management, differentiated instruction, and student performance assessment. Experienced in developing engaging lesson plans and supporting students in improving their mathematical understanding and board examination readiness.',
    sections: [
      {
        heading: 'Teaching Experience',
        items: [
          {
            title: 'Senior Mathematics Teacher',
            date: 'July 2021 – Present',
            sub: 'ABC Public School, New Delhi',
            bullets: [
              'Teach Mathematics to 140+ students in Classes 8–10 using interactive and problem-solving-based teaching methods.',
              'Prepared structured lesson plans aligned with the prescribed CBSE curriculum and conducted regular formative assessments.',
              'Provided additional remedial academic support to struggling learners, helping improve term assessment scores.',
              'Communicated regularly with parents during Parent-Teacher Meetings regarding student academic progress.',
            ],
          },
          {
            title: 'Mathematics Teacher',
            date: 'Apr 2018 – Jun 2021',
            sub: 'XYZ Academy, Jaipur, Rajasthan',
            bullets: [
              'Delivered daily Mathematics instruction for Classes 6–8 across 4 sections.',
              'Evaluated weekly assignments and conducted individual feedback sessions to identify learning gaps.',
              'Coordinated inter-house mathematics quiz competitions and annual academic exhibitions.',
            ],
          },
        ],
      },
      {
        heading: 'Education',
        items: [
          {
            title: 'Bachelor of Education (B.Ed.) – Pedagogy of Mathematics',
            date: '2018',
            sub: 'University of Delhi, New Delhi · 80% (First Division)',
            bullets: [],
          },
          {
            title: 'Bachelor of Science (B.Sc.) – Mathematics',
            date: '2016',
            sub: 'University of Rajasthan, Jaipur · 77%',
            bullets: [],
          },
        ],
      },
      {
        heading: 'Skills',
        skills: [
          { cat: 'Instruction & Assessment', list: 'Curriculum Implementation · Differentiated Instruction · Board Exam Preparation · Remedial Support' },
          { cat: 'EdTech & Administration', list: 'Smart Classroom Tools · Google Classroom · MS Excel Gradebooks · Parent Communication' },
        ],
      },
      {
        heading: 'Certifications',
        certs: [
          { name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified', meta: 'CBSE · 2019' },
          { name: 'CBSE Capacity Building Workshop on Competency-Based Assessment', meta: 'CBSE · 2023' },
        ],
      },
      {
        heading: 'Honours & Achievements',
        items: [
          {
            title: 'Best Teacher Recognition for Classroom Performance',
            date: '2024',
            sub: 'Recognized for consistent Class 10 board pass results and remedial mentoring.',
            bullets: [],
          },
        ],
      },
    ],
  },
  {
    filename: 'teacher-primary.webp',
    name: 'Ananya Sen',
    jobTitle: 'Primary School Teacher (PRT - Classes 1–5) | D.El.Ed. | CTET Paper I',
    contact: 'ananya.sen@email.com  ·  +91 97654 32109  ·  Kolkata, West Bengal',
    summary:
      'Enthusiastic Primary School Teacher with 3+ years of experience teaching foundational English, Mathematics, and Environmental Studies to young learners (Classes 1–5). Skilled in activity-based learning, phonics instruction, classroom management, and child-centred teaching methods. Committed to creating a positive classroom environment that supports students’ academic, social, and emotional development.',
    sections: [
      {
        heading: 'Teaching Experience',
        items: [
          {
            title: 'Primary School Teacher (PRT)',
            date: 'June 2021 – Present',
            sub: 'Bright Future Public School, Kolkata',
            bullets: [
              'Teach English, Mathematics, and Environmental Studies to 38 primary students in Classes 1–4.',
              'Designed interactive storytelling, phonics, and sensory group activities to build foundational literacy and numeracy.',
              'Evaluated students through classroom exercises, notebooks, and periodic assessments, maintaining progress records.',
              'Collaborated closely with parents during PTMs to share developmental milestones and learning support tips.',
            ],
          },
        ],
      },
      {
        heading: 'Education',
        items: [
          {
            title: 'Diploma in Elementary Education (D.El.Ed.)',
            date: '2021',
            sub: 'West Bengal Board of Primary Education · 84% (First Division)',
            bullets: [],
          },
          {
            title: 'Bachelor of Arts (B.A.) – English',
            date: '2019',
            sub: 'University of Calcutta, Kolkata · 72%',
            bullets: [],
          },
        ],
      },
      {
        heading: 'Skills',
        skills: [
          { cat: 'Primary Pedagogy', list: 'Activity-Based Learning · Phonics & Early Reading · Foundational Numeracy · Storytelling · Child-Centred Instruction' },
          { cat: 'Classroom & Parent Care', list: 'Positive Reinforcement · Progress Record Tracking · Parent-Teacher Communication · Creative Craft' },
        ],
      },
      {
        heading: 'Certifications',
        certs: [
          { name: 'Central Teacher Eligibility Test (CTET) – Paper I Qualified', meta: 'CBSE · 2021' },
          { name: 'Certificate in Foundational Literacy & Numeracy (FLN)', meta: 'NIPUN Bharat · 2023' },
        ],
      },
      {
        heading: 'Honours & Achievements',
        items: [
          {
            title: 'Annual Cultural & Reading Fair Coordinator',
            date: '2023',
            sub: 'Directed primary wing storytelling showcase involving 100% student participation.',
            bullets: [],
          },
        ],
      },
    ],
  },
  {
    filename: 'teacher-tgt.webp',
    name: 'Neha Gupta',
    jobTitle: 'Trained Graduate Teacher (TGT) Science | B.Sc. | B.Ed. | CTET Paper II',
    contact: 'neha.gupta@email.com  ·  +91 98111 22334  ·  Jaipur, Rajasthan',
    summary:
      'Qualified Trained Graduate Teacher (TGT) of Science with 4 years of experience teaching Classes 6–10 under the CBSE curriculum. Skilled in structured lesson planning, hands-on science demonstrations, student assessment, and supporting mixed-ability classrooms.',
    sections: [
      {
        heading: 'Teaching Experience',
        items: [
          {
            title: 'TGT Science Teacher (Classes 6–10)',
            date: 'July 2020 – Present',
            sub: 'St. Xavier’s High School, Jaipur',
            bullets: [
              'Deliver Science curriculum (Physics, Chemistry, Biology) to 160+ students across Classes 6–10.',
              'Prepare weekly lesson plans, lab demonstrations, and interactive visual presentations to clarify scientific concepts.',
              'Conduct unit tests, review notebooks, and provide structured feedback to improve student assessment outcomes.',
              'Organize annual school science exhibitions and mentor student teams for district science fairs.',
            ],
          },
        ],
      },
      {
        heading: 'Education',
        items: [
          {
            title: 'Bachelor of Education (B.Ed.) – Biological & Physical Sciences',
            date: '2020',
            sub: 'University of Rajasthan, Jaipur · 80% (First Division)',
            bullets: [],
          },
          {
            title: 'Bachelor of Science (B.Sc.) – Chemistry & Biology',
            date: '2018',
            sub: 'Maharani College, Jaipur · 76%',
            bullets: [],
          },
        ],
      },
      {
        heading: 'Skills',
        skills: [
          { cat: 'Secondary Teaching', list: 'Lesson Planning · Subject Knowledge (Science) · Student Assessment · Classroom Management · Lab Demonstrations' },
          { cat: 'Digital Tools', list: 'Google Classroom · MS PowerPoint · Smart Board Tools · Quizizz' },
        ],
      },
      {
        heading: 'Certifications',
        certs: [
          { name: 'Central Teacher Eligibility Test (CTET) – Paper II Qualified', meta: 'CBSE · 2020' },
        ],
      },
      {
        heading: 'Honours & Achievements',
        items: [
          {
            title: 'District Science Fair Mentor Award',
            date: '2023',
            sub: 'Guided Class 9 student team to 2nd position at the District Level Science Exhibition.',
            bullets: [],
          },
        ],
      },
    ],
  },
  {
    filename: 'teacher-pgt.webp',
    name: 'Rajeev Nambiar',
    jobTitle: 'Post Graduate Teacher (PGT) Physics | M.Sc. Physics | B.Ed.',
    contact: 'rajeev.nambiar@email.com  ·  +91 98450 12345  ·  Bengaluru, Karnataka',
    summary:
      'Experienced Post Graduate Teacher (PGT) of Physics with 8+ years of senior secondary (Classes 11–12) teaching experience across CBSE institutions. Skilled in advanced curriculum delivery, board examination preparation, laboratory practical supervision, and analytical problem-solving instruction.',
    sections: [
      {
        heading: 'Teaching Experience',
        items: [
          {
            title: 'PGT Physics Teacher (Classes 11 & 12)',
            date: 'June 2019 – Present',
            sub: 'National Senior Secondary School, Bengaluru',
            bullets: [
              'Deliver senior secondary CBSE Physics curriculum across 4 sections of Classes 11 and 12 (150+ students).',
              'Conducted structured board exam revision tests, assertion-reason practice modules, and pre-board evaluations.',
              'Supervised senior physics laboratory practicals, ensuring apparatus readiness and strict safety adherence.',
              'Mentored students preparing for engineering and medical foundation assessments through extra doubt sessions.',
            ],
          },
          {
            title: 'Physics Lecturer (Higher Secondary)',
            date: 'Apr 2016 – May 2019',
            sub: 'St. Joseph’s Pre-University College, Bengaluru',
            bullets: [
              'Taught Mechanics, Electromagnetism, and Optics to Class 11–12 science batches.',
              'Developed chapter-wise conceptual question banks and laboratory manuals for senior students.',
            ],
          },
        ],
      },
      {
        heading: 'Education',
        items: [
          {
            title: 'Master of Science (M.Sc.) – Physics',
            date: '2015',
            sub: 'Bangalore University, Karnataka · 79% (First Class)',
            bullets: [],
          },
          {
            title: 'Bachelor of Education (B.Ed.) – Physical Science',
            date: '2016',
            sub: 'Regional Institute of Education (RIE), Mysuru · 81%',
            bullets: [],
          },
        ],
      },
      {
        heading: 'Skills',
        skills: [
          { cat: 'Senior Secondary Instruction', list: 'Class 11–12 Syllabus Delivery · Board Exam Preparation · Lab Practical Supervision · Question Bank Design' },
          { cat: 'Tools & Assessment', list: 'PhET Physics Simulations · Smart Interactive Boards · MS Excel Performance Tracking · Google Classroom' },
        ],
      },
      {
        heading: 'Certifications',
        certs: [
          { name: 'Karnataka State PGT Eligibility Qualification', meta: 'Dept. of Education · 2017' },
          { name: 'CBSE Senior Secondary Practical Examiner Orientation', meta: 'CBSE · 2022' },
        ],
      },
    ],
  },
];

function renderHtml(sample) {
  const sectionsHtml = sample.sections
    .map((sec) => {
      if (sec.items) {
        return `
          <div class="section">
            <div class="sec-header">
              <h2>${sec.heading}</h2>
              <div class="sec-line"></div>
            </div>
            ${sec.items
              .map(
                (item) => `
              <div class="item">
                <div class="item-top">
                  <span class="item-title">${item.title}</span>
                  <span class="item-date">${item.date}</span>
                </div>
                <div class="item-sub">${item.sub}</div>
                ${
                  item.bullets && item.bullets.length
                    ? `<ul>${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
                    : ''
                }
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }
      if (sec.skills) {
        return `
          <div class="section">
            <div class="sec-header">
              <h2>${sec.heading}</h2>
              <div class="sec-line"></div>
            </div>
            ${sec.skills
              .map(
                (s) => `<div class="skill-row"><strong>${s.cat}:</strong> <span>${s.list}</span></div>`
              )
              .join('')}
          </div>
        `;
      }
      if (sec.certs) {
        return `
          <div class="section">
            <div class="sec-header">
              <h2>${sec.heading}</h2>
              <div class="sec-line"></div>
            </div>
            ${sec.certs
              .map(
                (c) => `
              <div class="item-top" style="margin-bottom: 4px;">
                <span class="item-title">${c.name}</span>
                <span class="item-date">${c.meta}</span>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }
      return '';
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 794px;
            min-height: 1123px;
            background: #ffffff;
            color: #222222;
            font-family: Georgia, "Times New Roman", serif;
            padding: 40px 44px;
          }
          .header {
            text-align: center;
            padding-bottom: 12px;
            border-bottom: 2px solid #7a1f2b;
            margin-bottom: 16px;
          }
          .header-inner {
            border-bottom: 0.75px solid #7a1f2b;
            padding-bottom: 10px;
          }
          h1 {
            font-size: 30px;
            font-weight: 700;
            color: #111111;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .job-title {
            font-size: 13.5px;
            font-weight: 600;
            color: #7a1f2b;
            margin-bottom: 5px;
          }
          .contact {
            font-size: 11.5px;
            color: #444444;
          }
          .section {
            margin-top: 15px;
          }
          .sec-header {
            margin-bottom: 8px;
          }
          .sec-header h2 {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #7a1f2b;
          }
          .sec-line {
            width: 100%;
            height: 0.85px;
            background: #7a1f2b;
            margin-top: 2px;
          }
          .summary {
            font-size: 12px;
            line-height: 1.55;
            text-align: justify;
            color: #222222;
          }
          .item {
            margin-bottom: 10px;
          }
          .item-top {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 12px;
          }
          .item-title {
            font-size: 12.5px;
            font-weight: 700;
            color: #111111;
          }
          .item-date {
            font-size: 11.5px;
            font-weight: 500;
            color: #444444;
            white-space: nowrap;
          }
          .item-sub {
            font-size: 12px;
            font-style: italic;
            color: #333333;
            margin-top: 1px;
          }
          ul {
            margin-top: 4px;
            padding-left: 18px;
          }
          li {
            font-size: 11.8px;
            line-height: 1.48;
            color: #222222;
            margin-bottom: 2.5px;
          }
          .skill-row {
            font-size: 11.8px;
            line-height: 1.5;
            margin-bottom: 3px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-inner">
            <h1>${sample.name}</h1>
            <div class="job-title">${sample.jobTitle}</div>
            <div class="contact">${sample.contact}</div>
          </div>
        </div>

        <div class="section">
          <div class="sec-header">
            <h2>Profile</h2>
            <div class="sec-line"></div>
          </div>
          <p class="summary">${sample.summary}</p>
        </div>

        ${sectionsHtml}
      </body>
    </html>
  `;
}

async function run() {
  const outDir = path.resolve('public', 'templates');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: path.resolve('.pup-temp', `teacher-gen-${Date.now()}`),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const tempHtmlPath = path.resolve('scripts', 'temp-teacher.html');

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    for (const sample of SAMPLES) {
      fs.writeFileSync(tempHtmlPath, renderHtml(sample), 'utf-8');
      await page.goto(`file:///${tempHtmlPath.replace(/\\/g, '/')}`, { waitUntil: 'load' });
      const outPath = path.join(outDir, sample.filename);
      await page.screenshot({ path: outPath, type: 'webp', quality: 92, fullPage: true });
      console.log(`✓ Generated ${outPath}`);
    }
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      try { fs.unlinkSync(tempHtmlPath); } catch {}
    }
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
