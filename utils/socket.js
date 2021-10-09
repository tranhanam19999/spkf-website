import SocketIOClient from 'socket.io-client';

export const handleConnectSocket = () => {
    fetch('http://localhost:4000/chat', {
        method: 'GET',
    });

    const socket = SocketIOClient.connect('http://localhost:4000', {
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
