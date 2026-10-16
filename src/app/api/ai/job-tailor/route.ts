import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '@/types/resume';
import { analyzeJobForTailoring } from '@/lib/ai/job-tailor';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobDescription, resume }: { jobDescription: string; resume: ResumeData } = body;

    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json(
        { error: 'Job description is required.' },
        { status: 400 }
      );
    }

    // Default fast analysis
    const baselineAnalysis = analyzeJobForTailoring(jobDescription, resume);

    // If Gemini is not available, return baseline analysis immediately
    if (!genAI || !apiKey) {
      return NextResponse.json({
        result: baselineAnalysis,
        provider: 'heuristic',
      });
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const firstExperience = resume.experience?.[0];
      const prompt = `
You are an expert executive recruiter and ATS resume optimization engine.
Analyze the following Job Description against the Candidate's Resume.

Job Description:
"""
${jobDescription.slice(0, 3000)}
"""

Candidate Current Target Role: ${resume.personalInfo?.jobTitle || 'Software Professional'}
Candidate Current Summary: ${resume.personalInfo?.summary || ''}
Candidate First Role (${firstExperience?.role || 'Engineer'} at ${firstExperience?.company || 'Company'}):
${(firstExperience?.highlights || []).map((h, i) => `- [Bullet ${i + 1}] ${h}`).join('\n')}

Generate a JSON object with this exact structure:
{
  "targetRole": "Exact job title extracted from JD (e.g. Senior Frontend Developer)",
  "seniorityLevel": "Seniority inferred (e.g. Entry, Mid, Senior, Lead)",
  "suggestedSummary": {
    "suggested": "A compelling 2-3 sentence executive resume summary tailored directly for this job, mentioning core technologies and measurable impact.",
    "reason": "Brief explanation of why this elevates the candidate's profile."
  },
  "bulletProposals": [
    {
      "originalBullet": "Original bullet from candidate resume",
      "suggestedBullet": "Rewritten bullet using Google's X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z]. Begins with a strong action verb and adds realistic metrics and JD keywords.",
      "keywordsInjected": ["Keyword 1", "Keyword 2"],
      "reason": "Why this change improves recruiter match."
    }
  ]
}
`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const parsed = JSON.parse(text);

      // Merge Gemini suggestions onto baseline analysis
      if (parsed.targetRole) {
        baselineAnalysis.targetRole = parsed.targetRole;
      }
      if (parsed.suggestedSummary?.suggested) {
        baselineAnalysis.suggestedSummary.suggested = parsed.suggestedSummary.suggested;
        if (parsed.suggestedSummary.reason) {
          baselineAnalysis.suggestedSummary.reason = parsed.suggestedSummary.reason;
        }
      }
      if (Array.isArray(parsed.bulletProposals) && parsed.bulletProposals.length > 0) {
        baselineAnalysis.bulletProposals = parsed.bulletProposals.map((bp: any, idx: number) => ({
          id: `tailored-bullet-${idx + 1}`,
          experienceId: firstExperience?.id || 'exp-1',
          role: firstExperience?.role || baselineAnalysis.targetRole,
          company: firstExperience?.company || 'Organization',
          originalBullet: bp.originalBullet || baselineAnalysis.bulletProposals[idx]?.originalBullet || '',
          suggestedBullet: bp.suggestedBullet || baselineAnalysis.bulletProposals[idx]?.suggestedBullet || '',
          keywordsInjected: bp.keywordsInjected || ['Impact', 'Performance'],
          reason: bp.reason || 'Optimized for role keywords.',
          approved: true,
        }));
      }

      return NextResponse.json({
        result: baselineAnalysis,
        provider: 'gemini',
      });
    } catch (aiErr) {
      console.warn('Gemini optimization failed, using heuristic engine:', aiErr);
      return NextResponse.json({
        result: baselineAnalysis,
        provider: 'heuristic',
      });
    }
  } catch (error: any) {
    console.error('Job tailor error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze job description' },
      { status: 500 }
    );
  }
}
