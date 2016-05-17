'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var droidSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  userId: String
});

module.exports = exports = mongoose.model('Droid', droidSchema);
