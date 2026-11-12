import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import type { ResumeData, ResumeSectionId } from '@/types/resume';
import { TEMPLATE_COLUMN_CONTRACTS } from '@/lib/templates/contracts';
import { getResolvedTemplateSectionOrder } from '@/lib/templates/ordering';

// A4 dimensions in twips (1 inch = 1440 twips)
const A4_WIDTH_TWIPS = 11906;
const A4_HEIGHT_TWIPS = 16838;

interface DocxStyleConfig {
  font: string;
  accentHex: string;
  bodyHex: string;
  mutedHex: string;
  isHarvardOfficial: boolean;
  bodySizeHalfPt: number;
  headingSizeHalfPt: number;
  nameSizeHalfPt: number;
  lineSpacing: number;
  rightTabTwips: number;
}

function stripHtml(input?: string): string {
  if (!input) return '';
  return input
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6])>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveWordFont(resume: ResumeData): string {
  if (resume.templateId === 'harvard') return 'Times New Roman';
  switch (resume.fontFamily) {
    case 'times':
    case 'garamond':
    case 'playfair':
    case 'merriweather':
      return 'Times New Roman';
    case 'source_serif':
    case 'fraunces':
    case 'dm_serif':
      return 'Georgia';
    default:
      return 'Calibri';
  }
}

function resolveAccentHex(resume: ResumeData): string {
  const raw = resume.themeColor?.replace('#', '').trim();
  if (resume.templateId === 'harvard' && (!raw || raw.toLowerCase() === '0f172a')) {
    return '000000';
  }
  return raw && /^[0-9a-fA-F]{6}$/.test(raw) ? raw.toUpperCase() : '0F172A';
}

function resolveMarginsTwips(spacing?: ResumeData['spacing']): number {
  if (spacing === 'compact') return 720; // 0.5 in
  if (spacing === 'relaxed') return 1080; // 0.75 in
  return 864; // 0.6 in
}

function cleanUrl(url?: string): string {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function makeSectionHeading(title: string, cfg: DocxStyleConfig): Paragraph {
  if (cfg.isHarvardOfficial) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 60 },
      keepNext: true,
      children: [
        new TextRun({
          text: title,
          bold: true,
          font: cfg.font,
          size: cfg.headingSizeHalfPt,
          color: cfg.accentHex,
        }),
      ],
    });
  }

  return new Paragraph({
    spacing: { before: 180, after: 80 },
    keepNext: true,
    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: cfg.accentHex,
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        font: cfg.font,
        size: cfg.headingSizeHalfPt,
        color: cfg.accentHex,
      }),
    ],
  });
}

function makeRightTabParagraph(
  leftText: string,
  rightText: string,
  cfg: DocxStyleConfig,
  options: { boldLeft?: boolean; italicLeft?: boolean; colorLeft?: string; after?: number } = {}
): Paragraph {
  const children: TextRun[] = [
    new TextRun({
      text: leftText,
      bold: options.boldLeft,
      italics: options.italicLeft,
      font: cfg.font,
      size: cfg.bodySizeHalfPt,
      color: options.colorLeft || cfg.bodyHex,
    }),
  ];

  if (rightText) {
    children.push(
      new TextRun({
        text: `\t${rightText}`,
        font: cfg.font,
        size: cfg.bodySizeHalfPt,
        color: cfg.isHarvardOfficial ? cfg.bodyHex : cfg.mutedHex,
      })
    );
  }

  return new Paragraph({
    spacing: { after: options.after ?? 20, line: cfg.lineSpacing },
    tabStops: [{ type: TabStopType.RIGHT, position: cfg.rightTabTwips }],
    children,
  });
}

function makeBulletParagraph(text: string, cfg: DocxStyleConfig): Paragraph {
  return new Paragraph({
    spacing: { after: 30, line: cfg.lineSpacing },
    bullet: { level: 0 },
    children: [
      new TextRun({
        text: stripHtml(text),
        font: cfg.font,
        size: cfg.bodySizeHalfPt,
        color: cfg.bodyHex,
      }),
    ],
  });
}

function makeProseParagraph(text: string, cfg: DocxStyleConfig, after = 60): Paragraph {
  return new Paragraph({
    spacing: { after, line: cfg.lineSpacing },
    children: [
      new TextRun({
        text: stripHtml(text),
        font: cfg.font,
        size: cfg.bodySizeHalfPt,
        color: cfg.bodyHex,
      }),
    ],
  });
}

