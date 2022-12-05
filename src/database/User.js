const User = require("../models/userModel");

const getAcolitsUsers = async () => {
  try {
    const users = await User.find({ joshua: false });
    return users;
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

const updateAcolytesEndurance = async () => {
  try {
    const restEnduranceAcolytes = await User.updateMany(
      {joshua: false,
      userState: "awake"}, 
      {$inc: {endurance: -10, concentration: -10}},
      {new: true}
    );
    
    const sumEnduranceAcolytes = await User.updateMany(
      {joshua: false,
      userState: "sleeping"}, 
      {$inc: {endurance: +10, concentration: +10}},
      {new: true}
    );

    const acolytes = await User.find({ joshua: false });
    return acolytes;
  } catch (error) {
    throw error;
  }
}

const updateAcolytesState = async () => {
  try {
    const newAcolytesState = await User.updateMany(
      {endurance: { $lt: 15 }},
      {$set: {userState: "unconscious"}},
      {new: true}
    );

    const acolytes = await User.find({ joshua: false });
    return acolytes;
  } catch (error) {
    throw error;
  }
}
// const deleteOneUser = async (userId) => {
//   try {
//     let deletedUser = await User.findByIdAndRemove(userId);
//     return deletedUser;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  getAcolitsUsers,
  loginUser,
  updateOneUser,
  updateOnCrypt,
  updateAcolytesEndurance,
  updateAcolytesState,
  // deleteOneUser,
};
