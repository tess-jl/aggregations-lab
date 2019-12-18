// const mongoose = require('mongoose');
// const moment = require('moment');
// const csv = require('csvtojson');

// mongoose.connect('mongodb://localhost:27017/avocados', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// const schema = new mongoose.Schema({
//   date: Date,
//   averagePrice: Number,
//   region: String
// });

// const Avocado = mongoose.model('Avocado', schema);

// csv()
//   .fromFile('./avocado.csv')
//   .then(csvToJsonFile => {
//     // console.log(csvToJsonFile);
//     const datapoints = csvToJsonFile
//       .map(datapoints => ({
//         date: moment(`${datapoints.Date}`, 'YYYY/MM/DD').toISOString(),
//         averagePrice: datapoints.AveragePrice,
//         region: datapoints.region,
//       }));

//     return Avocado.create(datapoints);

//   })
//   .then(() => console.log('done'));

