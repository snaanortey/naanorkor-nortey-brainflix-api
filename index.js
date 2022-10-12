const express = require("express");

const app = express();

PORT = 5050;

const getImageRoute = require("./routes/getImageRoute");

const videoObjectRoute = require("./routes/videoObjectRoute");

app.use("/image", getImageRoute);
app.use("/videos", videoObjectRoute);

app.listen(PORT, () => {
  console.log("listening on port");
});
