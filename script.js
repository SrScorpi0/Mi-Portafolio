document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.cuadro-proyectos');
    const anterior = document.querySelector('.anterior');
    const siguiente = document.querySelector('.siguiente');
    const proyectos = document.querySelectorAll('.proyecto');
    const proyectoWidth = proyectos[0].offsetWidth + 32; // Ancho + gap
    let currentIndex = 0;
    const maxIndex = proyectos.length - 2; // Restamos 2 porque mostramos 2 a la vez

    // Función para actualizar la visibilidad de los botones
    function updateButtonVisibility() {
        anterior.style.opacity = currentIndex === 0 ? '0.5' : '1';
        anterior.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        siguiente.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        siguiente.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
    }

    // Inicializar estado de los botones
    updateButtonVisibility();

    // Manejar click en botón anterior
    anterior.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            carrusel.scrollLeft -= proyectoWidth;
            updateButtonVisibility();
        }
    });

    // Manejar click en botón siguiente
    siguiente.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            carrusel.scrollLeft += proyectoWidth;
            updateButtonVisibility();
        }
    });

    // Opcional: Agregar navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            carrusel.scrollLeft -= proyectoWidth;
            updateButtonVisibility();
        } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
            currentIndex++;
            carrusel.scrollLeft += proyectoWidth;
            updateButtonVisibility();
        }
    });

    // Opcional: Manejar redimensionamiento de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalcular el ancho del proyecto después del redimensionamiento
            const newProyectoWidth = proyectos[0].offsetWidth + 32;
            carrusel.scrollLeft = currentIndex * newProyectoWidth;
        }, 250);
    });
});