const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const channels = {};

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'login':
                handleLogin(ws, data);
                break;
            case 'message':
                handleChatMessage(ws, data);
                break;
            default:
                break;
        }
    });
});

function handleLogin(ws, data) {
    const { groepscode, gebruikersnaam } = data;
    // Voeg hier je logica toe voor gebruikersauthenticatie met de groepscode
    // Genereer een unieke gebruikers-ID en koppel deze aan de WebSocket-verbinding
    const userId = generateUserId();
    ws.userId = userId;

    // Voeg gebruiker toe aan het juiste kanaal (dit is een vereenvoudigd voorbeeld)
    const kanaal = channels[groepscode] || [];
    kanaal.push({ userId, gebruikersnaam, ws });
    channels[groepscode] = kanaal;

    // Stuur een bericht naar de gebruiker om te bevestigen dat hij is ingelogd
    const bevestiging = { type: 'login', userId };
    ws.send(JSON.stringify(bevestiging));

    // Stuur een bericht naar alle gebruikers in het kanaal om de nieuwe gebruiker te verwelkomen
    const welkomBericht = { type: 'message', content: `${gebruikersnaam} is ingelogd.` };
    kanaal.forEach((gebruiker) => gebruiker.ws.send(JSON.stringify(welkomBericht)));
}

function handleChatMessage(ws, data) {
    const { groepscode, content } = data;
    // Voeg hier je logica toe voor het verzenden van chatberichten
    const kanaal = channels[groepscode] || [];
    const verzondenBericht = { type: 'message', content: `${channels[ws.userId]}: ${content}` };
    kanaal.forEach((gebruiker) => gebruiker.ws.send(JSON.stringify(verzondenBericht)));
}

function generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is gestart op http://localhost:${PORT}`);
});
