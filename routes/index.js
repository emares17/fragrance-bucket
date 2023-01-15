const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Fragrance = require('../models/Fragrance')


// Home page
router.get('/', (req, res) => res.render('home'));

// Dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    Fragrance.find({ user: req.user.id }).lean().then((fragrance) => {
        res.render('dashboard', {
            name: req.user.name, fragrance
        });
    }).catch(err => console.log(err));
});

module.exports = router