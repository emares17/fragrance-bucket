const express = require('express');
const router = express.Router();

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
        
    }
});

module.exports = router