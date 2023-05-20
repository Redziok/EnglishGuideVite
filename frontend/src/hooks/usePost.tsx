import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateState } from '../stores/reducers/postReducer';
import { defAxios } from '../components/constants';

interface IUsePostProps {
	postId: string | undefined;
}

export const usePost = ({ postId }: IUsePostProps) => {
	const [isTextLoading, setIsTextLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const dispatch = useDispatch();

	const fetchPost = useCallback(async () => {
		setIsTextLoading(true);
		try {
			const res = await defAxios.get(`Post/${postId}`);
			if (res && res.data) dispatch(updateState({ post: res.data }));
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsTextLoading(false);
		}
	}, [postId, dispatch]);

	useEffect(() => {
		fetchPost();
	}, [fetchPost]);

	return { error, isTextLoading };
};
