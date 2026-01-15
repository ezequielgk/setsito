/**
 * POOL - Módulo del Slider
 * Lógica principal de navegación entre slides
 */

const Slider = (function() {
    let currentSlide = 0;
    let autoPlayTimer = null;
    let isPaused = false;

    // Crear indicadores (dots)
    function createDots() {
        DOM.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });

            DOM.dotsContainer.appendChild(dot);
        });
    }

    // Navegar a un slide específico
    function goToSlide(index) {
        // Remover clase activa del slide actual
        DOM.slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

        // Actualizar índice
        currentSlide = index;

        // Manejar límites
        if (currentSlide >= DOM.slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = DOM.slides.length - 1;

        // Añadir clase activa al nuevo slide
        DOM.slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');

        // Actualizar contador
        updateCounter();

        // Reiniciar progreso
        Progress.reset();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Actualizar contador visual
    function updateCounter() {
        const current = String(currentSlide + 1).padStart(2, '0');
        const total = String(DOM.slides.length).padStart(2, '0');

        if (DOM.currentCounter) DOM.currentCounter.textContent = current;
        if (DOM.totalCounter) DOM.totalCounter.textContent = total;
    }

    // Control de autoplay
    function startAutoPlay() {
        stopAutoPlay();
        Progress.start(() => isPaused);
        autoPlayTimer = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, CONFIG.slideInterval);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
        Progress.stop();
    }

    function resetAutoPlay() {
        stopAutoPlay();
        Progress.reset();
        startAutoPlay();
    }

    // Control de pausa
    function setPaused(value) {
        isPaused = value;
    }

    function getPaused() {
        return isPaused;
    }

    return {
        createDots,
        goToSlide,
        nextSlide,
        prevSlide,
        updateCounter,
        startAutoPlay,
        stopAutoPlay,
        resetAutoPlay,
        setPaused,
        getPaused
    };
})();
