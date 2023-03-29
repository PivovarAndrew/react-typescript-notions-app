import { ChangeEvent, KeyboardEvent, useState, useRef } from 'react';
import styles from './new_note.module.scss';
import { Note } from 'constants/types'
import NewNoteInterface from 'interfaces/notes/new_note.interface'

const NewNote = (props: NewNoteInterface) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [formState, setFormState] = useState('')

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormState(event.target.value)
  }

  function handleInputEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const newNote: Note = {
        id: props.notes.length + 1,
        text: formState,
        dateOfLastChange: new Date()
      }

      props.handleNoteCreate(newNote)

      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
        setFormState('')
      }
    }
  }

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        placeholder='Enter new note'
        onChange={event => handleInputChange(event)}
        onKeyDown={event => handleInputEnter(event)}
      />
    </div>
  )
}

export default NewNote
