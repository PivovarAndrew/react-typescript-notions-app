import { Note, NoteTag, Tag } from 'constants/types'
import { Dispatch, SetStateAction } from 'react';

export default interface TagInterface {
    tag: Tag;
    tags: Tag[];
    notes: Note[];
    noteTags: NoteTag[];
    removeTag: (name: string) => void;
    filterByTag: (name: string) => void;
    handleTagRemove: (id: number) => void;
}
