const recoverForm = document.getElementById('recoverForm');
const sendTokenButton = document.getElementById('sendToken');
const message = document.getElementById('message');
let generatedToken = '';

// Enviar token
sendTokenButton.addEventListener('click', () => {
    const username = document.getElementById('recoverUsername').value.trim();
    const userData = JSON.parse(localStorage.getItem(username));

    if (!userData) {
        message.innerText = 'Usuario no encontrado.';
        return;
    }

    // Generar token y mostrarlo
    generatedToken = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`Tu token es: ${generatedToken}`);
});

// Manejo del cambio de contraseña
recoverForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('recoverUsername').value.trim();
    const token = document.getElementById('token').value.trim();
    const newPassword = document.getElementById('newPassword').value;

    if (token !== generatedToken) {
        message.innerText = 'Token incorrecto.';
        return;
    }

    const userData = JSON.parse(localStorage.getItem(username));
    userData.password = newPassword;
    localStorage.setItem(username, JSON.stringify(userData));

    message.style.color = 'green';
    message.innerText = 'Contraseña cambiada exitosamente.';
});
