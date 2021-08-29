const express = require('express')
const router = express.Router()
// require database and models
const db = require('../config/database')
const Gig = require('../models/Gig')

// Get gigs
router.get('/', (req, res) => {
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs:gigs
            })
        })
        .catch(err => console.log('/gigs/ err' + err))
})

// Display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add a gig
router.post('/add', (req, res) => {
    const data = {
        title: 'Simple Wordpress website',
        technologies: 'Wordpress, JavaScript, HTML, CSS',
        budget: '$2000',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        contact_email: 'user2@gmail.com'
    }

    let { title, technologies, budget, description, contact_email } = data

    // Insert into table
    Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email
    })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
})

module.exports = router