import { CircularProgress } from '@material-ui/core';
import router from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from 'utils/notify';
import { handleConnectSocket } from 'utils/socket';
import styles from './chat.module.css';
import { ConversationList } from './conversation';
import { FilterDialog } from './filter-dialog';
import { HeaderChat } from './header';
import { MessageField } from './message-field';

export const ChatContainer = () => {
    const { user } = useSelector((state) => state.user);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [socket, setSocket] = useState({});
    const [roomId, setRoomId] = useState('');
    const [isFinding, setIsFinding] = useState(false);
    const [shouldOpenFilter, setShouldOpenFilter] = useState(true);
    const [filterOptions, setFilterOptions] = useState({});

    const openEvents = (socket) => {
        socket.on('matched', ({ partner, partner_socketId }) => {
            console.log(`${user.username} đã match với `, partner);
            setReceiver(partner)
            socket.emit('open_room', {
                receiver: partner,
                sender: user.username,
            });
        });

        socket.on('open_room_success', ({ status, roomId }) => {
            if (status === 'OK') {
                console.log('open room success nha ', roomId);
                setIsFinding(false)
                setRoomId(roomId);
            } else {
                console.log('Failed!');
            }
        });

        socket.on('receive_text', ({ receiver, sender, text }) => {
            console.log('aaaaa ', receiver, sender, text);
            ////
            // if (sender === receiver) {
            const newMessage = {
                text: text,
                receiver: user.username,
                sender: sender
            }

            setMessages([...messages, newMessage]);
            // }
        });

        socket.once('connect', () => {
            socket.emit('find_partner', {
                gender: filterOptions.gender,
                age: {
                    from: filterOptions.fromAge,
                    to: filterOptions.toAge,
                },
                source: user.username,
                socketId: socket.id,
            });
        });

        socket.on('find_partner_pending', () => {
            setIsFinding(true);
        });
    };

    const handleSendMessage = () => {
        socket.emit('send_text', { receiver: receiver, sender: user.username, text: message });
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
        const socketIO = handleConnectSocket();
        if (!socketIO) {
            notify.error('Có lỗi khi kết nối');
            router.reload();
        } else {
            setSocket(socketIO);
            openEvents(socketIO);
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
            {/* <div>Receiver</div>
            <input value={receiver} onChange={(e) => setReceiver(e.target.value)} />
            <div style={{ margin: '4px' }}>Sender</div>
            <input value={sender} onChange={(e) => setSender(e.target.value)} />
            <div></div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => handleSendMessage()} style={{ marginTop: '4px' }}>
                Send
            </button>
            <button onClick={() => joinRoom()} style={{ marginTop: '4px' }}>
                Join room
            </button>

            <div style={{ marginTop: '12px' }}>
                {messageReceived.map((message) => {
                    return <p>{message.sender + '----' +message.text}</p>;
                })}
            </div> */}
        </>
    );
};
