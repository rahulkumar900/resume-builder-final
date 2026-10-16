/**
 * @file route.ts
 * @description Next.js Route Handler for generating section-specific AI suggestions using Google Gemini.
 *
 * SOLID Principles Alignment:
 * - Single Responsibility Principle (SRP): Dedicated solely to processing suggestion requests,
 *   prompt engineering for Gemini, and delivering structured JSON responses.
 * - Dependency Inversion: Exposes a standardized HTTP contract consumed by client suggestion services.
 */

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiSuggestionRequest } from '@/lib/ai/types';
import {
  fetchRoleSuggestionsFromDb,
  saveRoleSuggestionsToDb,
} from '@/lib/services/aiSuggestionDbService';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body: AiSuggestionRequest = await req.json();
    const {
      section,
      targetRole,
      company = 'Organization',
      projectName = 'Flagship Project',
      technologies = [],
      seniorityLevel = 'mid',
      tone = 'metrics',
      userFocusPrompt,
      existingContent,
      forceFresh = false,
    } = body;

    if (!targetRole || !targetRole.trim()) {
      return NextResponse.json(
        { error: 'Target role is required for generating tailored suggestions.' },
        { status: 400 }
      );
    }

    // Step 1: Check Supabase DB cache first (sub-50ms instant response)
    // Only check DB if user didn't request fresh generation or custom rewrite
    if (!forceFresh && !userFocusPrompt?.trim() && !existingContent?.trim()) {
      try {
        const dbResult = await fetchRoleSuggestionsFromDb({
          role: targetRole,
          section,
          tone,
          seniority: seniorityLevel,
          limit: section === 'summary' ? 3 : 4,
        });

        const hasEnoughSuggestions =
          section === 'skills'
            ? dbResult.skillGroups && dbResult.skillGroups.length > 0
            : dbResult.suggestions && dbResult.suggestions.length >= 3;

        if (hasEnoughSuggestions) {
          return NextResponse.json({
            success: true,
            suggestions: dbResult.suggestions,
            skillGroups: dbResult.skillGroups,
            items: dbResult.items,
            provider: 'database',
          });
        }
      } catch (dbErr) {
        console.warn('DB lookup failed, proceeding to Gemini generation:', dbErr);
      }
    }

    // Step 2: Fall back to Gemini generation if DB misses or fresh generation requested
    if (!genAI || !apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server.', provider: 'fallback' },
        { status: 503 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    let prompt = '';

    switch (section) {
      case 'skills': {
        prompt = `
You are an expert executive recruiter and ATS resume optimization engine.
Analyze the target job role "${targetRole}" with seniority "${seniorityLevel}".
Generate 3 distinct, highly relevant skill categories for a world-class resume:
1. "Core Domain & Hard Skills" (fundamental domain competencies)
2. "Tools, Frameworks & Technologies" (industry-standard software, platforms, libraries)
3. "Methodologies & Professional Skills" (work methodologies, leadership, collaboration)

${technologies.length > 0 ? `Incorporate or expand upon these candidate technologies: ${technologies.join(', ')}` : ''}

Output strictly valid JSON with this exact schema:
{
  "skillGroups": [
    {
      "category": "Category Title",
      "items": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"]
    }
  ]
}
`;
        break;
      }

      case 'experience': {
        prompt = `
You are a master executive resume writer.
Generate 4 high-impact resume accomplishment bullet points for:
- Role: ${targetRole}
- Company: ${company}
- Seniority: ${seniorityLevel}
- Tone: ${tone} (metrics = quantifiable achievements & percentages; leadership = mentoring, cross-functional alignment; technical = architecture, system reliability; concise = brief, action-oriented)
${userFocusPrompt ? `- User Focus / Specific Guidance: "${userFocusPrompt}"` : ''}
${existingContent ? `- Polish and elevate this existing bullet: "${existingContent}"` : ''}

Strict Rules:
1. Start EVERY bullet point with a powerful past-tense action verb (e.g., Architected, Spearheaded, Engineered, Overhauled, Orchestrated, Streamlined).
2. Follow Google's X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".
3. Include realistic, quantifiable metrics (e.g. % improvements, dollar savings, latency drops, user scale).
4. No generic fluff or clichés.

Output strictly valid JSON with this exact schema:
{
  "suggestions": [
    "string bullet 1",
    "string bullet 2",
    "string bullet 3",
    "string bullet 4"
  ]
}
`;
        break;
      }

      case 'project': {
        prompt = `
You are an expert technical recruiter and engineering leader.
Generate 4 compelling project accomplishment bullet points for:
- Project Name: ${projectName}
- Technologies: ${technologies.length > 0 ? technologies.join(', ') : 'Modern Industry Stacks'}
- Target Role: ${targetRole}
- Tone: ${tone}
${userFocusPrompt ? `- Special Focus: "${userFocusPrompt}"` : ''}

Strict Rules:
1. Start each bullet with a strong action verb.
2. Emphasize architecture, system design, performance optimizations, and user impact.
3. Quantify throughput, latency, code coverage, or user engagement where appropriate.

Output strictly valid JSON with this exact schema:
{
  "suggestions": [
    "string bullet 1",
    "string bullet 2",
    "string bullet 3",
    "string bullet 4"
  ]
}
`;
        break;
      }

      case 'summary':
      default: {
        prompt = `
You are an executive career coach and resume strategist.
Generate 3 distinct, compelling professional summary paragraphs (2 to 3 sentences each) for:
- Target Role: ${targetRole}
- Seniority: ${seniorityLevel}
- Tone: ${tone}
${userFocusPrompt ? `- Candidate Strengths / Specialization: "${userFocusPrompt}"` : ''}

Strict Rules:
1. Highlight unique value proposition, core domain strengths, and career impact.
2. Ensure engaging narrative flow tailored for modern ATS and human hiring managers.

Output strictly valid JSON with this exact schema:
{
  "suggestions": [
    "string summary variation 1",
    "string summary variation 2",
    "string summary variation 3"
  ]
}
`;
        break;
      }
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1').trim();
    const parsed = JSON.parse(cleanJson);

    const freshSuggestions: string[] =
      parsed.suggestions ||
      (parsed.skillGroups ? parsed.skillGroups.flatMap((g: { items: string[] }) => g.items) : []);
    const freshSkillGroups = parsed.skillGroups;

    // Persist new suggestions to Supabase
    try {
      await saveRoleSuggestionsToDb({
        role: targetRole,
        section,
        suggestions: freshSuggestions,
        skillGroups: freshSkillGroups,
        tone,
        seniority: seniorityLevel,
        source: 'gemini',
      });
    } catch (saveErr) {
      console.warn('AI suggestion save failed:', saveErr);
    }

    return NextResponse.json({
      success: true,
      suggestions: freshSuggestions,
      skillGroups: freshSkillGroups,
      provider: 'gemini',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'AI generation error';
    console.warn('Gemini Suggestion API call failed, client will fall back to heuristics:', errMessage);
    return NextResponse.json(
      { error: errMessage, provider: 'fallback' },
      { status: 500 }
    );
  }
}
