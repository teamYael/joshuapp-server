const userService = require("../../src/services/userService");
const cron = require('node-cron');

const enduranceNodeCron = async (socket) => {
  // Node-cron to update endurance and concentration
    // cron.schedule("*/20 * * * * *", async () => {
        try {
          await userService.updateAcolytesEndurance();
          await userService.updateAcolytesState();
          const updatedAcolytes = await userService.getAcolitsUsers();
          console.log(updatedAcolytes)
          // socket.broadcast.emit('update_endurance', updatedAcolytes);
        } catch (error) {
          console.log(error);
        }
    // });
}

module.exports = {
    enduranceNodeCron
}