const products = Array.from(document.getElementsByClassName('product'));
const cartProducts = document.querySelector(".cart__products");

let goods;

if (localStorage.getItem('goods')) {
    goods = JSON.parse(localStorage.getItem('goods'));
    for (let good in goods) {
        restoreCart(goods[good]);
    }
} else {
    goods = [];
}

products.forEach((product) => {
    const quantityControls = Array.from(product.getElementsByClassName('product__quantity-control'));
    const quantityValue = product.querySelector(".product__quantity-value");
    const btn = product.querySelector(".product__add");
    quantityControls.forEach((quantityControl) => {
        quantityControl.addEventListener('click', (e) => {
            if (quantityControl.classList.contains('product__quantity-control_inc')) {
                quantityValue.innerText++;
            } else {
                quantityValue.innerText > 1 ? quantityValue.innerText-- : quantityValue.innerText;
            }
        });
    });
    btn.addEventListener('click', (e) => {       
        const cartProduct = cartProducts.querySelector(`[data-id="${product.dataset.id}"]`);
        if (cartProduct) {
            animation(product, cartProduct);
            cartProduct.querySelector(".cart__product-count").innerText = Number(cartProduct.querySelector(".cart__product-count").innerText) + Number(quantityValue.innerText);
            for (let good in goods) {
                goods[good].id == cartProduct.dataset.id ? goods[good].quantity = cartProduct.querySelector(".cart__product-count").innerText : 1;
            }
            localStorage.setItem('goods', JSON.stringify(goods));
        } else {
            let item = {
                id : product.dataset.id,
                img : product.querySelector("img").getAttribute("src"),
                quantity : quantityValue.innerText,
            }
            goods.push(item);
            localStorage.setItem('goods', JSON.stringify(goods));
            restoreCart(item);
            animation(product, false);
        }
    });
});

function restoreCart(good) {
    const cart = document.querySelector(".cart");
    cart.style.display = 'block';
    const div = document.createElement('div');
    div.classList.add('cart__product');
    div.dataset.id = good.id;
    div.innerHTML = `<img class="cart__product-image" src="${good.img}"><div class="cart__product-count">${good.quantity}</div><div class="cart__product-del">&times;</div>`;
    cartProducts.appendChild(div);
    const btnDel = div.querySelector(".cart__product-del");
    btnDel.addEventListener('click', (e) => {
        goods.splice(goods.indexOf(good), 1);
        goods.length != 0 ? localStorage.setItem('goods', JSON.stringify(goods)) : localStorage.removeItem('goods');
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