const http = require('http');

const receptor = function (request, response) {
   
    const url = request.url;
    const method = request.method;

    if(url === '/'){
        response.end('Hello World\n');
        return response.end();
    }else if(url === '/about'){
        response.end('About\n');
        return response.end();
    }else if(url === '/contact'){
        response.end('Contact\n');
        return response.end();
    }else{
        response.end('Not Found\n');
    }



}


const server = http.createServer(receptor);

server.listen(3000, function () {
    console.log('Server is listening to 3000');
});

