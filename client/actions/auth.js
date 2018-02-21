import axios from 'axios';

export const login = (_id, token) => ({
  type: 'LOGIN',
  _id,
  token
});

export const startLogin = (email, password) => {
  const user = { email, password };

  return (dispatch) => {
    axios.post('api/users/login', user)
      .then(res => {
        console.log(res);
        const _id = res.data._id;
        const token = res.data.tokens[0].token;
        localStorage.setItem('user', JSON.stringify({_id, token}));
        dispatch(login(_id, token));
      })
      .catch(err => {
        console.log(err);
        
      });
  }
};

export const startLogout = () => {
  return (dispatch) => {

  }
};