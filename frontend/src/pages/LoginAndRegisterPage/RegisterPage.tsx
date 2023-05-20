import { SyntheticEvent, useState } from 'react';
import { ILoginRegisterBody } from '../../hooks/useUser';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createToast } from '../../components/utils';
import { defAxios } from '../../components/constants';

export const RegisterForm = () => {
	const [registerForm, setIsRegisterForm] = useState<ILoginRegisterBody>({ login: '', email: '', password: '' });

	const onSubmitRegister = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const res = await defAxios.post(`User/register`, registerForm);
			if (res && res.data)
				createToast.fire({
					title: 'Successfully created account',
					timer: 2000,
				});
		} catch (err) {
			createToast.fire({
				title: 'Failed to create account',
				timer: 2000,
			});
		}
	};

	const updateRegisterForm = (key: string) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setIsRegisterForm(prev => ({
				...prev,
				[key]: e.target.value,
			}));
		};
	};

	return (
		<form onSubmit={onSubmitRegister}>
			<h2>Sign up</h2>
			<div className='input-field-wrapper'>
				<TextField id='filled-basic-login' label='Login' variant='outlined' onChange={updateRegisterForm('login')} required />
			</div>
			<div className='input-field-wrapper'>
				<TextField id='filled-basic-email' label='Email' variant='outlined' onChange={updateRegisterForm('email')} required />
			</div>
			<div className='input-field-wrapper'>
				<TextField id='filled-basic-password' label='Password' variant='outlined' type='password' onChange={updateRegisterForm('password')} required />
			</div>
			<Button type='submit' variant='outlined'>
				Register
			</Button>
		</form>
	);
};
