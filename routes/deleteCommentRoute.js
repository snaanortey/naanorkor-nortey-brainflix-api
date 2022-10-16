"use strict";

const express = require("express");

const router = express.Router();

const fs = require("fs");

router.delete("/:videoId/comments/:commentId", (request, response) => {
  // set object id property as params
  const videoId = request.params.videoId;

  const commentId = request.params.commentId;

  // Get data JSON file (the json file path should be relative to root js file)
  const fileContent = fs.readFileSync("./data/videos.json");

  // Transform JSON file data to js array
  const array = JSON.parse(fileContent);

  // Get the index of the object with video id params
  const indexSelected = array.findIndex((video) => videoId === video.id);

  // Returns a 404 error and comment message to user if object is not found
  if (indexSelected === -1) {
    response.status(404).send("Video id not found");

    return;
  }

  // Filter comments which id was no videoId
  const filteredArray = array[indexSelected].comments.filter(
    (comment) => commentId !== comment.id
  );

  array[indexSelected].comments = filteredArray;

  // Overwrites the videos.json file and adds the new object to the end of the array
  fs.writeFileSync("./data/videos.json", JSON.stringify(array));

  // Returns the array comment of selected object
  response.status(201).json(array[indexSelected].comments);
});

module.exports = router;
