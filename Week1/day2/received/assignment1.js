// Geting the numbers from the command line arguments
const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);

// Checking if both numbers are valid
if (isNaN(num1) || isNaN(num2)) {
  console.log("Please provide valid numbers as command line arguments.");
  process.exit(1);
}

// Performing arithmetic operations
const sum = num1 + num2;
const difference = num1 - num2;
const product = num1 * num2;
const quotient = num1 / num2;
 
// Printing results
console.log(`Sum: ${sum}`);
console.log(`Difference: ${difference}`);
console.log(`Product: ${product}`);
console.log(`Quotient: ${quotient}`);