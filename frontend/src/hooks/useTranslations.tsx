import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateState, clearState } from '../stores/reducers/postReducer';
import { defAxios } from '../components/constants';

interface IUseTranslationsProps {
	language: string;
	postId: string | undefined;
}

export const useTranslations = ({ language, postId }: IUseTranslationsProps) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const fetchTranslations = useCallback(async () => {
		if (!language) return;
		setIsLoading(true);
		try {
			const res = await defAxios.get(`Translation/?language=${language}&idPost=${postId}`);
			if (res && res.data) dispatch(updateState({ translations: res.data }));
		} catch (err) {
			setError((err as AxiosError).message);
		} finally {
			dispatch(clearState());
			setIsLoading(false);
		}
	}, [language, postId, dispatch]);

	useEffect(() => {
		fetchTranslations();
	}, [fetchTranslations]);

	return { error, isTranslationLoading: isLoading };
};
