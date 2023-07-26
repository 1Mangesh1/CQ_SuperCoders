function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulus(a, b) {
    return a % b;
}


function calculate(operation, a, b) {
  switch (operation) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
      case "modulus":
        return modulus(a, b);
      default:
      throw new Error("Invalid operation");
  }
}

// bug: Incorrect function name in the calculate() call
console.log(calculate("add", 5, 3));
console.log(calculate("subtract", 10, 2));
console.log(calculate("multiply", 4, 6));
console.log(calculate("divide", 20, 4));
console.log(calculate("modulus", 10, 3));

// Intial output
// PS E:\work\CQ\week4> node cal.js
// Debugger attached.
// 8
// 8
// 24
// 5
// Waiting for the debugger to disconnect...
// E:\work\CQ\week4\cal.js:28
//       throw new Error("Invalid operation");
//       ^

// Error: Invalid operation
//     at calculate (E:\work\CQ\week4\cal.js:28:13)
//     at Object.<anonymous> (E:\work\CQ\week4\cal.js:37:13)
//     at Module._compile (node:internal/modules/cjs/loader:1254:14)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
//     at Module.load (node:internal/modules/cjs/loader:1117:32)
//     at Module._load (node:internal/modules/cjs/loader:958:12)
//     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
//     at node:internal/main/run_main_module:23:47

// Node.js v18.15.0

// after debugging output
// PS E:\work\CQ\week4> node cal.js
// Debugger attached.
// 8
// 8
// 24
// 5
// 1
// Waiting for the debugger to disconnect...
// PS E:\work\CQ\week4> 

