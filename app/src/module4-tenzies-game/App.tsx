import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid"

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge:
 * 1. Add new state called `tenzies`, default to false. It
 *    represents whether the user has won the game yet or not.
 * 2. Add an effect that runs every time the `dice` state array 
 *    changes. For now, just console.log("Dice state changed").
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

	const [tenzies, setTenzies]: [boolean, Dispatch<SetStateAction<boolean>>] = React.useState(false);

	React.useEffect(() => {
		console.log("Dice state changed");
	}, [dice]);

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