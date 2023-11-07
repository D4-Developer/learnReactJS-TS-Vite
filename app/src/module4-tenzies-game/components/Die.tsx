export default function Die(props: { value: number }): React.ReactNode {
	return (
		<div className={`die-face die-${props.value}`}>
			<h2>{props.value}</h2>
		</div>
	);
}