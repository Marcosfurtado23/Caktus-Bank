const https = require('https');
const url = process.argv[2];

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.postimg\.cc\/[^"']+/);
    if (match) {
      console.log(match[0]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
