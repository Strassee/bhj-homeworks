const span = Array.from(document.querySelectorAll(".rotator__case"));

const len = span.length;
let index = 1;

span.forEach((el) => {
    el.style.color = el.dataset.color;
});

function c () {
    if (index < len) {
        change(index - 1);        
    } else {
        index = 0;
        change(len - 1);
    }
    setTimeout(c, span[index-1].dataset.speed);
}


function change(d) {
//    console.log(span[index].dataset.speed);
    span[d].classList.remove("rotator__case_active");
    span[index].classList.add("rotator__case_active");
    index++;
}

setTimeout(c, span[index-1].dataset.speed);