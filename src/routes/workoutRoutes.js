const express = require('express');
const router = express.Router();

const userController = require('../controllers/workoutController');

router.get("/", userController.getAllUsers);

module.exports = router;