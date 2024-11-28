const users = {
    "Julio": "JulXio1",        
    "JulioAdm": "ContraAdmin123"      
};

// Elementos de los campos del formulario
const captchaText = document.getElementById('captchaText');
const message = document.getElementById('message');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const captchaInput = document.getElementById('captcha');
let generatedCaptcha = '';

// Generación de Captcha
function generateCaptcha() {
    generatedCaptcha = Math.random().toString(36).substring(2, 8);
    captchaText.innerText = generatedCaptcha;
}

generateCaptcha();

// Toggle de visibilidad de la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.innerText = type === 'password' ? 'Mostrar' : 'Ocultar';
});

// Validación de usuario en tiempo real
usernameInput.addEventListener('input', function () {
    if (usernameInput.value.length < 5) {
        message.innerText = 'El usuario debe tener al menos 5 caracteres.';
    } else {
        message.innerText = '';
    }
});

// Validación de contraseña en tiempo real
passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length < 8 || !/[A-Z]/.test(passwordInput.value) || !/[0-9]/.test(passwordInput.value)) {
        message.innerText = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un número.';
    } else {
        message.innerText = '';
    }
});

// Confirmación de contraseña en tiempo real
confirmPasswordInput.addEventListener('input', function () {
    if (confirmPasswordInput.value !== passwordInput.value) {
        message.innerText = 'Las contraseñas no coinciden.';
    } else {
        message.innerText = '';
    }
});

// Validación final y envío del formulario
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const captcha = captchaInput.value.trim();

    // Validación de campos vacíos
    if (!username || !password || !captcha) {
        message.innerText = 'Por favor, completa todos los campos.';
        return;
    }

    // Validación de captcha
    if (captcha !== generatedCaptcha) {
        message.innerText = 'El captcha es incorrecto.';
        generateCaptcha();
        return;
    }

    // Validación de usuario y contraseña
    if (users[username] && users[username] === password) {
        message.style.color = 'green';
        message.innerText = 'Inicio de sesión exitoso.';

        // Redirección según el rol
        if (username === "JulioAdm") {
            window.location.href = "admin.html";  // Redirección a la vista de administrador
        } else {
            window.location.href = "Inicio.html";  // Redirección a la vista de usuario estándar
        }
    } else {
        message.style.color = 'red';
        message.innerText = 'Usuario o contraseña incorrectos.';
    }
    
});
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const captcha = captchaInput.value.trim();

    if (!username || !password || !captcha) {
        message.innerText = 'Por favor, completa todos los campos.';
        return;
    }

    if (captcha !== generatedCaptcha) {
        message.innerText = 'El captcha es incorrecto.';
        generateCaptcha();
        return;
    }

    // Recuperar datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        message.style.color = 'green';
        message.innerText = 'Inicio de sesión exitoso.';

        // Redirección según el usuario
        if (username === "JulioAdm") {
            window.location.href = "admin.html";  // Redirección a la vista de administrador
        } else {
            window.location.href = "Inicio.html";  // Redirección a la vista de usuario estándar
        }
    } else {
        message.style.color = 'red';
        message.innerText = 'Usuario o contraseña incorrectos.';
    }
});
