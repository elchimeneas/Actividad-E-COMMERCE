const cartButton = document.getElementById("cartButton");
const productCards = document.querySelectorAll('.product--card');
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelector('.modal-content');
const modalProducts = document.querySelector('.modal-products');
const addCartButton = document.querySelectorAll('.addCartButton');
const closeModalButton = document.querySelector('.close-modal');
const totalPriceSpan = document.querySelector('.totalPrice');

const productDetails = [];
let totalPrice = 0;

// Función para abrir el modal
function openModal() {
    modalContainer.classList.add('active');
}

// Función para cerrar el modal
closeModalButton.addEventListener('click', () => {
    modalContainer.classList.remove('active');
});

// Carrito de compra, ARRAY.
let cart = [];

function getProductDetails(item) {
    const productName = item.querySelector('h2').innerText;
    const productDesc = item.querySelector('h3').innerText;
    const productPrice = item.querySelector('p').innerText;
    const productImg = item.querySelector('img').src;

    const price = parseFloat(productPrice.replace('Precio: ', '').replace('€', ''));

    const product = {
        name: productName,
        desc: productDesc,
        price: price,
        img: productImg
    };

    return product;
}

function addProductToModal(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-entry');

    const productImg = document.createElement('img');
    productImg.setAttribute("src", product.img);

    const productName = document.createElement('h4');
    productName.innerText = "Producto: " + product.name;

    const productDescription = document.createElement('p');
    productDescription.innerText = "Descripción: " + product.desc;

    const productPrice = document.createElement('p');
    productPrice.innerText = `Precio: ${product.price}€`;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Eliminar';
    removeButton.classList.add('remove-product-button');


    removeButton.addEventListener('click', () => {
        totalPrice -= product.price; // Restar el precio al total
        updateTotalPrice(); // Actualizar la visualización del total
        productDiv.remove();
    });

    totalPrice += product.price; // Sumar el precio al total
    updateTotalPrice(); // Actualizar la visualización del total

    productDiv.appendChild(productImg);
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(removeButton);

    modalProducts.appendChild(productDiv);
}

// Función para actualizar la visualización del precio total
function updateTotalPrice() {
    totalPriceSpan.innerText = `Total: ${totalPrice}€`;
}

document.querySelectorAll('.addCartButton').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productCard = document.querySelectorAll('.product--card')[index];
        const product = getProductDetails(productCard);
        addProductToModal(product);
        console.log(product);
    });
});
