import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { orange } from '@mui/material/colors';
import GoogleIcon from '@mui/icons-material/Google';

interface LoginProps {
	handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

declare global {
	interface Window {
		google: {
			accounts: {
				id: {
					initialize: (config: {
						client_id: string;
						callback: (response: { credential: string }) => void;
						itp_support?: boolean;
					}) => void;
					renderButton: (
						element: HTMLElement | null,
						options: { theme: string; size: string }
					) => void;
					revoke: (token: string, callback: () => void) => void;
				};
			};
		};
		handleCredentialResponse: (response: { credential: string }) => void;
	}
}

interface LoginProps {
	handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Login = ({ handleLogin }: LoginProps) => {
	const [user, setUser] = useState<null | {
		sub: string;
		name: string;
		email: string;
	}>(null);
	const primary = orange[900];
	const secondary = orange[200];

	useEffect(() => {
		const handleCredentialResponse = (response: { credential: string }) => {
			const responsePayload = decodeJwtResponse(response.credential);
			setUser(responsePayload);
			console.log('Callback executed', responsePayload);
		};

		window.handleCredentialResponse = handleCredentialResponse;

		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.onload = () => {
			window.google.accounts.id.initialize({
				client_id:
					'16793657163-olf2g6hn5u1dkvtsu86r9tm3tu46rmj8.apps.googleusercontent.com',
				callback: handleCredentialResponse,
				itp_support: true,
			});
			window.google.accounts.id.renderButton(
				document.getElementById('googleSignInButton'),
				{
					theme: 'outline',
					size: 'large',
				}
			);
		};
		script.async = true;
		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	const decodeJwtResponse = (token: string) => {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
		return JSON.parse(jsonPayload);
	};

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
				sx={{
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: secondary,
						},
						'&.Mui-focused fieldset': {
							borderColor: primary,
						},
						'&:hover fieldset': {
							borderColor: secondary,
						},
						'& input': {
							color: secondary,
						},
					},
					'& .MuiInputLabel-root': {
						color: primary,
						'&.Mui-focused': {
							color: `${primary} !important`,
						},
					},
				}}
			/>
			<TextField
				id='loginPassword'
				label='Password'
				type='password'
				variant='outlined'
				fullWidth
				sx={{
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: secondary,
						},
						'&.Mui-focused fieldset': {
							borderColor: primary,
						},
						'&:hover fieldset': {
							borderColor: secondary,
						},
						'& input': {
							color: secondary,
						},
					},
					'& .MuiInputLabel-root': {
						color: primary,
						'&.Mui-focused': {
							color: `${primary} !important`,
						},
					},
				}}
			/>
			<Stack
				direction='row'
				spacing={2}
			>
				<Button
					style={{ backgroundColor: primary }}
					variant='contained'
					endIcon={<LogoutIcon />}
				>
					Login
				</Button>
				<Button
					style={{
						backgroundColor: secondary,
						color: '#231709',
						border: 'none',
					}}
					variant='outlined'
					startIcon={<LoginIcon />}
				>
					Logout
				</Button>
			</Stack>
			<Box
				id='googleSignInButton'
				sx={{ marginTop: 2 }}
			/>
			{user && (
				<Button
					onClick={() => {
						window.google.accounts.id.revoke(user.sub, () => {
							setUser(null);
						});
					}}
					startIcon={<GoogleIcon />}
				>
					Sign Out
				</Button>
			)}
		</Stack>
	);
};

export default Login;
