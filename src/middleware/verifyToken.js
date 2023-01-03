const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (token) => {
  try {
    const validToken = await admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        console.log(decodedToken);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    return validToken;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.verifyToken = verifyToken;
