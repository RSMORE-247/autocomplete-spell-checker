// test.js - Unit tests for Autocomplete and Spell Checker

const { Trie } = require('./trie');
const { SpellCheck } = require('./SpellCheck');
const AutoCompleteSpellCheck = require('./index');

console.log('Running Unit Tests...\n');

let testsPassed = 0;
let testsFailed = 0;

// Helper function to run tests
function runTest(testName, testFunction) {
    try {
        testFunction();
        console.log(`PASS: ${testName}`);
        testsPassed++;
    } catch (error) {
        console.log(`FAIL: ${testName}`);
        console.log(`   Error: ${error.message}`);
        testsFailed++;
    }
}

// Test 1: Trie Insert and Search
runTest('Trie Insert and Search', () => {
    const trie = new Trie();
    trie.insert('hello', 10);
    trie.insert('help', 5);
    if (!trie.search('hello')) throw new Error('Should find "hello"');
    if (trie.search('world')) throw new Error('Should not find "world"');
});

// Test 2: Trie Autocomplete
runTest('Trie Autocomplete', () => {
    const trie = new Trie();
    trie.insert('project', 200);
    trie.insert('product', 180);
    trie.insert('program', 170);
    trie.insert('prompt', 150);
    
    const suggestions = trie.getAutoCompleteSuggestions('pro', 3);
    if (suggestions.length !== 3) throw new Error('Should return 3 suggestions');
    if (suggestions[0].word !== 'project') throw new Error('First suggestion should be "project" (highest frequency)');
});

// Test 3: Levenshtein Distance
runTest('Levenshtein Distance Calculation', () => {
    const spellCheck = new SpellCheck(['product', 'project']);
    const distance = spellCheck.levenshteinDistance('product', 'producct');
    if (distance !== 1) throw new Error(`Distance should be 1, got ${distance}`);
});

// Test 4: Spell Check Suggestions
runTest('Spell Check Suggestions', () => {
    const dictionary = ['product', 'project', 'protect', 'produce'];
    const spellCheck = new SpellCheck(dictionary);
    
    const suggestions = spellCheck.getSpellCheckSuggestions('producct', 2);
    if (suggestions.length === 0) throw new Error('Should return suggestions');
    if (!suggestions.includes('product')) throw new Error('Should suggest "product"');
});

// Test 5: Full System Integration
runTest('Full System Integration', () => {
    const dictionary = [
        { word: 'project', frequency: 200 },
        { word: 'product', frequency: 180 },
        { word: 'program', frequency: 170 }
    ];
    
    const system = new AutoCompleteSpellCheck(dictionary);
    
    // Test autocomplete
    const autoSuggestions = system.getAutoCompleteSuggestions('pro', 2);
    if (autoSuggestions.length !== 2) throw new Error('Should return 2 autocomplete suggestions');
    
    // Test spell check
    const spellSuggestions = system.getSpellCheckSuggestions('projet', 2);
    if (spellSuggestions.length === 0) throw new Error('Should return spell check suggestions');
});

// Test 6: Performance Test
runTest('Performance Test (< 100ms)', () => {
    const largeDictionary = [];
    for (let i = 0; i < 1000; i++) {
        largeDictionary.push({ word: `word${i}`, frequency: Math.floor(Math.random() * 100) });
    }
    
    const startTime = Date.now();
    const system = new AutoCompleteSpellCheck(largeDictionary);
    system.getAutoCompleteSuggestions('wor', 5);
    const endTime = Date.now();
    
    const timeTaken = endTime - startTime;
    if (timeTaken > 100) throw new Error(`Took ${timeTaken}ms, should be under 100ms`);
});

// Test 7: Empty Prefix
runTest('Empty Prefix Handling', () => {
    const trie = new Trie();
    trie.insert('hello', 10);
    const suggestions = trie.getAutoCompleteSuggestions('', 5);
    if (suggestions.length === 0) throw new Error('Should return all words for empty prefix');
});

// Test 8: No Match Found
runTest('No Match Found', () => {
    const trie = new Trie();
    trie.insert('hello', 10);
    const suggestions = trie.getAutoCompleteSuggestions('xyz', 5);
    if (suggestions.length !== 0) throw new Error('Should return empty array for no match');
});

// Print summary
console.log('\n' + '='.repeat(50));
console.log(`  Test Summary:`);
console.log(`   Passed: ${testsPassed}`);
console.log(`   Failed: ${testsFailed}`);
console.log(`   Total:  ${testsPassed + testsFailed}`);
console.log('='.repeat(50));

if (testsFailed === 0) {
    console.log('\nAll tests passed!');
} else {
    console.log('\n Some tests failed. Please review.');
}