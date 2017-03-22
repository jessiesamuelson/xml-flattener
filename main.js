const fs = require('fs');

var mainFile = '';
function readFiles(directory) {
  return new Promise((resolve, reject) => {
    console.log('readfiles');
    fs.readdir(directory, (err, files) => {
      files.forEach(file => {
        var singleFile = fs.readFileSync(`./${directory}/${file}`).toString();
        singleFile = singleFile.replace(/\n|\t/g, '');
        mainFile += `${singleFile}\n`;
      });
      resolve(mainFile);
    });
  })
}

function writeFiles(outputFile, input) {
  var stream = fs.createWriteStream("output.txt");
  stream.once('open', (fd) => {
          stream.write(input);
          stream.end();
        });
}

function readAndWrite(directory, outputFile) {
  readFiles(directory)
    .then((input) => {
      // console.log('in then', input);
      writeFiles(outputFile, input);
    })
}


readAndWrite('sample-xml', 'output.txt');
