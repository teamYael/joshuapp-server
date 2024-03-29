const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { verifyEmail } = require("../middleware/verifyEmail");
const { authenticateToken } = require("../middleware/verifyJWT");
const { authenticateRefreshToken } = require("../middleware/verifyRefreshJWT")

const userController = require("../controllers/userController");

router.get(
  "/data/:userEmail",
  authenticateToken,
  userController.getInitialData
);
router.get("/acolits", userController.getAcolitsUsers);
router.post("/token", verifyToken, verifyEmail, userController.loginUser);
router.patch("/user/:userEmail", authenticateRefreshToken, userController.updateUserTokens);
router.patch("/users/:userEmail", userController.updateOneUser);
router.patch("/acolitoncript/:userEmail", userController.updateOnCrypt);

router.post("/itsvantoken", userController.catchToken);

// router.delete("/users/:userId", userController.deleteOneUser);

module.exports = router;
