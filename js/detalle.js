function cambiarImagen(src) {
    document.getElementById('imagen-principal').src = src;
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicat');
    const content = document.querySelector('main'); // Asegúrate de que esto apunte al contenedor principal del contenido

    function checkScrollPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop + clientHeight < scrollHeight - 10) {
            scrollIndicator.style.display = 'block'; // Mostrar las flechas
        } else {
            scrollIndicator.style.display = 'none'; // Ocultar las flechas
        }
    }

    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition); // Para ajustar en cambios de tamaño de ventana
    checkScrollPosition(); // Inicialmente verificar la posición
});

// Mostrar los productos por id

// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

// Variable para almacenar los productos cargados
let productos = [];

// Cargar los productos desde el JSON
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;

        // Encontrar el producto seleccionado
        const productoSeleccionado = productos.find(producto => producto.id === productoId);

        // Mostrar los detalles del producto en la página
        mostrarDetallesProducto(productoSeleccionado);
    });

// Función para mostrar los detalles del producto
function mostrarDetallesProducto(producto) {
    document.querySelector(".producto-titulo").innerText = producto.titulo;
    document.querySelector(".producto-precio").innerText = `$${producto.precio}`;
    document.querySelector(".producto-descripcion").innerText = producto.descripcion;
    document.querySelector("#imagen-principal").src = producto.imagen;
}

// Agregar al carrito
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

document.querySelector("#agregar-al-carrito").addEventListener("click", () => {
    const productoAgregado = productos.find(producto => producto.id === productoId);

    if (productosEnCarrito.some(producto => producto.id === productoId)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === productoId);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // Actualizar localStorage y mostrar mensaje
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        }
    }).showToast();
});

// Captura el botón "Comprar ahora"
const botonComprarAhora = document.querySelector(".producto-comprar");

// Obtener el producto actual que se está viendo
const productoActual = {
    id: "id-del-producto", // Puedes pasar el id correcto del producto desde tu lógica o URL.
    titulo: "Producto", // Cambia esto por el nombre del producto dinámico
    precio: 300, // Cambia por el precio dinámico del producto
    imagen: "./img/ramos/ramo.jpg" // La URL de la imagen del producto
};

// Agregar la funcionalidad al botón "Comprar ahora"
botonComprarAhora.addEventListener("click", () => {
    // Comprobar si el producto ya está en el carrito
    let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

    // Revisar si el producto ya existe en el carrito
    const existeEnCarrito = productosEnCarrito.find(p => p.id === productoActual.id);

    if (existeEnCarrito) {
        existeEnCarrito.cantidad += 1; // Incrementa la cantidad si ya está en el carrito
    } else {
        productoActual.cantidad = 1; // Si no está en el carrito, agrega el producto
        productosEnCarrito.push(productoActual);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Preparar el mensaje para WhatsApp
    let mensaje = "Hola, me gustaría comprar el siguiente producto:%0A%0A";
    mensaje += `- ${productoActual.titulo} (Cantidad: 1, Precio: $${productoActual.precio} c/u)%0A`;
    const total = productoActual.precio;
    mensaje += `%0ATotal: $${total}`;

    const numeroTelefono = "9511469220";
    const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

    // Redirigir a WhatsApp con el mensaje
    window.open(url, "_blank");
});