const express = require("express");

const app = express();

// Allowing two domains to talk to each other (the server to talk to the client)
const cors = require("cors");
app.use(cors());

// Loads the environment variables from .env files
require("dotenv").config();

// Go into the process.env and get the PORT env variable "PORT"
const port = process.env.PORT || 5050;  // adding a backup port, in case no env file was found

// Alternatively, we can destructure PORT as below>>>>>>
// const {PORT} = process.env;

const getImageRoute = require("./routes/getImageRoute");

const getvideoObjectRoute = require("./routes/getvideoObjectRoute");

const getVideoArrayRoute = require("./routes/getVideoArrayRoute");

const postVideoRoute = require("./routes/postVideoRoute");

const postCommentRoute = require("./routes/postCommentRoute");

const deleteCommentRoute = require("./routes/deleteCommentRoute");

const likeVideoRoute = require("./routes/likeVideoRoute");

app.use(express.json())

app.use("/image", getImageRoute);
app.use("/videos", getvideoObjectRoute);
app.use("/videos", getVideoArrayRoute);
app.use("/videos", postCommentRoute);
app.use("/videos", deleteCommentRoute);
app.use("/videos", likeVideoRoute);

app.use("/videos", postVideoRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
