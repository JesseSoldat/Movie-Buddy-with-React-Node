import jsonp from 'jsonp';
const apiKey = `api_key=${process.env.MOVIE_API}`;
const baseUrl = 'https://api.themoviedb.org/3/';
const callBack = '&callback=JSONP_CALLBACK';
const popular = '&sort_by=popularity.desc';
import {isLoading} from './loading';


//MOVIES_SEARCH------------------------------------
export const moviesSearch = (movies = [], term = '') => ({
  type: 'MOVIES_SEARCH',
  term,
  movies
});

export const startMoviesSearch = (term = '') => {
  const moviesSearchStr = 'search/movie?query=';
  
  return (dispatch) => {
    const url = `${baseUrl}${moviesSearchStr}${term}${popular}&${apiKey}${callBack}`;
    
    jsonp(url, null, (err, res) => {
      if(err) {
        return console.log(err.message);    
      }
      const movies = res.results;
      localStorage.setItem('movies', JSON.stringify({movies, term}));      
      dispatch(moviesSearch(movies, term));
    });
  }
};

//GET_DETAILS------------------------------------
export const getDetails = (movie = {}) => ({
  type: 'GET_DETAILS',
  movie
});

export const startGetDetails = (id) => {
  return (dispatch) => {
    const url = `${baseUrl}movie/${id}?${apiKey}`;   
    dispatch(isLoading(true));

    jsonp(url, null, (err, data) => {
      if(err) {
        dispatch(isLoading(false));
        return console.log(err.message);

      }
      localStorage.setItem('movie', JSON.stringify(data));
      dispatch(isLoading(false));
      dispatch(getDetails(data));
    });
  }
};

//REMOVE FROM SEARCH------------------------------
export const startRemoveFromSearch = (id) => {
  return (dispatch, getState) => {
    const movies = getState().moviedb.movies;
    const term = getState().moviedb.term;

    const newList = movies.filter(movie => movie.id !== id);
    dispatch(moviesSearch(newList, term));
  };
};