import { useCallback, useEffect, useState } from 'react';
import { ITranslation, IUser } from '../components/DataTypes';
import { defAxios } from '../components/constants';

interface IUseUserTranslations {
	user: IUser | null;
}

export const useUserTranslations = ({ user }: IUseUserTranslations) => {
	const [isLoading, setIsLoading] = useState(false);
	const [translations, setTranslations] = useState<ITranslation[]>([]);

	const fetchTranslations = useCallback(async () => {
		if (!user) return;
		setIsLoading(true);
		try {
			const res = await defAxios.get(`Translation/user=${user?.id}`);
			if (res && res.data) {
				setTranslations(res.data);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchTranslations();
	}, [fetchTranslations]);

	return { isLoadingTranslations: isLoading, translations };
};
