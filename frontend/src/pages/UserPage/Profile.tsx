import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextsSubPage } from './TextsSubPage';
import { TranslationsSubPage } from './TranslationsSubPage';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/store';

const Profile = () => {
	const { userLogin } = useParams<string>();
	const [isTextChosen, setIsTextChosen] = useState<boolean>(true);
	const user = useSelector(selectUser);

	if (!user || user?.login !== userLogin) return <h1 className='warning-text'>You're not authenticated</h1>;

	return (
		<div className='profile-container'>
			<div className='profile-main-button-container' style={{ color: '#fff' }}>
				<Button type='submit' variant='contained' color='inherit' disabled={isTextChosen} onClick={() => setIsTextChosen(true)}>
					Texts
				</Button>
				<Button type='submit' variant='contained' color='inherit' disabled={!isTextChosen} onClick={() => setIsTextChosen(false)}>
					Translations
				</Button>
			</div>
			{isTextChosen ? <TextsSubPage /> : <TranslationsSubPage />}
		</div>
	);
};

export default Profile;
