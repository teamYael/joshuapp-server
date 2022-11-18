const dollService = require('../services/dollService');


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

const updateDoll = async (req,res) => {
    const {
        body,
        params: { dollId },
    } = req;

    if(!dollId) {
        return res 
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "Parameter 'dollPieceId' can't be empty"}
            });
    }
    try {
        const updatedDoll = await dollService.updateDoll(dollId, body);

        if(!updatedDoll){
            return res
                .status(404)
                .send({
                    status: "FAILED",
                    data: {error : `Can´t find dollpiece with the id ${dollId}`}
                })
        }

        res.send({status: "Ok", data: updatedDoll});
        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                    message: "Error al realizar la petición",
                    data: {error: error?.message || error } });
        
    }
};


const updateDollPieces = async (req,res) => {
    const {
        body,
        params: { dollPieceId },
    } = req;

    if(!dollPieceId) {
        return res 
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "Parameter 'dollPieceId' can't be empty"}
            });
    }
    try {
        const updatedDollPieces = await dollService.updateDollPieces(dollPieceId, body);

        if(!updatedDollPieces){
            return res
                .status(404)
                .send({
                    status: "FAILED",
                    data: {error : `Can´t find dollpiece with the id ${dollPieceId}`}
                })
        }

        res.send({status: "Ok", data: updatedDollPieces});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                    message: "Error al realizar la petición",
                    data: {error: error?.message || error } });
        
    }
};

const deleteDoll = async(req,res) => {
    try {
        const deletedDoll = await dollService.deleteDoll();
        if(!deletedDoll){
            return res
                .status(404)
                .send({
                    status: "FAILED",
                    data: {error : `Can´t find dollpiece with the id`}
                })
        }

        res.status(200).send({status: "OK", data: deletedDoll});       
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED",
                message: "Error al realizar la petición",
                data: {error: error?.message || error } });
    }
}


module.exports = {
    getAllDolls,
    createNewDoll,
    updateDoll,
    updateDollPieces,
    deleteDoll
}