const fs = require('fs');

function copyFilesByExtension(sourceDir, targetDir, extension) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const itemPath = sourceDir + '/' + item;
    const itemStats = fs.statSync(itemPath);

    if (itemStats.isFile()) {
      const fileExtension = getFileExtension(item);

      if (fileExtension === extension) {
        const targetFile = targetDir + '/' + item;
        fs.copyFileSync(itemPath, targetFile);
        console.log('Copied ' + item + ' to ' + targetFile);
      }
    } else if (itemStats.isDirectory()) {
      copyFilesByExtension(itemPath, targetDir, extension);
    }
  }
}

function getFileExtension(filename) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}


const sourceDirectory = './source';
const targetDirectory = './target';
const fileExtension = 'txt';

copyFilesByExtension(sourceDirectory, targetDirectory, fileExtension);
