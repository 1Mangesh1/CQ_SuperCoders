var calculationMath = require("calculation-math");
generateRandomNum = require("myHelper.js");

const x = generateRandomNum(1,100)
const y = generateRandomNum(1,100)

console.log("Random Number - X  : "+x);
console.log("Random Number - Y  : "+y);

const a = calculationMath.mult(x,y);
console.log("Multiplication : "+a);

const b = calculationMath.div(x,y)
console.log("Division       : "+b);

const c = calculationMath.mod(x,y)
console.log("Mod            : "+c);

const d = calculationMath.sub(x,y)
console.log("Subtraction    : "+d);

const e = calculationMath.sum(x,y)
console.log("Addition       : "+d);
