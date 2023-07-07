const randomNumber = require('./utils/generator/random');


const num1 = randomNumber(1, 100);
const num2 = randomNumber(1, 100);

console.log("First random number generated: " + num1);
console.log("Second random number generated: " + num2);
console.log();

function performCalculation(choice) {
  switch (choice) {
    case 1:
      const sum = num1 + num2;
      console.log("The sum of " + num1 + " and " + num2 + " is " + sum);
      break;
    case 2:
      const difference = num1 - num2;
      console.log("The difference of " + num1 + " and " + num2 + " is " + difference);
      break;
    case 3:
      const product = num1 * num2;
      console.log("The product of " + num1 + " and " + num2 + " is " + product);
      break;
    case 4:
      const quotient = Math.floor(num1 / num2);
      console.log("The quotient of " + num1 + " and " + num2 + " is " + quotient);
      break;
    case 5:
      const remainder = num1 % num2;
      console.log("The remainder of " + num1 + " and " + num2 + " is " + remainder);
      break;
    default:
      console.log("Invalid choice!");
      break;
  }
}
console.log("Choose an operation (1: Sum, 2: Difference, 3: Product, 4: Quotient, 5: Remainder):");

process.stdin.on('data', (input) => {
  const choice = parseInt(input.toString().trim());
  console.log();

  if (choice >= 1 && choice <= 5) {
    performCalculation(choice);
    process.exit();
  } else {
    console.log("Invalid choice! Please enter a valid option.");
    console.log("Choose an operation (1: Sum, 2: Difference, 3: Product, 4: Quotient, 5: Remainder):");
  }
});
