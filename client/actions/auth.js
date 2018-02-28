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
        const _id = res.data._id;
        const token = res.data.tokens[0].token;
        localStorage.setItem('user', JSON.stringify({_id, token}));
        dispatch(login(_id, token));
      })
      .catch(err => {
        console.log('startLogin', err);       
      });
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = (token) => {
  return (dispatch) => {
    axios.request('DELETE', {
      url: 'users/token',
      headers: {'x-auth': token}
    }).then(res => {
      localStorage.setItem('user', null);    
      localStorage.setItem('movies', null);
      localStorage.setItem('movie', null);          
      dispatch(logout());
    })
    .catch(err => {
      console.log('startLogout', err);
      
    })
  }
};

export const register = (_id, token) => ({
  type: 'REGISTER',
  _id,
  token
});

export const startRegister = (username, email, password) => {
  const user = {username, email, password};

  return (dispatch) => {
    axios.post('api/users', user).then((res) => {
      const _id = res.data._id;
      const token = res.data.tokens[0].token;
      localStorage.setItem('user', JSON.stringify({_id, token}));
      dispatch(register(_id, token));
      
    })
    .catch(err => {
      console.log('startRegister', err);             
    })
  }
}