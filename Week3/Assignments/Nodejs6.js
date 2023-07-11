const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

rl.question('Enter a shell command: ', async (command) => {
    try {
        const result = await executeCommand(command);
        console.log(`stdout: ${result.stdout}`);
        console.error(`stderr: ${result.stderr}`);
    } catch (error) {
        console.error(`exec error: ${error}`);
    }
    rl.close();
});
