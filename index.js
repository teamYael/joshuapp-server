require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`Hello ${process.env.ROL_JOSHUA}`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})