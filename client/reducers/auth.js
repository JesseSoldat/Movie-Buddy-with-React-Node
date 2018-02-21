const initialState = { _id: null, token: null };

export default (state = initialState, action) => {
  switch(action.type) {
    case "LOGIN":
      console.log('LOGIN', action);   
      return {
        ...state,
        _id: action._id,
        token: action.token
      };

    default:
      return state;
  }
};