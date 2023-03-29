import { FormEvent, useMemo, useState } from 'react';
import axios from 'axios';

import NewNote from 'components/notes/new';
import Notes from 'components/notes';
import { Note, NoteTag, Tag } from 'constants/types';
import styles from './home.module.scss';
import { DB_HOST_ADDRESS } from 'constants/db';
import Tags from 'components/tags';

const Home = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [noteTags, setNoteTags] = useState<NoteTag[]>([])
    const [allNotes, setAllNotes] = useState<Note[]>([])

    useMemo(() => {
        getNotes()
        getTags()
        getNoteTags()
    }, []);

    function getNotes() {
        axios.get(`${DB_HOST_ADDRESS}/notes`)
            .then(response => {
                setNotes(response.data);
                setAllNotes(response.data);
            }).catch(error => {
                console.error(error)
            });
    }

    function getTags() {
        axios.get(`${DB_HOST_ADDRESS}/tags`)
            .then(response => {
                setTags(response.data);
            }).catch(error => {
                console.error(error)
            });
    }

    function getNoteTags() {
        axios.get(`${DB_HOST_ADDRESS}/note_tags`)
            .then(response => {
                setNoteTags(response.data);
            }).catch(error => {
                console.error(error)
            });
    }


    function handleNoteCreate(note: Note) {
        const newNotesState: Note[] = [...notes]
        newNotesState.push(note)
        setNotes(newNotesState)

        axios.post(`${DB_HOST_ADDRESS}/notes`, note)
            .catch(error => {
                console.error(error)
            });
    }

    async function handleNoteUpdate(event: FormEvent<HTMLSpanElement>, id: number) {
        const newNotesState: Note[] = [...notes]
        const updatedNote = newNotesState.find((note: Note) => note.id === id)!
        updatedNote.text = event.currentTarget.innerText
        setNotes(newNotesState)

        await axios.patch(`${DB_HOST_ADDRESS}/notes/${id}`,
            {
                text: event.currentTarget.innerText,
                dateOfLastChange: new Date()
            })
            .catch(error => {
                console.error(error)
            });
    }

    function handleNoteRemove(id: number) {
        const newNotesState: Note[] = notes.filter((note: Note) => note.id !== id)
        setNotes(newNotesState)

        axios.delete(`${DB_HOST_ADDRESS}/notes/${id}`)
            .catch(error => {
                console.error(error)
            });
    }

    function handleTagRemove(id: number) {
        const newTagsState: Tag[] = tags.filter((tag: Tag) => tag.id !== id)
        setTags(newTagsState)

        axios.delete(`${DB_HOST_ADDRESS}/tags/${id}`)
            .catch(error => {
                console.error(error)
            });
    }

    function handleTagCreate(tag: Tag) {
        const newTagsState: Tag[] = [...tags]
        newTagsState.push(tag)
        setTags(newTagsState)

        axios.post(`${DB_HOST_ADDRESS}/tags`, tag)
            .catch(error => {
                console.error(error)
            });
    }

    function handleNoteTagCreate(tag: Tag, note: Note) {
        const newNoteTagsState: NoteTag[] = [...noteTags]
        const newNoteTag = {
            id: noteTags.length + 1,
            note_id: note.id,
            tag_name: tag.name
        }
        newNoteTagsState.push(newNoteTag)
        setNoteTags(newNoteTagsState)

        axios.post(`${DB_HOST_ADDRESS}/note_tags`, newNoteTag)
            .catch(error => {
                console.error(error)
            });
    }

    function handleNoteTagRemove(id: number) {
        const newNoteTagsState: NoteTag[] = noteTags.filter((noteTag: NoteTag) => noteTag.id !== id)
        setNoteTags(newNoteTagsState)

        axios.delete(`${DB_HOST_ADDRESS}/note_tags/${id}`)
            .catch(error => {
                console.error(error)
            });
    }

    function removeTag(name: string) {
        (noteTags.filter(noteTag => noteTag.tag_name === name)).forEach(noteTag => {
            handleNoteTagRemove(noteTag.id)
        })
        handleTagRemove(tags.find(tag => tag.name === name)!.id)
        setNoteTags(noteTags.filter(noteTag => noteTag.tag_name !== name))
        if (noteTags.find(noteTag => noteTag.tag_name !== name)) {
            setTags(tags.filter(tag => tag.name !== name))
        }
    }

    function filterByTag(name: string) {
        const noteTag = noteTags.find(noteTag => noteTag.tag_name === name)
        noteTag && setNotes(allNotes.filter(note => note.id === noteTag.note_id))
    }

    function showAllNotes() {
        setNotes(allNotes)
    }

    return (
        <div className={styles.container}>
            <NewNote
                notes={notes}
                handleNoteCreate={handleNoteCreate}
            />

            <Tags
                tags={tags}
                notes={notes}
                noteTags={noteTags}
                removeTag={removeTag}
                filterByTag={filterByTag}
                handleOnClickAll={showAllNotes}
                handleTagRemove={handleTagRemove}
                handleTagCreate={handleTagCreate}
            />

            <Notes
                notes={notes}
                tags={tags}
                noteTags={noteTags}
                handleTagCreate={handleTagCreate}
                handleNoteUpdate={handleNoteUpdate}
                handleNoteRemove={handleNoteRemove}
                handleNoteTagCreate={handleNoteTagCreate}
            />
        </div>
    )
}

export default Home;
