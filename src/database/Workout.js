const User = require('../models/workoutModel');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

const getOneUser = async userId => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getOneUser
}