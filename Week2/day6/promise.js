//promise
//promise is an object that may produce a single value some time in the future
//either a resolved value or a reason that it's not resolved
//a promise may be in one of 3 possible states: fulfilled, rejected, or pending
//promise is a returned object to which you attach callbacks, instead of passing callbacks into a function
//callback hell
//callback hell is a phenomenon that afflicts a JavaScript developer when he tries to execute multiple asynchronous operations one after the other
//callback hell is a result of poor understanding of asynchronous programming in JavaScript

//schedule a callback to be called in the future
//scheduler
//display a message after some time

// function afterSomeTime(time,msg){
//     setTimeout(function(){
//         console.log(msg);
//     }
//     ,time);
// }

// afterSomeTime(1000,"Hello World");



// function afterSomeTime(time,msg){
//     setTimeout(function(){
//         callback();
//     },time);

// }

// afterSomeTime(1000,function(){
//     console.log("Hello World after 1 second");
// });

const fs = require('fs');

function readFile(time,callback){
    setTimeout(function(){
       fs.readFile('./data.txt','utf8',function(err,data){
        if (err){
            callback(err);
        }else{
            callback(null,data);
        }
    });
    },time);
}

readFile(2000,function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

