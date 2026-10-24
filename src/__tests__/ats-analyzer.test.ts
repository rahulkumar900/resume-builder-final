import { describe, it, expect } from 'vitest';
import {
  analyzeResumeForAts,
  extractMetrics,
  stripHtml,
  generateAtsPlainText,
} from '@/lib/ats/ats-analyzer';
import { createMinimalResume, createCompleteResume } from './fixtures/test-resumes';

describe('ATS Analyzer (Single Responsibility & Core Business Logic)', () => {
  describe('stripHtml helper', () => {
    it('should strip standard HTML tags cleanly', () => {
      const html = '<p>Built a <strong>high-performance</strong> web app using <em>Next.js</em>.</p>';
      expect(stripHtml(html)).toBe('Built a high-performance web app using Next.js.');
    });

    it('should handle unclosed tags or plain text gracefully', () => {
      expect(stripHtml('Plain text without HTML')).toBe('Plain text without HTML');
      expect(stripHtml('')).toBe('');
    });

    it('should convert line breaks and list items appropriately', () => {
      const htmlList = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const stripped = stripHtml(htmlList);
      expect(stripped).toContain('Item 1');
      expect(stripped).toContain('Item 2');
    });
  });

  describe('extractMetrics helper', () => {
    it('should extract percentages, dollar amounts, and multiplier metrics', () => {
      const text = 'Boosted sales by 45%, generated $1.2M in annual revenue, and sped up queries 10x.';
      const metrics = extractMetrics(text);
      expect(metrics).toContain('45%');
      expect(metrics).toContain('$1.2M');
      expect(metrics).toContain('10x');
    });

    it('should extract scale indicators with nouns (e.g. users, requests)', () => {
      const text = 'Handled 500k users and scaled to 25M requests daily across 6 engineers.';
      const metrics = extractMetrics(text);
      expect(metrics.some((m) => m.includes('500k') || m.includes('users'))).toBe(true);
      expect(metrics.some((m) => m.includes('25M') || m.includes('requests'))).toBe(true);
    });

    it('should return an empty array if no quantifiable metrics exist', () => {
      const text = 'Responsible for developing internal features and maintaining documentation.';
      expect(extractMetrics(text)).toEqual([]);
    });
  });

  describe('generateAtsPlainText', () => {
    it('should generate structured plain-text parseable by applicant tracking systems', () => {
      const resume = createCompleteResume();
      const plainText = generateAtsPlainText(resume);

      expect(plainText).toContain('ALEX MORGAN');
      expect(plainText).toContain('Lead Senior Software Engineer');
      expect(plainText).toContain('alex.morgan@example.com');
      expect(plainText).toContain('PROFESSIONAL SUMMARY');
      expect(plainText).toContain('WORK EXPERIENCE');
      expect(plainText).toContain('Stripe, Inc.');
      expect(plainText).toContain('SKILLS');
      expect(plainText).toContain('EDUCATION');
    });
  });

  describe('analyzeResumeForAts', () => {
    it('should flag critical issues when required contact and experience fields are missing', () => {
      const minimalResume = createMinimalResume();
      const result = analyzeResumeForAts(minimalResume);

      expect(result.overallScore).toBeLessThan(50);
      const criticalSuggestions = result.suggestions.filter((s) => s.severity === 'critical');
      expect(criticalSuggestions.length).toBeGreaterThan(0);

      // Verify essential critical issue warnings
      const titles = criticalSuggestions.map((s) => s.title.toLowerCase());
      expect(titles.some((t) => t.includes('contact') || t.includes('name') || t.includes('email'))).toBe(true);
      expect(titles.some((t) => t.includes('experience') || t.includes('summary'))).toBe(true);
    });

    it('should award high scores and positive status for a well-structured resume', () => {
      const completeResume = createCompleteResume();
      const result = analyzeResumeForAts(completeResume);

      expect(result.overallScore).toBeGreaterThanOrEqual(75);
      expect(result.tier.grade).toMatch(/A|A\+|B/);
      expect(result.metricsCount).toBeGreaterThan(0);
      expect(result.actionVerbsCount).toBeGreaterThan(0);
      expect(result.totalSkillsCount).toBeGreaterThan(5);

      // Categories should have valid score ranges
      expect(result.categories.contact.percentage).toBeGreaterThanOrEqual(80);
      expect(result.categories.experience.score).toBeGreaterThan(0);
      expect(result.categories.skills.score).toBeGreaterThan(0);
    });
  });
});
