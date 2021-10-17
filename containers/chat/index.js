import { Backdrop, TextField } from '@material-ui/core';
import { CustomButton } from 'components/button';
import { DialogChooseFilter } from 'components/chat/dialog/choose-filter';
import { useEffect, useState, useRef } from 'react';
import { notify } from 'utils/notify';
import { handleConnectSocket } from 'utils/socket';
import styles from './chat.module.css';

export const ChatContainer = () => {
    const [text, setText] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [sender, setSender] = useState('');
    const [socket, setSocket] = useState({});
    const [roomId, setRoomId] = useState('');
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [username, setUsername] = useState('');

    const openEvents = (socket) => {
        socket.on('match', ({partner, partner_socketId}) => {
            socket.emit('open_room', {
                receiver: partner,
                sender: username,
            });
        })

        socket.on('open_room_success', ({ status, roomId }) => {
            if (status === 'OK') {
                console.log('open room success nha ', roomId);
                setRoomId(roomId);
            } else {
                console.log('Failed!');
            }
        });

        socket.on('receive_text', ({ receiver, sender, text }) => {
            console.log('aaaaa ', receiver, sender, text);

            // if (sender === receiver) {
            const slicedMessages = messageReceived.slice();
            slicedMessages.push({
                text: text,
                sender: sender,
            });
            console.log(slicedMessages);
            setMessageReceived(slicedMessages);
            // }
        });
    };

    const handleSendMessage = () => {
        console.log(receiver, sender, text);
        socket.emit('send_text', { receiver: receiver, sender: sender, text: text });
    };

    const onSubmitFilter = (mode, data) => {
        if (mode === 'CANCEL') {
            setOpenBackDrop(false);
        } else if (mode === 'OK') {
            const socketIO = handleConnectSocket();
            if (!socketIO) {
                notify.error('Có lỗi khi kết nối vui lòng load lại trang');
            } else {
                setSocket(socketIO);
                socketIO.emit('find_partner', {
                    socketId: socketIO.id,
                    gender: data.selectedGender,
                    age: {
                        from: data.fromAge,
                        to: data.toAge,
                    },
                    source: username,
                });
                openEvents(socketIO)
            }
        }
    };

    const onOpenDialogFilter = () => {
        setOpenBackDrop(true);
    };

    return (
        <>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} />
            <div className={styles.startChatWrapper}>
                <CustomButton text="Bắt đầu chat" onClick={onOpenDialogFilter} />
            </div>
            {openBackDrop && <DialogChooseFilter onSubmitFilter={onSubmitFilter} />}

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
