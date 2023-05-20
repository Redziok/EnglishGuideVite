import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { LanguageDropdown } from './languageDropdown';
import { addTextWaring, createToast } from '../components/utils';
import { useSelector } from 'react-redux';
import { selectUser } from '../stores/store';
import { defAxios } from '../components/constants';

interface ITextPost {
	title: string;
	text: string;
	idUser: number;
	language: string;
}

export const AddText = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [language, setLanguage] = useState<string>('');
	const user = useSelector(selectUser);

	const postText = async () => {
		if (!user?.id || !language) return;

		const body: ITextPost = {
			title: title,
			text: text,
			idUser: user?.id,
			language: language,
		};

		const res = await defAxios.post(`Post`, body);
		if (res && res.data) navigate(`/Post/${res.data.id}`);
	};

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!language) {
			createToast.fire({
				icon: 'error',
				text: 'Language not chosen',
			});
			return;
		}
		const textAreas = text.split(/\r?\n\r?\n/);
		if (textAreas.length !== 1) postText();
		else {
			addTextWaring(() => postText());
		}
	};

	return (
		<div className='add-text-container'>
			<form id='add-text-form' onSubmit={submitHandler}>
				<div className='add-text-inputs'>
					<div className='title-container'>
						<TextField id='filled-basic-Title' label='Title' variant='outlined' value={title} onChange={e => setTitle(e.currentTarget.value)} fullWidth required />
					</div>

					<div className='text-container'>
						<TextField
							id='outlined-multiline-text'
							label='Text'
							value={text}
							onChange={e => setText(e.currentTarget.value)}
							multiline
							fullWidth
							maxRows={2}
							required
						/>
					</div>

					<p className='text-alert'>Leave a space between paragraph to split the text into sections and make it easier to translate! </p>

					<LanguageDropdown language={language} changeFunction={lang => setLanguage(lang)} />

					<hr />

					<div className='button-container'>
						<Button variant='contained' type='submit' color='inherit' endIcon={<FontAwesomeIcon icon={faPaperPlane} />}>
							SUBMIT
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};
