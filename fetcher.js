// IMPORT MODULES
const request = require('request');
const fs = require('fs');

const arg = process.argv.slice(2);

const fetch = (input, filePath, runAfter) => {
  request(input, (error, response, body) => {
    console.log('Downloading ' + input + ' to ' + filePath);
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);

    if (response.statusCode !== 200) {
      console.log(`Error ${response.statusCode}`);

    } else if (fs.existsSync(filePath)) {
      console.log('File already exists!');

    } else {
      fs.writeFile(`${filePath}`, body, () => {
        let fileSize = fs.statSync(filePath).size;

        console.log(`Complete: ${input} wrote ${fileSize} bytes to ${filePath}`);

      });
    }
  });
};

fetch(arg[0], arg[1]);
