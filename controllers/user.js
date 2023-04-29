const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { tryCatch } = require('../utils/tryCatch')

// Login
exports.getLoginPage = tryCatch(async(req, res) => {
    throw new Error('This is a test error');
});

// Register
exports.getRegisterPage = async(req, res) => {
    try {
        res.render('register');
    } catch (err) {
        console.error(err)
    }
};

// Register Handle
exports.registerHandle = async(req, res) => {
    try {
        // Check if email is already registered
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error('Email is already registered to a user');
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
        req.flash('success', 'You have successfully registered!');
        res.redirect('/users/login');

    } catch (err) {
        console.error(err);
        res.render('register', {
            errors: [{ msg: err.message }],
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    }
};

// Login
exports.login = async(req, res, next) => {
    try {
        const auth = await passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        }) (req, res, next);
    } catch (err) {
        console.error(err);
        res.redirect('/users/login');
    }
};

// Logout
exports.logout = async(req, res) => {
    try {
        if (req.isAuthenticated()) {
            await new Promise((resolve, reject) => {
                req.logout((error) => {
                    if (error) return reject(error);
                    resolve();
                });
            });
            req.flash('success', "You have successfully logged out");
            res.redirect('/users/login');
        } 
        else {
            req.flash('error', "You are not logged in");
            res.redirect('/users/login');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/users/login');
    }
};

exports.oAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  };

exports.oAuthCallback = (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect('/users/login');
      }
  
      if (!user) {
        return res.redirect('/users/login');
      }
  
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          return res.redirect('/users/login');
        }
  
        res.redirect('/dashboard');
      });
    })(req, res, next);
  };
  