const express = require("express");
const choresRoutes = require("./routes/chores-routes");

const app = express();

// ========== MIDLEWARES ==========

// allow use of JSON objects for HTTP requests
app.use(express.json());

// use chores-routes.js file to handle all endpoints that start with /chores
app.use("/chores", choresRoutes);

module.exports = app;
