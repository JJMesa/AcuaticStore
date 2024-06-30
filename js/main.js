const products = [
    {
        "id": "fastkin-01",
        "title": "Fastkin 01",
        "image": "./img/fastkin-lzr-pure-male.webp",
        "category": {
            "name": "Competition Suits",
            "id": "fastkins"
        },
        "price": 1000
    },
    {
        "id": "googles-01",
        "title": "Googles 01",
        "image": "./img/fastkin-lzr-pure-male.webp",
        "category": {
            "name": "Googles",
            "id": "googles"
        },
        "price": 2000
    },
    {
        "id": "training-item-01",
        "title": "Training item 01",
        "image": "./img/fastkin-lzr-pure-male.webp",
        "category": {
            "name": "Training Items",
            "id": "training-items"
        },
        "price": 2000
    },
];

const productsContainer = document.querySelector("#products-container");
const buttonsCategories = document.querySelectorAll(".btn-category");
const mainTitle = document.querySelector("#main-title");
let addButtons = document.querySelectorAll(".product-add")
const numberItems = document.querySelector("#number-items");

function uploadProducts(chosenProducts) {

    productsContainer.innerHTML = "";

    chosenProducts.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="product-add" id="${product.id}">Agregar</button>
            </div>
        `;

        productsContainer.append(div);
    })
    updateButtonsAdd();
}

uploadProducts(products);

buttonsCategories.forEach(boton => {
    boton.addEventListener("click", (e) => {
        buttonsCategories.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all-products") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id)
            mainTitle.innerText = productCategory.category.name;
            
            const productsButton = products.filter(product => product.category.id === e.currentTarget.id)
            uploadProducts(productsButton);
        } else {
            mainTitle.innerText = "Todos los Productos"
            uploadProducts(products);
        }
    })
});

function updateButtonsAdd() {
    addButtons = document.querySelectorAll(".product-add");
    
    addButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    })
};

let itemsInCart;
let itemsInCartLS = localStorage.getItem("items-in-cart");

if (itemsInCartLS) {
    itemsInCart = JSON.parse(itemsInCartLS);
    updateNumberItems();
} else {
    itemsInCart = [];
}

function addToCart(e) {
    const idButton = e.currentTarget.id;
    const productAdded = products.find(product => product.id === idButton);
    
    if (itemsInCart.some(product => product.id === idButton)) {    
        const index = itemsInCart.findIndex(product => product.id === idButton);
        itemsInCart[index].quantity++;
    } else {
        productAdded.quantity = 1;
        itemsInCart.push(productAdded);
    }

    updateNumberItems();

    localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
};

function updateNumberItems() {
    let newNumberItems = itemsInCart.reduce((acc, product) => acc + product.quantity, 0);
    numberItems.innerText = newNumberItems;
};