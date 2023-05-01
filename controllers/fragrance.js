const Fragrance = require('../models/Fragrance');
const { tryCatch } = require('../utils/tryCatch')

// Add Page
exports.addPage = tryCatch(async(req, res) => {
   res.render('add');
});

// Create Post
exports.createPost = tryCatch(async(req, res) => {
    req.body.user = req.user.id;
    await Fragrance.create(req.body);
    res.redirect('/dashboard');
});

// Delete Post
exports.deletePost = tryCatch(async(req, res) => {
    const fragrance = await Fragrance.findById(req.params.id).lean();
    if (fragrance.user != req.user.id) {
        res.redirect('/dashboard')
    } else {
        await Fragrance.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    }
});

// Show All
exports.getAll = tryCatch(async(req, res) => {
    const fragrance = await Fragrance.find({ status: 'public' })
    .lean().populate('user').sort({ date: 'desc' });
    res.render('index', { fragrance });
});