const Doll = require('../database/Doll');

const getAllDolls = async () => {
    try {
        const allDolls = Doll.getAllDolls();
        return allDolls;

    } catch (error) {
        throw error;
    }
};

const createNewDoll = async () => {
    try {
        const createdDoll = Doll.createNewDoll();
        return createdDoll;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllDolls,
    createNewDoll
}