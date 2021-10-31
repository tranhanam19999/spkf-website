import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@material-ui/core';
import styles from './message.module.css'

export const MessageField = (props) => {
    const { message, setMessage, sendMessage } = props

    const handleSendMessage = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            sendMessage();
            setMessage('');
        }
    }

    return (
        <div className={styles.chatActionWrapper}>
            <div className={styles.chatActionContainer}>
                <TextField
                    variant="outlined"
                    className={styles.messageContainer}
                    fullWidth
                    placeholder="Soạn tin nhắn"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleSendMessage}
                />
                <div className={styles.sendMessageWrapper} onClick={(e) => handleSendMessage(e)}>
                    <FontAwesomeIcon icon={faPaperPlane} color="black" />
                </div>
            </div>
        </div>
    );
};
