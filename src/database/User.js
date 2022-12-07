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

const updateAcolytesEnduranceAndConcentration = async () => {
  try {
    // const updateAcolit = await User.updateMany(
    //   { isJoshua: { $eq: false }, acolitStatus: { $eq: "awake" }, resistance: {$gt: 10} },
    //   { $inc: { resistance: - 10, concentration: - 10 } },
    //   { multi: true }
    // )
    //   .then(() => {
    //     return User.updateMany(
    //       { isJoshua: { $eq: false }, acolitStatus: { $eq: "sleeping" }, resistance: {$lt: 100} },
    //       { $inc: { resistance: 10, concentration: 10, } },
    //       { multi: true }
    //     );
    //   })
    //     .then(() => {
    //       // todos los acólitos han sido actualizados
    //     })
    //   .catch((error) => {
    //     // ocurrió un error durante la actualización de los acólitos
    //   })

    const awakeAcolytes = await User.updateMany(
      {joshua: false,
      userState: "awake"}, 
      {$inc: {endurance: -10, concentration: -10}},
      {new: true}
    );
    
    const sleepAcolytes = await User.updateMany(
      {joshua: false,
      userState: "sleeping"}, 
      {$inc: {endurance: +10, concentration: +10}},
      {new: true}
    );
  } catch (error) {
    throw error;
  }
}

const updateAcolytesState = async () => {
  try {
    await User.updateMany(
      {endurance: { $lt: 15 }},
      {$set: {userState: "unconscious"}},
      {new: true}
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAcolitsUsers,
  loginUser,
  updateOneUser,
  updateOnCrypt,
  updateAcolytesEnduranceAndConcentration,
  updateAcolytesState
};
