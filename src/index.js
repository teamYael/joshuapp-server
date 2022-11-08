require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodbRoute = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@e4p1.zrnbvtk.mongodb.net/JoshuApp`;
//Josu `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@e4p1.gye2wcf.mongodb.net/JoshuApp'
//Unai: 'mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.j8erkam.mongodb.net/JoshuApp'
//Yael: `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@e4p1.zrnbvtk.mongodb.net/JoshuApp`

const userRouter = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", userRouter);

async function start() {
  try {
    await mongoose.connect(mongodbRoute);
    app.listen(PORT, () => {
      console.log(`API is listening on port ${PORT}`);
    });
    console.log(`Conexión con Mongo correcta.`);
  } catch (error) {
    console.log(process.env)
    console.log(`Error al conectar a la base de datos: ${error.message}`);
  }
}

start();