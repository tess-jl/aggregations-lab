const csv = require('csvtojson');
const Avocado = require('../models/Avocado');

function seedData() {
  return csv()
    .fromFile(__dirname + '/../../csv/avocado.csv')
    .then(avocadoCsvToJSONFiles => {
      return avocadoCsvToJSONFiles.map(avocado => ({
        date: avocado.Date,
        averagePrice: avocado.AveragePrice,
        region: avocado.region
      }));
    })
    .then(movies => Avocado.create(movies));
}

module.exports = {
  seedData
};

