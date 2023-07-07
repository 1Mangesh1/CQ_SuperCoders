var random = require('./helper.js');
console.log(random(100,1));
// 2. Create a new file called index.js and require the helper.js file.
// 3. In index.js, console.log the result of the randomnum function.
// 4. In the terminal, run node index.js and make sure you see a random number printed out.
// 5. In index.js, console.log the result of the randomnum function again.
// 6. In the terminal, run node index.js and make sure you see a different random number printed out.

// artihmatic operations with rnadom numbers

var random = require('./helper.js');

var n1 = random(100,1);
var n2 = random(100,1);

console.log(n1 + n2);
console.log(n1 - n2);
console.log(n1 * n2);
console.log(n1 / n2);
console.log(n1 % n2);



