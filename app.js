// Libraries
const express = require('express')

// Instantiate
const app = express()

// Middleware
const exphbs  = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Routes
app.get('/', (req, res) => {
  res.render('home')
})

// Start Server

app.listen(8000, () => {
  console.log("Openweather App Running On Port 8000")
})
