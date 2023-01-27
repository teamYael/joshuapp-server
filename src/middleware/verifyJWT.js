require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader;
  if (!token) {
    console.log("UNAUTHORIZED");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
    if (error) {
      console.log("FORBIDDEN");
      console.log(error);

      if(error.name ==='TokenExpiredError'){
        return res.status(400).send({data: 'Token spired'})
      }
      else{
        return res.sendStatus(403);
      }
    }

    req.email = email;
    next();
  });
};
exports.authenticateToken = authenticateToken;
