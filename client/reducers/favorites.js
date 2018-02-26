export default (state = {filter: '', movies: []}, action) => {
  let newState;
  let movies;
  
  switch(action.type) {
    case "GET_FAVORITES":
      // console.log('GET_FAVORITES', action.favorites);    
      return {
        ...state,
        movies: action.favorites
      };

    case 'ADD_FAVORITE':
      // console.log('ADD_FAVORITE', action);
      newState = {
        ...state,
        movies: [...state.movies, action.favorite]
      };
      return newState;

    case 'DELETE_FAVORITE':
      // console.log('DELETE_FAVORITE', action.id);
      newState = {
        ...state   
      };
      movies = newState.movies.filter(movie => movie._id !== action.id);
      newState = {
        ...newState,
        movies
      };
      return newState;

    case 'FILTER_FAVORITES':
      // console.log('FILTER', action.filter);
      newState = {
        ...state,
        filter: action.filter
      };
      return newState;

    default:
      return state;
  }
}