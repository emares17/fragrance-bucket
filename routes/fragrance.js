const express = require('express');
const router = express.Router();
const Fragrance = require('../models/Fragrance');

router.get('/add', (req, res) => res.render('add'));

module.exports = router