const User = require("../models/userModel");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

const getAcolitsUsers = async () => {
  try {
    const users = await User.find({ joshua: false });
    return users;
  } catch (error) {
    throw error;
  }
};

const getOneAcolit = async (gmail) => {
  try {
    const users = await User.findOne({ email: gmail });
    return users;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (newUser) => {
  try {
    const user = await User.findOne({ email: newUser.email });
    if (!user) {
      let userToInsert = new User(newUser);
      const createdUser = await userToInsert.save();
      return createdUser;
    }
    newUser.active = true;
    let updatedUser = await User.findOneAndUpdate(
      { email: newUser.email },
      { $set: newUser },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = async (userEmail, changes) => {
    try {
        let updatedUser = await User.findOneAndUpdate({email:userEmail}, {$set:changes}, {new:true});
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const updateOnCrypt = async (userEmail, changes) => {
  try {
    let user = await User.findOne({email: userEmail});
    let oncrypt_aux;

    if (user.onCrypt) {
      oncrypt_aux=false
    } else {
      oncrypt_aux=true
    }
   
    let updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { onCrypt: oncrypt_aux}
      },
      {new: true}
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteOneUser = async (userId) => {
  try {
    let deletedUser = await User.findByIdAndRemove(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  loginUser,
  updateOneUser,
  updateOnCrypt,
  deleteOneUser,
  getAcolitsUsers,
  getOneAcolit
};
