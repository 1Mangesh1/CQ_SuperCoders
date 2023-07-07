const fs = require('fs');
const path = require('path');

function copyFilesByExtension(sourceDir, targetDir, extension) {
 
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const itemPath = path.join(sourceDir, item);
    const itemStats = fs.statSync(itemPath);

    if (itemStats.isFile()) {
      const fileExtension = path.extname(item);

      if (fileExtension === extension) {
        const targetFile = path.join(targetDir, item);
        fs.copyFileSync(itemPath, targetFile);
        console.log("Copied "+ item+" from " +sourceDir+" to "+targetFile);
      }
    } else if (itemStats.isDirectory()) {
      const newSourceDir = path.join(sourceDir, item);
      const newTargetDir = path.join(targetDir, item);
      copyFilesByExtension(newSourceDir, newTargetDir, extension);
    }
  }
}
const sourceDirectory = './source';
const targetDirectory = './target';
const fileExtension = '.txt';

copyFilesByExtension(sourceDirectory, targetDirectory, fileExtension);

// Output:
// PS E:\work\cq\Week2\Assignments\Nodejs3\ex4> node index.js
// Copied a.txt from ./source to target\a.txt
