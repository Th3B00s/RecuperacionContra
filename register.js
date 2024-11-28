const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');

// Manejo del registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    if (password !== confirmPassword) {
        message.innerText = 'Las contraseñas no coinciden.';
        return;
    }

    if (localStorage.getItem(username)) {
        message.innerText = 'El usuario ya existe.';
        return;
    }

    // Guardar en localStorage
    const userData = { password };
    localStorage.setItem(username, JSON.stringify(userData));

    message.style.color = 'green';
    message.innerText = 'Usuario registrado exitosamente.';
});
