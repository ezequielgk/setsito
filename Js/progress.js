/**
 * POOL - Módulo de Barra de Progreso
 * Controla la animación de la barra de progreso
 */

const Progress = (function() {
    let timer = null;
    let value = 0;

    function start(isPausedFn) {
        value = 0;
        timer = setInterval(() => {
            if (!isPausedFn()) {
                value += (CONFIG.progressUpdateInterval / CONFIG.slideInterval) * 100;
                if (DOM.progressFill) {
                    DOM.progressFill.style.width = `${Math.min(value, 100)}%`;
                }
            }
        }, CONFIG.progressUpdateInterval);
    }

    function reset() {
        value = 0;
        if (DOM.progressFill) {
            DOM.progressFill.style.width = '0%';
        }
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    return { start, reset, stop };
})();
