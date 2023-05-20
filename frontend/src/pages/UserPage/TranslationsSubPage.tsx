import { Link } from 'react-router-dom';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useUserTranslations } from '../../hooks/useUserTranslations';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeTranslationById } from '../../components/utils';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/store';

export const TranslationsSubPage = () => {
	const user = useSelector(selectUser);
	const { isLoadingTranslations, translations } = useUserTranslations({ user });

	if (isLoadingTranslations) return <LoadingComponent />;

	return (
		<>
			{translations.map(translation => (
				<div key={translation.id} className='profile-text-container'>
					<Link to={`/Post/${translation.idPost}`} className='profile-text'>
						<div className='profile-text-preview-title-lang'>
							{translation.title}
							<p className='text-page-preview-language'>{translation.postLanguage}</p>
						</div>
					</Link>
					<hr />
					<div className='text-page-preview-language translation'>{translation.language}</div>
					<div className='profile-text-preview-text'>{translation.text}</div>
					<div className='profile-text-options'>
						<Button
							variant='outlined'
							color='error'
							onClick={() => removeTranslationById(translation.id)}
							startIcon={<FontAwesomeIcon icon={faTrash} color='red' />}>
							Delete
						</Button>
					</div>
				</div>
			))}
		</>
	);
};
