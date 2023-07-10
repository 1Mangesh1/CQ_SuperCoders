// Initialize variables for num1 and num2
let num1, num2;

// Function to read user input from the console
function readInput(prompt) {
  return new Promise((resolve, reject) => {
    process.stdin.once('data', (data) => {
      const input = data.toString().trim();
      resolve(input);
    });

    process.stdin.on('error', (err) => {
      reject(err);
    });

    process.stdout.write(prompt);
  });
}

// Prompt and read the first number (num1)
readInput('Enter num1: ')
  .then((input) => {
    num1 = Number(input);

    // Check if num1 is a valid number
    if (isNaN(num1)) {
      console.log('Invalid input for num1. Please enter a valid number.');
      process.exit(1);
    }

    // Prompt and read the second number (num2)
    return readInput('Enter num2: ');
  })
  .then((input) => {
    num2 = Number(input);

    // Check if num2 is a valid number
    if (isNaN(num2)) {
      console.log('Invalid input for num2. Please enter a valid number.');
      process.exit(1);
    }

    // Perform arithmetic operations
    const sum = num1 + num2;
    const difference = num1 - num2;
    const product = num1 * num2;
    const quotient = num1 / num2;

    // Print the results
    console.log(`Sum: ${sum}`);
    console.log(`Difference: ${difference}`);
    console.log(`Product: ${product}`);
    console.log(`Quotient: ${quotient}`);
  })
  .catch((err) => {
    console.error('Error reading user input:', err);
    process.exit(1);
  });
