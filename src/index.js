require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodbRoute = `mongodb+srv://${process.env.USERNAMEBD}:${process.env.PASSWORD}@e4p1.gye2wcf.mongodb.net/JoshuApp`;


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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