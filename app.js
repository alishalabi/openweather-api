// Libraries
const express = require('express')

// Instantiate
const app = express()

// Middleware

// Routes
app.get('/', (req, res) => {
  res.send('Hello Weather')
})

// Start Server

app.listen(8000, () => {
  console.log("Openweather App Running On Port 8000")
})
