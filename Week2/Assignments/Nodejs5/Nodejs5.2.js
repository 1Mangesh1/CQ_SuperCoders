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
    const urls = fileData
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const requests = urls.map((url) => makeHttpRequest(url));
    const responses = await Promise.all(requests);

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const fileName = "url_" + i + ".json";
      fs.writeFileSync(fileName, response);
      console.log("data from", urls[i], "saved to", fileName);
    }
  } catch (error) {
    console.error("Error occurred while receiving data: ", error);
  }
}

const filePath = "urls.txt";
fetchDataFromFile(filePath);
