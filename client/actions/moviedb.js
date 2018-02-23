import jsonp from 'jsonp';
const apiKey = `api_key=${process.env.MOVIE_API}`;
const baseUrl = 'https://api.themoviedb.org/3/';
const callBack = '&callback=JSONP_CALLBACK';
const popular = '&sort_by=popularity.desc';

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
      dispatch(moviesSearch(res.results, term));
    });
  }
}

//GET_DETAILS------------------------------------
export const getDetails = (movie = {}) => ({
  type: 'GET_DETAILS',
  movie
});

export const startGetDetails = (id) => {
  return (dispatch) => {
    const url = `${baseUrl}movie/${id}?${apiKey}`;
    console.log(url);
    
    
    jsonp(url, null, (err, data) => {
      if(err) {
        return console.log(err.message);
      }
      console.log(data);
      
      dispatch(getDetails(data));
    });
  }
}