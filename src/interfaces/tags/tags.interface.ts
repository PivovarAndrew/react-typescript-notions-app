import { Note, Tag, NoteTag } from 'constants/types'
import { Dispatch, SetStateAction } from 'react';

export default interface TagsInterface {
    tags: Tag[];
    notes: Note[];
    noteTags: NoteTag[];
    removeTag: (name: string) => void;
    filterByTag: (name: string) => void;
    handleOnClickAll: () => void;
    handleTagCreate: (tag: Tag) => void;
    handleTagRemove: (id: number) => void;
}
