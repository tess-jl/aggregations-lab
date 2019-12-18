const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true 
  },
  averagePrice: {
    type: Number, 
    required: true
  },
  region: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model('Avocado', schema);
