const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const FactionSchema = new mongoose.Schema({
  name: String,
  rep: String,
  contact: String,
});

const Faction = mongoose.model('Faction', FactionSchema);

router.get('/reputations', (req, res) => {
  Faction.find({}, 'name rep contact', (error, reputations) => {
    if (error) { console.error(error); }
    res.send({
      reputations,
    });
  }).sort({ _id: -1 });
});

module.exports = router;
