const aFont = Array.from(document.querySelectorAll('.font-size'));
const aText = Array.from(document.querySelector('.book__control_color').querySelectorAll('.color'));
const aBg = Array.from(document.querySelector('.book__control_background').querySelectorAll('.color'));

const book = document.querySelector('.book');

aFont.forEach((el) => {
    el.addEventListener('click', (event) => { 
        event.preventDefault();
        remcl(aFont, el.classList[0]);
        el.classList.add(`${el.classList[0]}_active`);
        el.dataset.size ? book.classList.add(`book_fs-${el.dataset.size}`) : book.className = 'book';
    });
});

aText.forEach((el) => {
    el.addEventListener('click', (event) => { 
        event.preventDefault();
        remcl(aText, el.classList[0]);
        el.classList.add(`${el.classList[0]}_active`);
        book.classList.remove("book_color-gray", "book_color-whitesmoke", "book_color-black");
        book.classList.add(`book_color-${el.dataset.textColor}`);
    });
});

aBg.forEach((el) => {
    el.addEventListener('click', (event) => { 
        event.preventDefault();
        remcl(aBg, el.classList[0]);
        el.classList.add(`${el.classList[0]}_active`);
        book.classList.remove("book_bg-gray", "book_bg-black", "book_bg-white");
        book.classList.add(`book_bg-${el.dataset.bgColor}`);
    });
});


function remcl(arr, property) {
    arr.forEach((el) => {
        el.classList.remove(`${property}_active`);
    });
};