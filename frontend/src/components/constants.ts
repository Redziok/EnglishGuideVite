import axios from 'axios';

export const API_CALL = import.meta.env.VITE_APP_API_URL ?? '';

export const defAxios = axios.create({
	baseURL: API_CALL + '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});
