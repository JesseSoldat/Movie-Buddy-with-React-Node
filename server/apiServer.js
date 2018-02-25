const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const pick = require('lodash').pick;

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Movie } = require('./models/movie');
const { authenticate } = require('./middleware/authenticate');
const PORT = 3001;
const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());



//API------------------------------------------
//USER-----------------------------
app.post('/users', (req, res) => {
  const body = pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  })
  .then(token => {
    res.header('x-auth', token).send(user);
  })
  .catch(e => {
    console.log('ERROR POSTING USER', e);
    res.status(400).send(e);
  });
});

app.post('/users/login', (req, res) => {
  const body = pick(req.body, ['email', 'password']);
  
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => res.status(400).send(e));
});

app.delete('/users/token', authenticate, (req, res) => {
  console.log(req);  
  req.user.removeToken(req.token).then(() => {
    res.status(200).send({'token': null});
  })
  .catch(e => res.status(400).send(e));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//MOVIE-----------------------------
app.get('/favorites', (req, res) => {

});

app.post('/favorites', authenticate, (req, res) => {
  console.log(req.user._id);
  console.log(req.body);
  
  
  const movie = new Movie({
    ...req.body, 
    _creator: req.user._id
  });
  movie.save().then(doc => {
    res.send(doc)
  }, err => {
    res.status(400).send(err);
  });
});


app.listen(PORT, (err) => {
  if(err) return console.log(err);
  
  console.log(`API Server http://localhost:${PORT}`);
  
})