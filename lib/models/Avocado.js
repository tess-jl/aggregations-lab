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

schema.statics.getAverageRegionalPrice = function(n = 10) {
  return this.aggregate([
    {
      '$group': {
        '_id': '$region', 
        'avRegionalPrice': {
          '$avg': '$averagePrice'
        }
      }
    }, {
      '$sort': {
        'avRegionalPrice': -1
      }
    }, {
      '$limit': n
    }
  ]);
};

schema.statics.getAverageYearlyPrices = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': {
          '$dateToString': {
            'date': '$date', 
            'format': '%Y'
          }
        }, 
        'avYearlyPrice': {
          '$avg': '$averagePrice'
        }
      }
    }, {
      '$sort': {
        'avYearlyPrice': -1
      }
    }
  ]);
};

module.exports = mongoose.model('Avocado', schema);
