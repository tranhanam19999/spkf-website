import { faInfoCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, TextField } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import { CustomButton } from 'components/button';
import { ChatDetail } from 'components/chat/detail';
import { DialogChooseFilter } from 'components/chat/dialog/choose-filter';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { color } from 'utils/constant';
import { notify } from 'utils/notify';
import { handleConnectSocket } from 'utils/socket';
import styles from './chat.module.css';

export const ChatContainer = () => {
    const { user } = useSelector((state) => state.user);
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [socket, setSocket] = useState({});
    const [roomId, setRoomId] = useState('');
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [filterOptions, setFilterOptions] = useState({});

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
    ]

    const openEvents = (socket, data) => {
        socket.on('matched', ({ partner, partner_socketId }) => {
            console.log('e match roi ne');
            socket.emit('open_room', {
                receiver: partner,
                sender: user.username,
            });
        });

        socket.on('open_room_success', ({ status, roomId }) => {
            if (status === 'OK') {
                console.log('open room success nha ', roomId);
                setRoomId(roomId);
            } else {
                console.log('Failed!');
            }
        });

        socket.on('receive_text', ({ receiver, sender, text }) => {
            // console.log('aaaaa ', receiver, sender, text);

            // if (sender === receiver) {
            const slicedMessages = messageReceived.slice();
            slicedMessages.push({
                text: text,
                sender: user.username,
            });
            console.log(slicedMessages);
            setMessageReceived(slicedMessages);
            // }
        });

        socket.once('connect', () => {
            socket.emit('find_partner', {
                gender: data.selectedGender || filterOptions.selectedGender,
                age: {
                    from: data.fromAge || filterOptions.fromAge,
                    to: data.toAge || filterOptions.toAge,
                },
                source: user.username,
                socketId: socket.id,
            });
        });
    };

    const handleSendMessage = () => {
        console.log(receiver, user.username, text);
        socket.emit('send_text', { receiver: receiver, sender: user.username, text: text });
    };

    const onSubmitFilter = (mode, data) => {
        if (mode === 'CANCEL') {
            setOpenBackDrop(false);
        } else if (mode === 'OK') {
            setFilterOptions(data);
            const socketIO = handleConnectSocket();
            if (!socketIO) {
                notify.error('Có lỗi khi kết nối vui lòng load lại trang');
            } else {
                console.log(data);
                setSocket(socketIO);
                openEvents(socketIO, data);
            }
        }
    };

    const onOpenDialogFilter = () => {
        setOpenBackDrop(true);
    };

    return (
        <>
            {/* <div className={styles.startChatWrapper}>
                <CustomButton text="Bắt đầu chat" onClick={onOpenDialogFilter} />
            </div>
            {openBackDrop && <DialogChooseFilter onSubmitFilter={onSubmitFilter} />} */}
            <div className={styles.headerChatWrapper}>
                <div className={styles.headerChatContainer}>
                    <span className={styles.headerChatTitle}>Chat ngẫu nhiên</span>
                    <div className={styles.otherInfosHeaderWrapper}>
                        <CustomButton
                            text="Bắt đầu"
                            onClick={() => handleStartChat()}
                            backgroundColor={color.secondary}
                            color="#000"
                            borderRadius="unset"
                            fontSize="20px"
                            lineHeight="21px"
                            padding="12px 20px"
                        />
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            color="primary"
                            className={styles.informationIcon}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.chatContentWrapper}>
                <div className={styles.chatConversationWrapper}>
                    {mockChatList.concat(mockChatList.concat(mockChatList.concat(mockChatList))).map((chatDetail, index) => (
                        <ChatDetail
                            key={index}
                            text={chatDetail.text}
                            shouldAlignLeft={chatDetail.sender === 'a'}
                        />
                    ))}
                </div>
                <div className={styles.chatActionWrapper}>
                    <div className={styles.chatActionContainer}>
                        <TextField
                            variant="outlined"
                            className={styles.messageContainer}
                            fullWidth
                            placeholder="Soạn tin nhắn"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className={styles.sendMessageWrapper}>
                            <FontAwesomeIcon icon={faPaperPlane} color="black" />
                        </div>
                    </div>
                </div>
            </div>
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
