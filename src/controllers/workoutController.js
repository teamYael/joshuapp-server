const userService = require('../services/workoutService');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        if (allUsers.length === 0) {
            return res.status(404).send({ message: "No existen usuarios" });
        }
        res.send({ status: "OK", data: allUsers });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllUsers
}