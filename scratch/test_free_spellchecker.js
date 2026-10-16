const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Custom module loader for TypeScript files using the project's installed typescript compiler
require.extensions['.ts'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  return module._compile(compiled.outputText, filename);
};

const {
  damerauLevenshteinDistance,
  findClosestSuggestions,
  checkGrammar,
  autoCorrectText,
} = require('../src/lib/grammar/grammarEngine.ts');

console.log('==================================================');
console.log('🧪 TESTING 100% FREE ALGORITHMIC SPELLCHECK & LINT');
console.log('==================================================\n');

// 1. Damerau-Levenshtein Distance Tests
console.log('--- TEST 1: Damerau-Levenshtein Distance ---');
const dlCases = [
  { a: 'manager', b: 'manager', expected: 0, label: 'identical' },
  { a: 'manger', b: 'manager', expected: 1, label: 'omission/deletion' },
  { a: 'recieved', b: 'received', expected: 1, label: 'adjacent transposition' },
  { a: 'teh', b: 'the', expected: 1, label: 'adjacent transposition' },
  { a: 'dveloper', b: 'developer', expected: 1, label: 'omission' },
  { a: 'developerr', b: 'developer', expected: 1, label: 'insertion' },
];

let dlPassed = 0;
dlCases.forEach(({ a, b, expected, label }) => {
  const dist = damerauLevenshteinDistance(a, b);
  const ok = dist === expected;
  if (ok) dlPassed++;
  console.log(`[${ok ? 'PASS' : 'FAIL'}] "${a}" <-> "${b}" = ${dist} (expected ${expected}) [${label}]`);
});

if (dlPassed !== dlCases.length) {
  console.error('❌ Damerau-Levenshtein tests failed!');
  process.exit(1);
}

// 2. Candidate Suggestions Tests
console.log('\n--- TEST 2: Candidate Suggestions (findClosestSuggestions) ---');
const testWords = ['manger', 'dveloper', 'recieved', 'sucess', 'enginer'];
testWords.forEach((word) => {
  const suggestions = findClosestSuggestions(word, 2, 3);
  console.log(`Word "${word}" -> suggestions:`, suggestions);
  if (suggestions.length === 0) {
    console.error(`❌ Expected suggestions for "${word}", got none!`);
    process.exit(1);
  }
});

// 3. checkGrammar Full Workflow Test
console.log('\n--- TEST 3: checkGrammar on Realistic Resume Text ---');
const sampleInput = `
<p>Senior dveloper who was responsible for managing cloud databse clusters using kubernetes and Docker.</p>
<ul>
  <li>Recieved awards for achiving 99.9% uptime in in production.</li>
  <li>Built backend APIs using React,Node and postgresql.</li>
</ul>
`;

const report = checkGrammar(sampleInput);
console.log(`Detected ${report.issues.length} issues (Score: ${report.healthScore}/100):`);
report.issues.forEach((issue) => {
  console.log(`  - [${issue.category.toUpperCase()}] "${issue.originalText}" -> "${issue.suggestedText}" (${issue.explanation})`);
});

// Check that specific issues were caught
const originalTexts = report.issues.map((i) => i.originalText.toLowerCase());
const expectedFound = ['dveloper', 'responsible for', 'databse', 'kubernetes', 'recieved', 'achiving', 'in in', 'react,node'];

let allFound = true;
expectedFound.forEach((expected) => {
  const found = originalTexts.some((t) => t.includes(expected));
  if (found) {
    console.log(`  [OK] Caught "${expected}"`);
  } else {
    console.error(`  [MISSING] Failed to catch "${expected}"`);
    allFound = false;
  }
});

if (!allFound) {
  console.error('❌ checkGrammar missed some target errors!');
  process.exit(1);
}

// 4. autoCorrectText Safe HTML Transformation Test
console.log('\n--- TEST 4: autoCorrectText HTML Safety ---');
const { updatedHtml, fixedCount } = autoCorrectText(sampleInput);
console.log(`Auto-corrected ${fixedCount} issues.`);
console.log('Resulting HTML:');
console.log(updatedHtml);

// Verify tags are strictly intact
if (!updatedHtml.includes('<p>') || !updatedHtml.includes('</p>') || !updatedHtml.includes('<ul>') || !updatedHtml.includes('<li>')) {
  console.error('❌ HTML markup was corrupted during auto-correction!');
  process.exit(1);
}

// Verify corrections applied
if (updatedHtml.includes('dveloper') || updatedHtml.includes('databse') || updatedHtml.includes('achiving')) {
  console.error('❌ Some errors were not auto-corrected!');
  process.exit(1);
}

console.log('\n==================================================');
console.log('✅ ALL TESTS PASSED! Free Algorithmic Spellcheck verified.');
console.log('==================================================\n');
