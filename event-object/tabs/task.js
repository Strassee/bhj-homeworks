const tab = Array.from(document.querySelectorAll('.tab'));
const tab_content = Array.from(document.querySelectorAll('.tab__content'));

tab.forEach((el) => {
    el.addEventListener('click', (event) => {
        for(let i = 0; i < tab.length; i++) {
            tab[i].classList.remove('tab_active');
            tab_content[i].classList.remove('tab__content_active');
        }
        event.target.classList.add('tab_active');
        tab_content[tab.indexOf(event.target)].classList.add('tab__content_active');
    });
});