import React, { Dispatch, SetStateAction } from "react";

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 * 
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

export default function App(): React.ReactNode {

	function allNewDice(): { value: number, isHeld: boolean }[] {
		const dieValues: { value: number, isHeld: boolean }[] = [];
		for (let index = 0; index < 10; index++) {
			const diceObj = {
				value: Math.ceil(Math.random() * 6),
				isHeld: false
			}
			dieValues.push(diceObj);
		}

		return dieValues;
	}

	const [dice, setDice]: [
		{ value: number, isHeld: boolean }[],
		Dispatch<SetStateAction<{ value: number, isHeld: boolean }[]>>] = React.useState(() => allNewDice());

	console.log(dice);

	function rolledDice(): void {
		setDice(allNewDice());
	}

	return (
		<main>
			<div className="grid">
				{dice.map((die, idx) => <Die key={idx} value={die.value} />)}
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