import './App.css'

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import experiences from './data/experiences-data';

/*
	Challenge: pass props as object and fix that in component definition!!
*/


export default function App(): React.ReactNode {
	const cards = experiences.map((item) => {
		return (
			<Card
				key={item.id}
				item={item}
			/>
		);
	});

	return (
		<>
			<Navbar />
			<Hero />
			<section className="cards-list">
				{cards}
			</section>
		</>
	);
}