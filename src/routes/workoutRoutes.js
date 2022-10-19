const express = require('express');
const router = express.Router();

const userController = require('../controllers/workoutController');

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

module.exports = router;