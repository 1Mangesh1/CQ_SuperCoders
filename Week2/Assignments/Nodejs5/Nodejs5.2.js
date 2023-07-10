const fs = require("fs");
const https = require("https");

function makeHttpRequest(url) {
  return new Promise(function (resolve, reject) {
    https
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

async function fetchDataFromFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const urls = fileData.split("\n");
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i].trim();
      if (url !== "") {
        const response = await makeHttpRequest(url);
        var x = i.toString();
        const fileName = "url_" + x + ".json";
        fs.writeFileSync(fileName, response);
        console.log("data from ", url, "saved to", fileName);
      }
    }
  } catch (error) {
    console.error("Error occured while receiving data : ", error);
  }
}

const filePath = "urls.txt";
fetchDataFromFile(filePath);
