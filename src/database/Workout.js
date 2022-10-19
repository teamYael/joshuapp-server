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

const createNewUser = async newUser => {
    try {
        let userToInsert = new User(newUser);
        const createdUser = await userToInsert.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
}

const updateOneUser = async (userId, changes) => {
    try {
        let updatedWorkout = await User.findByIdAndUpdate(userId, {$set:changes}, {new:true});
        return updatedWorkout;
    } catch (error) {
        throw error;
    }
}

const deleteOneUser = async userId => {
    try {
        let deletedUser = await User.findByIdAndRemove(userId);
        return deletedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser
}