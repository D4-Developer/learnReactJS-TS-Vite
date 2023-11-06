import React from 'react';

import './App.css'
import Navbar from "./components/Navbar"
import Main from "./components/Main"

export default function App() {
	const [darkModeVal, setDarkModeVal] = React.useState(true);

	function handleClick(): void {
		console.log('clicked');
		setDarkModeVal((oldVal) => !oldVal);
	}

	return (
		<div className={darkModeVal ? "container dark" : "container"} >
			<Navbar darkMode={darkModeVal} toggleDarkMode={handleClick} />
			<Main darkMode={darkModeVal} />
		</div>
	)
}