const fs = require('fs');
const https = require('https');

// Function to make an HTTP request and return a Promise
function makeHttpRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
  
      response.on('end', () => {
        resolve(data);
      });
  
      response.on('error', (error) => {
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Function to read file, fetch URLs, and process responses
async function fetchDataFromFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const urls = fileData.split('\n');

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i].trim();
      if (url !== '') {
        const response = await makeHttpRequest(url);
        const fileName = `url_${i}.json`;
        fs.writeFileSync(fileName, response);
        console.log(`Data from ${url} saved to ${fileName}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage example
const filePath = 'urls.txt';
fetchDataFromFile(filePath);
