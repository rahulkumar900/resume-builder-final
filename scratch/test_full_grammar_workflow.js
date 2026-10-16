const { checkGrammar, autoCorrectText, applySingleFix, stripHtmlToText } = require('../src/lib/grammar/grammarEngine.ts');

console.log('==============================================');
console.log('   COMPREHENSIVE GRAMMAR ENGINE VERIFICATION  ');
console.log('==============================================\n');

// Test Case 1: Complex HTML with multiple errors
const testCases = [
  {
    name: 'Spelling & Repeated Word in List',
    input: '<ul><li>Responsible for managment of 5 devlopers and implimenting microservices in in AWS.</li></ul>',
  },
  {
    name: 'Tech Capitalization & Punctuation Spacing',
    input: '<p>Built responsive web app using react,nodejs,and postgresql with docker deployment.</p>',
  },
  {
    name: 'Weak Verb & Passive Voice',
    input: '<p>Was responsible for leading the devlopment of high-traffic payment gateway.</p>',
  },
  {
    name: 'Resume Best Practices & Typos',
    input: '<p>I was responsable for achiving 99.9% availabe uptime and improvment of latency.</p>',
  }
];

let totalTests = 0;
let passedTests = 0;

testCases.forEach((tc, idx) => {
  totalTests++;
  console.log(`Test ${idx + 1}: ${tc.name}`);
  console.log(`Input:  ${tc.input}`);
  
  const check = checkGrammar(tc.input);
  console.log(`Issues found (${check.issues.length}):`);
  check.issues.forEach(i => {
    console.log(`  • [${i.category.toUpperCase()}] "${i.originalText}" -> "${i.suggestedText}"`);
  });

  const { updatedHtml, fixedCount } = autoCorrectText(tc.input, check.issues);
  console.log(`Fixed (${fixedCount} fixes applied): ${updatedHtml}`);

  // HTML tag safety check: verify tags are still intact
  const originalTags = tc.input.match(/<[^>]+>/g) || [];
  const updatedTags = updatedHtml.match(/<[^>]+>/g) || [];
  const tagsIntact = JSON.stringify(originalTags) === JSON.stringify(updatedTags);

  if (tagsIntact && fixedCount > 0) {
    console.log('Result: PASS (Tags preserved & errors auto-corrected)\n');
    passedTests++;
  } else {
    console.log(`Result: FAIL (tagsIntact=${tagsIntact}, fixedCount=${fixedCount})\n`);
  }
});

console.log(`SUMMARY: ${passedTests}/${totalTests} tests passed.`);
