// const childProcess = require('child_process');
// // console.log(process.platform);
// // const command = childProcess.spawn("node", ["childProcess2.js"]);
// const command = childProcess.spawn("dir");

// command.stdout.on('data', function(data) {
//     data = data.toString();
//     console.log(data);
// });

// command.on('close', function(code) {
//     console.log(`child process exited with code ${code}`);
// }
// );
// command.on('error', function(err) {
//     console.log(`child process exited with error ${err}`);
// }
// );


// // Path: Week3\childProcess2.js
// const childProcess = require("child_process");

// //const command = childProcess.spawn("ls", ["-a"]);

// let command = null;

// if (process.platform === "win32") {
//   command = childProcess.spawn("cmd", ["/c" ,"dir"]);
// } else {
//   command = childProcess.spawn("ls", ["-a"]);
// }

// command.stdout.on("data", function (data) {
//   console.log(data.toString());
// });

// command.on("close", function (code) {
//   console.log(`child process exited with code ${code}`);
// });
// command.on("error", function (err) {
//   console.log(`child process exited with error ${err}`);
// });

// const childProcess = require("child_process");

// const command = childProcess.spawn("dir" , ["-a"]);

// command.stdout.on("data", function (data) {
//     console.log(data);
//     });

//     command.on("close", function (code) {
//     console.log(`child process exited with code ${code}`);
//     });

//     command.on("error", function (err) {
//     console.log(`child process exited with error ${err}`);
//     });

const childProcess = require("child_process");

// const command = childProcess.exec("dir");

const command = childProcess.spawn("cmd", ["/c" ,"dir",["/a"]]);

// const command = childProcess.spawn("node", ["childProcess3.js"]);

command.stdout.on("data", function (data) {
    console.log(data.toString());
    }
    );

    command.on("close", function (code) {
    console.log(`child process exited with code ${code}`);

    }
    );

    command.on("error", function (err) {
    console.log(`child process exited with error ${err}`);
    }
    );

   