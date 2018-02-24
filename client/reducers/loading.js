export default (state = false, action) => {
  if(action.type === 'IS_LOADING') {
    return action.loading;
  }
  return state;
}