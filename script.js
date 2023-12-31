// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/berichtVersturen', (req, res) => {
    const bericht = req.body.bericht;
    // Verwerk het ontvangen bericht (bijv. opslaan in een database)
    res.redirect('/');
});

app.post('/kanaalToevoegen', (req, res) => {
    const nieuwKanaal = req.body.nieuwKanaal;
    // Verwerk het nieuwe kanaal (bijv. opslaan in een array)
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is gestart op http://localhost:${port}`);
});
