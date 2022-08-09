const express = require("express");
const cors = require("cors");
const choresRoutes = require("./routes/chores-routes");
const familyRoutes = require("./routes/family-routes");
const choresControllers = require("./controllers/chores-controllers");
const familyControllers = require("./controllers/family-controllers");
const userControllers = require("./controllers/user-controllers");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/chores", choresControllers.createChore);
app.post("/family", familyControllers.createFamily);
app.get("/family/:familyID/chores", choresControllers.readChores);
app.patch("/family/:familyID/chores/:choreID", choresControllers.updateChore);
app.delete("/family/:familyID/chores/:choreID", choresControllers.deleteChore);
app.post("/family/:familyID/users", userControllers.createUser);
app.get("/family/users", userControllers.readUser);
app.patch("/family/:familyID/users/:userID", userControllers.updateUser);

module.exports = app;
 