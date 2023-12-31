function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message.trim() !== '') {
        const chatDisplay = document.getElementById('chat-display');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatDisplay.appendChild(newMessage);

        // Voeg hier de logica toe om het bericht naar de server te sturen (AJAX, WebSockets, etc.).
    }

    messageInput.value = '';
}

