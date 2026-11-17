/**
 * @fileoverview Single Source of Truth for ResumeBabu Site Statistics & Claims
 * @description Standardized numbers, methodology, and verified facts used across
 * landing pages, about page, comparisons, and footer to prevent contradictory claims.
 */

export const SITE_STATS = {
  // Candidate & adoption metrics
  usersCount: '50,000+',
  resumesCreated: '50,000+',
  countriesActive: '40+',
  templatesCount: '50+',
  templatesExactCount: 50,

  // ATS scoring & audit specifications
  atsCompatibilityScore: '95%+',
  atsAuditPoints: '30-point',
  atsAuditPillars: '5-Pillar',

  // Rating & community feedback
  userRating: '4.8/5',
  ratingReviewsCount: '1,200+',
  ratingDisclaimer: 'Based on 1,200+ post-download user feedback submissions (2026)',

  // Competitor pricing reference benchmarks (standardized & dated)
  zetyPriceReference: '$2.70 14-day trial, then auto-renews at $24.95/month (checked 2026)',
  novoresumePriceReference: '$19.99/month for premium export features (checked 2026)',

  // Applicant Tracking Systems verified for layout compliance
  supportedParsers: [
    'Workday',
    'Taleo',
    'Greenhouse',
    'Lever',
    'iCIMS',
    'BambooHR',
    'SmartRecruiters',
    'Darwinbox',
  ] as const,
} as const;
