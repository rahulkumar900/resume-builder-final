import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
// @ts-expect-error word-extractor has no type definitions
import WordExtractor from 'word-extractor';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;
    const targetMarket = (formData.get('targetMarket') as string) || 'global';

    if (!file && !text) {
      return NextResponse.json({ error: 'No file or text provided for extraction.' }, { status: 400 });
    }

    const autoMagic = formData.get('autoMagic') === 'true';

    const prompt = `
You are an expert technical recruiter and resume parsing AI.
I will provide you with a resume (either as text or as a document). 
I need you to extract this directly into our strict ResumeData JSON schema.

IMPORTANT: You must analyze the candidate's background and make the following decisions:
1. "recommendedRole": Determine their primary job title (e.g. "Senior React Developer", "Data Analyst").
2. "recommendedExperience": Choose one of ["entry", "mid", "senior"] based on their years of experience.
3. "recommendedTemplate": Select the best template for their industry from ["ats", "prawira", "santoso", "chastain", "amelia", "rahadian", "madrid", "vienna"].
   - "ats" for traditional, corporate or finance roles.
   - "prawira" or "madrid" for modern tech and engineering roles.
   - "santoso" or "chastain" for creative, marketing or product roles.
4. "recommendedSections": A list of sections this candidate actually has data for. Choose from: ["personal", "summary", "experience", "education", "skills", "projects", "certifications", "languages", "publications"]. Order them logically based on their experience level.

Extract the text into this exact JSON schema:
{
  "recommendedRole": "string",
  "recommendedExperience": "string",
  "recommendedTemplate": "string",
  "recommendedSections": ["string"],
  "resumeData": {
    "personalInfo": {
      "fullName": "Full Name",
      "jobTitle": "Target Title / Role",
      "email": "email@example.com",
      "phone": "+1 (555) 000-0000",
      "location": "City, State / Country",
      "website": "portfolio or website url",
      "linkedin": "linkedin url or handle",
      "github": "github url or handle",
      "summary": "Professional summary paragraph"
    },
    "experience": [
      {
        "id": "exp-1",
        "company": "Company Name",
        "role": "Job Title",
        "location": "City, State",
        "startDate": "Month Year",
        "endDate": "Month Year or Present",
        "current": true,
        "highlights": [
          "Accomplishment or responsibility statement 1",
          "Accomplishment or responsibility statement 2"
        ]
      }
    ],
    "education": [
      {
        "id": "edu-1",
        "school": "University / College / School Name",
        "degree": "B.S. in Computer Science (or degree title)",
        "location": "City, State",
        "graduationDate": "Year or Month Year",
        "gpa": "GPA or score if provided",
        "highlights": ["Relevant coursework, honors, or activities"]
      }
    ],
    "skills": [
      {
        "id": "sk-1",
        "category": "Category Name (e.g. Programming Languages, Frameworks, Tools, Soft Skills)",
        "items": ["Skill 1", "Skill 2", "Skill 3"]
      }
    ],
    "projects": [
      {
        "id": "proj-1",
        "title": "Project Title",
        "link": "https://github.com/project",
        "technologies": ["React", "TypeScript", "Node.js"],
        "highlights": ["Key achievement or description of the project"]
      }
    ],
    "certifications": [
      {
        "id": "cert-1",
        "name": "Certification Title",
        "issuer": "Issuing Organization",
        "date": "Year or Date Issued",
        "url": ""
      }
    ],
    "languages": [
      {
        "id": "lang-1",
        "language": "Language Name",
        "proficiency": "Native / Fluent / Professional / Conversational"
      }
    ]
  }
}

Return ONLY valid JSON. Do not include markdown formatting like \`\`\`json. Do not invent details, extract only what is genuinely present in the document.
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    let result;

    if (file) {
      const buffer = await file.arrayBuffer();
      const mimeType = file.type;
      const fileName = (file.name || '').toLowerCase();

      if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
        // Send PDF directly to Gemini
        const base64Data = Buffer.from(buffer).toString('base64');
        result = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: 'application/pdf',
            },
          },
        ]);
      } else if (
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')
      ) {
        // Extract text from DOCX using mammoth
        try {
          const docxBuffer = Buffer.from(buffer);
          const { value: extractedText } = await mammoth.extractRawText({ buffer: docxBuffer });
          result = await model.generateContent(prompt + '\n\nHere is the resume document text:\n"""\n' + extractedText + '\n"""');
        } catch (docxErr) {
          // Fallback to word-extractor if mammoth encounters an issue
          const docBuffer = Buffer.from(buffer);
          const extractor = new WordExtractor();
          const extractedDoc = await extractor.extract(docBuffer);
          const extractedText = extractedDoc.getBody();
          result = await model.generateContent(prompt + '\n\nHere is the resume document text:\n"""\n' + extractedText + '\n"""');
        }
      } else if (
        mimeType === 'application/msword' ||
        fileName.endsWith('.doc')
      ) {
        // Extract text from legacy DOC using word-extractor
        const docBuffer = Buffer.from(buffer);
        const extractor = new WordExtractor();
        const extractedDoc = await extractor.extract(docBuffer);
        const extractedText = extractedDoc.getBody();
        result = await model.generateContent(prompt + '\n\nHere is the resume document text:\n"""\n' + extractedText + '\n"""');
      } else {
        // Fallback: attempt to parse as text, docx, or doc
        try {
          const docBuffer = Buffer.from(buffer);
          const extractor = new WordExtractor();
          const extractedDoc = await extractor.extract(docBuffer);
          const extractedText = extractedDoc.getBody();
          if (extractedText && extractedText.trim().length > 10) {
            result = await model.generateContent(prompt + '\n\nHere is the resume document text:\n"""\n' + extractedText + '\n"""');
          } else {
            throw new Error('Fallback returned empty');
          }
        } catch {
          return NextResponse.json(
            { error: 'Unsupported file type. Please upload a PDF, DOCX, or DOC file.' },
            { status: 400 }
          );
        }
      }
    } else {
      // Just text
      result = await model.generateContent(prompt + '\n\nHere is the text:\n"""\n' + text + '\n"""');
    }

    const response = await result.response;
    let jsonString = response.text();
    
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
    } else if (jsonString.startsWith('\`\`\`')) {
      jsonString = jsonString.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
    }

    const parsedData = JSON.parse(jsonString);

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error: any) {
    console.error('Error in extraction API:', error);
    return NextResponse.json({ error: error.message || 'Failed to extract resume data' }, { status: 500 });
  }
}
