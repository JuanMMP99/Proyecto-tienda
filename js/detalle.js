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

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto de la URL
    const productoId = new URLSearchParams(window.location.search).get('id');

    // Cargar los datos del producto desde el archivo JSON
    fetch('./js/productos.json')
        .then(response => response.json())
        .then(productos => {
            // Buscar el producto correspondiente por ID
            const productoSeleccionado = productos.find(producto => producto.id === productoId);

            if (productoSeleccionado) {
                // Actualizar el título del producto
                document.querySelector('.producto-titulo').textContent = productoSeleccionado.titulo;

                // Actualizar el precio del producto
                document.querySelector('.producto-precio').textContent = `$${productoSeleccionado.precio}`;

                // Actualizar la descripción (si tienes una descripción en tu JSON)
                // document.querySelector('.producto-descripcion').textContent = productoSeleccionado.descripcion;

                // Actualizar la imagen principal del producto
                document.querySelector('#imagen-principal').src = productoSeleccionado.imagen;

                // Actualizar las miniaturas si tienes varias imágenes
                // Aquí podrías agregar lógica si tu producto tiene varias imágenes
                // Si tienes una lista de imágenes en el JSON:
                // productoSeleccionado.imagenes.forEach((imagen, index) => {
                //     document.querySelectorAll('.miniatura')[index].src = imagen;
                // });
            } else {
                console.error('Producto no encontrado');
            }
        })
        .catch(error => console.error('Error al cargar productos:', error));
});