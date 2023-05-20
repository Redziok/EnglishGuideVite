import { useEffect, useState } from 'react';
import { IPost } from '../components/DataTypes';
import { defAxios } from '../components/constants';

export const usePosts = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const fetchPosts = async () => {
		setIsLoading(true);
		try {
			const res = await defAxios.get(`Post`);
			if (res && res.data) setPosts(res.data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return { posts, error, isPostsLoading: isLoading };
};
