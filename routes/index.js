const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const { getHomePage, getDashboard } = require('../controllers/index')



// Home page
router.get('/', getHomePage);

// Dashboard
router.get('/dashboard', ensureAuth, getDashboard)

module.exports = router