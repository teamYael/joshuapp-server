const express = require("express");
const router = express.Router();

const dollController = require("../controllers/dollController");

router.get("/dolls", dollController.getAllDolls);


module.exports = router;