function buildHeaderParagraphs(resume: ResumeData, cfg: DocxStyleConfig): Paragraph[] {
  const p = resume.personalInfo;
  const contactParts = [
    p.location,
    p.phone,
    p.email,
    cleanUrl(p.linkedin),
    cleanUrl(p.github),
    cleanUrl(p.website),
  ].filter(Boolean) as string[];

  if (cfg.isHarvardOfficial) {
    return [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        border: {
          bottom: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: '000000',
          },
        },
        children: [
          new TextRun({
            text: p.fullName || 'Firstname Lastname',
            bold: true,
            font: cfg.font,
            size: cfg.nameSizeHalfPt,
            color: cfg.accentHex,
          }),
        ],
      }),
      ...(contactParts.length > 0
        ? [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 40, after: 100 },
              children: [
                new TextRun({
                  text: contactParts.join(' • '),
                  font: cfg.font,
                  size: cfg.bodySizeHalfPt,
                  color: cfg.bodyHex,
                }),
              ],
            }),
          ]
        : []),
    ];
  }

  const out: Paragraph[] = [
    new Paragraph({
      spacing: { after: 30 },
      children: [
        new TextRun({
          text: p.fullName || 'Your Name',
          bold: true,
          font: cfg.font,
          size: cfg.nameSizeHalfPt,
          color: cfg.accentHex,
        }),
      ],
    }),
  ];

  if (p.jobTitle) {
    out.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: p.jobTitle,
            bold: true,
            font: cfg.font,
            size: cfg.bodySizeHalfPt + 2,
            color: cfg.mutedHex,
          }),
        ],
      })
    );
  }

  if (contactParts.length > 0) {
    out.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            font: cfg.font,
            size: cfg.bodySizeHalfPt - 1,
            color: cfg.mutedHex,
          }),
        ],
      })
    );
  }

  return out;
}

