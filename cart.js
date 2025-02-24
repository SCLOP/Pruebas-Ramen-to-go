document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <div class="cart-item-content">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                            <button class="remove-item" data-index="${index}">❌</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = parseInt(e.target.dataset.index, 10);
            if (!isNaN(index) && index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }
    });

    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        let mensaje = "Hola, me gustaría hacer un pedido:\n";
        cart.forEach(item => {
            mensaje += `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });

        const telefono = "526625084649"; 
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");

        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image; 

            if (!name || isNaN(price) || !image) {
                alert("Error: Datos del producto inválidos.");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} agregado al carrito.`);
            renderCart(); 
        });
    });

    renderCart();
});
