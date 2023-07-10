// let promise = new Promise(function(resolve, reject)
// {
//     console.log("Promise is created");
//     resolve(50);
// }
// );

// console.log("1");

// setTimeout(() => {
//     console.log("2");
// }, 2000);

// console.log("3")

// console.log(promise);

let p1 = new Promise(function (resolve, reject) {
  console.log("promise1 is pending");
  setTimeout(() => {
    //console.log("resolve");
    resolve(50);
  }, 2000);
});

let p2 = new Promise(function (resolve, reject) {
  console.log("promise2 is pending");
  setTimeout(() => {
    //console.log("reject");
    reject(new Error("bye bye"));
  }, 2000);
});

p1.then(function (data) {
  console.log(data);
});
p2.catch(function (err) {
    console.log("error occured");
    });