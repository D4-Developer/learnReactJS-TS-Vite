import './App.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App(): React.ReactNode {
	return (
		<>
			<Navbar />
			<Hero />
		</>
	);
}