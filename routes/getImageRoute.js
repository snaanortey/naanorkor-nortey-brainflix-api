const express = require("express");

// Imports path which is a node js module for managing file and directory path
const path = require("path");

const router = express.Router();


// http get request handler for sending images files from the public folder to the client
router.get("/:imageNumber", (request,response)=>{
    const imageNumber = request.params.imageNumber;
    const imagePath = path.join(__dirname, "../public/images/image" + imageNumber + ".jpeg")
    console.log(imagePath);
    response.sendFile(imagePath);
})


module.exports = router;