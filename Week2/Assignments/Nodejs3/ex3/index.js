const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function writeToFile(filePath, data) {
  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
    } else {
      console.log('Data written to file successfully.');
    }
  });
}

rl.question('Enter the file path: ', (filePath) => {
  rl.question('Enter the text to write: ', (data) => {
    writeToFile(filePath, data);
    rl.close();
  });
});


// Output:
// PS E:\work\cq\Week2\Assignments\nodejs3\ex3> node index.js
// Enter the file path: new.txt
// Enter the text to write: hello worldddd
// Data written to file successfully.
// PS E:\work\cq\Week2\Assignments\nodejs3\ex3> 
