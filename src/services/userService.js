const User = require("../database/User");

const getAcolitsUsers = async () => {
  try {
    const acolitsUsers = User.getAcolitsUsers();
    return acolitsUsers;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (userEmail) => {
  try {
    const user = await User.getOneUser(userEmail);
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (newUser) => {
  try {
    const createdUser = User.loginUser(newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = async (userEmail, changes) => {
  try {
    const updatedUser = User.updateOneUser(userEmail, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUserBySocketId = async (userSocketId, changes) => {
  try {
    const updatedUser = await User.updateOneUserBySocketId(
      userSocketId,
      changes
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateOnCrypt = async (userEmail, changes) => {
  try {
    const updatedUser = User.updateOnCrypt(userEmail, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateAcolytesEnduranceAndConcentration = async () => {
  try {
    const updatedAcolytes =
      await User.updateAcolytesEnduranceAndConcentration();
  } catch (error) {
    throw error;
  }
};

const updateAcolytesState = async () => {
  try {
    const updatedAcolytes = await User.updateAcolytesState();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAcolitsUsers,
  getOneUser,
  loginUser,
  updateOneUser,
  updateOneUserBySocketId,
  updateOnCrypt,
  updateAcolytesEnduranceAndConcentration,
  updateAcolytesState,
};
