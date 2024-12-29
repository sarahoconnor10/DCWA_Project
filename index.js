var express = require("express");
var app = express();

app.listen(3004, () => {
    console.log("running on port 3004");
  });

app.get("/", (req, res) => {
    res.send("hello world");
});