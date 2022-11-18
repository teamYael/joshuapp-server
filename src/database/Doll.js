const { response } = require('express');
const Doll = require('../models/dollModel');
const DollPiece = require('../models/dollPieceModel');
const arrayPieces = require('../outputs/createDoll');

const getAllDolls = async () => {
    try {
        const dolls = await Doll.find().populate('dollPieces');
        return dolls[0];
    } catch (error) {
        throw error;
    }
};

const createNewDoll = async () => {
    try {
        const newDoll = {
            misionStatus: "Started"
        }

        let dollToInsert = new Doll(newDoll);
        const createdDoll = await dollToInsert.save();
        // console.log(createdDoll);

         arrayPieces.arrayPieces.map(async item => {
            
            const newDollPiece = {
                name: item.name,
                photo: item.photo
            }

            let dollPieceToInsert = new DollPiece(newDollPiece);
            const createdDollPiece = await dollPieceToInsert.save();
            console.log(createdDollPiece);

            let updatedDoll = await Doll.findOneAndUpdate(
                { misionStatus: "Started" },
                {
                $push: { dollPieces: createdDollPiece._id}
                },
                {new: true}
            );
        });

    } catch (error) {
        console.log(error) 
    }
};

const updateDoll = async(dollId, changes) => {
    try {
        let updatedDoll = await Doll.findByIdAndUpdate(dollId, {$set:changes}, {new:true})
        return updatedDoll;
    } catch (error) {
        throw error;
    }

}

const updateDollPieces= async(dollPieceId, changes) => {
    try {
        let updatedDollPieces = await DollPiece.findByIdAndUpdate(dollPieceId, {$set:changes}, {new:true});
        return updatedDollPieces;
    } catch (error) {
        throw error;
    }
}

const deleteDoll = async() =>{
try {
    let deletedDoll= await Doll.deleteMany({}) 
    let deletedDollPieces = await DollPiece.deleteMany({})
    return deletedDoll, deletedDollPieces;
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
