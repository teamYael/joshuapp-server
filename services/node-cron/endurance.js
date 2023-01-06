const userService = require("../../src/services/userService");
const cron = require("node-cron");
const server = require("../../src/index");
const io = server.socketIO;

const enduranceNodeCron = async () => {
  // Node-cron to update endurance and concentration
  cron.schedule("0 0 */1 * * *", async () => {
    try {
      const updatedEndurance = await userService.updateAcolytesEndurance();
      const updatedConcentration =
        await userService.updateAcolytesConcentration();
      const acolytesStateUpdated = await userService.updateAcolytesState();
      const acolytes = await userService.getAcolitsUsers();
      console.log(acolytes);
      const connectedUsersIdSocket =
        await userService.getConnectedUsersIdSocket();

      io.to(connectedUsersIdSocket).emit("node_cron", acolytes);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  enduranceNodeCron,
};
