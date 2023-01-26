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

const loginUser = async (newUser, changes) => {
  try {
    const createdUser = User.loginUser(newUser, changes);
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

const catchToken = async (password) => {
  try {
    const catchToken = User.catchTokenItsvan(password);
    return catchToken;
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

const updateOnCrypt = async (userEmail) => {
  try {
    const updatedUser = User.updateOnCrypt(userEmail);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateAcolytesEndurance = async () => {
  try {
    const updatedAcolytes = await User.updateAcolytesEndurance();
  } catch (error) {
    throw error;
  }
};

const updateAcolytesConcentration = async () => {
  try {
    const updatedAcolytes = await User.updateAcolytesConcentration();
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

const getConnectedUsersIdSocket = async () => {
  try {
    const connectedUsers = await User.getConnectedUsersIdSocket();
    return connectedUsers;
  } catch (error) {
    throw error;
  }
};

const getConnectedJoshuaUsersIdSocket = async () => {
  try {
    const connectedJoshuaUsersIds =
      await User.getConnectedJoshuaUsersIdSocket();
    return connectedJoshuaUsersIds;
  } catch (error) {
    throw error;
  }
};

const updateToPoison = async () => {
  try {
    const updateAcolites =
      await User.updateToPoison();
    return updateAcolites;
  } catch (error) {
    throw error;
  }
};

const updateQuitPoison = async (userEmail) => {
  try {
    const updatedUser  = User.updateQuitPoison(userEmail);
    return updatedUser ;
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
  updateAcolytesEndurance,
  updateAcolytesConcentration,
  updateAcolytesState,
  getConnectedUsersIdSocket,
  getConnectedJoshuaUsersIdSocket,
  updateToPoison,
  updateQuitPoison,
  catchToken,
};
