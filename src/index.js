require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodbRoute = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.j8erkam.mongodb.net/JoshuApp`;
//Josu `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@e4p1.gye2wcf.mongodb.net/JoshuApp'
//Unai: 'mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.j8erkam.mongodb.net/JoshuApp'
//Yael: `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@e4p1.zrnbvtk.mongodb.net/JoshuApp`
//Oier: `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@e4p1.bntdsno.mongodb.net/JoshuApp`

const userRouter = require("./routes/userRoutes");
const dollRouter = require("./routes/dollRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 30000,
  cors: {
    origin: "*",
  },
});
exports.socketIO = io;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/api", userRouter);
app.use("/api", dollRouter);

async function start() {
  try {
    await mongoose.connect(mongodbRoute);
    app.get("/", (req, res) => {
      res.send("Welcome to Absentia Staging Socket Service from CI");
    });
    server.listen(PORT, () => {
      console.log(`API is listening on port ${PORT}`);
    });
    console.log(`Conexión con Mongo correcta.`);
  } catch (error) {
    console.log(process.env);
    console.log(`Error al conectar a la base de datos: ${error.message}`);
  }
}

start();

require("../services/sockets/socketMain");

// const { enduranceNodeCron } = require("../services/node-cron/endurance");
// // Function to initialize node-cron
// enduranceNodeCron();
