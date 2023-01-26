require('dotenv').config();
const jwt = require('jsonwebtoken')

const generateToken = (email) =>{
    const result = jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300})
    return result
}

const generatefreshToken = (email) =>{
    const result = jwt.sign({data: email}, process.env.REFRESH_TOKEN_SECRET)
    return result 
}

const generateTokenNoExpiration = () =>{
    const result = jwt.sign(process.env.ACCESS_TOKEN_SECRET_NOT_EXPIRED)
    return result
}


module.exports = {
    generateToken,
    generatefreshToken,
    generateTokenNoExpiration
}