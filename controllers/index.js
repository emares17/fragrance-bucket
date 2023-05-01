const Fragrance = require('../models/Fragrance');
const { tryCatch } = require('../utils/tryCatch')

// Get home page
exports.getHomePage = tryCatch(async(req, res) => {
    res.render('home');
});

// Get Dashboard
exports.getDashboard = tryCatch(async(req, res) => {
    const fragrance = await Fragrance.find({ user: req.user.id }).lean();
    res.render('dashboard', {
        name: req.user.name, fragrance
    });
});



