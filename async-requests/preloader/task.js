let myRequest = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const items = document.getElementById('items');
const loader = document.getElementById('loader');

const val = localStorage.getItem('valutes');
if(val) {
    restoreVal(val);
    loader.classList.remove('loader_active');
}

myRequest.open('GET', url);
myRequest.send();


myRequest.addEventListener('readystatechange', () => {
    if(myRequest.readyState === myRequest.DONE) {
        localStorage.setItem('valutes', myRequest.responseText); 
        restoreVal(localStorage.getItem('valutes'));
        loader.classList.remove('loader_active');
    }
});

function restoreVal(json) {
    const valutes = JSON.parse(json).response.Valute;
    let html = '';
    for (let valute in valutes) {
        html += `<div class="item"><div class="item__code">${valutes[valute].CharCode}</div><div class="item__value">${valutes[valute].Value}</div><div class="item__currency">руб.</div></div>`;
    }
    items.innerHTML = html;
}