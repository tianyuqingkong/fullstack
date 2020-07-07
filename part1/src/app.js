import React, {useState, useEffect} from 'react'
import noteService from './services/notes'
import Note from './components/note'
import Notification from './components/notification'

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] =  useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened..')

    const hook = () =>  {
        noteService
          .getAll()
          .then(response => {
            setNotes(response)
          }) 
    }
    useEffect(hook, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
          }
          noteService
          .create(noteObject)
          .then(response => {
            setNotes(notes.concat(response))
            setNewNote('')
          })

    }

    
    const toggleImportance = (id) => {
        const note = notes.find(note => note.id === id)
        const changedNote = {...note, important: !note.important}
        
        noteService
        .update(id, changedNote)
        .then(response => {
          setNotes(notes.map(note => note.id !== id ? note : response))
        })
        .catch(error => {
            setErrorMessage(
              `Note '${note.content}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNotes(notes.filter(n => n.id !== id))
          })
    }

    const handleNoteChange  = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


    return <div>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
            </button>
        </div>
        <ul>
            {notesToShow.map(note => 
                <Note 
                    key={note.id} 
                    note={note}
                    toggleImportance={() => {toggleImportance(note.id)}}
                />

            )}
        </ul>
        <form onSubmit={addNote}>
            <input
                onChange={handleNoteChange} 
                value={newNote}
            />
            <button type='submit'>save</button>
        </form>
    </div>
}
export default App