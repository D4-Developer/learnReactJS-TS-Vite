import React, { Dispatch, SetStateAction } from "react";

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 * 
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
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

	function rolledDice(): void {
		setDice(allNewDice());
	}

	return (
		<main>
			<div className="grid">
				{dice.map((die, idx) => <Die key={idx} value={die} />)}
			</div>
			<button
				className="roll-btn"
				onClick={rolledDice}
			>
				Roll
			</button>
		</main>
	);
}