const http = require('http');
const fs = require('fs');

const handler = require('./src/handler.js');
const readFileAsString = require('./src/loadFile');

const server = http.createServer(handler);

const port = 3000;

server.listen(port);

//read .txt file on startup of server and put it in as string in memory
// once read the file, loaded it and strigified it, open server to listening.

readFileAsString(__dirname + '/words.txt', function() {
  server.listen(port);
  console.log(`Server running on http://localhost:${port}`);
})
