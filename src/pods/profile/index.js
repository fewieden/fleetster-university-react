import React, { Component } from 'react';
import config from '../../config';

export class Profile extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			_id: props.params._id,
			token: props.params.token,
			user: {},
		};
	}

	componentDidMount() {
		const { token, _id } = this.state;
		console.log(token, _id);
		fetch(`${config.BASE_URL}/user/${_id}`, {
			method: 'GET',
			headers: {
				'Authorization': token
			}
		})
		.then(res => res.json())
		.then((user) => {
			if(!user.error) {
				this.setState({ user });
			}
		})
		.catch((e) => alert('failed'))
	}

	logout() {
		const { token } = this.state;
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
			this.props.transitionTo('login');
		})
		.catch((e) => alert('failed'))
	}

	render() {
		const { user, token } = this.state;
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