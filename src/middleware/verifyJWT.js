require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("UNAUTHORIZED");
    return res.sendStatus(401);
  }


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
    if (error) {
      console.log("FORBIDDEN");
      console.log(error);
      return res.sendStatus(403);
    }

    req.email = email;
    next();
  });


  const refreshToken = jwt.sign({
    username: userCredentials.username,
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {

        // Wrong Refesh Token
        return res.status(406).json({ message: 'Unauthorized' });
      }
      else {
        // Correct token we send a new access token
        const accessToken = jwt.sign({
          username: userCredentials.username,
          email: userCredentials.email
        }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10m'
        });
        return res.json({ accessToken });
      }
    })
};
exports.authenticateToken = authenticateToken;
