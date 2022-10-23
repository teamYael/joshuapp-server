const admin = require("firebase-admin");

admin.initializeApp({
  projectId: 'joshuappaeg'
});

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  console.log(token);

  await admin.auth().verifyIdToken(token).then(decodedToken => {
    console.log(decodedToken);
    const uid = decodedToken.uid;
    console.log(uid);
    return next();
  }).catch(() => {
    return res
    .status(400)
    .send({
      status: "UNAUTHORIZED",
      data: {
        error: "The token is not valid"
      }
    });
  })
  
};

exports.verifyToken = verifyToken;