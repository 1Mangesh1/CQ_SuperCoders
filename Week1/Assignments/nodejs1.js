console.log('Enter the first number: ');
process.stdin.once('data', (num1) => {
console.log('Enter the second number: ');
  process.stdin.once('data', (num2) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    const sum = n1 + n2;
    const difference = n1 - n2;
    const product = n1 * n2;
    const division = n1 / n2;

    console.log("Sum is "  + sum);
    console.log("Difference is " + difference);
    console.log("Product is " + product);
    console.log("Division is " + division);
    
    process.exit();

  });
});

// Output:
// PS E:\work\cq> node nodejs1.js
// Enter the first number: 
// 15
// Enter the second number: 
// 5
// Sum is 20       
// Difference is 10
// Product is 75   
// Division is 3   
// PS E:\work\cq>  