let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito del localStorage o inicializar vacío
let dataTable;
let dataTableIsInitialized = false;

// Opciones de la DataTable
const dataTableOptions = {
    lengthMenu: [3, 6, 9, 12, 20, 30, 50],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [1] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

// Función para inicializar la DataTable
const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

// Listar usuarios
const listUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        let content = users.map((user, index) => createUserRow(user, index)).join('');
        document.getElementById("tableBody_users").innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

// Crear filas para la tabla de usuarios
const createUserRow = (user, index) => {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.company.name}</td>
            <td><i class="fa-solid fa-check" style="color: green;"></i></td>
            <td>
                <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>`;
};

// Función para manejar las animaciones
const handleAnimation = (event) => {
    const button = event.target;
    const animationType = button.getAttribute('data-animation');
    const productCard = button.closest('.card');

    button.style.backgroundColor = 'green';

    switch (animationType) {
        case 'scale':
            productCard.style.transition = 'transform 0.5s';
            productCard.style.transform = 'scale(1.2)';
            break;
        case 'rotate':
            productCard.style.transition = 'transform 0.5s';
            productCard.style.transform = 'rotate(360deg)';
            break;
        case 'fade':
            productCard.style.transition = 'opacity 0.5s';
            productCard.style.opacity = '0';
            setTimeout(() => {
                productCard.style.opacity = '1';
            }, 500);
            break;
        default:
            break;
    }

    setTimeout(() => {
        button.style.backgroundColor = '';
        productCard.style.transform = '';
    }, 1000);
};

document.querySelectorAll('.btn-event').forEach(button => {
    button.addEventListener('click', handleAnimation);
});

// Funciones del Carrito

// Función para agregar al carrito y actualizar en localStorage
const addToCart = (productName) => {
    const productIndex = cart.findIndex(item => item.name === productName);
    const button = event.target;

    if (productIndex === -1) {
        cart.push({ name: productName, quantity: 1 });
        button.textContent = 'Quitar del carrito';
    } else {
        cart.splice(productIndex, 1);
        button.textContent = 'Agregar al carrito';
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;
    renderCart();
};

// Función para mostrar los productos en el carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';

    storedCart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} (x${product.quantity})`;
        cartItemsContainer.appendChild(li);
    });
}

// Función para obtener el total del carrito
function getTotalCartValue() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return storedCart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
}

// Función para renderizar los productos del carrito dentro del modal
function renderModalCart() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    modalCartItems.innerHTML = '';

    storedCart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
        `;
        modalCartItems.appendChild(row);
    });

    modalTotalCartValue.textContent = getTotalCartValue();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Manejadores de eventos
document.addEventListener('DOMContentLoaded', () => {
    initDataTable();
    renderCart();
    updateCartCount();
});

// Modal del carrito
const cartModal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close");
const modalCartItems = document.getElementById("modal-cart-items");
const modalTotalCartValue = document.getElementById("modal-total-cart-value");

// Abrir el modal del carrito
document.getElementById('cart-link').addEventListener('click', () => {
    renderModalCart();
    cartModal.style.display = "flex";
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = "none";
});

// Cerrar modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
};
