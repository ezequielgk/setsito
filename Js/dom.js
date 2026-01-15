/**
 * POOL - Elementos del DOM
 * Referencias a todos los elementos necesarios
 */

const DOM = {
    slides: document.querySelectorAll('.slide'),
    dotsContainer: document.querySelector('.slider-dots'),
    prevBtn: document.querySelector('.slider-nav.prev'),
    nextBtn: document.querySelector('.slider-nav.next'),
    currentCounter: document.querySelector('.slide-counter .current'),
    totalCounter: document.querySelector('.slide-counter .total'),
    progressFill: document.querySelector('.progress-fill'),
    sliderFrame: document.querySelector('.slider-frame')
};
