import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notify } from 'utils/notify';
import styles from './chat.module.css';
import { ConversationList } from './conversation';
import { FilterDialog } from './filter-dialog';
import { HeaderChat } from './header';
import { MessageField } from './message-field';
import * as socketConnection from 'utils/socket';

export const ChatContainer = () => {
    const { user } = useSelector((state) => state.user);
    const router = useRouter()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isFinding, setIsFinding] = useState(false);
    const [shouldOpenFilter, setShouldOpenFilter] = useState(true);
    const [filterOptions, setFilterOptions] = useState({});

    const disconnectAllEvents = () => {
        socketConnection.removeEventListener({
            type: 'receive_text',
            callback: () => {
                console.log('receive_text disconnected');
            },
        });
        socketConnection.removeEventListener({
            type: 'matched',
            callback: () => {
                console.log('matched disconnected');
            },
        });
        socketConnection.removeEventListener({
            type: 'open_room_success',
            callback: () => {
                console.log('open_room_success disconnected');
            },
        });
        socketConnection.removeEventListener({
            type: 'connect',
            callback: () => {
                console.log('connect disconnected');
            },
        });
        socketConnection.removeEventListener({
            type: 'find_partner_pending',
            callback: () => {
                console.log('find_partner_pending disconnected');
            },
        });

        socketConnection.socket.removeAllListeners();
        socketConnection.socket.offAny();
    };

    const openEvents = () => {
        socketConnection.addEventListener({
            type: 'receive_text',
            callback: ({ receiver, sender, text }) => {
                const newMessage = {
                    text: text,
                    receiver: receiver,
                    sender: sender,
                };

                setMessages((currentMessages) => [...currentMessages, newMessage]);
            },
        });

        socketConnection.addEventListener({
            type: 'matched',
            callback: ({ partner }) => {
                console.log(`${user.username} đã match với `, partner);
                setReceiver(partner);
                socketConnection.sendEvent({
                    type: 'open_room',
                    data: {
                        receiver: partner,
                        sender: user.username,
                    },
                });
            },
        });

        socketConnection.addEventListener({
            type: 'open_room_success',
            callback: ({ status, roomId }) => {
                if (status === 'OK') {
                    setIsFinding(false);
                    setRoomId(roomId);
                } else {
                    console.log('Failed!');
                }
            },
        });

        socketConnection.addEventListener({
            type: 'connect',
            callback: () => {
                socketConnection.sendEvent({
                    type: 'find_partner',
                    data: {
                        gender: filterOptions.gender,
                        age: {
                            from: filterOptions.fromAge,
                            to: filterOptions.toAge,
                        },
                        source: user.username,
                        socketId: socketConnection.socket.id,
                    },
                });
            },
        });

        socketConnection.addEventListener({
            type: 'find_partner_pending',
            callback: () => {
                setIsFinding(true);
            },
        });

        socketConnection.addEventListener({
            type: 'disconnect',
            callback: () => {
                disconnectAllEvents();
            },
        });
    };

    const handleSendMessage = () => {
        const newMessage = {
            text: message,
            receiver: receiver,
            sender: user.username,
        };

        setMessages((currentMessages) => [...currentMessages, newMessage]);
        socketConnection.sendEvent({
            type: 'send_text',
            data: {
                receiver: receiver,
                sender: user.username,
                text: message,
            },
        });
    };

    const onSubmitFilter = (mode, data) => {
        setShouldOpenFilter(false);
        if (mode === 'CANCEL') {
            // TODO: Center "Người lạ đang chờ bạn chat đó, mau tìm kiếm đi"
        } else if (mode === 'OK') {
            setFilterOptions(data);
        }
    };

    const handleStartChat = () => {
        if (!socketConnection) {
            notify.error('Có lỗi khi kết nối');
            router.reload();
        } else {
            disconnectAllEvents();
            openEvents();
        }
    };

    return (
        <>
            <HeaderChat startChat={handleStartChat} />
            <div className={styles.chatContentWrapper}>
                {isFinding ? (
                    <div className={styles.loaderWrapper}>
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <>
                        <ConversationList messages={messages} user={user} />
                        <MessageField
                            sendMessage={handleSendMessage}
                            message={message}
                            setMessage={setMessage}
                        />
                    </>
                )}
            </div>
            {shouldOpenFilter && <FilterDialog submitFilter={onSubmitFilter} />}
        </>
    );
};
