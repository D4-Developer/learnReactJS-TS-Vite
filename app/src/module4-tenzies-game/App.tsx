import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

import "./App.css"
import Die from "./components/Die";

/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 * 
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
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
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
			return;
		}

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
			{tenzies && <Confetti />}
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
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
}