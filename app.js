const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');

// EJS
app.use(expressLayouts);
app.set('view engine', 'EJS');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

app.listen(PORT, console.log(`Server has started on port ${PORT}`));