const fs = require('fs');

let _fileAsString = null;

//function which reads the file only once (to be used on server.js)
function readFileAsString(filePath, callback) {
  if(_fileAsString) {
    return callback(_fileAsString); // if the file already exists return it.
  }
  // use readfile node module, file path is '/words.txt', callback loads data from filepath .txt and stringefies it
  fs.readFile(filePath, function(error, data) {
    if (error) {
      return console.log(error);
    }
    _fileAsString = data.toString();
    callback(_fileAsString);  //callback function exports data as string (and loaded into server memory).
  });
}

module.exports = readFileAsString;
