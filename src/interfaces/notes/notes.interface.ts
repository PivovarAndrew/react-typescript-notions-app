import { FormEvent } from 'react';
import { Note, NoteTag, Tag } from 'constants/types'

export default interface NotesInterface {
    handleNoteUpdate: (event: FormEvent<HTMLSpanElement>, id: number) => void;
    handleNoteRemove: (id: number) => void;
    handleNoteTagCreate: (tag: Tag, note: Note) => void;
    handleTagCreate: (tag: Tag) => void;
    notes: Note[];
    tags: Tag[];
    noteTags: NoteTag[];
}
