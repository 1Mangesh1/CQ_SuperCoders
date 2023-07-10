const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let content;

readline.question("What content do you want to be saved ? ", function (input1) {
  content = input1;
  console.log("This is your content : " + input1);

  fs.writeFile("exercise3.txt", content, function (err) {
    console.log(err);
  });

  readline.close();
});

fs.readFileSync("exercise3.txt", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("data : ", data);
  }
});
