const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    googleId: {
      type: String,
    },
    displayName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;