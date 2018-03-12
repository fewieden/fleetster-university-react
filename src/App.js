import React, { Component } from 'react';
import {Login} from './pods/login';
import logo from './logo.svg';
import './App.css';
import {Register} from './pods/register';
import {Profile} from './pods/profile';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 'login',
            params: {}
        };
    }

    transitionTo(page, params = {}) {
        this.setState({ page, params });
    }

    render() {
        const { page, params } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to <s>React</s><span className='overwrite'>fleetster University</span></h1>
                </header>
                <p>{page}</p>
                {page === 'login' && <Login transitionTo={(target, params) => this.transitionTo(target, params)}/>}
                {page === 'register' && <Register transitionTo={(target, params) => this.transitionTo(target, params)}/>}
                {page === 'profile' && <Profile params={params} transitionTo={(target, params) => this.transitionTo(target, params)}/>}
      </div>
    );
  }
}

export default App;
