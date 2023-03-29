import { Note, NoteTag, Tag } from "constants/types";

export default interface TagPreviewInterface {
    name: string;
    noteTags: NoteTag[];
    tags: Tag[];
    handleNoteTagCreate: (tag: Tag, note: Note) => void;
}
