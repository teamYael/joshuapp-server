const userService = require("../../src/services/userService");

events = (socket) => {
  
    console.log({ Clientsocket: socket.id });
    socket.emit("new_user", socket.id);
  
    socket.on('slider', (data) => {
      console.log(data);
      socket.broadcast.emit('slider', data);
    });

    //Update acolyte values
    socket.on('update_acolyte_values', async data => {
      try {
        const dataObj = JSON.parse(data);
        console.log(`EMAIL: ${dataObj.email}`)
        const updatedUser = await userService.updateOneUser(dataObj.email, dataObj.body);
        console.log(`UPDATED: ${updatedUser}`)
        socket.broadcast.emit('update_acolyte_values', updatedUser);
      } catch (error) {
        console.log(error);
        socket.emit('update_acolyte_valuesError', error);
      }
    });

    // TEST BROADCAST
    socket.on('test_broadcast', async (data) => {
      try {
        socket.broadcast.emit('test_broadcast', data);
      } catch (error) {
        console.log(error);
        socket.emit('test_broadcastError', error);
      }
    });
  
    //Enter Crypt
    socket.on('crypt-enter', data => {
      try {
        const response = //await al service
        socket.emit('crypt-enter', acolit)
      } catch (error) {
        
      }
    })
  
    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id);      
    });
  
}
  
exports.socketEvents = events;