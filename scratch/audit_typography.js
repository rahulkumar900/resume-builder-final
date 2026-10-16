const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../src/components/resume-templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('Template.tsx'));

console.log(`Found ${files.length} template files:\n`);

const typographyReport = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(templatesDir, file), 'utf-8');
  const templateName = file.replace('Template.tsx', '');

  // Extract candidate name typography (usually in header/h1)
  const h1Match = content.match(/<h1[^>]*className=["']([^"']+)["']/);
  const h1Class = h1Match ? h1Match[1] : 'No H1 (uses div/span)';

  // Extract section header typography (h2 or renderSectionHeader)
  const h2Match = content.match(/<h2[^>]*className=["']([^"']+)["']/);
  const h2Class = h2Match ? h2Match[1] : 'Uses custom header';

  // Extract body/highlights typography
  const highlightMatch = content.match(/ResumeHighlights[^>]*className=["']([^"']+)["']/);
  const highlightClass = highlightMatch ? highlightMatch[1] : 'default';

  // Extract base container font size / leading
  const containerMatch = content.match(/className=["']([^"']*min-h-\[297mm\][^"']*)["']/);
  const containerClass = containerMatch ? containerMatch[1] : '';

  typographyReport.push({
    name: templateName,
    h1: h1Class,
    h2: h2Class,
    highlights: highlightClass,
    container: containerClass
  });
});

typographyReport.forEach(r => {
  console.log(`====================================================`);
  console.log(`TEMPLATE: ${r.name}`);
  console.log(`H1 Name:    ${r.h1}`);
  console.log(`H2 Heading: ${r.h2}`);
  console.log(`Highlights: ${r.highlights}`);
});
