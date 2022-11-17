const express = require("express");
const router = express.Router();

const dollController = require("../controllers/dollController");

router.get("/dolls", dollController.getAllDolls);
router.post("/pieces", dollController.createNewDoll);
 router.patch("/dollPieces/:dollPieceId", dollController.updateDollPieces);


module.exports = router;