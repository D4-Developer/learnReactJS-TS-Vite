import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid"

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Create a function `holdDice` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 * 
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 * 
 */

export default function App(): React.ReactNode {

	function allNewDice(): { id: string, value: number, isHeld: boolean }[] {
		const dieValues: { id: string, value: number, isHeld: boolean }[] = [];
		for (let index = 0; index < 10; index++) {
			const diceObj = {
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid()
			}
			dieValues.push(diceObj);
		}

		return dieValues;
	}

	const [dice, setDice]: [
		{ id: string, value: number, isHeld: boolean }[],
		Dispatch<SetStateAction<{ id: string, value: number, isHeld: boolean }[]>>] = React.useState(() => allNewDice());

	console.log(dice);

	function rolledDice(): void {
		setDice(allNewDice());
	}

	function holdToggle(diceNumber: number): void {
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
							key={die.id}
							value={die.value}
							index={idx}
							isHeld={die.isHeld}
							holdToggle={() => holdToggle(idx)}
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