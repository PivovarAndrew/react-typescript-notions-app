import styles from './notes.module.scss';
import Note from './note'
import NotesInterface from 'interfaces/notes/notes.interface'

const Notes = (props: NotesInterface) => {

  return (
    <div className={styles.container}>
      <ul>
        {props.notes?.map((note) => (
          <li key={note.id}>
            <Note
              note={note}
              tags={props.tags}
              noteTags={props.noteTags.filter(noteTag => noteTag.note_id == note.id)}
              handleTagCreate={props.handleTagCreate}
              handleNoteUpdate={props.handleNoteUpdate}
              handleNoteRemove={props.handleNoteRemove}
              handleNoteTagCreate={props.handleNoteTagCreate}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes;
