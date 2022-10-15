const express = require("express");

// Imports path which is a node js module for working with file and directory paths
const path = require("path");

// Imports readFileSync from fs which needs to be destructured.
// readFileSync returns the content of a file directory
const { readFileSync } = require("fs");

const router = express.Router();

// http get request handler for sending JSON object to client, but changing image property
// value to image on local server
// GET /videos/:id that responds with an object containing the details of the video with an id of :id.

router.get("/:id", (request, response) => {
  const id = request.params.id;
  const objectPath = path.join(__dirname, "../data/videos.json");

  // readFileSync allows js to read the content of the json file directory and returns the content
  const fileContent = readFileSync(objectPath);

  // Transform JSON file to a js array
  const arrayVideos = JSON.parse(fileContent);

  // Loop through the array to check for which object in the array had the same id as the query params
  for (let i = 0; i < arrayVideos.length; i++) {
    if (id === arrayVideos[i].id) {
      response.send(arrayVideos[i]);
    }
    console.log(response.data);
  }
});

module.exports = router;
