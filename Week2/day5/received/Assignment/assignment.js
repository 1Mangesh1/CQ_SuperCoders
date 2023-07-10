const https = require('https');

const fs = require('fs');



const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';



const outputFile = 'data.txt'; 



const fileStream = fs.createWriteStream(outputFile);



https.get(API_URL, (response) => {

 response.pipe(fileStream);



 response.on('end', () => {

  console.log(`Data saved to ${outputFile}`);

 });

}).on('error', (error) => {

 console.error(`Error retrieving data: ${error.message}`);

});