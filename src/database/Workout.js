const User = require('../models/workoutModel');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers
}