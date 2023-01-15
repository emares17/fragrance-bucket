const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Fragrance = require('../models/Fragrance');

// Get add page
router.get('/add', ensureAuth,(req, res) => res.render('add'));

// Create post
router.post('/', ensureAuth, (req, res) => {
    req.body.user = req.user.id;
    Fragrance.create(req.body)
    .then(() => {
        res.redirect('/dashboard');
    })
    .catch((err) => {
        console.log(err);
    });
});

// Show all post to dashboard
router.get('/', ensureAuth, (req, res) => {
    Story.find({ status: 'public' }).lean()
        .populate('user')
        .sort({ date: 'desc' })
        .then((fragrance) => {
            res.render('index', {
                fragrance
            });
    }).catch(err => console.log(err))
});


module.exports = router