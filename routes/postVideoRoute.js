const express = require("express");

const path = require("path");

const {v4: uuid} = require("uuid");

const fs = require("fs");



const router = express.Router();

router.post("/", (request, response)=> {
    // Get data from the request body
    const {title, description} = request.body;

    // Create an object for the data to be retrieved
    const newVideo = {
        id: uuid(),
        title: title,
        description: description,
        image: "http://localhost:5050/image/0",
    };

// Fetches content from JSON file. Content is in JSON
const fileContent = fs.readFileSync("./data/videos.json");

// Transform JSON file data to js array
const array = JSON.parse(fileContent);

array.push(newVideo);

// Overwrites the videos.json file and adds the new object to the end of the array 
fs.writeFileSync("./data/videos.json", JSON.stringify(array))

response.status(201).json(array);

})

module.exports = router;
