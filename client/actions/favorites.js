import axios from 'axios';
import jsonp from 'jsonp';
import {isLoading} from './loading';

const apiKey = `api_key=${process.env.MOVIE_API}`;
const baseUrl = 'https://api.themoviedb.org/3/';


export const getFavorites = (favorites) => ({
  type: 'GET_FAVORITES',
  favorites
});

//ADD_FAVORITE------------------------------------
export const addFavorite = (favorite) => ({
  type: 'ADD_FAVORITE',
  favorite
});

export const startAddFavorite = ({id}) => {
  return (dispatch) => {
    const url = `${baseUrl}movie/${id}?${apiKey}`; 

    jsonp(url, null, (err, res) => {
      if(err) { return console.log(err.message) } 
      dispatch(saveMovieToDatabase(res));
    });
  };
};

export const saveMovieToDatabase = (m) => {
  const movie = {
    title: m.title || '',
    poster_path: m.poster_path || '',
    original_title: m.original_title || '',
    release_date: m.release_date || '',
    vote_average: m.vote_average || null,
    genres: m.genres || [],
    production_companies: m.production_companies || [],
    overview: m.overview || '',
    homepage: m.homepage || ''
  };

  return (dispatch, getState) => {
    const token = getState().auth.token; 
    const config = { headers: { 'x-auth': token } };
    
    axios.post('/api/favorites', movie, config)
      .then(res => {
        console.log(res);
        dispatch(addFavorite(res.data));  
      })
      .catch(err => {
        console.log(err);   
      });   
  
    
  }
}

