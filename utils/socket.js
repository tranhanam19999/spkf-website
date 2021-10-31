import SocketIOClient from 'socket.io-client';
const PREFIX = 'http://192.168.1.36:4000'
// https://spkf-api.herokuapp.com
export const handleConnectSocket = () => {
    fetch(`${PREFIX}/chat`, {
        method: 'GET',
    });

    const socket = SocketIOClient.connect(PREFIX, {
        path: '/chat',
        transports: ['websocket']
    });
    // log socket connection
    socket.once('connect', () => {
        console.log('SOCKET CONNECTED! ', socket.id);
    });

    socket.on('join_room_sucess', (data) => {
        console.log('join room sucess ', data);
    });

    return socket
};
