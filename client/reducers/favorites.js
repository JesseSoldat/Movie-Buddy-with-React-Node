export default (state = [], action) => {
  switch(action.type) {
    case "GET_FAVORITES":
      console.log('GET_FAVORITES', action.favorites);    
      return action.favorites;

    case 'ADD_FAVORITE':
      console.log('ADD_FAVORITE', action);
      const newState = [...state, action.favorite];
      return newState;

    case 'DELETE_FAVORITE':
      console.log('DELETE_FAVORITE', action);
      // const newState = [...state];
      // newState = newState.filter(movie => movie)
      return state;
    
    default:
      return state;
  }
}