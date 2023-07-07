const { on } = require('events');
const fs = require('fs');

function readFile(filePath) {
    fs.readFile(filePath, 'utf8', onReadFile);
}

function onReadFile (err, data) {
    if (err) {
        console.log('Error: ', err);
    }else {
        console.log('Data: ', data);
    }
}

const filePath = './a.txt';

readFile(filePath);

// Output:
// PS E:\work\cq\Week2\Assignments\Nodejs3\ex2> node index.js
// Data:  
//  something something something something something something something       
//   something something something something something something something      
//    something something something something something something something     
//     something something something something something something something    
//      something something something something something something something   
//       something something something something something something something  
//        something something something something something something something 
// PS E:\work\cq\Week2\Assignments\Nodejs3\ex2> 