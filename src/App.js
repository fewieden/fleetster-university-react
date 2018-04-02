import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import './App.css';
import * as initialState from './initialState';
import { Login, Register, Profile, user } from './pods';
import logo from './logo.svg';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(combineReducers({ routing: routerReducer, user }), initialState, applyMiddleware(thunk, middleware));

function App() {
    return (
        <ConnectedRouter history={history}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to <s>React</s><span className='overwrite'>fleetster University</span></h1>
                </header>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile/:id' component={Profile} />
            </div>
        </ConnectedRouter>
    );
}

export function University() {
	return (
		<Provider store={ store }>
			<App />
		</Provider>
	);
}
