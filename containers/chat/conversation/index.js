import { ChatDetail } from "components/chat/detail";
import styles from './conversation.module.css'

const mockChatList = [
    {
        sender: 'nam',
        receiver: 'cam',
        text: 'abc123',
    },
    {
        sender: 'cam',
        receiver: 'nam',
        text: '231',
    },
    {
        sender: 'nam',
        receiver: 'cam',
        text: 'yoo',
    },
    {
        sender: 'cam',
        receiver: 'nam',
        text: 'xzc',
    },
];

export const ConversationList = (props) => {
    const { messages, user } = props

    return (
        <div className={styles.chatConversationWrapper}>
            {mockChatList.map((message, index) => (
                    <ChatDetail
                        key={index}
                        text={message.text}
                        shouldAlignRight={message.sender === user.username}
                    />
                ))}
        </div>
    );
};
