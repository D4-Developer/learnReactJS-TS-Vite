import React, { Dispatch, SetStateAction } from "react"
import Split from "react-split"
import { onSnapshot, QuerySnapshot, DocumentData, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"

import './App.css'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { db, notesCollection } from "./firebase"


export default function App(): React.ReactNode {
    const [notes, setNotes]: [{
        id: string;
        body: string;
        createdAt: number;
        updatedAt: number;
    }[] | [], Dispatch<SetStateAction<{
        id: string;
        body: string;
        createdAt: number;
        updatedAt: number;
    }[]>> | Dispatch<SetStateAction<[]>>] = React.useState([]);

    const [currentNoteId, setCurrentNoteId]: [string, Dispatch<SetStateAction<string>>] = React.useState("");

    console.log(currentNoteId);

    React.useEffect(() => {
        const unSubscribe = onSnapshot(
            notesCollection,
            function (snapshot: QuerySnapshot<DocumentData, DocumentData>) {
                // Sync up our local notes array with the snapshot data
                const notesArr = snapshot.docs.map((doc) => {
                    const { body, createdAt, updatedAt } = doc.data();
                    return { body, createdAt, updatedAt, id: doc.id };
                });
                notesArr.sort((note1, note2) => {
                    return (note2.updatedAt - note1.updatedAt);
                });
                setNotes(notesArr);
            }
        );
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
            body: string,
            createdAt: number,
            updatedAt: number
        } = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        const newNoteRef = await addDoc(notesCollection, newNote);
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text: string): Promise<void> {
        const docRef = doc(db, "notes", currentNoteId);
        // await setDoc(docRef, { body: text, updatedAt: Date.now() }); // overwriting the whole document data.
        await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });  // merging data with the document data.
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
