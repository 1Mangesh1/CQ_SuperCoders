const fs = require("fs");
//const http = require("http");
const https = require("https");

function makeHttpRequest(url) {
  //const protocolModule = url.startsWith("https://") ? https : http;
  const protocolModule = https;
  return new Promise(function (resolve, reject) {
    protocolModule
      .get(url, function (response) {
        let data = "";

        response.on("data", function (chunk) {
          data += chunk;
        });

        response.on("end", function () {
          resolve(data);
        });

        response.on("error", function (error) {
          reject(error);
        });
      })
      .on("error", function (error) {
        reject(error);
      });
  });
}

function fetchDataFromFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf8", function (err, fileData) {
      if (err) {
        reject(err);
      } else {
        const urls = fileData.split("\n").map(function (url) {
          return url.trim();
        });
        resolve(urls);
      }
    });
  });
}

function saveDataToFile(fileName, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(fileName, data, "utf8", function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function processUrls(urls) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const response = await makeHttpRequest(url);
      var x = i.toString();
      const fileName = "url_" + x + ".json";
      await saveDataToFile(fileName, response);

      console.log("data from ", url, "saved to", fileName);
    } catch (error) {
      console.error("error fetcing from file", error);
    }
  }
}

const filePath = "urls.txt";

fetchDataFromFile(filePath)
  .then(function (urls) {
    processUrls(urls);
  })
  .catch(function (error) {
    console.error("Error reading file:", error);
  });
