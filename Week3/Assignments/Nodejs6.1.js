const { exec } = require('child_process');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to execute shell command
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Function to prompt the user to select a platform
function promptPlatform() {
  return new Promise((resolve, reject) => {
    rl.question('Select a platform (1. Windows, 2. macOS, 3. Linux): ', (platform) => {
      if (platform === '1' || platform === '2' || platform === '3') {
        resolve(platform);
      } else {
        reject(new Error('Invalid platform selection'));
      }
    });
  });
}

// Function to execute platform-specific commands
async function executeCommands(platform) {
  let commands;

  if (platform === '1') {
    commands = ['dir', 'echo "Windows command 2"', 'echo "Windows command 3"'];
  } else if (platform === '2') {
    commands = ['ls', 'echo "macOS command 2"', 'echo "macOS command 3"'];
  } else if (platform === '3') {
    commands = ['ls', 'echo "Linux command 2"', 'echo "Linux command 3"'];
  }

  for (const command of commands) {
    try {
      const result = await executeCommand(command);
      console.log(`Command: ${command}`);
      console.log(`Result:\n${result}`);
    } catch (error) {
      console.error(`Error executing command: ${command}`);
      console.error(error);
    }
  }
}

// Main program
async function runProgram() {
  try {
    const platform = await promptPlatform();
    await executeCommands(platform);
  } catch (error) {
    console.error('An error occurred:');
    console.error(error);
  } finally {
    rl.close();
  }
}

// Start the program
runProgram();
