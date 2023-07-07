const randomNumber = require('./utils/generator/random');


var num1 =  randomNumber(1, 100);
var num2 = randomNumber(1, 100);

console.log("First random number generated " + num1);
console.log("Second random number generated " + num2);

console.log();
var sum = num1 + num2;
var difference = num1 - num2;
var product = num1 * num2;
var quotient = Math.floor(num1 / num2);
var remainder = num1 % num2;

console.log("The sum of " + num1 + " and " + num2 + " is " + sum);
console.log("The difference of " + num1 + " and " + num2 + " is " + difference);
console.log("The product of " + num1 + " and " + num2 + " is " + product);
console.log("The quotient of " + num1 + " and " + num2 + " is " + quotient);
console.log("The remainder of " + num1 + " and " + num2 + " is " + remainder);

// Output:
// PS E:\work\cq\week1\assignments\nodejs2> node index.js
// First random number generated 60
// Second random number generated 45

// The sum of 60 and 45 is 105      
// The difference of 60 and 45 is 15
// The product of 60 and 45 is 2700 
// The quotient of 60 and 45 is 1   
// The remainder of 60 and 45 is 15 
// PS E:\work\cq\week1\assignments\nodejs2>  
