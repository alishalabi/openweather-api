// Connect environmental variables
require('dotenv').config()

// Libraries
const express = require('express')

// Instantiate
const app = express()

// Environmental Variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

// Middleware
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const request = require('request')

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// Routes
// Home
app.get('/', (req, res) => {
  res.render('home')
})

// Post
app.post('/', (req, res) => {
  const city = req.body.city
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`
  // console.log(url)
  // "Request" syntax inspired by https://gist.github.com/bmorelli25/c67347560fe7b2213fea0d32d66fa53f#file-server-js
  request(url, (err, response, body) => {
    if(err){
      res.render('city', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('city', {weather: null, error: 'Error, please try again'});
      } else {
        // let weatherMessage = `It's ${weather.main.temp} degrees in ${weather.name}!`
        res.render('city', {weather: weather, error: null});
      }
    }
  })

  // res.render('city')
  // console.log(req.body.city)
})

// Start Server

app.listen(8000, () => {
  console.log('Openweather App Running On Port 8000')
})
