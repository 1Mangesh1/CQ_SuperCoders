//write different code snippents showing let var and const in action


// var
var a = 10;
var a = 20;
console.log(a); //20

// let
let b = 10;
let b = 20;
console.log(b); //SyntaxError: Identifier 'b' has already been declared


// const
const c = 10;
const c = 20;
console.log(c); //SyntaxError: Identifier 'c' has already been declared

// var
var a = 10;
if (true) {
    var a = 20;
    console.log(a); //20
}
console.log(a); //20

// let
let x = 10;
if (true) {
    let x = 20;
    console.log(b); //20
}

console.log(x); //10

// const
const  z = 10;
if (true) {
    const z = 20;
    console.log(c); //20
}
console.log( z); //10

//now scoping about let var connst
