const express = require("express");
const router = express.Router();
const choresController = require("../controllers/chores-controller");

router.get("/chores", choresController.getChores);
router.post("/chores", choresController.createChores);

module.exports = router;
