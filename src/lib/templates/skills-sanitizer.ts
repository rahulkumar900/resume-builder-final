/**
 * @fileoverview Skills Sanitizer & Formatting Engine.
 * Prepares resume skills for template rendering, pagination, and PDF generation.
 *
 * Rules:
 * - Category grouping default is decided by template style (ATS/Academic = true, Creative/Badge = false).
 * - When category is enabled (default in ATS): Show category title and comma-separated style.
 * - When category is disabled: Show skill name and level (e.g. React (Expert), Node.js (Advanced)).
 * - Individual categories can be enabled or disabled (enabled === false is excluded).
 */

import { ResumeData, SkillCategory, SkillLevel, TemplateId } from '@/types/resume';

export const SKILL_LEVELS: SkillLevel[] = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

/**
 * Decides whether skill category grouping is enabled by default based on template style.
 * - ATS, Academic, Classic, and Corporate templates default to true (Category: Skill 1, Skill 2, Skill 3).
 * - Creative, Visual, and Badge templates default to false (Skill Name & Level pills/badges).
 */
export function getTemplateDefaultSkillsGrouping(templateId?: TemplateId | string): boolean {
  switch (templateId) {
    case 'canva':
    case 'canvaaesthetic':
    case 'canvaeditorial':
    case 'canvanotebook':
    case 'canvapastel':
    case 'canvaretro':
    case 'enhancv':
    case 'novoresume':
    case 'flow':
    case 'cascade':
    case 'ribbon':
    case 'marigold':
    case 'stamp':
    case 'santoso':
    case 'rahadian':
    case 'europass':
    case 'prawira':
    case 'chastain':
    case 'stockholm':
    case 'dublin':
    case 'sydney':
    case 'neon_creative':
    case 'neobrutalist':
      return false; // Creative, visual, and badge/level templates default to skill name + level
    default:
      return true; // ATS, academic, corporate templates default to category + comma-separated
  }
}

/**
 * Returns only the active (enabled) skill categories with non-empty content.
 */
export function getActiveSkills(skills?: SkillCategory[]): SkillCategory[] {
  if (!skills || !Array.isArray(skills)) return [];
  return skills.filter((cat) => cat.enabled !== false && (cat.items?.length > 0 || cat.category?.trim()));
}

/**
 * Formats an individual skill item with an optional level.
 * Avoids duplicate parenthetical levels if the name already contains it.
 */
export function formatSkillItem(name: string, level?: string, showLevel = true): string {
  const trimmedName = name.trim();
  if (!trimmedName) return '';
  if (!showLevel || !level || !level.trim()) return trimmedName;

  const trimmedLevel = level.trim();
  const lowerName = trimmedName.toLowerCase();
  const lowerLevel = trimmedLevel.toLowerCase();

  // If already ends with (Level), avoid double formatting
  if (lowerName.endsWith(`(${lowerLevel})`)) {
    return trimmedName;
  }

  return `${trimmedName} (${trimmedLevel})`;
}

/**
 * Parses a skill string that may contain parenthesized level (e.g. "React (Expert)").
 */
export function parseSkillWithLevel(raw: string): { name: string; level?: SkillLevel | string } {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(.+?)\s*\(([^)]+)\)$/);
  if (match) {
    const candidateName = match[1].trim();
    const candidateLevel = match[2].trim();

    // Check if candidateLevel matches standard levels
    const matchedStandard = SKILL_LEVELS.find(
      (l) => l.toLowerCase() === candidateLevel.toLowerCase()
    );

    return {
      name: candidateName,
      level: matchedStandard || candidateLevel,
    };
  }

  return { name: trimmed };
}

/**
 * Prepares ResumeData skills for rendering.
 * - Decides enableGrouping based on explicit skillsConfig or template style default.
 * - If category is enabled: shows category and comma-separated style.
 * - If category is disabled: shows skill name and level.
 * - Filters out disabled groups (`enabled === false`).
 */
export function sanitizeSkillsForRender(data: ResumeData): ResumeData {
  if (!data.skills || data.skills.length === 0) {
    return data;
  }

  // Decide if category grouping is enabled:
  // Explicit user setting takes precedence; otherwise decided by template style.
  const enableGrouping =
    data.skillsConfig?.enableGrouping !== undefined
      ? data.skillsConfig.enableGrouping
      : getTemplateDefaultSkillsGrouping(data.templateId);

  // Filter out disabled categories
  const activeGroups = getActiveSkills(data.skills);

  if (activeGroups.length === 0) {
    return {
      ...data,
      skills: [],
    };
  }

  // When Category grouping is ENABLED:
  // Show with category and comma-separated style.
  if (enableGrouping) {
    const showLevelsInGroup = data.skillsConfig?.showLevels === true;
    const processedGroups: SkillCategory[] = activeGroups.map((cat) => ({
      ...cat,
      items: (cat.items || []).map((it) => {
        const level = cat.levels?.[it];
        return showLevelsInGroup && level ? formatSkillItem(it, level, true) : it;
      }),
    }));

    return {
      ...data,
      skills: processedGroups,
    };
  }

  // When Category grouping is DISABLED:
  // Show skill name and level (flat list of skills with levels).
  const allFlatSkills: string[] = [];
  activeGroups.forEach((cat) => {
    (cat.items || []).forEach((it) => {
      const level = cat.levels?.[it];
      const formatted = formatSkillItem(it, level, true);
      if (!allFlatSkills.includes(formatted)) {
        allFlatSkills.push(formatted);
      }
    });
  });

  return {
    ...data,
    skills: [
      {
        id: 'skills-flat',
        category: '',
        items: allFlatSkills,
        enabled: true,
      },
    ],
  };
}
