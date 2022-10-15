const express = require("express");

const { v4: uuid } = require("uuid");

const fs = require("fs");

const router = express.Router();

router.post("/", (request, response) => {
  // Get data from the request body
  const {
    title,
    channel,
    image,
    description,
    views,
    likes,
    duration,
    video,
    timestamp,
    comments
  } = request.body;

  // Create an object for the data to be retrieved
  const newVideo = {
    id: uuid(),
    title,
    channel,
    image,
    description,
    views,
    likes,
    duration,
    video,
    timestamp,
    comments,
  };

  // Fetches content from JSON file. Content is in JSON
  const fileContent = fs.readFileSync("./data/videos.json");

  // Transform JSON file data to js array
  const array = JSON.parse(fileContent);

  array.push(newVideo);

  // Overwrites the videos.json file and adds the new object to the end of the array
  fs.writeFileSync("./data/videos.json", JSON.stringify(array));

  response.status(201).json(array);
});

module.exports = router;
