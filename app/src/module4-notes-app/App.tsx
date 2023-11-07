import React, { Dispatch, SetStateAction } from "react"
import Split from "react-split"
import { nanoid } from "nanoid"
import { onSnapshot, QuerySnapshot, DocumentData, addDoc, doc, deleteDoc } from "firebase/firestore"

import './App.css'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { db, notesCollection } from "./firebase"


export default function App(): React.ReactNode {
    const [notes, setNotes]: [{
        id: string;
        body: string
    }[] | [], Dispatch<SetStateAction<{
        id: string;
        body: string
    }[]>> | Dispatch<SetStateAction<[]>>] = React.useState([]);

    const [currentNoteId, setCurrentNoteId]: [string, Dispatch<SetStateAction<string>>] = React.useState("");

    console.log(currentNoteId);

    React.useEffect(() => {
        const unSubscribe = onSnapshot(notesCollection, function (snapshot: QuerySnapshot<DocumentData, DocumentData>) {
            // Sync up our local notes array with the snapshot data

            const notesArr = snapshot.docs.map((doc) => ({
                body: doc.data().body,
                id: doc.id
            }));

            console.log(notesArr);


            setNotes(notesArr);
        })

        return unSubscribe;
    }, []);

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id);
        }
    }, [notes]);


    const currentNote: {
        id: string,
        body: string
    } = notes.find(note => note.id === currentNoteId) || notes[0]

    async function createNewNote(): Promise<void> {
        const newNote: {
            id?: string,
            body: string
        } = {
            body: "# Type your markdown note's title here"
        }

        const newNoteRef = await addDoc(notesCollection, newNote);

        // setNotes((prevNotes) => [newNote, ...prevNotes])
        setCurrentNoteId(newNoteRef.id)

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

    async function deleteNote(noteId: string): Promise<void> {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef);
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
                        <Editor
                            currentNote={currentNote}
                            updateNote={updateNote}
                        />
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
