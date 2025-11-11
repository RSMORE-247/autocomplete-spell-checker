// index.js - Main entry point for spell checking application
const { Trie } = require('./trie');
const { SpellCheck } = require('./SpellCheck');

class AutoCompleteSpellCheck {
    constructor(dictionaryWithFrequencies) {
        this.trie = new Trie();
        for (let entry of dictionaryWithFrequencies) {
            this.trie.insert(entry.word, entry.frequency);
        }
        this.spellCheck = new SpellCheck(dictionaryWithFrequencies.map(e => e.word));
    }

    getAutoCompleteSuggestions(prefix, topK = 5) {
        return this.trie.getAutoCompleteSuggestions(prefix, topK);
    }

    getSpellCheckSuggestions(word, maxDistance = 2) {
        return this.spellCheck.getSpellCheckSuggestions(word, maxDistance);
    }
}

// Example usage
const sampleInput = {
    dictionary: [
        { word: 'project', frequency: 200 },
        { word: 'prompt', frequency: 150 },
        { word: 'product', frequency: 180 },
        { word: 'program', frequency: 170 },
        { word: 'produce', frequency: 160 },
        { word: 'progress', frequency: 140 },
    ],
    testWords: ['projet', 'promt', 'prodct', 'prgram', 'produc', 'progres']
};

// Create an instance of AutoCompleteSpellCheck
const autoComplete = new AutoCompleteSpellCheck(sampleInput.dictionary);

console.log('=== AUTOCOMPLETE & SPELL CHECKER DEMO ===\n');

// Test Autocomplete
console.log('**** AUTOCOMPLETE TEST: ****');
console.log('Prefix: "pro"');
const autocompleteSuggestions = autoComplete.getAutoCompleteSuggestions('pro', 3);
console.log('Top 3 Suggestions:', autocompleteSuggestions.map(s => `${s.word} (freq: ${s.frequency})`));
console.log('');

// Test Spell Check for each misspelled word
console.log('**** SPELL CHECK TEST: ****');
for (let testWord of sampleInput.testWords) {
    const suggestions = autoComplete.getSpellCheckSuggestions(testWord, 2);
    console.log(`Misspelled: "${testWord}" → Suggestions: [${suggestions.join(', ')}]`);
}

console.log('\n++++++++++++++ Tests completed successfully! ++++++++++++++');

// Export for use in other modules
module.exports = AutoCompleteSpellCheck;