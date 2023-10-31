import heroImg from '../assets/photo-grid.png'

export default function Hero() {
	return (
		<section className="hero">
			<img className="hero-img" src={heroImg} />
      <h1 className="hero-header">Online Experiences</h1>
      <span className="hero-text">Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.</span>
		</section>
	);
}