const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const { addPage, createPost, deletePost, getAll } = require('../controllers/fragrance');

// Get add page
router.get('/add', ensureAuth, addPage);

// Create a post
router.post('/', ensureAuth, createPost);

// Delete a post
router.delete('/:id', deletePost);

// Get all post
router.get('/', ensureAuth, getAll);

module.exports = router