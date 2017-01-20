const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

const readFileAsString = require('./loadFile');
const findPossibleMatches = require('./findPossibleMatches');
const StaticFilePath = '/staticFiles/';

function handler(request, response) {
  const endpoint = request.url;
  if (endpoint === '/') {
    renderIndexHtml(request, response);
  } else if (endpoint.startsWith(StaticFilePath)) {
      response.writeHead(200, {'Content-Type': getMimeType(endpoint)});
      const fileName = endpoint.substring(StaticFilePath.length)
      fs.readFile(__dirname + '/../staticFiles/' + fileName, function(error, file) {
        if (error) {
          if(e)
          response.writeHead(500);
          response.end('Sorry. We have an error!');
          return console.log(error);
        }
          response.end(file);
  });
  } else if (endpoint.includes('/create-response')) {
    createResponse(request, response);
  } else {
    response.writeHead(404);
    response.end('OH NO!');
  }
}

function getMimeType(endpoint) {
  if(endpoint.endsWith('css')) {
    return 'text/css';
  }
  if(endpoint.endsWith('js')) {
    return 'application/javascript';
  }
  return 'text/plain';
}

function renderIndexHtml(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(__dirname + '/../index.html', function(error, file) {
    if (error) {
      return console.log(error);
    }
      response.end(file);
  });
}

function createResponse(request, response) {
  let parsedUrl = url.parse(request.url);
  let parsedQueryString = querystring.parse(parsedUrl.query);
  let searchWord = parsedQueryString['inputString'];

  readFileAsString(__dirname + '/../words.txt', function(wordsTxtFileAsString){
    let possibleMatches = findPossibleMatches(wordsTxtFileAsString, searchWord);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(possibleMatches);
  });
}


module.exports = handler;
