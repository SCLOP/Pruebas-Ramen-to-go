document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    // Obtener el carrito del almacenamiento local
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Mostrar los productos en el carrito
    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    <button class="remove-item" data-index="${index}">❌</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        // Calcular el total
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = `$${total}`;
    }

    // Evento para eliminar productos del carrito
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    // Finalizar compra (puede redirigir a WhatsApp o un formulario de pago)
  checkoutButton.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        // Generar el mensaje de WhatsApp con los productos del carrito
        let mensaje = "Hola,%20me%20gustaría%20hacer%20un%20pedido:%0A";

        cart.forEach(item => {
            mensaje += `${item.name}%20x%20${item.quantity}%20-%20$${item.price * item.quantity}%0A`;
        });

        // Número de teléfono de WhatsApp
        const telefono = "526625084649"; // Cambia esto por tu número de WhatsApp

        // Enlace de WhatsApp con el mensaje
        const url = `https://wa.me/${telefono}?text=${mensaje}`;

        // Redirigir al usuario a WhatsApp
        window.open(url, "_blank");

        // Limpiar el carrito y eliminar del almacenamiento local
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    }
});


    renderCart();
});
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} agregado al carrito.`);
    });
});

