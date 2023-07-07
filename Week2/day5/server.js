const http = require("http");
const fs = require("fs");

const receptor = function (request, response) {
  const url = request.url;
  const method = request.method;

  if (method === "GET") {
    if (url === "/") {
      response.setHeader(200, {
        "Content-Type": "text/html",
      });

      fs.readFile("index.html", function (err, data) {
        if (err) {
          response.end("Error getting the file");
        } else {
          response.end(data);
        }
      });
    } else if (url === "/about") {
      fs.readFile("about.html", function (err, data) {
        if (err) {
          response.statusCode = 500;
          response.end("Error getting the file");
        } else {
          response.statusCode = 200;
          response.setHeader("Content-Type", "text/html");
          response.end(data);
        }
      });
    } else if (url === "/contact") {
      fs.readFile("contact.html", function (err, data) {
        if (err) {
          response.statusCode = 500;
          response.end("Error getting the file");
        } else {
          response.statusCode = 200;
          response.setHeader("Content-Type", "text/html");
          response.end(data);
        }
      });
    }else if(url === "/contact.css"){

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/css");

        fs.readFile("contact.css", function (err, data) {
            if (err) {
                response.statusCode = 500;
                response.end("Error getting the file");
                } else {
                   
                    response.end(data);
                }
            });
        }

     else {
        response.writeHead(404);
      response.end("Page not found");
    }
  } else {
    response.end("Invalid request");
  }

  console.log("request :", request.url, request.method);
};

const server = http.createServer(receptor);

server.listen(3000, function () {
  console.log("Server running at http://localhost:3000/");
});
