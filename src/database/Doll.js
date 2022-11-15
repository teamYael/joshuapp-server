const Doll = require('../models/dollModel');

const getAllDolls = async () => {
    try {
        const dolls = await Doll.find();
        return dolls;
        
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllDolls
}