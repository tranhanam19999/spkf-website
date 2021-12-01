import styles from './chat.module.css'
import { ChatContainer } from '../../containers/chat'

const ChatIndex = () => {
    return (
        <div className={styles.chatContainerWrapper}>
            <ChatContainer />
        </div>
    )
}

export default ChatIndex
