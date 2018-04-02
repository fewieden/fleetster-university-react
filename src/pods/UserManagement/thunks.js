import { push } from 'react-router-redux';

import config from '../../config';
import { setToken, setUser, clearUser } from './actions';

export function login(_id, password) {
	return function (dispatch) {
		return fetch(`${config.BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ _id, password })
		})
		.then(res => res.json())
		.then((res) => {
			if (res.error) {
				alert(res.error);
				return;
			}

			return Promise.all([
				dispatch(setToken(res.token)),
				dispatch(loadProfile(_id, res.token)),
				dispatch(push('/profile/' + _id))
			]);
		})
		.catch((e) => alert('failed'));
	};
}

export function register(name, email, password) {
	return function(dispatch) {
		return fetch(`${config.BASE_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		})
		.then(res => res.json())
		.then((res) => {
			alert(`User ID: ${res._id}`);
			return dispatch(push('/'));
		})
		.catch((e) => alert('failed'))
	}
}

export function logout(token) {
	return function(dispatch) {
		return fetch(`${config.BASE_URL}/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify({})
		})
		.then(res => res.json())
		.then(() => {
			return Promise.all([
				dispatch(clearUser()),
				dispatch(push('/')),
			]);
		})
		.catch((e) => alert('failed'))
	}
}

export function loadProfile(id, token) {
	return function(dispatch) {
		return fetch(`${config.BASE_URL}/user/${id}`, {
			method: 'GET',
			headers: {
				'Authorization': token
			}
		})
		.then(res => res.json())
		.then((user) => {
			if(!user.error) {
				dispatch(setUser(user));
			}
		})
		.catch((e) => alert('failed'))
	}
}