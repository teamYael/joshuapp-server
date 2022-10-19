const User = require('../database/Workout');

const getAllUsers = async () => {
    try {
        const allUsers = User.getAllUsers();
        return allUsers;
    } catch (error) {
        throw error;
    }
}

const getOneUser = async userId => {
    try {
        const user = User.getOneUser(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getOneUser
}