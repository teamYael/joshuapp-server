const admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require("firebase/auth");

initializeApp();

const verifyToken = (req, res, next) => {
  const token = req.body.token
  console.log(token);

  const decodedToken = admin.auth().verifyIdToken(token);
  if (decodedToken) {
    return next();
  }
};

exports.verifyToken = verifyToken;