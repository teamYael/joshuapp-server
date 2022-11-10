const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
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

const getOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }

  try {
    const user = await userService.getOneUser(userId);
    if (!user) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: `Can't find user with the id '${userId}'` },
      });
    }

    res.send({ status: "OK", data: user });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Error al realizar la petición:",
      data: { error: error?.message || error },
    });
  }
};

const getOneAcolit = async (req, res) => {
  const {
    params: { gmail },
  } = req;

  if (!gmail) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':gmail' can not be empty" },
    });
  }

  try {
    const user = await userService.getOneAcolit(gmail);
    if (!user) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: `Can't find user with the id '${gmail}'` },
      });
    }

    res.send({ status: "OK", data: user });
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
  console.log("LOGIN USER")
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
    joshua: (body.claims.email === process.env.ROL_JOSHUA) ? true : 
            (body.claims.email === process.env.ROL_MORTIMER) ? true : 
            false,
            
    active: false,
    avatar: body.claims.picture,
    life: 100,
    money: 29,
    onCrypt: false,
  };

  try {
    const createdUser = await userService.loginUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
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
        params: { userEmail }
    } = req;

    if (!userEmail) {
        return res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "Parameter ':userEmail' can not be empty"
                }
            });
    }

    try {
        const updatedUser = await userService.updateOneUser(userEmail, body);

        if (!updatedUser) {
            return res
            .status(404)
            .send({
                status: "FAILED",
                data: {
                    error: `Can't find user with the id '${userEmail}'`
                }
            });
        }

        res.send({ status: "OK", data: updatedUser });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } })
    }
}

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

const deleteOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':userId' can not be empty",
      },
    });
  }

  try {
    const deletedUser = await userService.deleteOneUser(userId);

    if (!deletedUser) {
      return res.status(404).send({
        status: "FAILED",
        data: {
          error: `Can't find user with the id '${userId}'`,
        },
      });
    }

    res.status(200).send({ status: "OK", data: deletedUser });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Error al realizar la petición:",
      data: { error: error?.message || error },
    });
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
