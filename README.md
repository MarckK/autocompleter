# autocompleter

## Quickstart
```bash```
git clone https://github.com/MarckK/autocompleter.git && cd autocompleter
npm install
npm start
```
Then copy http://localhost:3000/ into your browser.

## What
autocompleter enables users to submit a prefix and serves up a selection of words beginning with that prefix.

## How
There is a dictionary file with a list of 330,000 words in words.txt.
When the user enters a prefix, request.js (which has an event listener for the keyup event)
creates a new XMLHttp GET request using the string in the input field as a query string.

The handler.js function creates a response to this request by reading the query string
and passing this string to the function in findPossibleMatches.js, which passes it as a parameter
to the algorithm contained in trie.js. This builds a trie graph and creates an array of all possible
autocompleted words (in words.txt) beginning with the inputted prefix.  findPossibleMatches.js then
randomly selects 4 words from the array of autocompleted words.  

A table of words is then created in the HTML.
If the user presses enter with the same prefix still in the form, another 4 different randomly selected
autocompleted words will be displayed to the user.
