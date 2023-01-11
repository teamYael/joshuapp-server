const userService = require("../../src/services/userService");
const dollService = require("../../src/services/dollService");
const server = require("../../src/index");
const io = server.socketIO;
const { verifyToken } = require("../../src/middleware/verifyToken");
const { verifyEmail } = require("../../src/middleware/verifyEmail");

events = (socket) => {
  console.log({ Clientsocket: socket.id });

  // Update idSocket
  socket.on("update_idsocket", async (data) => {
    try {
      data.body = {
        idSocket: socket.id,
      };
      console.log(`Body: ${data.body}`);
      const updatedUser = await userService.updateOneUser(
        data.email,
        data.body
      );
    } catch (error) {
      console.log(error);
    }
  });

  // Create new user
  socket.on("new_user", async (data) => {
    // const validToken = await verifyToken(data.token);
    // console.log(`VALID TOKEN: ${validToken}`);

    // if (!validToken) {
    //   return socket.emit("new_user_error", "Invalid token");
    // }

    // const validEmail = await verifyEmail(data.claims.email);
    // console.log(`VALID EMAIL: ${validEmail}`);

    // if (!validEmail) {
    //   return socket.emit("new_user_error", "Invalid email");
    // }

    try {
      const newUser = {
        token: data.token,
        name: data.claims.name,
        email: data.claims.email,
        joshua:
          data.claims.email === process.env.ROL_JOSHUA
            ? true
            : data.claims.email === process.env.ROL_MORTIMER
              ? true
              : data.claims.email === process.env.ROL_JOSHUA_GROUP
                ? true
                : false,
        active: false,
        avatar: data.claims.picture,
        life: 100,
        money: 29,
        concentration: 100,
        endurance: 100,
        onCrypt: false,
        idSocket: socket.id,
        userState: "awake",
        genre: data.claims.email == "unai.alfaro@ikasle.aeg.eus" ? "female" : "male",
        isPoison: false,
      };

      const changes = {
        active: true,
        idSocket: socket.id,
      };
      const createdUser = await userService.loginUser(newUser, changes);

      // Get initial data
      const resObj = {
        user: {},
        data: {},
      };
      resObj.user = createdUser;

      const allDolls = await dollService.getAllDolls();
      resObj.data.doll = allDolls;

      if (createdUser.joshua) {
        const acolytes = await userService.getAcolitsUsers();
        resObj.data.acolytes = acolytes;
      } else {
        resObj.data.acolyte = createdUser;
      }

      socket.emit("new_user", resObj);
    } catch (error) {
      console.log(error);
    }
  });

  // Update acolyte values
  socket.on("update_acolyte_values", async (data) => {
    try {
      console.log(`EMAIL: ${data.email}`);
      const updatedUser = await userService.updateOneUser(
        data.email,
        data.body
      );
      console.log(`UPDATED: ${updatedUser}`);

      const connectedJoshuaUsersIds =
        await userService.getConnectedJoshuaUsersIdSocket();
      if (updatedUser.idSocket !== null) {
        connectedJoshuaUsersIds.push(updatedUser.idSocket);
      }

      io.to(connectedJoshuaUsersIds).emit("update_acolyte_values", updatedUser);
    } catch (error) {
      console.log(error);
      socket.emit("update_acolyte_valuesError", error);
    }
  });

  // Update onCrypt state
  socket.on("update_onCrypt_value", async (data) => {
    try {
      const updatedUser = await userService.updateOnCrypt(data.email);
      const connectedJoshuaUsersIds =
        await userService.getConnectedJoshuaUsersIdSocket();
      connectedJoshuaUsersIds.push(updatedUser.idSocket);

      io.to(connectedJoshuaUsersIds).emit("update_onCrypt_value", updatedUser);
    } catch (error) {
      console.log(error);
    }
  });

  // Create new doll
  socket.on("create_new_doll", async () => {
    try {
      const createdDoll = await dollService.createNewDoll();
      const connectedUsersIdSocket =
        await userService.getConnectedUsersIdSocket();
      io.to(connectedUsersIdSocket).emit("create_new_doll", createdDoll);
    } catch (error) {
      console.log(error);
    }
  });

  // Update doll
  socket.on("update_doll", async (data) => {
    try {
      const updatedDoll = await dollService.updateDoll(data.id, data.body);
      const connectedUsersIdSocket =
        await userService.getConnectedUsersIdSocket();
      io.to(connectedUsersIdSocket).emit("update_doll", updatedDoll);
    } catch (error) {
      console.log(error);
    }
  });

  // Update dollpiece
  socket.on("update_dollpiece", async (data) => {
    try {
      const updatedDollPiece = await dollService.updateDollPieces(
        data.id,
        data.body
      );
      const connectedUsersIdSocket =
        await userService.getConnectedUsersIdSocket();
      io.to(connectedUsersIdSocket).emit("update_dollpiece", updatedDollPiece);
    } catch (error) {
      console.log(error);
    }
  });

  // Delete doll
  socket.on("delete_doll", async () => {
    try {
      const deletedDoll = await dollService.deleteDoll();
      const connectedUsersIdSocket =
        await userService.getConnectedUsersIdSocket();
      io.to(connectedUsersIdSocket).emit("delete_doll", deletedDoll);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected: ", socket.id);
    try {
      const changes = {
        idSocket: null,
      };
      const updatedUser = await userService.updateOneUserBySocketId(
        socket.id,
        changes
      );
    } catch (error) {
      console.log(error);
    }
  });

  //to Poison
  socket.on("to_poison", async () => {
    try {
      const updateToPoison = await userService.updateToPoison();
      const getAcolitsUsers = await userService.getAcolitsUsers();
      io.emit("to_poison", getAcolitsUsers);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("not_poison", async (data) => {
    try {
      const notPoison = await userService.updateQuitPoison(
        data.gmail
      );
      const connectedUsersIdSocket = await userService.getConnectedUsersIdSocket();
      io.to(connectedUsersIdSocket).emit("not_poison", notPoison);
    } catch (error) {
      console.log(error);
    }
  });
};

exports.socketEvents = events;
