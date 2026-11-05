import { describe, it, expect } from 'vitest';

/**
 * Reusable helper logic matching BuilderEditorClient's query-param parsing
 */
function parseTabFromParams(params: URLSearchParams) {
  const rawTab = (params.get('tab') || params.get('mode') || '').toLowerCase();
  const rawView = (params.get('view') || '').toLowerCase();

  let targetMode: 'content' | 'design' | 'check' | 'match' = 'content';
  let targetTab: 'edit' | 'preview' = 'edit';

  if (rawView === 'preview' || rawTab === 'preview') {
    targetTab = 'preview';
  } else if (rawTab === 'design') {
    targetMode = 'design';
  } else if (rawTab === 'check' || rawTab === 'ats') {
    targetMode = 'check';
  } else if (rawTab === 'match' || rawTab === 'jd-match' || rawTab === 'jd_match' || rawTab === 'tailor') {
    targetMode = 'match';
  } else {
    targetMode = 'content';
  }

  return { tab: targetTab, mode: targetMode };
}

function syncTabToUrl(
  searchParams: URLSearchParams,
  mode: 'content' | 'design' | 'check' | 'match',
  view: 'edit' | 'preview' = 'edit'
): string {
  const newParams = new URLSearchParams(searchParams.toString());
  if (view === 'preview') {
    newParams.set('tab', 'preview');
    newParams.set('view', 'preview');
  } else {
    newParams.delete('view');
    const tabValue = mode === 'content' ? 'write' : mode;
    newParams.set('tab', tabValue);
  }
  newParams.delete('mode');
  return newParams.toString();
}

describe('Builder Tabs Query Parameter State Synchronization', () => {
  it('parses default or empty query params into Write tab (content mode)', () => {
    const params = new URLSearchParams('');
    const result = parseTabFromParams(params);
    expect(result.mode).toBe('content');
    expect(result.tab).toBe('edit');
  });

  it('parses ?tab=design into Design tab', () => {
    const params = new URLSearchParams('tab=design');
    const result = parseTabFromParams(params);
    expect(result.mode).toBe('design');
    expect(result.tab).toBe('edit');
  });

  it('parses ?tab=check and ?tab=ats into Check tab', () => {
    expect(parseTabFromParams(new URLSearchParams('tab=check')).mode).toBe('check');
    expect(parseTabFromParams(new URLSearchParams('tab=ats')).mode).toBe('check');
  });

  it('parses ?tab=match and ?tab=jd-match into JD Match tab', () => {
    expect(parseTabFromParams(new URLSearchParams('tab=match')).mode).toBe('match');
    expect(parseTabFromParams(new URLSearchParams('tab=jd-match')).mode).toBe('match');
    expect(parseTabFromParams(new URLSearchParams('tab=tailor')).mode).toBe('match');
  });

  it('parses ?tab=preview or ?view=preview into Preview tab', () => {
    expect(parseTabFromParams(new URLSearchParams('tab=preview')).tab).toBe('preview');
    expect(parseTabFromParams(new URLSearchParams('view=preview')).tab).toBe('preview');
  });

  it('syncs mode switching into query params while preserving other params like step', () => {
    const initial = new URLSearchParams('step=experience');

    // Switch to Design
    const toDesign = syncTabToUrl(initial, 'design');
    expect(toDesign).toContain('tab=design');
    expect(toDesign).toContain('step=experience');

    // Switch to Check
    const toCheck = syncTabToUrl(new URLSearchParams(toDesign), 'check');
    expect(toCheck).toContain('tab=check');
    expect(toCheck).not.toContain('tab=design');

    // Switch to JD Match
    const toMatch = syncTabToUrl(new URLSearchParams(toCheck), 'match');
    expect(toMatch).toContain('tab=match');

    // Switch to Write
    const toWrite = syncTabToUrl(new URLSearchParams(toMatch), 'content');
    expect(toWrite).toContain('tab=write');
    expect(toWrite).toContain('step=experience');

    // Switch to Preview
    const toPreview = syncTabToUrl(new URLSearchParams(toWrite), 'content', 'preview');
    expect(toPreview).toContain('tab=preview');
    expect(toPreview).toContain('view=preview');
  });
});
