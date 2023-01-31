require('dotenv').config();
const jwt = require('jsonwebtoken')

const generateToken = (email) =>{
    const result = jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 15})
    return result
}

const generatefreshToken = (email) =>{
    const result = jwt.sign({data: email}, process.env.REFRESH_TOKEN_SECRET)
    return result 
}

const generateTokenNoExpiration = (email) =>{
    const result = jwt.sign({data: email},process.env.ACCESS_TOKEN_SECRET)
    return result
}


module.exports = {
    generateToken,
    generatefreshToken,
    generateTokenNoExpiration
}