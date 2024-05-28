const modal = document.getElementById('subscribe-modal');
const modalClose =  document.querySelector('.modal__close');

if (!getCookie('modalOpened')) {
    modal.classList.add('modal_active');
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    setCookie('modalOpened', '1');
});

function setCookie(name, value) {
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + date;
    // document.cookie = name + '=' + encodeURIComponent(value) + ';max-age=86400';
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(p => p.startsWith(name + '='));
    return cookie ? cookie.substring(name.length + 1) : null;
}