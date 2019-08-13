// Connect environmental variables
require('dotenv').config()

// Libraries
const express = require('express')

// Instantiate
const app = express()

// Middleware
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// Routes
// Home
app.get('/', (req, res) => {
  res.render('home')
})

// Post
app.post('/', function (req, res) {
  res.render('home')
  console.log(req.body.city)
})

// Start Server

app.listen(8000, () => {
  console.log('Openweather App Running On Port 8000')
})
