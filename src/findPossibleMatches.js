const createTrieGraph = require('./trie');

//take data from words.txt and split on each new line to make array of words, to be used to create trie graph and then search for autocompleted words array, which we then randomly select from.

function findPossibleMatches(wordsTxtFileAsString, searchWord){
  let arrayWords = makeArray(wordsTxtFileAsString);
  // console.time('Time check');
  let createTrie = createTrieGraph(arrayWords);
  // console.timeEnd('Time check');
  let autocompletedWordsArray = createTrie.autoComplete(searchWord);
  let selectedWordsFromArray = randomWordsFromArray(autocompletedWordsArray);
  let result = stringifyArray(selectedWordsFromArray);
  return result;
}

function makeArray(string){
  return string.split('\n');
};

function stringifyArray(arr){
  return arr.join(',');
}

function randomWordsFromArray(autocompletedWordsArray) {
  let numberWordsWantReturned = 4;
  let arrayLength = autocompletedWordsArray.length;
  let randomWordsArray = [];

  if (arrayLength > numberWordsWantReturned) {
    for(let i = 1; i <= numberWordsWantReturned; i++) {
      let randomIndex = Math.floor(Math.random() * autocompletedWordsArray.length);
      let chosenWord = autocompletedWordsArray[randomIndex];
      randomWordsArray.push(chosenWord);
      autocompletedWordsArray.splice(randomIndex, 1);
    }
    return randomWordsArray;
  } else {
    return autocompletedWordsArray;
  }
}

module.exports = findPossibleMatches;
