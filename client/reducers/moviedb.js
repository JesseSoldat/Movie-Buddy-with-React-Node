const initialState = {
  term: '',
  movies: [],
  movie: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case "MOVIES_SEARCH":
      // console.log('MOVIES_SEARCH', action);   
      return {
        ...state,
        term: action.term,
        movies: action.movies
      };

    case "GET_DETAILS":
      console.log('GET_DETAILS', action.movie);
      return {
        ...state,
        movie: action.movie
      }

    default: 
      return state;
  }
}