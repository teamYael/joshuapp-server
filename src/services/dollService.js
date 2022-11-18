const Doll = require('../database/Doll');
const DollPiece= require('../database/Doll');

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
const updateDoll = async(dollId, changes) => {
    try {
        const updatedDoll = Doll.updateDoll(dollId,changes);
        return updatedDoll;
    } catch (error) {
        throw error;
    }
}
const updateDollPieces = async (dollPieceId, changes) => {
    try {
        const updatedDollPieces = DollPiece.updateDollPieces(dollPieceId, changes);
        return updatedDollPieces;
    } catch (error) {
        throw error;
    }
}

const deleteDoll= async () => {
    try {
        let deletedDoll = Doll.deleteDoll();
        return deletedDoll;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAllDolls,
    createNewDoll,
    updateDoll,
    updateDollPieces,
    deleteDoll
}