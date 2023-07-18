const fs = require('fs');
const http = require('http');
const https = require('https');

const apiUrl = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=64d00271bfe548daad5a56553a1f68aa';
const filePath = 'news.json';

const receptor = function(request, response) {
  console.log('Request:', request.url, 'received', request.method);

  if (request.url === '/') {
    https.get(apiUrl, function(apiResponse) {
      response.setHeader('Content-Type', 'application/json');

      apiResponse.pipe(response);

      let data = '';
      apiResponse.on('data', function(chunk) {
        data += chunk;
      });

      apiResponse.on('end', function() {
        fs.writeFile(filePath, data, 'utf8', function(err) {
          if (err) {
            console.error('Error saving data to file:', err);
          } else {
            console.log('Data saved to file:', filePath);
          }
        });
      });
    }).on('error', function(err) {
      console.error('Error retrieving data from API:', err);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Internal Server Error');
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  }
};

const server = http.createServer(receptor);

server.listen(3000, function() {
  console.log('Server is listening on http://localhost:3000/');
});
