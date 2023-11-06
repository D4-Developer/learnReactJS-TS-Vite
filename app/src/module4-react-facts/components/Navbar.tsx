import { MouseEventHandler } from "react";

export default function Navbar(props: { darkMode: boolean, toggleDarkMode: MouseEventHandler<HTMLDivElement> }) {
	return (
		<nav className={props.darkMode ? "nav dark" : "nav"}>
			<div className="nav-left">
				<img className="nav-logo" src="./src/module1/assets/react.svg" />
				<h3 className="nav-logo-text" >ReactFacts</h3>
			</div>
			<div className="nav-right">
				<div className="toggler">
					<p className="toggler--light">Light</p>
					<div
						className="toggler--slider"
						onClick={props.toggleDarkMode}
					>
						<div className="toggler--slider--circle"></div>
					</div>
					<p className="toggler--dark">Dark</p>
				</div>
			</div>
		</nav>
	)
}