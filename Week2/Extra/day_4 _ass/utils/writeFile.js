const fs = require('fs');

const writeFile = (fileNameWithpath, data) => {
    
    if(!fs.existsSync(fileNameWithpath)) {
        console.log("File does not exist");
        process.exit(1);
    }

    fs.writeFile(fileNameWithpath, data, (err) => {
        if(err) {
            console.log("Error writing file");
            console.log("Error: ", err);
            process.exit(1);
        }
        console.log("File written successfully");
    }
    );
}

module.exports = writeFile;
