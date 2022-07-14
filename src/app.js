const express = require("express");
const choresRoutes = require("./routes/chores-routes");
const familyRoutes = require("./routes/family-routes");
const choresControllers = require("./controllers/chores-controllers");
const familyControllers = require("./controllers/family-controllers");

const app = express();

app.use(express.json());
app.post("/chores", choresControllers.createChore);
app.post("/family", familyControllers.createFamily);
app.get("/family/:familyID/chores", choresControllers.readChores);

app.get("/", (req, res) => {
  res.status(201);
  res.send("Hello app!");
});

module.exports = app;
