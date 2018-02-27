export default (othersFavorites, myFavorites) => {
  const moviesByUser = sortMoviesByUser(othersFavorites, myFavorites);
  const noDuplicates = filterDuplicates(moviesByUser, myFavorites);
  return noDuplicates;
}

function sortMoviesByUser(movies, myFavorites) {
  const moviesByUser = {};

  movies.map(movie => {
    const {_creator} = movie;
    if(moviesByUser.hasOwnProperty(_creator)) {  
       moviesByUser[_creator]['movies'].push(movie);            
    }
    else {
      moviesByUser[_creator] = {};
      moviesByUser[_creator]['username'] = movie.username;
      moviesByUser[_creator]['movies'] = [movie];
      moviesByUser[_creator]['id'] = _creator;
      moviesByUser[_creator]['matched'] = 0; 
    }
  });
  
  return moviesByUser;
}

function filterDuplicates(moviesByUser, myFavorites) {
  if(Object.keys(moviesByUser).length === 0 
    && moviesByUser.constructor === Object) {
    return moviesByUser;
  } 
  else {
    let filtered;
  
    for(let key in moviesByUser) {
      filtered = moviesByUser[key].movies.filter(movie => { 
        let match = myFavorites.find(myFavorite => (myFavorite.movieid === movie.movieid));
         
        if(match === undefined) { return true; } 
        moviesByUser[key].matched = moviesByUser[key].matched + 1;
        return false;  
      });
      moviesByUser[key].movies = filtered;
    }   
    return moviesByUser;    
  }
}






