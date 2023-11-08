import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid"

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Update the `rollDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 * 
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When creating new dice, remember to use
 * `id: nanoid()` so any new dice have an `id` as well.
 */

export default function App(): React.ReactNode {

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid()
		}
	}

	function allNewDice(): { id: string, value: number, isHeld: boolean }[] {
		const dieValues: { id: string, value: number, isHeld: boolean }[] = [];
		for (let index = 0; index < 10; index++) {
			const diceObj = generateNewDie();
			dieValues.push(diceObj);
		}

		return dieValues;
	}

	const [dice, setDice]: [
		{ id: string, value: number, isHeld: boolean }[],
		Dispatch<SetStateAction<{ id: string, value: number, isHeld: boolean }[]>>] = React.useState(() => allNewDice());

	console.log(dice);

	function rolledDice(): void {
		setDice((oldDices) => {
			return oldDices.map((dice) => {
				return dice.isHeld ? dice : generateNewDie();
			});
		});
	}

	function holdToggle(diceNumber: number): void {
		setDice((oldDices) => {
			oldDices[diceNumber].isHeld = !oldDices[diceNumber].isHeld;
			return [...oldDices];
		});
	}

	return (
		<main>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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