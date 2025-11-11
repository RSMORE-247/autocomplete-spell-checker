// Class to represent a Trie (prefix tree) data structure
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.frequency = 0; // To store frequency of the word ending at this node
        this.word = null; // To store the complete word at the end node
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the trie with its frequency
    insert(word, frequency = 1) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.frequency += frequency; // Update frequency
        node.word = word.toLowerCase(); // Store the complete word
    }

    // Search for a word in the trie
    search(word) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    // Get all words in the trie with their frequencies
    getAllWords(node = this.root, words = []) {
        if (node.isEndOfWord) {
            words.push({ word: node.word, frequency: node.frequency });
        }
        for (let char in node.children) {
            this.getAllWords(node.children[char], words);
        }
        return words;
    }

    // Get Auto-complete suggestions for a given prefix
    getAutoCompleteSuggestions(prefix, topK = 5) {
        let node = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        let words = this.getAllWords(node);
        // Sort words by frequency in descending order
        words.sort((a, b) => b.frequency - a.frequency);
        // Return top K suggestions
        return words.slice(0, topK);
    }

    // Helper function to collect all words from a node
    collectAllWords(node, words) {
        if (node.isEndOfWord) {
            words.push({ word: node.word, frequency: node.frequency });
        }
        for (let char in node.children) {
            this.collectAllWords(node.children[char], words);
        }
    }
}

module.exports = { Trie, TrieNode };