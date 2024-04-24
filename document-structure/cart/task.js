const products = Array.from(document.getElementsByClassName('product'));
const cartProducts = document.querySelector(".cart__products");
let goods = {};

for (let i = 0; i < localStorage.length; i++) {
    let myKey = localStorage.key(i);
    if(myKey.slice(0, 4) === 'good') {
        goods[myKey] = localStorage.getItem(myKey);
    }
}

for (let key in goods) {
    restoreCart(key.slice(4), goods[key]);
}

products.forEach((product) => {
    const qCs = Array.from(product.getElementsByClassName('product__quantity-control'));
    const qV = product.querySelector(".product__quantity-value");
    const btn = product.querySelector(".product__add");
    qCs.forEach((qC) => {
        qC.addEventListener('click', (e) => {
            if (qC.classList.contains('product__quantity-control_inc')) {
                qV.innerText++;
            } else {
                qV.innerText > 1 ? qV.innerText-- : qV.innerText;
            }
        });
    });
    btn.addEventListener('click', (e) => {       
        const pr = cartProducts.querySelector(`[data-id="${product.dataset.id}"]`);
        if (pr) {
            animation(product, pr);
            pr.querySelector(".cart__product-count").innerText = Number(pr.querySelector(".cart__product-count").innerText) + Number(qV.innerText);
            localStorage.setItem(`good${pr.dataset.id}`, pr.querySelector(".cart__product-count").innerText);
        } else {
            localStorage.setItem(`good${product.dataset.id}`, qV.innerText);
            restoreCart(product.dataset.id, qV.innerText);
            animation(product, false);
        }
    });
});

function restoreCart(id, q) {
    const cart = document.querySelector(".cart");
    cart.style.display = 'block';
    const div = document.createElement('div');
    div.classList.add('cart__product');
    div.dataset.id = id;
    div.innerHTML = `<img class="cart__product-image" src="${document.querySelector('.products').querySelector(`[data-id="${id}"]`).querySelector("img").getAttribute("src")}"><div class="cart__product-count">${q}</div><div class="cart__product-del">&times;</div>`;
    cartProducts.appendChild(div);
    const prDel = div.querySelector(".cart__product-del");
    prDel.addEventListener('click', (e) => {
        localStorage.removeItem(`good${div.dataset.id}`);
        div.remove();
        if (!cartProducts.querySelector(".cart__product")) {
            cart.style.display = 'none';
        }
    });
}

function animation(product, incart) {
    let rect_p = product.querySelector("img").getBoundingClientRect();
    const steps = 15;
    if (!incart){
        incart = cartProducts.querySelector(`[data-id="${product.dataset.id}"]`);
        incart.style.visibility= 'hidden';
    } 
    let rect_c = incart.querySelector("img").getBoundingClientRect();
    const h_step = Math.abs((rect_p.left - rect_c.left)) / steps;
    const v_step = Math.abs((rect_p.top - rect_c.top)) / steps;
    const img = product.querySelector("img").cloneNode(false);
    img.style.position = 'absolute';
    img.style.top = rect_p.top + "px";
    img.style.left = rect_p.left + "px";
    product.insertBefore(img, product.querySelector(".product__controls"));
    let timerId = setInterval(() => {
        img.style.top = parseInt(img.style.top) - v_step + "px";
        img.style.left = parseInt(img.style.left) + h_step + "px";;
        if (parseInt(img.style.top) <= (rect_c.top + v_step)) {
            clearInterval(timerId);
            img.remove();
            incart.style.visibility= 'visible';
        }
    }, 30);
}