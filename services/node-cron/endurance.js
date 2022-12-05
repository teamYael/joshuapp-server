const userService = require("../../src/services/userService");
const cron = require('node-cron');

const enduranceNodeCron = async socket => {
    // cron.schedule("0 0 */1 * * *", async () => {
        try {
          const updatedAcolytes = await userService.updateAcolytesEndurance();
          const updatedAcolytesState = await userService.updateAcolytesState();
          console.log(updatedAcolytesState);
        } catch (error) {
          console.log(error);
        }
    // });
}

module.exports = {
    enduranceNodeCron
}