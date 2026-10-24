import { describe, it, expect } from 'vitest';
import { getPageFormatConfig, PAGE_FORMATS } from '@/lib/page-format';

describe('Page Format Service (DRY & Single Responsibility)', () => {
  it('should return default A4 format configuration when no parameter is passed', () => {
    const config = getPageFormatConfig();
    expect(config.id).toBe('A4');
    expect(config.widthMm).toBe(210);
    expect(config.heightMm).toBe(297);
    expect(config.cssPageSize).toBe('A4 portrait');
  });

  it('should return A4 format configuration when null or empty string is passed', () => {
    expect(getPageFormatConfig(null).id).toBe('A4');
    expect(getPageFormatConfig('').id).toBe('A4');
    expect(getPageFormatConfig('Unknown' as any).id).toBe('A4');
  });

  it('should return US Letter configuration when "Letter" is specified', () => {
    const config = getPageFormatConfig('Letter');
    expect(config.id).toBe('Letter');
    expect(config.widthMm).toBe(215.9);
    expect(config.heightMm).toBe(279.4);
    expect(config.widthPx).toBe(816.0);
    expect(config.heightPx).toBe(1056.0);
    expect(config.cssPageSize).toBe('letter portrait');
  });

  it('should maintain consistent aspect ratios and positive dimensions', () => {
    Object.values(PAGE_FORMATS).forEach((fmt) => {
      expect(fmt.widthMm).toBeGreaterThan(0);
      expect(fmt.heightMm).toBeGreaterThan(fmt.widthMm); // Portrait
      expect(fmt.widthPx).toBeGreaterThan(0);
      expect(fmt.heightPx).toBeGreaterThan(fmt.widthPx);
    });
  });
});
