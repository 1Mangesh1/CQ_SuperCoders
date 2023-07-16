const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout });
            }
        });
    });
}

rl.question("Enter a shell command: ", async (command) => {
    try {
        const result = await executeCommand(command);
        console.log("Output for ",command,":",result.stdout);
    } catch (error) {
        console.error("Execution error:" ,error);
    }
    rl.close();
});

// output
// 1
// PS E:\work\CQ\Week3\Assignments> node Nodejs6.js
// Enter a shell command: dir
// Output for  dir :  Volume in drive E has no label.
//  Volume Serial Number is C298-6CB7

//  Directory of E:\work\CQ\Week3\Assignments        

// 14-07-2023  15:35    <DIR>          .
// 12-07-2023  19:05             2,004 Nodejs6.1.js
// 14-07-2023  15:59               778 Nodejs6.js
//                2 File(s)          2,782 bytes
//                2 Dir(s)  99,590,553,600 bytes free
// PS E:\work\CQ\Week3\Assignments> 

// 2
// PS E:\work\CQ\Week3\Assignments> node Nodejs6.js
// Enter a shell command: ls
// Execution error: Error: Command failed: ls
// 'ls' is not recognized as an internal or external command,
// operable program or batch file.

//     at ChildProcess.exithandler (node:child_process:419:12)
//     at ChildProcess.emit (node:events:513:28)
//     at maybeClose (node:internal/child_process:1091:16)
//     at ChildProcess._handle.onexit (node:internal/child_process:302:5) {
//   code: 1,
//   killed: false,
//   signal: null,
//   cmd: 'ls'
// }
// PS E:\work\CQ\Week3\Assignments> 