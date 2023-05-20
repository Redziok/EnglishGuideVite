import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useUserPosts } from '../../hooks/useUserPosts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeTextById } from '../../components/utils';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/store';

export const TextsSubPage = () => {
	const user = useSelector(selectUser);
	const { posts, isLoadingTexts } = useUserPosts({ user });

	if (isLoadingTexts) return <LoadingComponent />;

	return (
		<>
			{posts.map(text => (
				<div key={text.id} className='profile-text-container'>
					<Link to={`/Post/${text.id}`} className='profile-text'>
						<div className='profile-text-preview-title-lang'>
							{text.title}
							<p className='text-page-preview-language'>{text.language}</p>
						</div>
					</Link>
					<hr />
					<div className='profile-text-preview-text'>{text.text}</div>
					<div className='profile-text-options'>
						<Button variant='outlined' color='error' onClick={() => removeTextById(text.id)} startIcon={<FontAwesomeIcon icon={faTrash} color='red' />}>
							Delete
						</Button>
					</div>
				</div>
			))}
		</>
	);
};
