import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from '../../../config';

class Profile extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { id } = this.props.match.params;
		fetch(`${config.BASE_URL}/user/${id}`, {
			method: 'GET',
			headers: {
				'Authorization': token
			}
		})
		.then(res => res.json())
		.then((user) => {
			if(!user.error) {
				this.props.setUser(user);
			}
		})
		.catch((e) => alert('failed'))
	}

	logout() {
		const { token } = this.props;
		fetch(`${config.BASE_URL}/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify({})
		})
		.then(res => res.json())
		.then(() => {
			this.props.clearUser();
			this.props.transitionTo('/');
		})
		.catch((e) => alert('failed'))
	}

	render() {
		const { user, token } = this.props;
		return (
			<div>
				{user &&
					<div>
						<p>User ID: { user._id }</p>
						<p>Name: { user.name }</p>
						<p>E-Mail: { user.email }</p>
						<p>Token: { token }</p>
					</div>
				}

				<button onClick={() => this.logout()}>Logout</button>
			</div>
		);
	}
}

Profile = connect(state => ({
	user: state.user.user,
	token: state.user.token
}), dispatch => ({
	setUser: user => dispatch({ type: 'SET_USER', payload: user }),
	clearUser: () => dispatch({ type: 'CLEAR_USER' }),
	transitionTo: path => dispatch(push(path))
}))(Profile);

export { Profile };