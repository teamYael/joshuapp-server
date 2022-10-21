const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

const userController = require('../controllers/userController');

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.post("/token", verifyToken, userController.loginUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router;