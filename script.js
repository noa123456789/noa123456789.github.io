const socket = io();

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message.trim() !== '') {
        // Verzend het bericht naar de server.
        socket.emit('message', { message });
    }

    messageInput.value = '';
}

socket.on('message', (data) => {
    // Ontvang en verwerk berichten van de server.
    console.log('Message from ' + data.id + ': ' + data.message);
});
