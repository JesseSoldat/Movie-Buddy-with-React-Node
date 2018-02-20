const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pick = require('lodash').pick;

const { User } = require('./models/user');
const PORT = 3001;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/moviebuddy');

//API------------------------------------------
app.post('/users', (req, res) => {
  const body = pick(req.body, ['email', 'password']);
  res.status(200).send(body);
});

app.listen(PORT, (err) => {
  if(err) return console.log(err);
  
  console.log(`API Server http://localhost:${PORT}`);
  
})