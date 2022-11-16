const dollService = require('../services/dollService');
const Doll = require('../models/dollModel');
const DollPieces = require('../models/dollPieceModel');

const getAllDolls = async (req, res) => {
    try {
        const allDolls = await dollService.getAllDolls();
        if(allDolls.length === 0){
            return res.status(404).send({message: 'No existen muñecas'});
        }
        res.send({ status: "OK", data: allDolls });
        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED",
                    message: "Error al realizar petición:" ,
                    data: {error:error?.message || error} });
    }
};

const createNewDoll = async (req,res) =>{

    try {
        const createdDoll = await dollService.createNewDoll();
        res.status(201).send({status: "OK", data: createdDoll});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: "Error al realizar la petición:",
                data: {error:error?.message || error} });
    }
};


module.exports = {
    getAllDolls,
    createNewDoll
}