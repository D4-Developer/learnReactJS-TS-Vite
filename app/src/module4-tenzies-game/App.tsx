import "./App.css"
import Die from "./components/Die";

export default function App(): React.ReactNode {

	const dieValues: number[] = [];

	function allNewDice() {
		for (let index = 0; index < 10; index++) {
			dieValues.push(Math.ceil(Math.random() * 6));
		}
	}

	allNewDice();

	console.log(dieValues);


	return (
		<main>
			<div className="container">
				<div className="grid">
					<Die value={dieValues[0]} />
					<Die value={dieValues[1]} />
					<Die value={dieValues[2]} />
					<Die value={dieValues[3]} />
					<Die value={dieValues[4]} />
					<Die value={dieValues[5]} />
					<Die value={dieValues[6]} />
					<Die value={dieValues[7]} />
					<Die value={dieValues[8]} />
					<Die value={dieValues[9]} />
				</div>
			</div>
		</main>
	);
}