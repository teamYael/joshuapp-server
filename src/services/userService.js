const User = require('../database/User');

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

const loginUser = async newUser => {
    try {
        const createdUser = User.loginUser(newUser);
        return createdUser;
    } catch (error) {
        throw error;
    }
}

const updateOneUser = async (userId, changes) => {
    try {
        const updatedUser = User.updateOneUser(userId, changes);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const deleteOneUser = async userId => {
    try {
        let deletedUser = User.deleteOneUser(userId);
        return deletedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    loginUser,
    updateOneUser,
    deleteOneUser
}