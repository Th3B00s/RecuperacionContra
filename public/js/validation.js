document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío automático del formulario
        let isValid = true;

        // Validación de usuario
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'El campo usuario es obligatorio';
            isValid = false;
        } else if (usernameInput.value.length < 3) {
            usernameError.textContent = 'El usuario debe tener al menos 3 caracteres';
            isValid = false;
        } else {
            usernameError.textContent = '';
        }

        // Validación de contraseña
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'El campo contraseña es obligatorio';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // Mostrar mensaje de éxito si la validación es correcta
        if (isValid) {
            loginMessage.textContent = 'Inicio de sesión exitoso';
            loginMessage.style.color = 'green';
            // Aquí puedes redirigir al usuario o realizar otra acción
        } else {
            loginMessage.textContent = 'Por favor corrige los errores antes de continuar';
            loginMessage.style.color = 'red';
        }
    });
});
