import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, hashHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import './index.css';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
