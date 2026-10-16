const { checkGrammar, autoCorrectText, stripHtmlToText } = require('../src/lib/grammar/grammarEngine.ts');

const sampleHtml = `<p>I was responsable for devloping react and node.js microservices in in the cloud. We achived 99.9% availabe uptime.</p>`;

console.log('--- TESTING GRAMMAR ENGINE ---');
console.log('Input HTML:', sampleHtml);

const check = checkGrammar(sampleHtml);
console.log('\nDetected Issues Count:', check.issues.length);
check.issues.forEach(issue => {
  console.log(`- [${issue.category.toUpperCase()}] "${issue.originalText}" -> "${issue.suggestedText}" (${issue.explanation})`);
});

const autoCorrect = autoCorrectText(sampleHtml);
console.log('\n--- AUTO-CORRECT RESULT ---');
console.log('Fixed Count:', autoCorrect.fixedCount);
console.log('Cleaned HTML:', autoCorrect.updatedHtml);

const reCheck = checkGrammar(autoCorrect.updatedHtml);
console.log('\nRemaining Issues after Auto-Correct:', reCheck.issues.length);
reCheck.issues.forEach(issue => {
  console.log(`- [${issue.category.toUpperCase()}] "${issue.originalText}" -> "${issue.suggestedText}"`);
});
