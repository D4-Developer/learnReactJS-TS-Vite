import React, { Dispatch, SetStateAction } from "react"
import Split from "react-split"
import { nanoid } from "nanoid"
import { onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore"

import './App.css'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { notesCollection } from "./firebase"
import { unsubscribe } from "diagnostics_channel"
import { unescape } from "querystring"


export default function App(): React.ReactNode {
    const [notes, setNotes]: [{
        id: string;
        body: string
    }[], Dispatch<SetStateAction<{
        id: string;
        body: string
    }[]>>] = React.useState(() => JSON.parse(localStorage.getItem("notes")!) || [{ id: "0", body: "first note" }]);

    React.useEffect(() => {
        const unSubscribe = onSnapshot(notesCollection, function (snapshot: QuerySnapshot<DocumentData, DocumentData>) {
            // Sync up our local notes array with the snapshot data

            console.log("THINGS ARE CHANGING!");
        })

        return unSubscribe;
    }, [notes])

    const [currentNoteId, setCurrentNoteId]: [string, Dispatch<SetStateAction<string>>] = React.useState(
        (notes[0]?.id) || ""
    )

    const currentNote: {
        id: string,
        body: string
    } = notes.find(note => note.id === currentNoteId) || notes[0]

    function createNewNote(): void {
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

    function updateNote(text: string): void {
        setNotes(oldNotes => {
            const index = notes.findIndex(note => {
                return note.id === currentNoteId
            });

            const newNote = {
                id: currentNote.id,
                body: text
            }

            if (index == 0) {
                return [newNote, ...oldNotes.slice(index + 1)];
            } else {
                return [newNote, ...oldNotes.slice(0, index), ...oldNotes.slice(index + 1)];
            }
        });
    }

    function deleteNote(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, noteId: string): void {
        event.stopPropagation();
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));

        // 2nd approach is:

        // setNotes((oldNotes) => {
        //     const delIndex = oldNotes.findIndex((note) =>
        //         note.id === noteId
        //     );
        //     return oldNotes.toSpliced(delIndex, 1);
        // });
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
                            deleteNote={deleteNote}
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
