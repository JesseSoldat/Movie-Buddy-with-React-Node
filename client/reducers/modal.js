export default (state = {show: false}, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      // console.log('TOGGLE_MODAL', action);
      return {
        show: action.toggle
      };
      
    default: 
      return state;
  }
}