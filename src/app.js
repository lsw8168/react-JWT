require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('MongoDB 연결');
  })
  .catch(e => {
    console.error(e);
  });

app.get('/', function(req, res) {
  res.send('home');
});

const users = require('./routes/users');
app.use('/users', users);

const port = PORT || 8000;
app.listen(port, () => {
  console.log('서버 포트:' + port);
});
