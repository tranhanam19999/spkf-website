import SocketIOClient from 'socket.io-client';

// const PREFIX = 'http://localhost:4000'
// const PREFIX = 'http://26.190.139.30:4000';
const PREFIX = 'https://spkf-api.herokuapp.com';
// const PREFIX = 'http://192.168.1.36:4000';

export let socket;

function initializeSocket() {
    fetch(`${PREFIX}/chat`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });

    socket = SocketIOClient.connect(PREFIX, {
        path: '/chat',
        transports: ['websocket'],
        upgrade: false,
        forceNew: true,
    });
}

export function getSocketId(socket) {
    if (!socket) {
        return;
    }

    return socket.id;
}

export function addEventListener(event) {
    if (!socket) {
        initializeSocket();
    }

    socket.on(event.type, event.callback);
}

export function removeEventListener(event) {
    if (!socket) {
        initializeSocket();
    }

    socket.off(event.type, event.callback);
}

export function sendEvent(event) {
    socket.emit(event.type, event.data);
}
