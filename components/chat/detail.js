import styles from './chat.module.css'

export const ChatDetail = (props) => {
    const { text, shouldAlignLeft } = props

    return (
        <div className={styles.chatDetailWrapper}>
            <div className={`${styles.chatDetailContainer} ${shouldAlignLeft ? styles.alignLeft : styles.alignRight}`}>
                <span className={styles.textDetail}>
                    {text}
                </span>
            </div>
        </div>
    )
}
