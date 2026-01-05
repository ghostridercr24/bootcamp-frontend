// Seleccionamos los elementos
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('nav ul');

// 1. Abrir/Cerrar menú al tocar el botón
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active'); // Gira la hamburguesa
    menuLinks.classList.toggle('active'); // Muestra el menú
});

// 2. Cerrar menú automáticamente al elegir una opción
menuLinks.addEventListener('click', () => {
    // Solo si estamos en móvil
    if (window.innerWidth <= 768) {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    }
});