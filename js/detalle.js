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
