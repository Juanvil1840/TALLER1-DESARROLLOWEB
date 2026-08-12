//Guardar info del formulario
const formNombre = document.getElementById('nombre'); // nombre del articulo a agregar
//Descripciones del articulo
const formDescripcion1 = document.getElementById('Descripcion1');
const formDescripcion2 = document.getElementById('Descripcion2');
const formDescripcion3 = document.getElementById('Descripcion3');
const formURL = document.getElementById('imagen'); // URL de la imagen a utilizar
const formPrecio = document.getElementById('precio') // precio del articulo


// Lista de productos
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

// 1. Seleccionamos el contenedor HTML donde iran las tarjetas
const contenedorProductos = document.getElementById('contenedor-productos');

// 2. Definimos la funcion encargada de dibujar los productos en pantalla
function renderizarProductos() {
    // Mantener el titulo y limpiar el contenido previo de la seccion
    contenedorProductos.innerHTML = '<h2>Productos Disponibles (TIENDA)</h2>';

    // Recorremos el arreglo de productos
    productos.forEach(producto => {
        // Creamos un elemento div para la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta'); // Le aplicamos tu clase CSS existente

        // Insertamos la estructura HTML interna de la tarjeta
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" size="150px">
            <h3>${producto.nombre}</h3>
            <p>${producto.description1}</p>
            <p>${producto.description2}</p>
            <p>${producto.description3}</p>
            <span class="precio">$${producto.precio.toLocaleString()}</span>
            <button class="btn-agregar">Agregar al Carrito</button>
        `;

        // Agregamos la tarjeta creada dentro del contenedor principal
        contenedorProductos.appendChild(tarjeta);
    });
}

// 3. Ejecutamos la funcion para que se muestren los productos al cargar la pagina
renderizarProductos();