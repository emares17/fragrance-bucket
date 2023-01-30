const Fragrance = require('../models/Fragrance');

// Add Page
exports.addPage = async(req, res) => {
    try {
        res.render('add');
    } catch(err) {
        console.error(err)
    }
};

// Create Post
exports.createPost = async(req, res) => {
    try {
        req.body.user = req.user.id;
        await Fragrance.create(req.body);
        res.redirect('/dashboard');
    } catch(err) {
        console.error(err);
    }
};

// Delete Post
exports.deletePost = async(req, res) => {
    try {
        const fragrance = await Fragrance.findById(req.params.id).lean();
        if (fragrance.user != req.user.id) {
            res.redirect('/dashboard')
          } else {
            await Fragrance.remove({ _id: req.params.id })
            res.redirect('/dashboard')
          }
    } catch (err) {
        console.error(err)
    }
};

// Show All
exports.getAll = async(req, res) => {
    try {
        const fragrance = await Fragrance.find({ status: 'public' })
        .lean().populate('user').sort({ date: 'desc' });
        res.render('index', { fragrance });
    } catch (err) {
        console.error(err);
    }
};