function buildSectionParagraphs(
  secId: ResumeSectionId,
  resume: ResumeData,
  cfg: DocxStyleConfig
): Paragraph[] {
  const blocks: Paragraph[] = [];

  switch (secId) {
    case 'summary': {
      const text = stripHtml(resume.personalInfo?.summary);
      if (!text) return [];
      blocks.push(makeSectionHeading(cfg.isHarvardOfficial ? 'Profile' : 'Summary', cfg));
      blocks.push(makeProseParagraph(text, cfg, 80));
      return blocks;
    }

    case 'experience': {
      const items = resume.experience || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Experience', cfg));
      for (const exp of items) {
        const dates = [exp.startDate, exp.current ? 'Present' : exp.endDate]
          .filter(Boolean)
          .join(' - ');
        blocks.push(
          makeRightTabParagraph(exp.company, exp.location || '', cfg, { boldLeft: true })
        );
        blocks.push(
          makeRightTabParagraph(exp.role, dates, cfg, {
            boldLeft: cfg.isHarvardOfficial,
            italicLeft: !cfg.isHarvardOfficial,
            after: 30,
          })
        );
        if (exp.highlights && exp.highlights.length > 0) {
          if (cfg.isHarvardOfficial) {
            blocks.push(makeProseParagraph(exp.highlights.map(stripHtml).join(' '), cfg, 60));
          } else {
            for (const h of exp.highlights) {
              if (stripHtml(h)) blocks.push(makeBulletParagraph(h, cfg));
            }
          }
        }
      }
      return blocks;
    }

    case 'education': {
      const items = resume.education || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Education', cfg));
      for (const edu of items) {
        blocks.push(
          makeRightTabParagraph(edu.school, edu.location || '', cfg, { boldLeft: true })
        );
        const degreeText = edu.gpa ? `${edu.degree}. GPA ${edu.gpa}.` : edu.degree;
        blocks.push(
          makeRightTabParagraph(degreeText, edu.graduationDate || '', cfg, {
            italicLeft: !cfg.isHarvardOfficial,
            after: 30,
          })
        );
        for (const h of edu.highlights || []) {
          if (stripHtml(h)) {
            blocks.push(
              cfg.isHarvardOfficial
                ? makeProseParagraph(h, cfg, 25)
                : makeBulletParagraph(h, cfg)
            );
          }
        }
      }
      return blocks;
    }

    case 'projects': {
      const items = resume.projects || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Projects', cfg));
      for (const proj of items) {
        const tech = proj.technologies?.length ? ` (${proj.technologies.join(', ')})` : '';
        blocks.push(
          makeRightTabParagraph(`${proj.title}${tech}`, cleanUrl(proj.link), cfg, {
            boldLeft: true,
            after: 30,
          })
        );
        for (const h of proj.highlights || []) {
          if (stripHtml(h)) blocks.push(makeBulletParagraph(h, cfg));
        }
      }
      return blocks;
    }

    case 'leadership': {
      const items = resume.leadership || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Leadership', cfg));
      for (const item of items) {
        const dates = [item.startDate, item.current ? 'Present' : item.endDate]
          .filter(Boolean)
          .join(' - ');
        blocks.push(
          makeRightTabParagraph(item.organization, item.location || '', cfg, { boldLeft: true })
        );
        blocks.push(
          makeRightTabParagraph(item.role, dates, cfg, {
            boldLeft: cfg.isHarvardOfficial,
            italicLeft: !cfg.isHarvardOfficial,
            after: 30,
          })
        );
        if (item.highlights && item.highlights.length > 0) {
          if (cfg.isHarvardOfficial) {
            blocks.push(makeProseParagraph(item.highlights.map(stripHtml).join(' '), cfg, 60));
          } else {
            for (const h of item.highlights) {
              if (stripHtml(h)) blocks.push(makeBulletParagraph(h, cfg));
            }
          }
        }
      }
      return blocks;
    }

    case 'skills': {
      const items = resume.skills || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Skills', cfg));
      for (const cat of items) {
        blocks.push(
          new Paragraph({
            spacing: { after: 30, line: cfg.lineSpacing },
            children: [
              ...(cat.category
                ? [
                    new TextRun({
                      text: `${cat.category}: `,
                      bold: true,
                      font: cfg.font,
                      size: cfg.bodySizeHalfPt,
                      color: cfg.bodyHex,
                    }),
                  ]
                : []),
              new TextRun({
                text: cat.items.join(', '),
                font: cfg.font,
                size: cfg.bodySizeHalfPt,
                color: cfg.bodyHex,
              }),
            ],
          })
        );
      }
      return blocks;
    }

    case 'certifications': {
      const items = resume.certifications || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Certifications', cfg));
      for (const cert of items) {
        const label = cert.issuer ? `${cert.name}, ${cert.issuer}` : cert.name;
        blocks.push(makeRightTabParagraph(label, cert.date || '', cfg, { after: 30 }));
      }
      return blocks;
    }

    case 'achievements': {
      const items = resume.achievements || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Key Achievements', cfg));
      for (const a of items) {
        blocks.push(makeRightTabParagraph(a.title, a.date || '', cfg, { boldLeft: true }));
        if (a.description) blocks.push(makeProseParagraph(a.description, cfg, 40));
      }
      return blocks;
    }

    case 'awards': {
      const items = resume.awards || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Honors & Awards', cfg));
      for (const a of items) {
        const label = a.issuer ? `${a.title}, ${a.issuer}` : a.title;
        blocks.push(makeRightTabParagraph(label, a.date || '', cfg, { boldLeft: true }));
        if (a.summary) blocks.push(makeProseParagraph(a.summary, cfg, 40));
      }
      return blocks;
    }

    case 'languages': {
      const items = resume.languages || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Languages', cfg));
      blocks.push(
        makeProseParagraph(
          items.map((l) => (l.proficiency ? `${l.language} (${l.proficiency})` : l.language)).join(', '),
          cfg,
          60
        )
      );
      return blocks;
    }

    case 'interests': {
      const items = resume.interests || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Interests', cfg));
      blocks.push(
        makeProseParagraph(
          items.map((i) => (typeof i === 'string' ? i : i.name)).filter(Boolean).join(', '),
          cfg,
          60
        )
      );
      return blocks;
    }

    case 'volunteer': {
      const items = resume.volunteer || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Volunteer Experience', cfg));
      for (const v of items) {
        const dates = [v.startDate, v.endDate].filter(Boolean).join(' - ');
        blocks.push(makeRightTabParagraph(`${v.role} — ${v.organization}`, dates, cfg, { boldLeft: true }));
        for (const h of v.highlights || []) {
          if (stripHtml(h)) blocks.push(makeBulletParagraph(h, cfg));
        }
      }
      return blocks;
    }

    case 'internships': {
      const items = resume.internships || [];
      if (items.length === 0) return [];
      blocks.push(makeSectionHeading('Internships', cfg));
      for (const item of items) {
        const dates = [item.startDate, item.endDate].filter(Boolean).join(' - ');
        blocks.push(makeRightTabParagraph(item.company, item.location || '', cfg, { boldLeft: true }));
        blocks.push(makeRightTabParagraph(item.role, dates, cfg, { italicLeft: true, after: 30 }));
        for (const h of item.highlights || []) {
          if (stripHtml(h)) blocks.push(makeBulletParagraph(h, cfg));
        }
      }
      return blocks;
    }

    default:
      return [];
  }
}

