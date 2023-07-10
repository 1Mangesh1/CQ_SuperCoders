const fs = require("fs");


// 1. Read the file exercise1.txt

fs.readFile("exercise2.txt", "utf8", function(err, data) {
    if (err){
        console.log(err);

    }
    else{
        console.log("data : ", data);
    }
});



