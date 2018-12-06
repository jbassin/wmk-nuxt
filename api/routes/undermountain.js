const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const LevelSchema = new mongoose.Schema({
  name: String,
  image: String,
  locked: Boolean,
  flavor: {
    text: String,
    author: String,
  },
  text: String,
});

const Level = mongoose.model('Level', LevelSchema);

router.get('/undermountain', (req, res) => {
  Level.find({}, (error, levels) => {
    if (error) { console.error(error); }
    res.json({
      levels,
    });
  }).sort({ _id: 1 });
});

module.exports = router;
