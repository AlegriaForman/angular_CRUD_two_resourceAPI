const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db');
app.listen(port, () => console.log('server up on port:' + port));

app.use(bodyParser.json());

const jawaRouter = require(__dirname + '/routes/jawaRoutes');
const droidRouter = require(__dirname + '/routes/droidRoutes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});
app.use('/api', jawaRouter);
app.use('/api', droidRouter);
