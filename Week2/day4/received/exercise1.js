const fs = require('fs');
const path = require('path');

function copyFilesWithExtension(sourceDir, targetDir, extension) {
  if (!fs.existsSync(sourceDir)) {
    console.error('Source directory does not exist:', sourceDir);
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      fs.stat(sourcePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        if (stats.isDirectory()) {
          copyFilesWithExtension(sourcePath, targetPath, extension);
        } else if (path.extname(file) === extension) {
          fs.copyFile(sourcePath, targetPath, (err) => {
            if (err) {
              console.error('Error copying file:', err);
            } else {
              console.log('Copied file:', sourcePath);
            }
          });
        }
      });
    });
  });
}

// Usage: node app.js <source_directory> <target_directory> <extension>
const sourceDir = process.argv[2];
const targetDir = process.argv[3];
const extension = process.argv[4];

if (!sourceDir || !targetDir || !extension) {
  console.error('Usage: node app.js <source_directory> <target_directory> <extension>');
} else {
  copyFilesWithExtension(sourceDir, targetDir, extension);
}
