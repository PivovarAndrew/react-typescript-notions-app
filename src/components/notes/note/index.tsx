import { FormEvent, useRef } from 'react';
import styles from './note.module.scss';
import NoteInterface from 'interfaces/notes/note.interface'
import { dateToString } from 'services/util/DateUtil';
import { TAG_SYMBOL } from 'constants/tags';
import ReactDOMServer from 'react-dom/server'
import TagPreview from './tag_preview';

const Note = (props: NoteInterface) => {
    const inputRef = useRef(props.note.text)

    /*props.noteTags.forEach(noteTag => {
        inputRef.current = inputRef.current.replace(noteTag.tag_name, renderTag(noteTag.tag_name))
    })*/

    function renderTag(name: string) {
        return ReactDOMServer.renderToString(<TagPreview
            name={name}
            noteTags={props.noteTags}
            tags={props.tags}
            handleNoteTagCreate={props.handleNoteTagCreate}
        />)
    }

    function insertNewTag(text: string, name: string) {
        const tag = { id: props.tags.length + 1, name: name.trim() }
        inputRef.current = text.replace(name, renderTag(name))
        !props.tags.find(foundTag => foundTag.name === tag.name) && props.handleTagCreate(tag)
        props.handleNoteTagCreate(tag, props.note)
    }

    function saveChanges(event: FormEvent<HTMLSpanElement>) {
        const text = event.currentTarget.innerText
        if (text.length) {
            const nonConvertedTag = text.split(' ').filter(word => word.startsWith(TAG_SYMBOL))[0]
            if (nonConvertedTag && nonConvertedTag.length > 3 &&
                /\s/g.test(text.at(text.indexOf(nonConvertedTag) + nonConvertedTag.length - 1)!)) {
                insertNewTag(text, nonConvertedTag)
            }
            props.handleNoteUpdate(event, props.note.id)
        } else {
            props.handleNoteRemove(props.note.id)
        }
    }

    return (
        <div className={styles.container}>
            <span contentEditable
                suppressContentEditableWarning={true}
                onInput={event => saveChanges(event)}
                dangerouslySetInnerHTML={{ __html: inputRef.current }} />

            <div className={styles.dateOfLastChange}
                dangerouslySetInnerHTML={{
                    __html: props.note.dateOfLastChange &&
                        dateToString(new Date(props.note.dateOfLastChange))
                }} />

            <div className={styles.remove} onClick={() => props.handleNoteRemove(props.note.id)}>
                ⨯
            </div>
        </div>
    )
}

export default Note;
