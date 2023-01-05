const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

mongoose.set('strictQuery', true);

// Load Config
dotenv.config({ path: './config/config.env'});

// Connect to DB
connectDB();

// EJS
app.use(expressLayouts);
app.set('view engine', 'EJS');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

app.listen(PORT, console.log(`Server has started on port ${PORT}`));