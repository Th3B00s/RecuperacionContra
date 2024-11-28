// Inicializar carrito si no existe
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar un producto al carrito
function addToCart(productId, productName, productPrice) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Si ya existe, aumentar la cantidad
        existingProduct.quantity += 1;
    } else {
        // Si no existe, agregar un nuevo producto
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(product);
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la vista del carrito (si tienes un contador de productos, por ejemplo)
    updateCartCount();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Actualizar el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la vista del carrito
    updateCartCount();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Función para obtener el total del carrito
function getTotalCartValue() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
}

// Mostrar los productos del carrito (ejemplo para una tabla en carrito.html)
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `s
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><button onclick="removeFromCart(${product.id})">Eliminar</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById('total-cart-value').textContent = getTotalCartValue();
}

// Actualiza el contador de carrito en la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});
