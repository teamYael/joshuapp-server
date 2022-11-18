const express = require("express");
const router = express.Router();

const dollController = require("../controllers/dollController");

router.get("/dolls", dollController.getAllDolls);
router.post("/pieces", dollController.createNewDoll);
router.patch("/doll/update/:dollId", dollController.updateDoll);
router.patch("/dollPieces/:dollPieceId", dollController.updateDollPieces);
router.delete("/doll/:dollId", dollController.deleteDoll);


module.exports = router;