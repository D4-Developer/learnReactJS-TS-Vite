import airBnbLogo from '../assets/airbnb-logo.png'

export default function Navbar() {
	return (
		<nav className="nav">
			<img className="nav-logo" src={airBnbLogo} />
		</nav>
	);
}