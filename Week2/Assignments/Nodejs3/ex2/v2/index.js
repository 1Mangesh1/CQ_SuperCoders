const fs = require('fs');

fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log("Data :");
    console.log(data);
});



