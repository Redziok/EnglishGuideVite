import { useCallback, useEffect, useState } from 'react';
import { IPost, IUser } from '../components/DataTypes';
import { defAxios } from '../components/constants';

interface IUseUserPostsProps {
	user: IUser | null;
}

export const useUserPosts = ({ user }: IUseUserPostsProps) => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUsersPosts = useCallback(async () => {
		if (!user) return;
		setIsLoading(true);
		try {
			const res = await defAxios.get(`Post/user=${user?.id}`);
			if (res && res.data) {
				setPosts(res.data);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchUsersPosts();
	}, [fetchUsersPosts]);

	return { posts, isLoadingTexts: isLoading };
};
