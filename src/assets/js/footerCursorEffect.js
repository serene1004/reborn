export function footerCursorEffect () {
    window.addEventListener('DOMContentLoaded', () => {
        let footer = document.querySelector('footer');
        let cursor = document.createElement('span');
        cursor.setAttribute('class', 'cursor');
        footer.appendChild(cursor);
    
        footer.addEventListener('mousemove', (e) => {
            let x = e.pageX;
            let y = e.pageY - (document.querySelector('header').clientHeight + document.querySelector('main').clientHeight);    // header, main의 높이를 뺴줌
            cursor.style.left = x - (cursor.clientWidth/2)+'px';    // 커서의 중앙에 위치시키기위해 원너비의 절반만큼 빼줌
            cursor.style.top  = y - (cursor.clientWidth/2)+'px';    // 커서의 중앙에 위치시키기위해 원너비의 절반만큼 빼줌
        });
    
        footer.addEventListener('mouseenter', (e) => {
            cursor.classList.add('on');
        });
    
        footer.addEventListener('mouseleave', (e) => {
            cursor.classList.remove('on');
        });
    })
}