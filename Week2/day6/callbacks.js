//callback function

// console.log("start");

// // setTimeout( function cod() {
// //     console.log("Mangesh")

// // }, 3000);

// console.log("end");

// function add (n1,n2,callback){
//     console.log(n1+n2);
//     callback();
// }

// function gta (){
//     console.log("bruh");
// }
// add(10,5,gta);

// function fetchData(callback) {
//     setTimeout(function() {
//       const data = "Hello, world!";
//       callback(data);
//     }, 2000);
//   }

//   function processResult(data) {
//     console.log("Received data: " + data);
//   }

//   fetchData(processResult);
// function makeData(callback) {
// setTimeout(function()   {
//     console.log("data is ready")
//     callback();
// }, 4000);
// }

// function processResult() {
//     console.log("data is processed");
// }

// makeData(processResult);

// function arithmatic(n1,n2,callback){
//     console.log("addition : ",n1+n2);
//     callback();
// }

// function printer(){
//     console.log("jhala");
// }

// arithmatic(8,8,printer);

// function pehlewala(callback){
//     setTimeout(() => {
//         console.log("input here ")
//         process.stdin.once('data',(num1)=>{
//           num1 = parseFloat(num1)
//             console.log("dusra kam in background and data : ", num1);
//             callback();
//         })

//     }, 5000);
// }

// function badwala(){

//     console.log("all done ");
//     process.exit();
// }

// console.log("pehla kam");
// pehlewala(badwala);
// console.log("tisra kam");

// const fs = require("fs");
// console.log("started the reading..");

// function readFiles(src, callback) {
//   setTimeout(() => {
//     fs.readFile(src, "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//         callback(src,callback);
//       }
//     });
//   }, 3000);
// }

// function onComplete(src,callback) {
//   console.log("file read complete! ");
//   console.log("updating the file now !! next callback");
//   callback(src);
// }

// function dataAdder(src) {
//   console.log("enter data : ");
//   process.stdin.once("data", (data) => {
    
//     fs.appendFile(src, data, (err, data) => {
//       if (err) {
//         console.log("error occured while appending data..");
//       } else {
//         console.log("data is updated ");
//         process.exit();
//       }
//     });
    
//   });
// }

// readFiles("./dummy.txt", () => onComplete("./dummy.txt", dataAdder));


const { error } = require("console");
const fs = require("fs");
console.log("Started the reading...");

function readFiles(src, callback) {
  setTimeout(() => {
    fs.readFile(src, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        callme();
      } else {
        console.log(data);
        callback(src);
      }
    });
  }, 3000);
}

function dataAdder(src) {
  console.log("enter data : ");
  process.stdin.once("data", (data) => {
    
    fs.appendFile(src, data, (err, data) => {
      if (err) {
        console.log("error occured while appending data..");
      } else {
        console.log("data is updated ");
        process.exit();
      }
    });
    
  });
}


function onCompleteWrapper(src) {
  console.log("File read complete!");
  console.log("Updating the file now...");
  onComplete(src, dataAdder);
}

function onComplete(src, callback) {
  console.log("Enter data: ");
  process.stdin.once("data", (data) => {
    fs.appendFile(src, data, (err) => {
      if (err) {
        console.log("An error occurred while appending data.");
      } else {
        console.log("Data is updated.");
      }
    });
  });
}

readFiles("./dummy.txt", onCompleteWrapper) 
// {
//   if(error){
//     console.log(error);
//     callme();
//     return;
//   }
//   console.log(data);
//   callback(src);
// }
