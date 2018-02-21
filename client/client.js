import 'normalize.css/normalize.css';
import './styles/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import AppRouter, {history} from './router/AppRouter';
import LoadingPage from './pages/LoadingPage';

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

// setTimeout(() => {
//   renderApp();
// }, 1500);