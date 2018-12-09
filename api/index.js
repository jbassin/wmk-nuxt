const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Create express instnace
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb://iridium.duckdns.org:27017/WKMM');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection Succeeded');
});

// Require API routes
const tavern = require('./routes/tavern');
const reputation = require('./routes/reputations');
const recap = require('./routes/recap');
const undermountain = require('./routes/undermountain');
const entries = require('./routes/entry');

// Import API Routes
app.use(tavern);
app.use(reputation);
app.use(recap);
app.use(undermountain);
app.use(entries);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
};
