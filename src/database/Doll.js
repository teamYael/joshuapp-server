const Doll = require('../models/dollModel');
const DollPiece = require('../models/dollPieceModel');
const arrayPieces = require('../outputs/createDoll');

const getAllDolls = async () => {
    try {
        const dolls = await Doll.find();
        return dolls;
        
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

        const ids = arrayPieces.arrayPieces.map(async item => {
            
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

module.exports = {
    getAllDolls,
    createNewDoll
}
