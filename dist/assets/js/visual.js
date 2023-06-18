// typeit 애니메이션
function typingAnimation() {
    document.addEventListener('DOMContentLoaded', () => {
        new TypeIt('#typingAnimation')
        .pause(1000)
        .delete(3, {delay: 1000})
        .type('아이스팩')
        .pause(1000)
        .delete(4, {delay: 1000})
        .type('건전지')
        .pause(1000)
        .delete(3, {delay: 1000})
        .type('배달음식용기')
        .pause(1000)
        .delete(6, {delay: 1000})
        .type('재활용 쓰레기')
        .go();
    });
}
typingAnimation();

// 메인페이지의 효과
function mainPageAnimation() {
    let visual = document.querySelector('.visual');
    let visualLayer = document.querySelector('.visual-layer');
    let txt01  = document.querySelector('.visual__text-box__txt01');
    let txt02  = document.querySelector('.visual__text-box__txt02');
    let input  = document.querySelector('.visual__input-box__input');
    let viewBtn = document.querySelector('.visual .btn-view');
    let undoBtn = document.querySelector('.visual-layer .btn-undo');
    
    document.getElementById('typingAnimation').addEventListener('click', () => {
        document.getElementById('typingAnimation').style.display = 'none';
        input.style.display = 'inline-block';
        input.focus();
    })
    
    function mainPageReset() {
        txt01.classList.remove('on');
        txt02.classList.remove('on');
        viewBtn.classList.remove('on');
        visual.classList.remove('on');
        visualLayer.classList.remove('on');
    }

    // input에 글자입력시 텍스트가 변경되도록, 글자를 지우면 원래텍스트로 되돌아옴
    input.addEventListener('keyup', ()=>{
        if (input.value.length > 0) {
            txt01.classList.add('on');
            txt02.classList.add('on');
            viewBtn.classList.add('on');
        } else if (input.value.length === 0) {
            mainPageReset();
        }
    })

    // 방법보기 버튼
    viewBtn.addEventListener('click', ()=>{
        input.classList.add('on');
        input.setAttribute('readonly', true);
        visual.classList.add('on');
        visualLayer.classList.add('on');
        viewBtn.classList.remove('on');
    })

    // undo button
    undoBtn.addEventListener('click', ()=>{
        input.value = null;
        input.style.width = 6+'rem';
        input.classList.remove('on')
        input.removeAttribute('readonly');
        mainPageReset();
    })
}
mainPageAnimation();