// Create Trie graph, and use it to do autocomplete functionality.


let Node = function() {
    this.isWord = false;
    this.children = {};

};

Node.prototype = {

    // Insert a word into the graph.
    // Recursively traverse through the trie nodes (each node is a letter in the word), and create new node if does not already exist.

    insert: function(string, indexInString) {
        if(string.length == 0) {   //empty string cannot be inserted
            return;
        }

        let thisNode = this,
                character,
                child;

        if(indexInString === undefined) {
            indexInString = 0;
        }
        if(indexInString === string.length) {
            thisNode.isWord = true;
            return;
        }
        character = string[indexInString];
        if(thisNode.children[character] === undefined) { //if node for this char doesn't exist, create one
            thisNode.children[character] = new Node();
        }
        child = thisNode.children[character];
        child.insert(string, indexInString + 1);
    },

    getAllWords: function(string) {
        let thisNode = this,
            character,
            child,
            wordsToReturn = [];

        if(string === undefined) {
            string = "";
        }
        if(thisNode === undefined) {
            return [];
        }
        if(thisNode.isWord == true) {
            wordsToReturn.push(string);
        }
        for(character in thisNode.children) {
            child = thisNode.children[character];
            wordsToReturn = wordsToReturn.concat(child.getAllWords(string + character));
        }
        // console.log(wordsToReturn);
        return wordsToReturn;
    },

    // Autocomplete a given prefix

    autoComplete: function(string, indexInString) {
        if(string.length == 0) {
            return [];
        }

        let thisNode = this,
            character,
            child;

        if(indexInString === undefined) {
            indexInString = 0;
        }
        character = string[indexInString];
        child = thisNode.children[character];
        if(child === undefined) {   //node doesn't exist
            return [];
        }
        if(indexInString === string.length - 1) {
            return child.getAllWords(string);
        }
        return child.autoComplete(string, indexInString + 1);
    }
};

function createTrieGraph(arrayWords) {
  let TrieGraph = new Node();
  for(let i = 0; i < arrayWords.length; i++) {
      TrieGraph.insert(arrayWords[i]);
  }
  return TrieGraph;
}

module.exports = createTrieGraph;
