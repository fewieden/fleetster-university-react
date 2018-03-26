export const user = (state = {}, action = {}) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_TOKEN':
			return { ...state, token: action.payload };
		case 'CLEAR_USER':
			return { ...state, user: null, token: null };
		default:
			return state;
	}
};
