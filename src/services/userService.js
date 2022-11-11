const User = require('../database/User');

const getAcolitsUsers = async () => {
    try {
        const acolitsUsers = User.getAcolitsUsers();
        return acolitsUsers;
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

const updateOnCrypt = async (userEmail, changes) => {
    try {
        const updatedUser = User.updateOnCrypt(userEmail, changes);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

// const deleteOneUser = async userId => {
//     try {
//         let deletedUser = User.deleteOneUser(userId);
//         return deletedUser;
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = {
    getAcolitsUsers,
    loginUser,
    updateOneUser,
    updateOnCrypt,
    // deleteOneUser,
}