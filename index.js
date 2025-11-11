//idnex.js - Main entry point for spell checking application
const{Trie}=require('./trie');
const{SpellCheck}=require('./spellCheck');

class AutoCompleteSpellCheck{
    constructor(dictionaryWithFrequencies){
        this.trie=new Trie();
        for(let entry of dictionaryWithFrequencies){
            this.trie.insert(entry.word,entry.frequency);
        }
        this.spellCheck=new SpellCheck(dictionaryWithFrequencies.map(e=>e.word));
    }

    getAutoCompleteSuggestions(prefix){
        return this.trie.getAutoCompleteSuggestions(prefix);
    }

    getSpellCheckSuggestions(word,maxDistance=2){
        return this.spellCheck.getSpellCheckSuggestions(word,maxDistance);
    }
}

// Example usage
const sampleInput={
    dictionary :[
    {word:'project',frequency:200},
    {word:'prompt',frequency:150},
    {word:'product',frequency:180},
    {word:'program',frequency:170},
    {word:'produce',frequency:160},
    {word:'progress',frequency:140},    
],
    testWords :['projet','promt','prodct','prgram','produc','progres']
};