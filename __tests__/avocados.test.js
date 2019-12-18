require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Avocado = require('../lib/models/Avocado');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let avocado;
  let dateValue;
  beforeEach(async() => {
    dateValue = new Date();
    avocado = await Avocado.create({
      date: dateValue,
      averagePrice: 3.00,
      region: 'Portland Oregon'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new avocado', () => {
    dateValue = new Date();
    return request(app)
      .post('/api/v1/avocados')
      .send({
        date: dateValue,
        averagePrice: 3.00,
        region: 'Portland Oregon'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          date: dateValue.toISOString(),
          averagePrice: 3.00,
          region: 'Portland Oregon',
          __v: 0
        });
      });
  });

  it('gets an avocado document by id', () => {
    return request(app)
      .get(`/api/v1/avocados/${avocado.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: avocado.id,
          date: dateValue.toISOString(),
          averagePrice: 3.00,
          region: 'Portland Oregon',
          __v: 0
        });
      });
  });

  it('get all avocado douments', () => {
    return request(app)
      .get('/api/v1/avocados')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: avocado.id,
            date: dateValue.toISOString(),
            averagePrice: 3.00,
            region: 'Portland Oregon',
            __v: 0
          }
        ]);
      });
  });


});
