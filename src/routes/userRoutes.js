const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getOneUser);

router.post("/token", userController.loginUser);

router.patch("/users/:userId", userController.updateOneUser);

router.delete("/users/:userId", userController.deleteOneUser);

module.exports = router;