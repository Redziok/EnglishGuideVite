import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../components/DataTypes';
import { defAxios } from '../components/constants';

interface IUseRatingsProps {
	user: IUser | null;
	idTranslation: number;
}

export const useRatings = ({ user, idTranslation }: IUseRatingsProps) => {
	const [translationScore, setTranslationScore] = useState<number>(0);
	const [userScore, setUserScore] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);

	const fetchTranslationRating = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await defAxios.get(`Rating/TranslationScore/?idTranslation=${idTranslation}`);
			if (res && res.status === 200) {
				setTranslationScore(res.data);
			}
		} catch (err) {
			setTranslationScore(0);
		} finally {
			setIsLoading(false);
		}
	}, [idTranslation]);

	const fetchUserRating = useCallback(async () => {
		if (!user) return;
		try {
			const res = await defAxios.get(`Rating/UserScore/?idTranslation=${idTranslation}&idUser=${user.id}`);
			if (res && res.status === 200) {
				setUserScore(res.data);
			}
		} catch (err) {
			setUserScore(0);
		}
	}, [idTranslation, user]);

	const postRating = useCallback(
		async (score: number) => {
			defAxios.post(`Rating`, {
				score,
				idTranslation,
				idUser: user?.id,
			});
			setTranslationScore(p => (userScore == null ? p + score : p + 2 * score));
			setUserScore(score);
		},
		[idTranslation, user?.id, userScore]
	);

	useEffect(() => {
		fetchTranslationRating();
		fetchUserRating();
	}, [fetchTranslationRating, fetchUserRating, user, idTranslation]);

	return { translationScore, userScore, postRating, isLoadingRatings: isLoading };
};
