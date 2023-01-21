const Fragrance = require('../models/Fragrance');

// Get home page
exports.getHomePage = async (req, res) => {
    try {
        res.render('home');
    } catch (err) {
        console.error(err)
    }
};

// Get Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const fragrance = await Fragrance.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.name, fragrance
        });
    } catch (err) {
        console.error(err)
    }
};



