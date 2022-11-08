const User = require('../database/User');

const getAllUsers = async () => {
    try {
        const allUsers = User.getAllUsers();
        return allUsers;
    } catch (error) {
        throw error;
    }
}

const getAcolitsUsers = async () => {
    try {
        const acolitsUsers = User.getAcolitsUsers();
        return acolitsUsers;
    } catch (error) {
        throw error;
    }
}

const getOneAcolit = async gmail => {
    try {
        const user = User.getOneAcolit(gmail);
        return user;
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

const updateOneUser = async (userEmail, changes) => {
    try {
        const updatedUser = User.updateOneUser(userEmail, changes);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const updateUserActive = async (userEmail, changes) => {
    try {
        const updatedUser = User.updateUserActive(userEmail, changes);
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
    getOneAcolit,
    loginUser,
    updateOneUser,
    updateUserActive,
    deleteOneUser,
    getAcolitsUsers
}