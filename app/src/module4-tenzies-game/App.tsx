import React, { Dispatch, SetStateAction } from "react";

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Add conditional styling to the Die component
 * so that if it's held (isHeld === true), its background color
 * changes to a light green (#59E391)
 * 
 * Remember: currently the Die component has no way of knowing
 * if it's "held" or not.
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

	function heldToggle(diceNumber: number): void {
		setDice((oldDices) => {
			oldDices[diceNumber].isHeld = !oldDices[diceNumber].isHeld;
			return [...oldDices];
		});
	}

	return (
		<main>
			<div className="grid">
				{
					dice.map((die, idx) => (
						<Die
							key={idx}
							value={die.value}
							index={idx}
							isHeld={die.isHeld}
							heldToggle={heldToggle}
						/>)
					)
				}
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