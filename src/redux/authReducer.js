import { createSlice } from '@reduxjs/toolkit';

const getGoogleAuthLocalStorage = () => {
	try {
		return JSON.parse(localStorage.getItem('googleAuth'));
	} catch (err) {
		return null;
	}
};

// TODO: JSON.parse global fail safe
const initialState = {
	accessToken: localStorage.getItem('accessToken'),
	dataToken: localStorage.getItem('dataToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	userId: localStorage.getItem('userId'),
	profileId: localStorage.getItem('profileId'),
	type: localStorage.getItem('type'),
	email: localStorage.getItem('email'),
	googleAuth: getGoogleAuthLocalStorage(),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthKey: (state, action) => {
			const [key, value] = action.payload;
			state[key] = value;
			localStorage.setItem(key, value);
		},
		resetAuth: (state) => {
			for (const key in state) {
				localStorage.removeItem(key);
				state[key] = undefined;
			}
		},
		setGoogleAuth: (state, action) => {
			const googleAuth = action.payload;

			state.googleAuth = googleAuth;
			localStorage.setItem('googleAuth', JSON.stringify(googleAuth));
		},
	},
});

export const { setAuthKey, resetAuth, setGoogleAuth } = authSlice.actions;

/**
 *
 * @deprecated
 * use local storage instead
 */
export const authKeySelector = (key) => (state) => state.auth[key];

export default authSlice.reducer;
