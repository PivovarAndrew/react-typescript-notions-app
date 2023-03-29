import { Note } from "constants/types";

export default interface NewNoteInterface {
    notes: Note[];
    handleNoteCreate: (note: Note) => void;
}
