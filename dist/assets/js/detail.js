import { footerCursorEffect } from './footerCursorEffect.js';

footerCursorEffect();

function resizeImg () {
    let img = document.querySelector('.detail-container__img');
    let imgWidth = img.clientWidth;
    img.style.height = imgWidth+'px';
    
    window.addEventListener('resize', () => {
        imgWidth = img.clientWidth;
        img.style.height = imgWidth+'px';
    });
}
resizeImg();