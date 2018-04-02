import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../thunks';

const linkedButton = {
	textDecoration: 'none'
};

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			repeatedPassword: '',
			error: {}
		};
	}

	validate(name, value) {
		const { error, password } = this.state;
		if (name === 'name') {
			return true;
		} else if (name === 'email') {
			if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
				this.setState({ error: {...error, [name]: 'Invalid e-mail format'} });
				return false;
			}

			this.setState({ error: {...error, [name]: false} });
			return true;
		} else if (name === 'password') {
			if (value.length < 7) {
				this.setState({ error: {...error, [name]: 'Password is to short'} });
				return false;
			}

			this.setState({ error: {...error, [name]: false} });
			return true;
		} else if (name === 'repeatedPassword') {
			if (password !== value) {
				this.setState({ error: {...error, [name]: 'Passwords do not match'} });
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

	register() {
		const { error } = this.state;
		for (let key in error) {
			if (error[key]) {
				alert('There are errors in the input fields.');
				return;
			}
		}

		for (let required of ['name', 'email', 'password', 'repeatedPassword']) {
			if (!this.state[required]) {
				alert('You have to fill out all required fields.');
				return;
			}
		}

		const { name, email, password } = this.state;

		this.props.register(name, email, password);
	}

	render() {
		const { name, email, password, repeatedPassword, error } = this.state;

		return (
			<div>
				{error.name && <Fragment><label htmlFor="name">{error.name}</label><br /></Fragment>}
				<input type='text' name='name' placeholder='Name*' value={name} onChange={(e) => this.onChange(e)} /><br />
				{error.email && <Fragment><label htmlFor="email">{error.email}</label><br /></Fragment>}
				<input type='text' name='email' placeholder='E-Mail*' value={email} onChange={(e) => this.onChange(e)} /><br />
				{error.password && <Fragment><label htmlFor="password">{error.password}</label><br /></Fragment>}
				<input type='password' name='password' placeholder='Password*' value={password} onChange={(e) => this.onChange(e)} /><br />
				{error.repeatedPassword && <Fragment><label htmlFor="repeatedPassword">{error.repeatedPassword}</label><br /></Fragment>}
				<input type='password' name='repeatedPassword' placeholder='Repeat password*' value={repeatedPassword} onChange={(e) => this.onChange(e)} /><br />

				<Link style={linkedButton} to='/'>Back to Login</Link>
				<button onClick={() => this.register()}>Register</button>
			</div>
		);
	}
}

Register = connect(null, { register })(Register);

export { Register };