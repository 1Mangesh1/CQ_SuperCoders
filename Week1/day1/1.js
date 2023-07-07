  const num1 = Number(process.argv[2]);
  const num2 = Number(process.argv[3]);

  if (isNaN(num1) || isNaN(num2)) 
  {
    console.log('Enter N1 & N2 : ');
    process.exit(1);
  }

  const sum = num1 + num2;
  const sub = num1 - num2;
  const product = num1 * num2;
  const quotient = num1 / num2;

  console.log(`Sum: ${sum}`);
  console.log(`Subtraction : ${sub}`);
  console.log(`Product: ${product}`);
  console.log(`Quotient: ${quotient}`);
