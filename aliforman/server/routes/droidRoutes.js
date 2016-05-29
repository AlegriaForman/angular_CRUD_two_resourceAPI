'use strict';

const Router = require('express').Router;
const Droid = require('../models/droid');
const bodyParser = require('body-parser').json();
const serverErrHandler = require(__dirname + '/../lib/serverErrHandler');

var droidRouter = module.exports = Router();

droidRouter.get('/droids', (req, res) => {
  console.log('/droids GET routes work!');
  Droid.find(null, (err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

droidRouter.post('/droids', bodyParser, (req, res) => {
  console.log('/droids POST route works!');
  var newDroid = new Droid(req.body);
  newDroid.save((err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

droidRouter.put('/droids/:id', bodyParser, (req, res) => {
  var droidData = req.body;
  delete droidData._id;
  Droid.update({ _id: req.params.id }, droidData, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'Upgrade complete!' });
  });
});

droidRouter.delete('/droids/:id', (req, res) => {
  Droid.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'Droid terminated!' });
  });
});
