// Referencias al DOM del Formulario 
const formNombre = document.getElementById('nombre');
const formDescripcion1 = document.getElementById('Descripcion1');
const formDescripcion2 = document.getElementById('Descripcion2');
const formDescripcion3 = document.getElementById('Descripcion3');
const formURL = document.getElementById('imagen');
const formPrecio = document.getElementById('precio');
const formProducto = document.getElementById('form-producto');

// Referencias al DOM del Carrito y Tienda 
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('lista-carrito');
const totalPrecio = document.getElementById('total-precio');
const btnVaciar = document.getElementById('btn-vaciar');

// lista de productos
const productos = [
    {
        id: 1,
        nombre: "Cartucho Original Zelda Ocarina of Time N64",
        description1: "Categoria: Video Juego",
        description2: "Consola: Nintendo 64",
        description3: "Estado: Usado",
        imagen: "../images/zeldaGame.webp",
        precio: 100000
    },
    {
        id: 2,
        nombre: "Carta Pikachu V Swsh061",
        description1: "Categoria: Cartas",
        description2: "Conservado: Si",
        description3: "Certificado: Si",
        imagen: "../images/CartaPokemon.webp",
        precio: 25000
    }
];

// El carrito guardará objetos con la propiedad "cantidad"
const carrito = [];

// Funciones de Renderizado

// Renderizar la lista de productos disponibles en la tienda
function renderizarProductos() {
    contenedorProductos.innerHTML = '<h2>Productos Disponibles (TIENDA)</h2>';

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" size="150px">
            <h3>${producto.nombre}</h3>
            <p>${producto.description1}</p>
            <p>${producto.description2}</p>
            <p>${producto.description3}</p>
            <span class="precio">$${producto.precio.toLocaleString()}</span>
            <button class="btn-agregar">Agregar al Carrito</button>
        `;

        const btnAgregar = tarjeta.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        });

        contenedorProductos.appendChild(tarjeta);
    });
}

// Renderizar la lista del carrito con imágenes y cantidad
function renderizarCarrito() {
    contenedorCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        totalPrecio.textContent = '0';
        return;
    }

    let total = 0;

    carrito.forEach((item) => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');
        
        // Estructura que incluye la imagen, nombre, cantidad y subtotal
        itemCarrito.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 8px;">
            <div class="info-item" style="flex-grow: 1;">
                <p style="margin: 0; font-size: 0.9em; font-weight: bold;">${item.nombre}</p>
                <p style="margin: 0; font-size: 0.8em; color: #555;">
                    $${item.precio.toLocaleString()} x <strong>${item.cantidad}</strong>
                </p>
            </div>
            <span style="font-weight: bold;">$${(item.precio * item.cantidad).toLocaleString()}</span>
        `;

        contenedorCarrito.appendChild(itemCarrito);

        // Sumar al total: precio x cantidad
        total += item.precio * item.cantidad;
    });

    totalPrecio.textContent = total.toLocaleString();
}

// Logica de Interacción 

// Agregar producto al carrito (maneja cantidades)
function agregarAlCarrito(idProducto) {
    // 1. Verificar si el producto ya existe en el carrito
    const itemEnCarrito = carrito.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        // Si ya existe, solo incrementamos su cantidad
        itemEnCarrito.cantidad++;
    } else {
        // Si no existe, buscamos el producto original
        const productoEncontrado = productos.find(p => p.id === idProducto);
        if (productoEncontrado) {
            // Guardar una copia del producto agregándo la propiedad 'cantidad: 1'
            carrito.push({
                ...productoEncontrado,
                cantidad: 1
            });
        }
    }

    // Actualizamos la vista del carrito
    renderizarCarrito();
}

// Vaciar el carrito
btnVaciar.addEventListener('click', () => {
    carrito.length = 0;
    renderizarCarrito();
});

// Agregar nuevo producto desde el formulario
formProducto.addEventListener('submit', function(e) {
    e.preventDefault();

    const nuevoProducto = {
        id: Date.now(),
        nombre: formNombre.value,
        description1: formDescripcion1.value,
        description2: formDescripcion2.value,
        description3: formDescripcion3.value,
        imagen: formURL.value,
        precio: Number(formPrecio.value)
    };

    productos.push(nuevoProducto);
    renderizarProductos();
    formProducto.reset();
});

// Inicializar 
renderizarProductos();
renderizarCarrito();



