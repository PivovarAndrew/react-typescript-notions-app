export type Note = {
    id: number,
    text: string,
    dateOfLastChange: Date
}

export type Tag = {
    id: number
    name: string
}

export type NoteTag = {
    id: number
    note_id: number;
    tag_name: string;
}
