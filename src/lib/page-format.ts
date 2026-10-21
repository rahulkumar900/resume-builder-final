export type PageFormat = 'A4' | 'Letter';

export interface PageFormatConfig {
  id: PageFormat;
  label: string;
  sublabel: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  cssPageSize: string;
}

export const PAGE_FORMATS: Record<PageFormat, PageFormatConfig> = {
  A4: {
    id: 'A4',
    label: 'A4',
    sublabel: '210 × 297 mm · International',
    widthMm: 210,
    heightMm: 297,
    widthPx: 793.7,
    heightPx: 1122.5,
    cssPageSize: 'A4 portrait',
  },
  Letter: {
    id: 'Letter',
    label: 'US Letter',
    sublabel: '8.5 × 11 in · US / Canada',
    widthMm: 215.9,
    heightMm: 279.4,
    widthPx: 816.0,
    heightPx: 1056.0,
    cssPageSize: 'letter portrait',
  },
};

export function getPageFormatConfig(format?: string | null): PageFormatConfig {
  return format === 'Letter' ? PAGE_FORMATS.Letter : PAGE_FORMATS.A4;
}
