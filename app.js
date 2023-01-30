const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

mongoose.set('strictQuery', true);

// Load Config
dotenv.config({ path: './config/config.env'});
require('./config/passport')(passport);

// Connect to DB
connectDB();

// EJS
app.use(expressLayouts);
app.set('view engine', 'EJS');
app.use(express.static('public'));


// Bodyparser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  );

// Sessions
app.use(session({
    secret: 'keyboard dog',
    saveUninitialized: true,
    resave: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/user.js'));
app.use('/fragrance', require('./routes/fragrance.js'));

app.listen(PORT, console.log(`Server has started on port ${PORT}`));