import { useState } from 'react';
import FormButtons from '../../components/buttons/formButtons';

export const UserRegister = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(login, password);
	};

	return (
		<div>
			<h1>Register</h1>
			<form
				onSubmit={handleSubmit}
			>
				<label htmlFor="login">Login</label>
				<input
					type="text"
					id="login"
					name="login"
					onChange={(e) => setLogin(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<FormButtons />
			</form>
		</div>
	)
};