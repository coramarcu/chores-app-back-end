const express = require("express");
const choresRoutes = require("./routes/chores-routes");
const choresController = require("./controllers/chores-controllers");
const familyController = require("./controllers/family-controllers");

const app = express();

app.use(express.json());
app.use("/chores", choresController.createChores);
app.use("/family", familyController.createFamily);

app.get("/", (req, res) => {
  res.status(201);
  res.send("Hello app!");
});

module.exports = app;
