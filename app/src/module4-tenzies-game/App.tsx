import React, { Dispatch, SetStateAction } from "react";

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */

export default function App(): React.ReactNode {

	function allNewDice(): number[] {
		const dieValues: number[] = [];
		for (let index = 0; index < 10; index++) {
			dieValues.push(Math.ceil(Math.random() * 6));
		}

		return dieValues;
	}

	const [dice, setDice]: [number[], Dispatch<SetStateAction<number[]>>] = React.useState(() => allNewDice());

	console.log(dice);

	return (
		<main>
			<div className="container">
				<div className="grid">
					{dice.map((die, idx) => <Die key={idx} value={die} />)}
				</div>
			</div>
		</main>
	);
}