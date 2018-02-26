import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import loadingReducer from '../reducers/loading';
import moviedbReducer from '../reducers/moviedb';
import favoritesReducer from '../reducers/favorites';
import toggleModalReducer from '../reducers/modal';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loading: loadingReducer,
      auth: authReducer,
      route: () => ({}),
      moviedb: moviedbReducer,
      favorites: favoritesReducer,
      modal: toggleModalReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};