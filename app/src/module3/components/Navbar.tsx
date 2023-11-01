export default function Navbar(): React.ReactNode {
  return (
    <nav className="nav">
      <div className="identity">
        <img className="identity-logo" src="./src/module3/assets/troll-face.png" />
        <div className="identity-text">Meme Generator</div>
      </div>
      <div className="nav-slogan">React Courser - Project 3</div>
    </nav>
  );
}