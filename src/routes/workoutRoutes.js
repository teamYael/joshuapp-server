const express = require('express');
const router = express.Router();

const userController = require('../controllers/workoutController');

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.post("/token", middleware, userController.createNewUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router;