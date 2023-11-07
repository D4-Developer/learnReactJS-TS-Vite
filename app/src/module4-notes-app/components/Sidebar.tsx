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
	newNote: () => void,
	deleteNote: (noteId: string) => void
}): React.ReactNode {
	const noteElements = props.notes.map((note, _index) => (
		<div key={note.id}>
			<div

				className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
					}`}
				onClick={() => props.setCurrentNoteId(note.id)}
			>
				<h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
				<button
					className="delete-btn"
					onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.deleteNote(note.id)
					}
				>
					<i className="gg-trash trash-icon"></i>
				</button>
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
