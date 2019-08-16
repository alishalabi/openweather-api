// Connect environmental variables
require('dotenv').config()

// Libraries
const express = require('express')

// Middleware
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const request = require('request')

// Instantiate
const app = express()

// Environmental Variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY


app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Connect Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/openweather', { useNewUrlParser: true });

// Simple Mood Model
const Mood = mongoose.model('Mood', {
  city: String,
  temp: Number,
  mood: String
});

const test = new Mood ({
  city: 'San Francisco',
  temp: '300',
  mood: 'Pretty cool'
})

test.save(function (err) {if (err) console.log ('Error on save!')});

// Routes
// Homepage
app.get('/', (req, res) => {
  res.render('home')
})

// Query City
app.post('/', (req, res) => {
  const city = req.body.city
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`
  console.log(url)
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

// Index All Moods
app.get('/moods', (req, res) => {
  Mood.find()
    .then(moods => {
      res.render('moods', { moods: moods})
    })
    .catch(err => {
      consol.log(err)
    })
})

// Create Single Mood
app.post('/moods', (req, res) => {
  Mood.create(req.body)
    .then((mood) => {
      console.log(mood)
      res.redirect('/moods')
    }).catch((err) => {
      console.log(err.message)
    })
})

// Start Server

app.listen(3000, () => {
  console.log('Openweather App Running On Port 3000')
})


module.exports = app
