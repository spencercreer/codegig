const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const db = require('./config/database')

//Test db connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('db.authenticate error: ' + err))

const app = express()

// Gig routes
app.use('/gigs', require('./routes/gigs'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server listening to http://localhost:${PORT}`))