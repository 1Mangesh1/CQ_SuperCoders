const http = require('http');
const fs = require('fs');
const receptor = function(request, response)
{
    //console.log("RESPONSE");
    console.log("REQUEST : ", request.url);
    console.log("METHOD  : ", request.method);
    const url = request.url;
    const met = request.method;
    if(met === "GET")
    {
                if(url === '/')
            {
                response.writeHead(200, 
                    {   
                        "Content-Type":"text/html",
                    });
                fs.readFile('./homepage.html', 'utf-8',function(err,data)
                {
                    if(err)
                    {
                        console.log(err);
                        response.end(err);
                    }
                    else{
                        response.end(data);
                    }
                });
            }
            else if(url === '/about')
            {
                response.end("About");
            } 
            else if(url === '/product')
            {
                response.end("product");
            }
            else
            {
                response.end("Not Found");
            }
    }
    else{
        response.end("NOT FOUND")
    }

    
};

const server = http.createServer(receptor);

server.listen(8000, function()
{
    console.log("SERVER on 8000")
})