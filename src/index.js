import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import './index.css';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promise)(createStore);

let store = createStoreWithMiddleware(reducers);

ReactStormpath.init();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
