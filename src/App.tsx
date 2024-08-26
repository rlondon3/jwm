import React from 'react';
import './App.css';
import Login from './components/Login';

interface LoginProps {
	handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function App() {
	const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// Handle the login logic here
		console.log('Login button clicked');
	};

	return (
		<>
			<Login handleLogin={handleLogin} />
		</>
	);
}

export default App;
