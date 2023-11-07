import "./App.css"
import Die from "./components/Die";

export default function App(): React.ReactNode {

	return (
		<main>
			<div className="container">
				<div className="grid">
					<Die value={1} />
					<Die value={2} />
					<Die value={3} />
					<Die value={4} />
					<Die value={5} />
					<Die value={6} />
					<Die value={7} />
					<Die value={8} />
					<Die value={9} />
					<Die value={10} />
				</div>
			</div>
		</main>
	);
}