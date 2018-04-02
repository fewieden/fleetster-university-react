import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadProfile, logout } from '../thunks';

class Profile extends Component {
	componentDidMount() {
		const { token } = this.props;
		const { id } = this.props.match.params;
		this.props.loadProfile(id, token);
	}

	logout() {
		const { token } = this.props;
		this.props.logout(token);
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
}), { loadProfile, logout })(Profile);

export { Profile };