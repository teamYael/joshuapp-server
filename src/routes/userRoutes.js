const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { verifyEmail } = require("../middleware/verifyEmail");

const userController = require("../controllers/userController");

router.get("/data/:userEmail", userController.getInitialData);
router.get("/acolits", userController.getAcolitsUsers);
router.post("/token", verifyToken, verifyEmail, userController.loginUser);
router.patch("/users/:userEmail", userController.updateOneUser);
router.patch("/acolitoncript/:userEmail", userController.updateOnCrypt);

// router.delete("/users/:userId", userController.deleteOneUser);

module.exports = router;
