// Vraag de gebruiker om een toegangscode
const accessCode = prompt('Voer de toegangscode in:');

// Controleer of de ingevoerde toegangscode correct is
if (isValidAccessCode(accessCode)) {
    // Voer hier logica uit voor geauthenticeerde gebruikers
    alert('Toegang verleend!'); // Vervang dit met je eigen logica
} else {
    // Voer hier logica uit voor gebruikers met ongeldige toegangscode
    alert('Ongeldige toegangscode!'); // Vervang dit met je eigen logica
}

// Functie om te controleren of de toegangscode geldig is
function isValidAccessCode(code) {
    const validAccessCodes = ['code1', 'code2', 'code3'];
    return validAccessCodes.includes(code);
}
