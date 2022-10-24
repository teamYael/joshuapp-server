const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  console.log(token);

  try {
    await admin.auth().verifyIdToken(token).then(decodedToken => {
      console.log(decodedToken);
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
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        message: "Error al realizar la petición:",
        data: { error: error?.message || error }
      })
  }
};

exports.verifyToken = verifyToken;