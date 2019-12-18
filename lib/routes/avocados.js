const { Router } = require('express');
const Avocado = require('../models/Avocado');

module.exports = Router()
  .post('/', (req, res, next) => {
    Avocado
      .create(req.body)
      .then(avocado => res.send(avocado))
      .catch(next);
  })

// .get('/top', (req, res, next) => {
//   const { count = 10, order = 'desc' } = req.query;
//   Avocado
//     .getRevenueBudgetRatio(Number(count), order)
//     .then(topMovies => res.send(topMovies))
//     .catch(next);
// })

// .get('/popular-genres', (req, res, next) => {
//   Avocado
//     .getGenreCount()
//     .then(genres => res.send(genres))
//     .catch(next);
// })

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
