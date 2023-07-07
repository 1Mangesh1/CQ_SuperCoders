const http = require('http');
const fs = require('fs');

const receptor = function(request, response) {
    // console.log(request.url, request.method);
    const { url, method } = request;
    if(method === 'GET') {
        // console.log(url);
        if(url === '/') {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            // response.end('Hello World\n');
            fs.readFile('./index.html', 'utf-8', function(err, data) {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    response.end(data);
                }
            });
        } else if (url === '/about') {
            response.end('<h1>About</h1>');
        } else if(url === '/contact') {
            response.end('<h1>Contact</h1>');
        } else {
            response.end('<h1>404 - Not Found</h1>');
        }
    }
    // 5 min default timeout for any request i
}

const server = http.createServer(receptor);

server.listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
    //127.0.0.1 == localhost
});