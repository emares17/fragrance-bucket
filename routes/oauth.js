const express = require('express');
const router = express.Router();
const { oAuth, oAuthCallback } = require('../controllers/user');

router.get('/google', oAuth);

router.get('/google/callback', oAuthCallback);

module.exports = router