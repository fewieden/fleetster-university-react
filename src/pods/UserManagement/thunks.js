import { push } from 'react-router-redux';

import config from '../../config';
import { setToken } from './actions';

export function login(_id, password) {
	return function (dispatch, getState) {
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

			Promise.all([
				dispatch(setToken(res.token)),
				dispatch(push('/profile/' + _id))
			]);
		})
		.catch((e) => alert('failed'));
	};
}