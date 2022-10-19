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

const getOneUser = async (req, res) => {
    const {params: { userId }} = req;

    if (!userId) {
        return res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':userId' can not be empty" }
            });
    }

    try {
        const user = await userService.getOneUser(userId);
        if (!user) {
            return res
            .status(404)
            .send({ status: "FAILED",
                    data: { error: `Can't find user with the id '${userId}'` } });
        }

        res.send({ status: "OK", data: user });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error } });
    }
}

module.exports = {
    getAllUsers,
    getOneUser
}