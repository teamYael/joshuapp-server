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

module.exports = {
    getAllDolls
}