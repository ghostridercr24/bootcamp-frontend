const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('nav ul');

// Mostrar menú móvil
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (UX básica)
// Esto evita que el menú se quede abierto después de elegir una sección
menuLinks.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    }
});