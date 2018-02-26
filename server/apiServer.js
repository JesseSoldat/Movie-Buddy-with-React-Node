const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const pick = require('lodash').pick;
const { ObjectID } = require('mongodb');

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
  const body = pick(req.body, ['username', 'email', 'password']);
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
app.get('/favorites', authenticate, (req, res) => {
  Movie.find({
    _creator: req.user._id
  })
  .then(movies => {
    res.send({movies});
  }, err => res.status(400).send(err))
});

app.get('/allusers/favorites', authenticate, (req, res) => {
  const user = req.user._id;

  Movie.find({}).then(movies => {
    const othersMovies = movies.filter(movie => movie._creator.toHexString() !== user.toHexString());
  
    res.send(othersMovies);
  }, err => res.status(400).send(err));
});

app.post('/favorites', authenticate, (req, res) => {
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

app.delete('/favorites/:id', authenticate, (req, res) => {
  const id = req.params.id;
  
  if(!ObjectID.isValid(id)) {
    console.log('not valid');  
    return res.status(404).send({msg: 'The MOVIE ID is NOT valid!'});
  }

  Movie.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then(movie => {
    if(!movie) {
      console.log('no movie found', movie);
      
      return res.status(404).send({'msg': 'The MOVIE could NOT be deleted!'});
    }
    res.send({movie});
  }).catch(err => {
    console.log('catch delete err', err);
    
    res.status(400).send({'msg': err});
  });
});


app.listen(PORT, (err) => {
  if(err) return console.log(err);
  
  console.log(`API Server http://localhost:${PORT}`);
  
})