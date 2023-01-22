const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Fragrance = require('../models/Fragrance');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { getLoginPage, getRegisterPage, login, logout, registerHandle } = require('../controllers/user');
const { validateInput } = require('../middleware/auth');

// Login Page
router.get('/login', getLoginPage);

// Register Page
router.get('/register', getRegisterPage);

// Register Handle
router.post('/register', validateInput, registerHandle);

// Login
router.post('/login', login)

// Logout
router.get('/logout', logout);


// router.post('/register', (req, res) => {
//     const { name, email, password, password2 } = req.body;

//     let errors = [];

//     // Check that all fields are filled in
//     if (!name || !email || !password || !password2) {
//         errors.push({ msg: 'Please fill in all fields'});
//     }

//     // Check passwords match
//     if (password != password2) {
//         errors.push({ msg: 'Passwords do not match'})

//     // Check passowrd lenght
//     if (password.length < 6) {
//         errors.push({ msg: 'Password should be at least 6 characters'});
//     }

//     }
//     if (errors.length > 0) {
//         res.render('register', {
//             errors,
//             name,
//             email,
//             password,
//             password2
//         });
//     } else {
//         // If validation passed
//         User.findOne({ email: email })
//             .then(user => {
//                 if (user) {
//                     errors.push({ msg: 'Email is already registered to a user'});
//                     res.render('register', {
//                         errors,
//                         name,
//                         email,
//                         password,
//                         password2
//                     });
//                 } else {
//                     const newUser = new User({
//                         name,
//                         email,
//                         password
//                     });
//                     bcrypt.genSalt(10, (err, salt) => {
//                         bcrypt.hash(newUser.password, salt, (err, hash) => {
//                             if (err) throw err;
//                             // Password hash
//                             newUser.password = hash;
//                             // Save User
//                             newUser.save()
//                                 .then(user => {
//                                     req.flash('success', 'You have successfully registered!')
//                                     res.redirect('/users/login');
//                                 })
//                                 .catch(err => console.log(err));
//                         });
//                     });
//                 }
//             });
//     }
// });



module.exports = router