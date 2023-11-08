import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid"

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
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
		console.log(dice);

		const firstVal = dice[0].value;
		const firstHeld = dice[0].isHeld;
		let isPrevSame = true;

		if (firstHeld) {
			for (let index = 1; index < dice.length; index++) {
				if (isPrevSame && dice[index].isHeld && dice[index].value === firstVal) {
					continue;
				} else {
					isPrevSame = false;
					break;
				}
			}
		}

		if (firstHeld && isPrevSame) {
			console.log("You Won!!!!");
			setTenzies(true);
		}
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