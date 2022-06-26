
const productContainer = document.getElementById('productContainer');
const productItemBuy = document.getElementById('productItem');
const cartContainer = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const cartButton = document.getElementById('cart__button');



let buyCart = [];

let cant = 0;

function recuperoLS() {
    producStorage = JSON.parse(localStorage.getItem("ListCarr"));
}

productsView();

function productsView() {
    products.forEach(product => {
        let div = document.createElement('div');
        div.classList.add('productItem');
        div.innerHTML = `
        <img class="productItem__img" src="${product.img}" alt="">
        <p>${product.name}</p>
        <div class="productItem__price__buy">
        <span>$ ${product.price}</span>
        <div class="productItem__box__amount">
        </div>
        <button id="productItem__Buy__${product.id}" class="productItem__button__buy" value="Pasta" type="button">Comprar</button>
        <!-- <button class="productItem__delete" value="Pasta" type="button">Quitar</button> -->
        </div>
        </div>
        `
        productContainer.appendChild(div);

        let buttonBuy = document.getElementById(`productItem__Buy__${product.id}`);
        buttonBuy.addEventListener('click', () => {
            addCart(product.id);
        })

    })
}
const cantProduct = document.getElementById('productItem__amount');

let producStorage = [];
function addCart(id) {
    let productoAgregar = products.find(item => item.id === id);
    buyCart.push(productoAgregar);
    localStorage.setItem("ListCart", JSON.stringify(buyCart));
    mostrarCarrito(productoAgregar);
    actualizarCarrito();
}
producStorage = JSON.parse(localStorage.getItem("ListCart"));
for (prod of producStorage) {
    let cantidad = 1;
    let div = document.createElement('div');
    div.classList.add('cartProduct');
    div.innerHTML = `
    <p>${prod.name}</p>
    <p>Precio: $${prod.price}</p>
    <p>Cantidad: ${cantidad}</p>
    <button id="eliminar${prod.id}" class="cart__button">Eliminar</button>
    `
    cartContainer.appendChild(div);

}

function mostrarCarrito(productoAgregar) {

    /*
    
    let cantidad = 1;
    let div = document.createElement('div');
    div.classList.add('cartProduct');
    div.innerHTML = `
    <p>${productoAgregar.name}</p>
    <p>Precio: $${productoAgregar.price}</p>
    <p>Cantidad: ${cantidad}</p>
    <button id="eliminar${productoAgregar.id}" class="cart__button">Eliminar</button>
    `
    
    cartContainer.appendChild(div);
    */

    let btneliminar = document.getElementById(`eliminar${productoAgregar.id}`);

    btneliminar.addEventListener('click', () => {
        btneliminar.parentElement.remove();
        buyCart = buyCart.filter(el => el.id !== productoAgregar.id);
        actualizarCarrito();
    })

}
const cuponsDiscount = ['descuento1', 'descuento2', 'descuento3', 'descuento4'];
let cuponCheck = false;

let precioNeto = 0;
let total = 0;
const descContainer = document.getElementById('container__cart');

cartButton.addEventListener('click', () => {
    descContainer.classList.toggle('active')
})

function actualizarCarrito() {
    contadorCarrito.innerText = producStorage.length;
    total = buyCart.reduce((acc, el) => acc + el.price, 0);
    precioTotal.innerHTML = total;
    let div = document.createElement('div');
    if (cuponCheck == true) {
        precioNeto = total - total * 10 / 100;
        div.innerHTML = `
            <p>Descuento: 10%</p>
            <p>Precio Neto: $${precioNeto}</p>
            `
        descContainer.appendChild(div);
    }
}


const buttonCupon = document.getElementById('button__cupon');
buttonCupon.addEventListener('click', () => {
    const cupon = document.getElementById('cupon').value;

    isDiscount = cuponsDiscount.some((el) => el == cupon);
    if (isDiscount) {
        cuponCheck = true;

    }
    actualizarCarrito();

})




