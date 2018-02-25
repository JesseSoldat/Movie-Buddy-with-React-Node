const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
  title: {
    type: String,
     default : ''   
  },
  poster_path: {
    type: String,
     default : ''   
  },
  original_title: {
    type: String,
    default : ''   
  },
  release_date: {
    type: String,
    default : ''   
  },
  vote_average: {
    type: Number,
    default : null
  },
  genres: {
    type: Array,
    default : []     
  },
  production_companies: {
    type: Array,
    default : [] 
  },
  overview: {
    type: String,
    default : ''   
  },
  homepage: {
    type: String,
    default : ''    
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Movie};
