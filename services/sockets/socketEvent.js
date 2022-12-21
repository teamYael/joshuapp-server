const userService = require("../../src/services/userService");
const dollService = require("../../src/services/dollService");
const server = require("../../src/index");
const io = server.socketIO;

events = (socket) => {
  console.log({ Clientsocket: socket.id });

  //Create new user
  socket.on("new_user", async (data) => {
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
      };

      const createdUser = await userService.loginUser(newUser);

      //Get initial data
      const resObj = {
        "user": {},
        "data": {}
      };
      resObj.user = createdUser;
      
      const allDolls = await dollService.getAllDolls();
      resObj.data.dolls = allDolls;

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

  //Update idSocket
  socket.on("update_idsocket", async (data) => {
    try {
      data.body = {
        idSocket: socket.id,
      };
      console.log(data.body);
      const updatedUser = await userService.updateOneUser(
        data.email,
        data.body
      );
      socket.emit("update_idsocket", updatedUser);
    } catch (error) {
      console.log(error);
    }
  });

  //Update acolyte values
  socket.on("update_acolyte_values", async (data) => {
    try {
      console.log(`EMAIL: ${data.email}`);
      const updatedUser = await userService.updateOneUser(
        data.email,
        data.body
      );
      console.log(`UPDATED: ${updatedUser}`);
      io.emit("update_acolyte_values", updatedUser);
    } catch (error) {
      console.log(error);
      socket.emit("update_acolyte_valuesError", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
};

exports.socketEvents = events;
