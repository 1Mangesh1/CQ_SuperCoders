const random = require('./utils/randomNumberGenerator');



const min = parseInt(process.argv[2]);
const max = parseInt(process.argv[3]);

const randomNumber = random(min, max);
console.log(randomNumber);


