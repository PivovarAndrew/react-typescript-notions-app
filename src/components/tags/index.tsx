import { FormEvent, useMemo, useRef, useState } from 'react';
import styles from './tags.module.scss';
import TagsInterface from 'interfaces/tags/tags.interface'
import TagItem from './tag';

const Tags = (props: TagsInterface) => {
    return (
        <div className={styles.container}>
            <button onClick={() => props.handleOnClickAll()} className={styles.all}>All</button>

            <ul>
                {props.tags?.map((tag) => (
                    <li key={tag.id}>
                        <TagItem
                            tag={tag}
                            tags={props.tags}
                            notes={props.notes}
                            removeTag={props.removeTag}
                            filterByTag={props.filterByTag}
                            noteTags={props.noteTags}
                            handleTagRemove={props.handleTagRemove}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tags;
