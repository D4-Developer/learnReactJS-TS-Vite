import './App.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';

export default function App(): React.ReactNode {
	return (
		<>
			<Navbar />
			<Hero />
			<Card />
		</>
	);
}