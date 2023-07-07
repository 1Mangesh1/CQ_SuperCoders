'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readLine() {
    return inputString[currentLine++];
}

function main(){
    // Use the readLine() method to read a line from STDIN
    console.log("Enter Number: ");
    var a = readLine();
    setTimeout(()=> {
        console.log(a);
    }, 2000);
}

main();