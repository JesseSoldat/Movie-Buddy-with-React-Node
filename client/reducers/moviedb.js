const initialState = {
  term: '',
  movies: [],
  details: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case "MOVIES_SEARCH":
      console.log('MOVIES_SEARCH', action);   
      return {
        ...state,
        term: action.term,
        movies: action.movies
      };

    default: 
      return state;
  }
}