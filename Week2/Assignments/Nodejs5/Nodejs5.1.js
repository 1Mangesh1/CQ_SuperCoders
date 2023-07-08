const fs = require('fs');
const http = require('http');
const https = require('https');

// Function to make an HTTP request and return a Promise
function makeHttpRequest(url) {
  const protocolModule = url.startsWith('https://') ? https : http;

  return new Promise(function(resolve, reject) {
    protocolModule.get(url, function(response) {
      let data = '';

      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function() {
        resolve(data);
      });

      response.on('error', function(error) {
        reject(error);
      });
    }).on('error', function(error) {
      reject(error);
    });
  });
}

// Function to read data from file and fetch URLs
function fetchDataFromFile(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, fileData) {
      if (err) {
        reject(err);
      } else {
        const urls = fileData.split('\n').map(function(url) {
          return url.trim();
        });
        resolve(urls);
      }
    });
  });
}

// Function to save data to file
function saveDataToFile(fileName, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(fileName, data, 'utf8', function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Function to handle the fetching and saving of data for each URL
async function processUrls(urls) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const response = await makeHttpRequest(url);
      const fileName = `url_${i}.json`;
      await saveDataToFile(fileName, response);
      console.log(`Data from ${url} saved to ${fileName}`);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }
}

// Usage example
const filePath = 'urls.txt';

fetchDataFromFile(filePath)
  .then(function(urls) {
    processUrls(urls);
  })
  .catch(function(error) {
    console.error('Error reading file:', error);
  });
