const express = require("express");
const app = express();
const cors = require("cors");

const config = require("./config");
const db = require("./db");
const StudentRouter = require("./router/studentRouter");

app.use(express.json());
app.use("/api/students", StudentRouter);

app.post("/", function (req, res) {
  res.send("<h1>Firebase API here.</h1>");
});

app.listen(config.port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", config.port);
});
