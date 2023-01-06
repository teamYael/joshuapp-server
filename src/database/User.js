const User = require("../models/userModel");

const getAcolitsUsers = async () => {
  try {
    const users = await User.find({ joshua: false });
    return users;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (newUser, changes) => {
  try {
    const user = await User.findOne({ email: newUser.email });
    if (!user) {
      let userToInsert = new User(newUser);
      const createdUser = await userToInsert.save();
      return createdUser;
    }

    let updatedUser = await User.findOneAndUpdate(
      { email: newUser.email },
      { $set: changes },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = async (userEmail, changes) => {
  try {
    let updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: changes },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUserBySocketId = async (userSocketId, changes) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { idSocket: userSocketId },
      { $set: changes },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateOnCrypt = async (userEmail, changes) => {
  try {
    let user = await User.findOne({ email: userEmail });
    let oncrypt_aux;

    if (user.onCrypt) {
      oncrypt_aux = false;
    } else {
      oncrypt_aux = true;
    }

    let updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { onCrypt: oncrypt_aux },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateAcolytesEndurance = async () => {
  try {
    const updatedAcolytes = await User.updateMany(
      {
        joshua: { $eq: false },
        userState: { $eq: "awake" },
        endurance: { $gt: 10 },
      },
      { $inc: { endurance: -10 } }
    )
      .then(() => {
        return User.updateMany(
          {
            joshua: { $eq: false },
            userState: { $eq: "sleeping" },
            endurance: { $lt: 100 },
          },
          { $inc: { endurance: 10 } }
        );
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

const updateAcolytesConcentration = async () => {
  try {
    const updatedAcolytes = await User.updateMany(
      {
        joshua: { $eq: false },
        userState: { $eq: "awake" },
        concentration: { $gt: 10 },
      },
      { $inc: { concentration: -10 } }
    )
      .then(() => {
        return User.updateMany(
          {
            joshua: { $eq: false },
            userState: { $eq: "sleeping" },
            concentration: { $lt: 100 },
          },
          { $inc: { concentration: 10 } }
        );
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

const updateAcolytesState = async () => {
  try {
    const updatedAcolytes = await User.updateMany(
      { userState: { $eq: "awake" }, endurance: { $lt: 15 } },
      { $set: { userState: "unconscious", concentration: 10 } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const getConnectedUsersIdSocket = async () => {
  try {
    const connectedUsersIds = [];
    (await User.find({ idSocket: { $ne: null } })).forEach((user) =>
      connectedUsersIds.push(user.idSocket)
    );
    console.log(connectedUsersIds);
    return connectedUsersIds;
  } catch (error) {
    throw error;
  }
};

const getConnectedJoshuaUsersIdSocket = async () => {
  try {
    const connectedJoshuaUsersIds = [];
    (await User.find({ idSocket: { $ne: null }, joshua: true })).forEach(
      (user) => connectedJoshuaUsersIds.push(user.idSocket)
    );
    console.log(connectedJoshuaUsersIds);
    return connectedJoshuaUsersIds;
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
};
