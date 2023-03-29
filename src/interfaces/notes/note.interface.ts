import { FormEvent } from 'react';
import { Note, NoteTag, Tag } from 'constants/types'

export default interface NoteInterface {
  handleNoteUpdate: (event: FormEvent<HTMLSpanElement>, id: number) => void;
  handleNoteRemove: (id: number) => void;
  handleNoteTagCreate: (tag: Tag, note: Note) => void;
  handleTagCreate: (tag: Tag) => void;
  note: Note;
  tags: Tag[];
  noteTags: NoteTag[];
}
