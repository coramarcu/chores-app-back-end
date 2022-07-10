const express = require("express");
const choresRoutes = require("./routes/chores-routes");
const choresController = require("./controllers/chores-controllers");

const app = express();

app.use(express.json());
app.use("/chores", choresController.createChores);

app.get("/", (req, res) => {
  res.status(201);
  res.send("Hello app!");
});

module.exports = app;
