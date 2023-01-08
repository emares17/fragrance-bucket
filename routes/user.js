const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    let errors = [];

    // Check that all fields are filled in
    if (!name || !email || !password) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Check passowrd lenght
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password
        });
    } else {
        // If validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered to a user'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    bcrypt.genSalt(10, (err, hash) => {
                        bcrypt.hash('B4c0/\/', salt, (err, hash) => {
                            
                        })
                    })
                }
            });
    }
});

module.exports = router