export default function Navbar(props: { darkMode: boolean }) {
    return (
        <nav className={props.darkMode ? "nav dark" : "nav"}>
            <div className="nav-left">
                <img className="nav-logo" src="./src/module1/assets/react.svg" />
                <h3 className="nav-logo-text" >ReactFacts</h3>
            </div>
            <div className="nav-right">
                <h4>React Course - Project 1</h4>
            </div>
        </nav>
    )
}