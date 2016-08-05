import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './components/Home';
import Practice from './components/Practice';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="practice" component={Practice} />
  </Route>
);