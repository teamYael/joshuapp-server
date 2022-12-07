const userService = require("../../src/services/userService");
const cron = require('node-cron');

const enduranceNodeCron = async (socket) => {
  // Node-cron to update endurance and concentration
    // cron.schedule("*/20 * * * * *", async () => {
        try {
          const updatedAcolytes = await userService.updateAcolytesEnduranceAndConcentration();
          const acolytesStateUpdated = await userService.updateAcolytesState();
          const acolytes = await userService.getAcolitsUsers();
          console.log(acolytes)
          // socket.broadcast.emit('update_endurance', updatedAcolytes);
        } catch (error) {
          console.log(error);
        }
    // });
}

module.exports = {
    enduranceNodeCron
}