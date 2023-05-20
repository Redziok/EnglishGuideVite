import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectPost, selectUser } from '../../../stores/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { removeTextById } from '../../../components/utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { LanguageDropdown } from '../../languageDropdown';
import { updateState } from '../../../stores/reducers/postReducer';

export const PostHeader = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, post } = useSelector((state: RootState) => ({
		user: selectUser(state),
		post: selectPost(state),
	}));

	return (
		<div className='text-page-header'>
			<div className='text-page-header-info'>
				<p className='text-page-preview-user'>
					Posted by : <em>{post?.post?.login}</em>
				</p>
				<div className='text-page-preview-title'>Title: {post?.post?.title}</div>
				<p className='text-page-preview-language'>{post?.language}</p>
				{user && (user?.id === post?.post?.idUser || user?.isAdmin) && (
					<div className='text-page-button-container'>
						<Button
							title='Remove translation'
							variant='outlined'
							color='error'
							onClick={() => postId && removeTextById(postId, () => navigate('/'))}
							startIcon={<FontAwesomeIcon icon={faTrash} color='red' />}>
							Delete
						</Button>
					</div>
				)}
			</div>
			<LanguageDropdown language={post.language} changeFunction={lang => dispatch(updateState({ language: lang }))} filterOut={post?.language} />
		</div>
	);
};
