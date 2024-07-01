let itemsInCart = localStorage.getItem("items-in-cart");
itemsInCart = JSON.parse(itemsInCart) || [];

const emptyCartContainer = document.querySelector("#empty-cart");
const cartProductsContainer = document.querySelector("#products-cart");
const cartActionsContainer = document.querySelector("#actions-cart");
const purchasedCartContainer = document.querySelector("#purchased-cart");
let deleteButtons = document.querySelectorAll(".delete-product-cart");
const emptyCartButton = document.querySelector("#empty-actions-cart");
const totalContainer = document.querySelector("#total");
const purchaseButton = document.querySelector("#buy-actions-cart");


function loadProductsCart() {
    if (itemsInCart && itemsInCart.length > 0) {

        emptyCartContainer.classList.add("disabled");
        cartProductsContainer.classList.remove("disabled");
        cartActionsContainer.classList.remove("disabled");
        purchasedCartContainer.classList.add("disabled");
        
        cartProductsContainer.innerHTML = "";
        
        itemsInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("product-cart");
            div.innerHTML = `
                <img class="image-product-cart" src="${product.image}" alt="${product.title}">
                <div class="cart-product-title">
                    <small>Título</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Cantidad</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="cart-product-price">
                    <small>Precio</small>
                    <p>$${product.price}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.quantity}</p>
                </div>
                <button class="delete-product-cart" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            cartProductsContainer.append(div);
        })

    } else {
    
        emptyCartContainer.classList.remove("disabled");
        cartProductsContainer.classList.add("disabled");
        cartActionsContainer.classList.add("disabled");
        purchasedCartContainer.classList.add("disabled");
        
    }
    updateDeleteButtons();
    updateTotal();
};

loadProductsCart();

function updateDeleteButtons() {
    deleteButtons = document.querySelectorAll(".delete-product-cart");
    
    deleteButtons.forEach(boton => {
        boton.addEventListener("click", removeFromCart);
    });
};

function removeFromCart(e) {
    const idButton = e.currentTarget.id;
    const index = itemsInCart.findIndex(product => product.id === idButton);

    itemsInCart.splice(index, 1);
    loadProductsCart();

    localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
};

emptyCartButton.addEventListener("click", emptyCart);

function emptyCart() {
    itemsInCart.length = 0;
    localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
    loadProductsCart();
};

function updateTotal() {
    const totalCalculated = itemsInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    total.innerText = `$${totalCalculated}`;
};

purchaseButton.addEventListener("click", buyCart);

function buyCart() {

    itemsInCart.length = 0;
    localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
    
    emptyCartContainer.classList.add("disabled");
    cartProductsContainer.classList.add("disabled");
    cartActionsContainer.classList.add("disabled");
    purchasedCartContainer.classList.remove("disabled");

};