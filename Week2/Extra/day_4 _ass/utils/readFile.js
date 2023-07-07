const fs = require('fs');

const readFile = (fileNameWithpath) => {
    if(!fs.existsSync(fileNameWithpath)) {
        console.log("File does not exist");
        process.exit(1);
    }
    fs.readFile(fileNameWithpath, 'utf8', (err, data) => {
        if(err) {
            console.log("Error reading file");
            console.log("Error: ", err);
            process.exit(1);
        }
        console.log("File data: ",data);
    });
}

module.exports = readFile;