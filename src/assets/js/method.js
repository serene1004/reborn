import { footerCursorEffect } from './footerCursorEffect.js';

footerCursorEffect();

// type버튼 클릭이벤트
function typeSelector () {
    let typeBtn = document.querySelectorAll('.type__item button');
    let typeDetail = document.querySelector('.type-detail');
    let typeDetailBtn = document.querySelectorAll('.type-detail__item button');

    typeBtn.forEach(el => {
        el.addEventListener('click', () => {
            removeClass ();
            if (el.classList.contains('refresh-btn')) { // refresh-btn을 가지고있으면 typeDetail의 클래스 제거
                typeDetail.classList.remove('on');
            } else {
                el.classList.add('on');
                typeDetail.classList.add('on');
                for (let i = 0; i < typeDetailBtn.length; i++) {
                    typeDetailBtn[i].innerText = el.innerText.substring(0, el.innerText.length-2) + `${'0'+(i+1)}`;
                }
            }
        });
    });

    function removeClass () {
        typeBtn.forEach(el => {
            el.classList.remove('on');
        });
        typeDetailBtn.forEach(el => {
            el.classList.remove('on')
        });
    }

    typeDetailBtn.forEach(el => {
        el.addEventListener('click', () => {
            el.classList.toggle('on');
        });
    });
}
typeSelector();

// card 크기 resize
function resizeCard () {
    let cardImg = document.querySelectorAll('.card__img');
    let cardImgWidth = cardImg[0].clientWidth;
    
    cardImg.forEach(el => {
        el.style.height = cardImgWidth+'px';
    })
    
    window.addEventListener('resize', () => {
        cardImgWidth = cardImg[0].clientWidth;
        cardImg.forEach(el => {
            el.style.height = cardImgWidth+'px';
        })
    })
}
resizeCard();

// sort버튼 클릭이벤트
function sortBtn () {
    document.querySelector('.search-sort').addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('sort-btn')) {
            document.querySelectorAll('.sort-btn').forEach(el => {
                el.classList.remove('on');
            })
            target.classList.add('on');
        }
    })
}
sortBtn();