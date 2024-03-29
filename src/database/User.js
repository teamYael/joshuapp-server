const User = require("../models/userModel");
const {generateTokenNoExpiration} = require("../helpers/jwtHelper")

const CryptoJS= require('crypto-js');

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

const catchTokenItsvan = async (body) => {
  try {
    let ITSVAN_PASSWORD = process.env.ITSVAN_PASSWORD
    let ITSVAN_ENCRYPT = process.env.ITSVAN_ENCRYPT

    const Desencriptar = (ciphertext,password) =>{
      var bytes  = CryptoJS.AES.decrypt(ciphertext, password);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText
    }
    
    let passwordEncrypt = body.password
    
    let password_validator = Desencriptar(passwordEncrypt,ITSVAN_ENCRYPT)
    console.log("PASSWORD")
    console.log(password_validator)
    
    let token = null
    if(password_validator==ITSVAN_PASSWORD){
      console.log("ES CORRECTA LA CONTRASEÑA")
      console.log(`token antes: ${token}`)
      token = generateTokenNoExpiration("unai.alfaro@ikasle.aeg.eus")
      console.log(`token despues: ${token}`)
    }else{
      console.log("INTRUSO")
    }

    console.log(passwordEncrypt)
    return token;
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

const updateOnCrypt = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    let oncrypt_aux;

    if (user.onCrypt) {
      oncrypt_aux = false;
    } else {
      oncrypt_aux = true;
    }

    const updatedUser = await User.findOneAndUpdate(
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

const updateToPoison = async () => {
  try {
     const updatedAcolytes = await User.updateMany(
      { genre: { $eq: "male" }, joshua:{ $eq: false } },
      { $set: { isPoison: true} }
    );
    return updatedAcolytes
  } catch (error) {
    throw error;
  }
};

const updateQuitPoison = async (userEmail) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { isPoison: false },
      },
      { new: true }
    );
    return updatedUser;
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
  catchTokenItsvan,
};
