import { useNavigate } from 'react-router-dom';
import { LoadingComponent } from '../../components/LoadingComponent';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { RootState, selectFilter, selectUser } from '../../stores/store';
import { usePosts } from '../../hooks/usePosts';
import { TextElements } from './TextElements';

export const MainPage = () => {
	const { posts, isPostsLoading } = usePosts();
	const navigate = useNavigate();
	const { user, filter } = useSelector((state: RootState) => ({
		user: selectUser(state),
		filter: selectFilter(state),
	}));

	if (isPostsLoading) return <LoadingComponent />;

	const postsArray = posts.filter(p => p.title.includes(filter));

	return (
		<div className='search-text-container'>
			{user != null && (
				<div className='add-text-input-container'>
					<TextField
						id='standard-input-add-text'
						defaultValue='Add your own text'
						InputProps={{
							readOnly: true,
						}}
						hiddenLabel
						sx={{ input: { cursor: 'pointer' } }}
						fullWidth
						variant='filled'
						onClick={() => navigate('/AddText')}
					/>
				</div>
			)}
			{posts?.length < 1 ? (
				<h1>There are no posts, {user == null && 'login and'} add your own </h1>
			) : (
				<div className='search-text-header'>
					{postsArray.map(text => (
						<TextElements text={text} key={text.id} />
					))}
				</div>
			)}
		</div>
	);
};
