const { TEMPLATES, TEMPLATE_COLUMN_CONTRACTS, getDefaultSectionOrder, getTemplateLayout } = require('../src/lib/templates.ts');

console.log('--- TESTING SECTION ORDERS ACROSS ALL 25 TEMPLATES ---');
const templateIds = [
  'ats', 'vienna', 'madrid', 'prawira', 'santoso', 'rahadian', 'amelia',
  'chastain', 'stockholm', 'dublin', 'sydney', 'traditional', 'naukri',
  'fresher', 'sarkari', 'harvard', 'cascade', 'novoresume', 'toronto',
  'enhancv', 'flow', 'silicon', 'oxford', 'canva', 'europass'
];

let errors = 0;

templateIds.forEach(id => {
  const layout = getTemplateLayout(id);
  const contract = TEMPLATE_COLUMN_CONTRACTS[id];
  if (!contract) {
    console.error(`Missing contract for ${id}`);
    errors++;
    return;
  }

  const expOrder = getDefaultSectionOrder(id, true, 'experienced');
  const fresherOrder = getDefaultSectionOrder(id, true, 'entry');

  if (layout === 'single') {
    if (!expOrder.singleColumn || expOrder.singleColumn.length === 0) {
      console.error(`[FAIL] ${id} singleColumn is empty`);
      errors++;
    }
    console.log(`[SINGLE] ${id.padEnd(12)} -> [${expOrder.singleColumn.join(' -> ')}]`);
  } else {
    if (!expOrder.mainColumn || !expOrder.sidebarColumn) {
      console.error(`[FAIL] ${id} 2-col columns missing`);
      errors++;
    }
    console.log(`[2-COL]  ${id.padEnd(12)} -> Main: [${expOrder.mainColumn.join(', ')}] | Sidebar: [${expOrder.sidebarColumn.join(', ')}]`);
  }
});

console.log('\n--- VERIFYING FRESHER SECTION ORDERS ---');
templateIds.forEach(id => {
  const layout = getTemplateLayout(id);
  const fresherOrder = getDefaultSectionOrder(id, true, 'entry');
  if (layout === 'single') {
    console.log(`[FRESHER 1-COL] ${id.padEnd(12)} -> [${fresherOrder.singleColumn.join(' -> ')}]`);
  } else {
    console.log(`[FRESHER 2-COL] ${id.padEnd(12)} -> Main: [${fresherOrder.mainColumn.join(', ')}] | Sidebar: [${fresherOrder.sidebarColumn.join(', ')}]`);
  }
});

console.log(`\nAudit completed with ${errors} errors.`);
