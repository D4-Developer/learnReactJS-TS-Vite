import './App.css'

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import experiences from './data/experiences-data';

export default function App(): React.ReactNode {
	const cards = experiences.map((item) => {
		return (
			<Card
				key={item.id}
				img={item.coverImg}
				rating={item.stats.rating}
				reviewCount={item.stats.reviewCount}
				location={item.location}
				title={item.title}
				price={item.price}
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