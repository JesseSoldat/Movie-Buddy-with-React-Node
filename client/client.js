import 'normalize.css/normalize.css';
import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import AppRouter, {history} from './router/AppRouter';
import LoadingPage from './pages/LoadingPage';
import {login} from './actions/auth';
import {moviesSearch} from './actions/moviedb';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRenderedOnce = false;

const renderApp = () => {
  if(!hasRenderedOnce) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRenderedOnce = true;
  }
}

ReactDOM.render(<LoadingPage/>,
  document.getElementById('app')
);

const user = JSON.parse(localStorage.getItem('user'));
const movies = JSON.parse(localStorage.getItem('movies'));

if(user) {
  store.dispatch(login(user._id, user.token));  
  if(movies) {
    store.dispatch(moviesSearch(movies.movies, movies.term));
  }
  renderApp();
} else {
  renderApp();
}



