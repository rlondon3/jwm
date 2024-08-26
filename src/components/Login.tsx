import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';

interface LoginProps {
	handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
	const primary = orange[900];
	const secondary = orange[200];

	return (
		<Stack
			spacing={2}
			sx={{ width: 300 }}
		>
			<TextField
				id='loginEmail'
				label='Email'
				type='email'
				variant='outlined'
				fullWidth
			/>
			<TextField
				id='loginPassword'
				label='Password'
				type='password'
				variant='outlined'
				fullWidth
			/>

			<Stack
				direction='row'
				spacing={2}
			>
				<Button
					style={{ backgroundColor: `${primary}` }}
					variant='contained'
					endIcon={<LogoutIcon />}
				>
					Login
				</Button>
				<Button
					variant='outlined'
					startIcon={<LoginIcon />}
				>
					Logout
				</Button>
			</Stack>
		</Stack>
	);
};

export default Login;
