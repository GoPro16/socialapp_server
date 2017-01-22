import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import requireAuth from './components/require_authentication';
import Login from './components/login';
import SignUp from './components/signUp/signUp';
import Home from './components/homepage/home';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
    	<Route path="/" component={Login} />
    	<Route path="/home" component={requireAuth(Home)} />
    	<Route path="/signUp" component={SignUp} />
    </Router>
  </Provider>
  , document.querySelector('.container'));
