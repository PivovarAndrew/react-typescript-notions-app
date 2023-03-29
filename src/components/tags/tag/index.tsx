import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './tag.module.scss';
import TagInterface from 'interfaces/tags/tag.interface'

const TagItem = (props: TagInterface) => {
    return (
        <div className={styles.container}>
            <button className={styles.tag} onClick={() => props.filterByTag(props.tag.name)}>{props.tag.name}</button>

            <button type="submit" onClick={() => props.removeTag(props.tag.name)} className={styles.remove} contentEditable="false" suppressContentEditableWarning={true}>
                x
            </button>
        </div>
    )
}

export default TagItem;
