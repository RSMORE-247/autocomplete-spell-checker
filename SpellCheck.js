// spellCheck.js - Spell checking functionality using Levenshtein Distance

class SpellCheck {
    constructor(dictionary) {
        this.dictionary = dictionary;
    }

    // Calculate Levenshtein Distance between two words
    levenshteinDistance(a, b) {
        const matrix = [];
        
        // Initialize the matrix
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        
        // Compute the distances
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }
        
        return matrix[b.length][a.length];
    }

    // Get spell check suggestions for a misspelled word
    getSpellCheckSuggestions(word, maxDistance = 2) {
        const suggestions = [];
        
        for (let dictWord of this.dictionary) {
            const distance = this.levenshteinDistance(word.toLowerCase(), dictWord.toLowerCase());
            if (distance <= maxDistance) {
                suggestions.push({ word: dictWord, distance });
            }
        }
        
        // Sort suggestions by distance (closest first)
        suggestions.sort((a, b) => a.distance - b.distance);
        
        return suggestions.map(s => s.word);
    }
}

module.exports = { SpellCheck };