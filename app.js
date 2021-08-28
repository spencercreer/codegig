const express = require('express')
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const db = require('./config/database')

//Test db connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('db.authenticate error: ' + err))

const app = express()

// Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')

// Set static folder
app.use(express.static(path.join(__dirname,'public')))

// Gig routes
app.use('/gigs', require('./routes/gigs'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server listening to http://localhost:${PORT}`))