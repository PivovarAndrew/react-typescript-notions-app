import { useEffect, useMemo } from 'react';
import styles from './tag_preview.module.scss';
import TagPreviewInterface from 'interfaces/tags/tag_preview.interface'

const TagPreview = (props: TagPreviewInterface) => {
    return (
        <span className={styles.container} suppressContentEditableWarning={true}
            contentEditable="false">
            <div className={styles.tag}>
                {props.name}
            </div>
        </span>
    )
}

export default TagPreview;
