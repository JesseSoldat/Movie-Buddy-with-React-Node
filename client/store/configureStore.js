import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import moviedbReducer from '../reducers/moviedb';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loading: () => ({}),
      auth: authReducer,
      route: () => ({}),
      moviedb: moviedbReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};