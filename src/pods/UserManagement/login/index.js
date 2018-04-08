import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../thunks';

const linkedButton = {
	textDecoration: 'none'
};

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			_id: '',
			password: '',
			error: {}
		};
	}

	validate(name, value) {
		const { error } = this.state;
		if (name === '_id') {
			return true;
		} else if (name === 'password') {
			if (value.length < 7) {
				this.setState({ error: {...error, [name]: 'Password is to short'} });
				return false;
			}

			this.setState({ error: {...error, [name]: false} });
			return true;
		}
	}

	onChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
		this.validate(name, value);
	}

	login() {
		const { error } = this.state;
		for (let key in error) {
			if (error[key]) {
				alert('There are errors in the input fields.');
				return;
			}
		}

		for (let required of ['_id', 'password']) {
			if (!this.state[required]) {
				alert('You have to fill out all required fields.');
				return;
			}
		}

		const { _id, password } = this.state;

		this.props.login(_id, password);
	}

	render() {
		const { name, password, error } = this.state;
		return (
			<div>
				{error._id && <Fragment><label htmlFor="_id">{error._id}</label><br /></Fragment>}
				<input type='text' name='_id' placeholder='User ID*' value={name} onChange={(e) => this.onChange(e)} /><br />
				{error.password && <Fragment><label htmlFor="password">{error.password}</label><br /></Fragment>}
				<input type='password' name='password' placeholder='Password*' value={password} onChange={(e) => this.onChange(e)} /><br />

				<Link style={linkedButton} to='/register'>Go to Register</Link>
				<button onClick={() => this.login()}>Login</button>
			</div>
		);
	}
}

Login = connect(null, { login })(Login);

export { Login };