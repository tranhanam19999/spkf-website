import styles from './chat.module.css'

export const ChatDetail = (props) => {
    const { text, shouldAlignRight, key } = props

    return (
        <div className={styles.chatDetailWrapper} key={key}>
            <div className={`${styles.chatDetailContainer} ${shouldAlignRight ? styles.alignRight : styles.alignLeft}`}>
                <span className={shouldAlignRight ? styles.senderTextDetail : styles.textDetail}>
                    {text}
                </span>
            </div>
        </div>
    )
}
