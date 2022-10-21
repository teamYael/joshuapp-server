const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.post("/", userController.createNewUser);

router.post("/token", userController.loginUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router;