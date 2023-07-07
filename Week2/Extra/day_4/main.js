var a = 10;
var b = a;

a = 20;

console.log(b); // 10
console.log(a); // 20

const fs = require("fs");

fs.readFile("./files/file1.txt", "utf8", function (err, data) {
  console.log(data);
});

fs.readdir("./files", function (err, files) {
  for (let i = 0; i < files.length; i++) {
    fs.lstat("./files/" + files[i], function (err, stats) {
      if (stats.isDirectory()) {
        console.log(files[i], "is a directory");
      } else {
        console.log(files[i], "is a file");
      }
    });
  }
});
