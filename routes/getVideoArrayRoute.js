const express = require("express");

// Imports path which is a node js module for working with file and directory paths
const path = require("path");

// Imports readFileSync from fs which needs to be destructured. 
// readFileSync returns the content of a file directory
const {readFileSync} = require("fs");
const { get } = require("http");

const router = express.Router();

router.get("/", (request, response)=> {

    // Gets directory to json file
    const jsonFile = path.join(__dirname, "../data/videos.json");

    // Fetches content from JSON file. Content is in JSON
    const fileContent = readFileSync(jsonFile);

    // Transform JSON file data to js array
    const array = JSON.parse(fileContent);

    // Get the array as a response
    // Change the image of each item in the array to the local image file in the public directory
    for (let i=0; i<array.length; i++) {
        // Replace the value of each image property in the array with the local file image
       array[i].image=(`http://localhost:5050/image/${i}`)
    }
    response.send(array);

})


module.exports = router;