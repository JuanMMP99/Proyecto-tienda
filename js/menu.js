const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})

document.addEventListener('DOMContentLoaded', function() {
    const menuScroll = document.querySelector('.menu-scroll');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    function toggleScrollIndicator() {
        if (menuScroll.scrollHeight > menuScroll.clientHeight) {
            if (menuScroll.scrollTop + menuScroll.clientHeight >= menuScroll.scrollHeight - 20) {
                scrollIndicator.style.display = 'none';
            } else {
                scrollIndicator.style.display = 'block';
            }
        } else {
            scrollIndicator.style.display = 'none';
        }
    }

    menuScroll.addEventListener('scroll', toggleScrollIndicator);
    window.addEventListener('resize', toggleScrollIndicator);

    // Llamada inicial para configurar el estado correcto
    toggleScrollIndicator();
});