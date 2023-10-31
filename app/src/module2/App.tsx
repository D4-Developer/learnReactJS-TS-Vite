import './App.css'

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import experiences from './data/experiences-data';

/*
	Challenge:

	- import the array of data from <dataFileName>.js
	- map over the array to create <Card /> components
	- display the array of card components under the navbar
		(in place of the current <Card /> component)

	Note: We haven't styled the group of components yet, so they'll
	still be block elements, stacked vertically. We'll add styling later.
*/

export default function App(): React.ReactNode {
	const cards = experiences.map((item) => {
		return (
			<Card
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
			{cards}
		</>
	);
}