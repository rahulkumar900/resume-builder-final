import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';

describe('ResumeHighlights rich text & bullet rendering', () => {
  it('renders bullet points when rich text contains bullet list', () => {
    const html = renderToStaticMarkup(
      <ResumeHighlights highlights={['<ul><li>Led team of 5</li><li>Built API</li></ul>']} />
    );
    expect(html).toContain('<ul class="list-disc');
    expect(html).toContain('data-ghost-bullet="0"');
    expect(html).toContain('Led team of 5');
    expect(html).toContain('Built API');
  });

  it('renders numbered list when rich text contains ordered list', () => {
    const html = renderToStaticMarkup(
      <ResumeHighlights highlights={['<ol><li>Phase 1</li><li>Phase 2</li></ol>']} />
    );
    expect(html).toContain('<ol class="list-decimal');
    expect(html).toContain('data-ghost-bullet="0"');
    expect(html).toContain('Phase 1');
  });

  it('renders as regular text paragraphs WITHOUT default bullet points when rich text is paragraph type', () => {
    const html = renderToStaticMarkup(
      <ResumeHighlights
        highlights={['<p>Responsible for overall architecture and leadership.</p><p>Second paragraph.</p>']}
      />
    );
    expect(html).not.toContain('<ul');
    expect(html).not.toContain('<li');
    expect(html).toContain('Responsible for overall architecture and leadership.');
    expect(html).toContain('Second paragraph.');
  });

  it('renders plain text single string without bullet points', () => {
    const html = renderToStaticMarkup(
      <ResumeHighlights highlights={['Single paragraph of descriptive summary text.']} />
    );
    expect(html).not.toContain('<ul');
    expect(html).not.toContain('<li');
    expect(html).toContain('Single paragraph of descriptive summary text.');
  });

  it('renders bullet points when strings explicitly start with bullet characters', () => {
    const html = renderToStaticMarkup(
      <ResumeHighlights highlights={['• First bullet point\n• Second bullet point']} />
    );
    expect(html).toContain('<ul class="list-disc');
    expect(html).toContain('data-ghost-bullet="0"');
    expect(html).toContain('First bullet point');
  });
});
