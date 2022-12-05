const userService = require("../../src/services/userService");
const cron = require('node-cron');

events = (socket) => {
  
    console.log({ Clientsocket: socket.id });

    //Create new user
    socket.on('new_user', async data => {
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
            : false,
          active: false,
          avatar: data.claims.picture,
          life: 100,
          money: 29,
          concentration: 100,
          endurance: 100,
          onCrypt: false,
          idSocket: socket.id,
          userState:"awake"
        };

        const createdUser = await userService.loginUser(newUser);
        socket.broadcast.emit('new_user', createdUser);
      } catch (error) {
        console.log(error);
      }
    });

    //Update idSocket
    socket.on('update_idsocket', async data => {
      try {
        data.body = {
          "idSocket": socket.id
        };
        console.log(data.body);
        const updatedUser = await userService.updateOneUser(data.email, data.body);
        socket.broadcast.emit('update_idsocket', updatedUser);
      } catch (error) {
        console.log(error);
      }
    })

    //Update acolyte values
    socket.on('update_acolyte_values', async data => {
      try {
        console.log(`EMAIL: ${data.email}`)
        const updatedUser = await userService.updateOneUser(data.email, data.body);
        console.log(`UPDATED: ${updatedUser}`)
        socket.broadcast.emit('update_acolyte_values', updatedUser);
      } catch (error) {
        console.log(error);
        socket.emit('update_acolyte_valuesError', error);
      }
    });

    cron.schedule("0 0 */1 * * *", async () => {
      try {
        const allUsers = await userService.getAcolitsUsers();
        allUsers.map(async user => {
          if (user.userState === "awake") {
            let updateUserState;
            
            if (user.endurance < 26) {
              updateUserState = "unconscious";
            } else {
              updateUserState = user.userState;
            }
            const body = {
              "userState": updateUserState,
              "endurance": user.endurance - 10,
              "concentration": user.concentration > 10 ? user.concentration - 10 : 0
            }

            return await userService.updateOneUser(user.email, body);
          } else if (user.userState === "sleeping") {
            const body = {
              "endurance": user.endurance >= 90 ? 100 : user.endurance + 10,
              "concentration": user.concentration >= 90 ? 100 : user.concentration + 10
            };

            return await userService.updateOneUser(user.email, body);
          }
        });

        const updatedUsers = await userService.getAcolitsUsers();
        console.log(updatedUsers)
        socket.broadcast.emit('node-cron', updatedUsers);
      } catch (error) {
        console.log(error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id);      
    });
  
}

exports.socketEvents = events;