import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ITranslation } from '../../components/DataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { createToast, removeTranslationById } from '../../components/utils';
import { useRatings } from '../../hooks/useRatings';
import { updateState } from '../../stores/reducers/postReducer';
import { selectUser, selectPost } from '../../stores/store';

interface ITranslationDetailsProps {
	translation: ITranslation;
}

export const TranslationDetails = ({ translation }: ITranslationDetailsProps) => {
	const dispatch = useDispatch();
	const { user, post } = useSelector((state: RootState) => ({
		user: selectUser(state),
		post: selectPost(state),
	}));
	const { translationScore, userScore, postRating } = useRatings({ idTranslation: translation?.id, user });

	const removeTranslation = (translation: ITranslation | undefined) => {
		if (!translation) return;
		removeTranslationById(translation.id, () => {
			dispatch(updateState({ translations: post.translations.filter(t => t.id !== translation.id) }));
		});
	};

	const handleLike = (value: number) => {
		if (!user)
			return createToast.fire({
				icon: 'error',
				text: 'Must be logged to rate',
			});

		postRating(value);
	};

	return (
		<div className='translation-text-preview'>
			<div className='translation-preview-header'>
				<p className='text-page-preview-user'>
					Posted by : <em>{translation.login}</em>
				</p>
			</div>
			<div className='translation-page-preview-text'>{translation.text}</div>
			<div className='translation-button-container'>
				<div className='translation-rating-container' style={{ display: 'flex', alignItems: 'center' }}>
					<IconButton aria-label='delete' title="I don't like this" onClick={() => handleLike(1)} disabled={userScore === 1}>
						<FontAwesomeIcon icon={faThumbsUp} color={userScore === 1 ? '#ffa726' : 'white'} />
					</IconButton>
					<p style={{ margin: 0 }}>{translationScore}</p>
					<IconButton aria-label='delete' title='I like this' onClick={() => handleLike(-1)} disabled={userScore === -1}>
						<FontAwesomeIcon icon={faThumbsDown} flip='horizontal' color={userScore === -1 ? '#ffa726' : 'white'} />
					</IconButton>
				</div>
				{user && (user?.id === post?.post?.idUser || user?.id === translation.idUser || user?.isAdmin) && (
					<Button
						title='Remove translation'
						variant='outlined'
						color='error'
						onClick={() => removeTranslation(translation)}
						startIcon={<FontAwesomeIcon icon={faTrash} color='red' />}>
						Delete
					</Button>
				)}
			</div>
		</div>
	);
};
