const { Router } = require('express');
const Avocado = require('../models/Avocado');

module.exports = Router()
  .post('/', (req, res, next) => {
    Avocado
      .create(req.body)
      .then(avocado => res.send(avocado))
      .catch(next);
  })

  .get('/average-regional-prices', (req, res, next) => {
    const { count = 10 } = req.query;
    Avocado
      .getAverageRegionalPrice(Number(count))
      .then(averageRegionalPrices => res.send(averageRegionalPrices))
      .catch(next);
  })

  .get('/average-yearly-prices', (req, res, next) => {
    Avocado
      .getAverageYearlyPrices()
      .then(averageYearlyPrices => res.send(averageYearlyPrices))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Avocado
      .findById(req.params.id)
      .then(avocado => res.send(avocado))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Avocado
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(movies => res.send(movies))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Avocado
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(movie => res.send(movie))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Avocado
      .findByIdAndDelete(req.params.id)
      .then(movie => res.send(movie))
      .catch(next);
  });
