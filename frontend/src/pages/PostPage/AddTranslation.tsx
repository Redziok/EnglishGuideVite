import { faAdd, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextareaAutosize } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectPost, selectUser } from '../../stores/store';
import { useParams } from 'react-router-dom';
import { IPostTranslation, ITranslation } from '../../components/DataTypes';
import { updateState } from '../../stores/reducers/postReducer';
import { defAxios } from '../../components/constants';

export function AddTranslation() {
	const { postId } = useParams<string>();
	const dispatch = useDispatch();
	const [isFormActive, setIsFormActive] = useState<boolean>(false);
	const { user, post } = useSelector((state: RootState) => ({
		user: selectUser(state),
		post: selectPost(state),
	}));

	const submitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.id || !post.sectionId) return;
		const formData = new FormData(e.currentTarget);
		const text = formData.get('translation') as string;

		const body: IPostTranslation = {
			text,
			language: post.language,
			sectionId: post.sectionId,
			idPost: Number(postId),
			idUser: user.id,
		};

		const res = await defAxios.post(`Translation`, body);
		const temp: ITranslation = {
			...body,
			id: res.data.id,
			login: user.login,
		};
		setIsFormActive(false);
		dispatch(updateState({ translations: [...post.translations, temp] }));
	};

	if (!isFormActive)
		return (
			<div className='text-empty-container' id='text-empty-container-id'>
				<h3>{user == null ? 'Must be logged to add translation' : 'Add your own translation'}</h3>
				<div className='translation-add-container'>
					<Button variant='contained' color='inherit' startIcon={<FontAwesomeIcon icon={faAdd} />} onClick={() => setIsFormActive(true)} disabled={user == null}>
						ADD TRANSLATION
					</Button>
				</div>
			</div>
		);
	else
		return (
			<div className='text-empty-container' id='text-empty-container-id'>
				<form onSubmit={submitHandler}>
					<div className='text-container'>
						<TextareaAutosize
							placeholder='Translation'
							name='translation'
							color='black'
							minRows={1}
							style={{ width: '100%', background: '#333', color: 'white' }}
							required
						/>
					</div>
					<div className='translation-add-container'>
						<Button variant='contained' type='submit' color='inherit' onClick={() => setIsFormActive(true)} endIcon={<FontAwesomeIcon icon={faPaperPlane} />}>
							SUBMIT
						</Button>
					</div>
				</form>
			</div>
		);
}
