const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error('Usage: node fetcher.js <URL> <file-path>');
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error('Error: Unable to download the resource.');
    process.exit(1);
  }

  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.error('Error: Unable to save the file.');
      process.exit(1);
    }

    const fileSize = body.length;
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});
