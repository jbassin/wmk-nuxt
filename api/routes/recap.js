const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const RecapSchema = new mongoose.Schema({
  month: String,
  day: String,
  text: String,
});

const Recap = mongoose.model('Recap', RecapSchema);

router.get('/recap', (req, res) => {
  Recap.find({}, 'month day text', (error, recap) => {
    if (error) { console.error(error); }
    res.send({
      recap,
    });
  }).sort({ _id: -1 });
});

module.exports = router;
