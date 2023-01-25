const userService = require("../services/userService");
const dollService = require("../services/dollService");
const { generateToken } = require("../helpers/jwtHelper");
const { generatefreshToken } = require("../helpers/jwtHelper");

const getInitialData = async (req, res) => {
  const { params: { userEmail } } = req;

  if (!userEmail) {
    return res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':userEmail' can not be empty" }
      });
  }

  try {
    const resObj = {};

    const currentUser = await userService.getOneUser(userEmail);
    if (!currentUser) {
      return res
        .status(404)
        .send({
          status: "FAILED",
          data: { error: `Can't find user with the email '${userEmail}'` }
        });
    }

    const allDolls = await dollService.getAllDolls();
    resObj.doll = allDolls;

    if (currentUser.joshua) {
      const acolytes = await userService.getAcolitsUsers();
      resObj.acolytes = acolytes;

      return res.send({ status: "OK", data: resObj });
    }

    resObj.acolyte = currentUser;
    res.send({ status: "OK", data: resObj });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        message: "Error al realizar la petición",
        data: { error: error?.message || error }
      });
  }
}

const getAcolitsUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAcolitsUsers();
    if (allUsers.length === 0) {
      return res.status(404).send({ message: "No existen usuarios" });
    }
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Error al realizar la petición:",
      data: { error: error?.message || error },
    });
  }
};

// Function to insert user by token
const loginUser = async (req, res) => {
  console.log("LOGIN USER");
  const { body } = req;

  if (!body.token || !body.claims.name || !body.claims.email) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'idToken', 'name', 'email'",
      },
    });
  }

  const newUser = {
    token: body.token,
    name: body.claims.name,
    email: body.claims.email,
    joshua:
      body.claims.email === process.env.ROL_JOSHUA
        ? true
        : body.claims.email === process.env.ROL_MORTIMER
        ? true
        : body.claims.email === process.env.ROL_JOSHUA_GROUP
        ? true
        : false,

    active: false,
    avatar: body.claims.picture,
    life: 100,
    money: 29,
    concentration: 100,
    endurance: 100,
    onCrypt: false,
    idSocket: null,
    userState:"awake"
  };

  try {
    const resObj = {
      user: {},
      body: {}
    };
    const createdUser = await userService.loginUser(newUser);
    const accessToken = generateToken(createdUser.email);
    const refreshToken = generatefreshToken(createdUser.email);
    const userObj = createdUser.toObject();
    userObj.accessToken = accessToken;
    userObj.refreshToken = refreshToken;

    resObj.user = userObj;

    const allDolls = await dollService.getAllDolls();
    resObj.body.doll = allDolls;

    if (userObj.joshua) {
      const acolytes = await userService.getAcolitsUsers();
      resObj.body.acolytes = acolytes;
    } else {
      resObj.body.acolyte = createdUser;
    }

    res.status(201).send({ status: "OK", data: resObj });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Error al realizar la petición:",
      data: { error: error?.message || error },
    });
  }
};

const updateOneUser = async (req, res) => {
  const {
    body,
    params: { userEmail },
  } = req;

  if (!userEmail) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':userEmail' can not be empty",
      },
    });
  }

  try {
    const updatedUser = await userService.updateOneUser(userEmail, body);

    if (!updatedUser) {
      return res.status(404).send({
        status: "FAILED",
        data: {
          error: `Can't find user with the id '${userEmail}'`,
        },
      });
    }

    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        message: "Error al realizar la petición:",
        data: { error: error?.message || error },
      });
  }
};

const updateOnCrypt = async (req, res) => {
  const {
    body,
    params: { userEmail },
  } = req;

  if (!userEmail) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':userEmail' can not be empty",
      },
    });
  }

  try {
    const updatedOncrypt = await userService.updateOnCrypt(userEmail, body);

    if (!updatedOncrypt) {
      return res.status(404).send({
        status: "FAILED",
        data: {
          error: `Can't find user with the id '${userEmail}'`,
        },
      });
    }

    res.send({ status: "OK", data: updatedOncrypt });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Error al realizar la petición:",
      data: { error: error?.message || error },
    });
  }
};

// const deleteOneUser = async (req, res) => {
//   const {
//     params: { userId },
//   } = req;

//   if (!userId) {
//     return res.status(400).send({
//       status: "FAILED",
//       data: {
//         error: "Parameter ':userId' can not be empty",
//       },
//     });
//   }

//   try {
//     const deletedUser = await userService.deleteOneUser(userId);

//     if (!deletedUser) {
//       return res.status(404).send({
//         status: "FAILED",
//         data: {
//           error: `Can't find user with the id '${userId}'`,
//         },
//       });
//     }

//     res.status(200).send({ status: "OK", data: deletedUser });
//   } catch (error) {
//     res.status(error?.status || 500).send({
//       status: "FAILED",
//       message: "Error al realizar la petición:",
//       data: { error: error?.message || error },
//     });
//   }
// };

module.exports = {
  getInitialData,
  getAcolitsUsers,
  loginUser,
  updateOneUser,
  updateOnCrypt,
  // deleteOneUser,
};
