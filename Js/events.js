/**
 * POOL - Módulo de Eventos
 * Manejo de todos los eventos de usuario
 */

const Events = (function() {
    let touchStartX = 0;
    let touchEndX = 0;

    function bindAll() {
        bindNavButtons();
        bindHoverPause();
        bindKeyboard();
        bindTouch();
        bindVisibility();
    }

    // Botones de navegación
    function bindNavButtons() {
        if (DOM.prevBtn) {
            DOM.prevBtn.addEventListener('click', () => {
                Slider.prevSlide();
                Slider.resetAutoPlay();
            });
        }

        if (DOM.nextBtn) {
            DOM.nextBtn.addEventListener('click', () => {
                Slider.nextSlide();
                Slider.resetAutoPlay();
            });
        }
    }

    // Pausar al hacer hover
    function bindHoverPause() {
        if (DOM.sliderFrame) {
            DOM.sliderFrame.addEventListener('mouseenter', () => {
                Slider.setPaused(true);
            });

            DOM.sliderFrame.addEventListener('mouseleave', () => {
                Slider.setPaused(false);
            });
        }
    }

    // Navegación con teclado
    function bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                Slider.prevSlide();
                Slider.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                Slider.nextSlide();
                Slider.resetAutoPlay();
            }
        });
    }

    // Soporte táctil (swipe)
    function bindTouch() {
        if (!DOM.sliderFrame) return;

        DOM.sliderFrame.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        DOM.sliderFrame.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > CONFIG.swipeThreshold) {
            if (diff > 0) {
                Slider.nextSlide();
            } else {
                Slider.prevSlide();
            }
            Slider.resetAutoPlay();
        }
    }

    // Pausar cuando la pestaña no está visible
    function bindVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                Slider.setPaused(true);
            } else {
                Slider.setPaused(false);
                Slider.resetAutoPlay();
            }
        });
    }

    return { bindAll };
})();
