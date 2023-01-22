const express = require('express');
const router = express.Router();
const { getLoginPage, getRegisterPage, login, logout, registerHandle } = require('../controllers/user');
const { validateInput } = require('../middleware/input');

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

module.exports = router