const fs = require("fs");
const https = require("https");

function makeHttpRequest(url) {
  return new Promise(function(resolve, reject) {
    https.get(url, function(response) {
      let data = "";

      response.on("data", function(chunk) {
        data += chunk;
      });

      response.on("end", function() {
        resolve(data);
      });

      response.on("error", function(error) {
        reject(error);
      });
    }).on("error", function(error) {
      reject(error);
    });
  });
}

function fetchDataFromFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const urls = fileData.split("\n");

    const fetchPromises = urls.map(function(url, index) {
      return new Promise(function(resolve, reject) {
        url = url.trim();
        if (url !== "") {
          makeHttpRequest(url)
            .then(function(response) {
              const fileName = `url_${index}.json`;
              fs.writeFileSync(fileName, response);
              console.log(`Data from ${url} saved to ${fileName}`);
              resolve();
            })
            .catch(function(error) {
              console.error(`Error fetching data from ${url}`, error);
              reject(error);
            });
        } else {
          resolve();
        }
      });
    });

    Promise.all(fetchPromises)
      .then(function() {
        console.log("All data fetched and saved successfully.");
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

const filePath = "urls.txt";
fetchDataFromFile(filePath);