export async function buildResumeDocxBlob(resume: ResumeData): Promise<Blob> {
  const marginsTwips = resolveMarginsTwips(resume.spacing);
  const printableWidth = A4_WIDTH_TWIPS - marginsTwips * 2;
  const isHarvardOfficial = resume.templateId === 'harvard';
  const contract = TEMPLATE_COLUMN_CONTRACTS[resume.templateId] || TEMPLATE_COLUMN_CONTRACTS.harvard;
  const resolved = getResolvedTemplateSectionOrder(resume.templateId, resume);

  const baseConfig: DocxStyleConfig = {
    font: resolveWordFont(resume),
    accentHex: resolveAccentHex(resume),
    bodyHex: isHarvardOfficial ? '000000' : '1E293B',
    mutedHex: isHarvardOfficial ? '000000' : '475569',
    isHarvardOfficial,
    bodySizeHalfPt: isHarvardOfficial ? 21 : 20, // 10.5pt or 10pt
    headingSizeHalfPt: isHarvardOfficial ? 22 : 22, // 11pt
    nameSizeHalfPt: isHarvardOfficial ? 28 : 36, // 14pt or 18pt
    lineSpacing: resume.spacing === 'compact' ? 240 : resume.spacing === 'relaxed' ? 288 : 264,
    rightTabTwips: printableWidth,
  };

  const children: Array<Paragraph | Table> = [...buildHeaderParagraphs(resume, baseConfig)];

  if (contract.sidebarFraction > 0 && resolved.sidebarColumn && resolved.sidebarColumn.length > 0) {
    const mainPct = Math.round((1 - contract.sidebarFraction) * 100);
    const sidePct = 100 - mainPct;
    const mainWidthTwips = Math.round(printableWidth * (1 - contract.sidebarFraction));
    const sideWidthTwips = printableWidth - mainWidthTwips;

    const mainCfg: DocxStyleConfig = { ...baseConfig, rightTabTwips: mainWidthTwips - 180 };
    const sideCfg: DocxStyleConfig = { ...baseConfig, rightTabTwips: sideWidthTwips - 120 };

    const mainParagraphs = (resolved.mainColumn || []).flatMap((secId) =>
      buildSectionParagraphs(secId, resume, mainCfg)
    );
    const sideParagraphs = (resolved.sidebarColumn || []).flatMap((secId) =>
      buildSectionParagraphs(secId, resume, sideCfg)
    );

    const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: noBorder,
          bottom: noBorder,
          left: noBorder,
          right: noBorder,
          insideHorizontal: noBorder,
          insideVertical: noBorder,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: mainPct, type: WidthType.PERCENTAGE },
                margins: { right: 180 },
                children: mainParagraphs.length > 0 ? mainParagraphs : [new Paragraph('')],
              }),
              new TableCell({
                width: { size: sidePct, type: WidthType.PERCENTAGE },
                margins: { left: 140 },
                children: sideParagraphs.length > 0 ? sideParagraphs : [new Paragraph('')],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    for (const secId of resolved.singleColumn || []) {
      children.push(...buildSectionParagraphs(secId, resume, baseConfig));
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: A4_WIDTH_TWIPS,
              height: A4_HEIGHT_TWIPS,
            },
            margin: {
              top: marginsTwips,
              bottom: marginsTwips,
              left: marginsTwips,
              right: marginsTwips,
            },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export async function downloadResumeDocx(resume: ResumeData, filename?: string): Promise<void> {
  const blob = await buildResumeDocxBlob(resume);
  const safeName = (
    filename ||
    resume.personalInfo?.fullName ||
    resume.title ||
    'resume'
  )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeName || 'resume'}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
