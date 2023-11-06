import React from "react"

export default function Sidebar(props: {
	notes: {
		id: string,
		body: string
	}[],
	currentNote: {
		id: string;
		body: string;
	},
	setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>,
	newNote: () => void
}): React.ReactNode {
	const noteElements = props.notes.map((note, index) => (
		<div key={note.id}>
			<div

				className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
					}`}
				onClick={() => props.setCurrentNoteId(note.id)}
			>
				<h4 className="text-snippet">Note {index + 1}</h4>
			</div>
		</div>
	))

	return (
		<section className="pane sidebar">
			<div className="sidebar--header">
				<h3>Notes</h3>
				<button className="new-note" onClick={props.newNote}>+</button>
			</div>
			{noteElements}
		</section>
	)
}
