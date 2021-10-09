import { Backdrop } from '@material-ui/core';
import { DialogChooseFilter } from 'components/chat/dialog/choose-filter';
import { useEffect, useState, useRef } from 'react';
import { handleConnectSocket } from 'utils/socket';
import styles from './chat.module.css';

export const ChatContainer = () => {
    const [text, setText] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [sender, setSender] = useState('');
    const [socket, setSocket] = useState({});
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        const socketIO = handleConnectSocket();
        setSocket(socketIO);
    }, []);

    const joinRoom = () => {
        socket.emit('open_room', {
            receiver: receiver,
            sender: sender,
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

    const onSubmitFilter = (options) => {
        console.log('options ', options);
    };

    return (
        <Backdrop open={true}>
            <DialogChooseFilter onSubmitFilter={onSubmitFilter} />
        </Backdrop>
        /* <div>Receiver</div>
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
            </div> */
    );
};
