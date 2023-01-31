require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateRefreshToken = (req, res, next) => {
    const authHeader = req.headers["refresh"];
    const token = authHeader;
    if (!token) {
        console.log("NOT REFRESHED");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, email) => {
        if (error) {
            console.log("FORBIDDEN");
            console.log(error);
            return res.sendStatus(403)
        }

        req.email = email;
        next();
    });
};
exports.authenticateRefreshToken = authenticateRefreshToken;