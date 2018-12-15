const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  admin: Boolean,
});

const User = mongoose.model('User', UserSchema);

router.post('/user/login', ({ body: { username, password } }, res) => {
  User.find({ username, password }, (error, user) => {
    if (error) { console.error(error); }
    res.json({
      user,
    });
  });
});

module.exports = router;
