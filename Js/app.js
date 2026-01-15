/**
 * POOL - Inicialización de la Aplicación
 * Punto de entrada principal
 */

(function() {
    'use strict';

    function init() {
        // Verificar que existan slides
        if (DOM.slides.length === 0) return;

        // Inicializar componentes
        Slider.createDots();
        Slider.updateCounter();
        Events.bindAll();
        Slider.startAutoPlay();

        console.log('POOL Portfolio inicializado');
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
