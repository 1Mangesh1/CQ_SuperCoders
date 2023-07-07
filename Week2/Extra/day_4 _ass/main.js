const copyFile = require('./utils/copyFile');
const readFile = require('./utils/readFile');
const readLine = require('readline');
const writeFile = require('./utils/writeFile');

const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Excercise- 1
copyFile('./src', './dest', '.txt');

// // Excercise- 2
// readFile('./src/zoo/dog.webp');
// readFile('./src/zoo/Greetings.txt');

// // // Excercise- 3
// let fileName = './src/Writing.txt';
// let fileContent = '';

// r1.question("Enter the file content: ", (userFileContent) => {
//     fileContent = userFileContent;
//     r1.close();
// });

// r1.on('close', () => {
//     writeFile(fileName, fileContent);
//     readFile('./src/Writing.txt');
// });