"use strict";

const express = require("express");

const router = express.Router();

const fs = require("fs");

// Takes value of like property which is a string, adds 1 to it, then returns it as a string
const updateLikesNumber = (likesProperty) => {
  const removeCommas = likesProperty.replaceAll(",", "");
  let toNumber = parseInt(removeCommas);
  const updatedNumber = toNumber+1;
  const updatedLikes = updatedNumber.toLocaleString("en-US");

  return updatedLikes;
};

router.put("/:videoId/likes", (request, response) => {
  // set object id property as params
  const videoId = request.params.videoId;

  const commentId = request.params.commentId;

  // Get data JSON file (the json file path should be relative to root js file)
  const fileContent = fs.readFileSync("./data/videos.json");

  // Transform JSON file data to js array
  const array = JSON.parse(fileContent);

  // Get the index of the object with video id params
  const indexSelected = array.findIndex((video) => videoId === video.id);

  // Returns a 404 error and comment message to user if video object is not found
  if (indexSelected === -1) {
    response.status(404).send("Video id not found");

    return;
  }

  // Adds 1 to number of likes
  array[indexSelected].likes = updateLikesNumber(array[indexSelected].likes);

  //   array[indexSelected].likes = Number(array[indexSelected].likes) + 1;

  // Overwrites the videos.json file and adds the new object to the array
  fs.writeFileSync("./data/videos.json", JSON.stringify(array));

  // Returns the likes value of selected object
  response.status(200).json(array[indexSelected].likes);
});

module.exports = router;
