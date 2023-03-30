const express = require("express");
const path = require("path");

const app = express();

app.use("/assets", express.static(__dirname + "/dist/assets"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

const frontPort = process.env.FRONT_PORT || 8080;
app.listen(frontPort, () => {
  console.log(`Server listening on http://localhost:${frontPort}`);
});
