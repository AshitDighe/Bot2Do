const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testdetails: String,
  status: String,
  virtualusers: Number,
  duration: String,
  starttime: String
});

module.exports = mongoose.model('Test', testSchema);
