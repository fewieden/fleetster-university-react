import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer } from 'react-router-redux';

import './App.css';
import * as initialState from './initialState';
import {Login, Register, Profile} from './pods';
import logo from './logo.svg';

const store = createStore(combineReducers({ routing: routerReducer }), initialState);

const history = createHistory();

function App() {
    return (
        <ConnectedRouter history={history}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to <s>React</s><span className='overwrite'>fleetster University</span></h1>
                </header>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
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
