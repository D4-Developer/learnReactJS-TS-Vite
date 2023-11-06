import React, { Dispatch, SetStateAction } from "react"
import Split from "react-split"
import { nanoid } from "nanoid"

import './App.css'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

/**
 * Challenge: Try to figure out a way to display only the 
 * first line of note.body as the note summary in the
 * sidebar.
 */

export default function App(): React.ReactNode {
    const [notes, setNotes]: [{
        id: string;
        body: string
    }[], Dispatch<SetStateAction<{
        id: string;
        body: string
    }[]>>] = React.useState(() => JSON.parse(localStorage.getItem("notes")!) || [{ id: "0", body: "first note" }]);

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const [currentNoteId, setCurrentNoteId]: [string, Dispatch<SetStateAction<string>>] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    const currentNote: {
        id: string,
        body: string
    } = notes.find(note => note.id === currentNoteId) || notes[0]

    function createNewNote() {
        const newNote: {
            id: string,
            body: string
        } = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes((prevNotes) => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text: string) {
        console.log(text);

        setNotes((oldNotes) => oldNotes.map((oldNote) => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}
