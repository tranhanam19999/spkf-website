import { ChatDetail } from "components/chat/detail";
import styles from './conversation.module.css'

const mockChatList = [
    {
        sender: 'a',
        receiver: 'b',
        text: 'abc123',
    },
    {
        sender: 'b',
        receiver: 'a',
        text: '231',
    },
    {
        sender: 'a',
        receiver: 'b',
        text: 'yoo',
    },
    {
        sender: 'b',
        receiver: 'a',
        text: 'xzc',
    },
];

export const ConversationList = (props) => {
    const { messages, user } = props

    return (
        <div className={styles.chatConversationWrapper}>
            {messages.map((message, index) => (
                    <ChatDetail
                        key={index}
                        text={message.text}
                        shouldAlignLeft={message.sender === user.username}
                    />
                ))}
        </div>
    );
};
