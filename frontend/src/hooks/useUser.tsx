import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../stores/reducers/userReducer';
import { defAxios } from '../components/constants';

export interface ILoginRegisterBody {
	login: string;
	password: string;
	email?: string;
}

export const useUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const dispatch = useDispatch();

	const fetchUser = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await defAxios.get(`User/user`, { withCredentials: true });
			if (res && res.data) dispatch(setUser(res.data));
		} catch (err) {
			dispatch(clearUser());
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const loginUser = async (body: ILoginRegisterBody) => {
		try {
			const res = await defAxios.post(`User/login`, body, { withCredentials: true });
			if (res && res.status === 200) {
				await fetchUser();
				return true;
			}
		} catch (err) {
			console.error(err);
		}
		return false;
	};

	const logoutUser = async () => {
		try {
			await defAxios.post(`User/logout`, null, { withCredentials: true });
		} catch (err) {
			console.error(err);
		} finally {
			dispatch(clearUser());
		}
	};

	return { error, isUserLoading: isLoading, loginUser, logoutUser };
};
