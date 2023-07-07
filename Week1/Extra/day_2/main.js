const solution = () => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(
      "Please provide two numbers as input (e.g --> node main.js 1 2)"
    );
  } else {
    const num1 = parseFloat(args[0]);
    const num2 = parseFloat(args[1]);

    console.log(`Addition of ${num1} and ${num2} = ${num1 + num2}`);
    console.log(`Subtraction of ${num1} and ${num2} = ${num1 - num2}`);
    console.log(`Division of ${num1} and ${num2} = ${num1 / num2}`);
    console.log(`Multiplication of ${num1} and ${num2} = ${num1 * num2}`);
  }
};

solution();

/**
Program to take input from command line and performs arithmetic operations

Use process.argv to get the command line arguments.
process.argv is an array of strings.
Where,
  process.argv[0] is path of the node executable.
  process.argv[1] is path of the file that is being executed.(Currently Executed).
  process.argv[2] ... onwards all command line arguments each on new index.
So, we used slicing on that array to remove first 2 elements.
Now, check if used entered to parameters or not
if not then error message
else perform arithmetic operations
 */