const express = require("express");

const router = express.Router();

const { v4: uuid } = require("uuid");

const fs = require("fs");

router.post("/:id/comments", (request, response) => {
  // set object id property as params
  const id = request.params.id;

  // Get data from the request body
  const comment = request.body.comment;

  // Create an object for the data to be retrieved
  const newComment = {
    id: uuid(),
    name: "Naa Norkor",
    comment,
    likes: 3,
    timestamp: Date.now(),
  };

  // Get data JSON file (the json file path should be relative to root js file)
  const fileContent = fs.readFileSync("./data/videos.json");

  // Transform JSON file data to js array
  const array = JSON.parse(fileContent);

  // Get the index of the object with id params
  const indexSelected = array.findIndex((video) => id === video.id);

  // Returns a 404 error and comment message to user if object is not found
  if (indexSelected === -1) {
    response.status(404).send("Video id not found");

    return;
  }

  // Get object from array using index and push new comment to comment property in object

  array[indexSelected].comments.unshift(newComment);

  // Overwrites the videos.json file and adds the new object to the end of the array
  fs.writeFileSync("./data/videos.json", JSON.stringify(array));

  // Returns the array comment of selected object
  response.status(201).json(array[indexSelected].comments);
});

module.exports = router;
