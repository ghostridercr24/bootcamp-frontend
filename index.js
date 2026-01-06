const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    // Alternar la clase 'active' muestra/oculta el menú
    navList.classList.toggle('active');
    // Alternar la clase 'is-active' anima el icono de hamburguesa (opcional si tienes CSS para eso)
    mobileMenu.classList.toggle('is-active');
});