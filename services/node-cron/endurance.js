const userService = require("../../src/services/userService");
const cron = require("node-cron");
const server = require("../../src/index");
const io = server.socketIO;

const enduranceNodeCron = async () => {
  // Node-cron to update endurance and concentration
  cron.schedule("0 0 */1 * * *", async () => {
    try {
      const updatedAcolytes =
        await userService.updateAcolytesEnduranceAndConcentration();
      const acolytesStateUpdated = await userService.updateAcolytesState();
      const acolytes = await userService.getAcolitsUsers();
      console.log(acolytes);
      io.emit("node_cron", acolytes);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  enduranceNodeCron,
};
