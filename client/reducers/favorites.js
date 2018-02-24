export default (state = [], action) => {
  switch(action.type) {
    case "GET_FAVORITES":
      console.log('GET_FAVORITE', action.favorites);       
      return action.favorites;

    case 'ADD_FAVORITE':
      console.log('ADD_FAVORITE', action);
      return [...state, action.movie];
    
    default:
      return state;
  }
}