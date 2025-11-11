//utils.js - A Utility function for spell checking

// Calculate Lavenshtein Distance between two words
export function levenshteinDistance(a, b) {
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
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

//Find spell check suggestions
export function getSpellCheckSuggestions(word, dictionary, maxDistance = 2) {
    const suggestions = [];
    for (let dictWord of dictionary) {
        const distance = levenshteinDistance(word.toLowerCase(), dictWord.toLowerCase());
        if (distance <= maxDistance) {
            suggestions.push({ word: dictWord, distance });
        }
    }
    // Sort suggestions by distance
    suggestions.sort((a, b) => a.distance - b.distance);
    return suggestions.map(s => s.word);
}