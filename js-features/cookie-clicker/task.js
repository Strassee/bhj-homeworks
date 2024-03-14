const img = document.getElementById('cookie');
const cc = document.getElementById('clicker__counter');
const cs = document.getElementById('clicker__speed');

let count = 0;

let start = new Date();
let end = new Date();

img.onclick = () => {
    if (count == 0) {
        start = Date.now();
    }
    end = Date.now();
    count++;
    cc.textContent =  count;
    cs.textContent =  (count / (end - start) * 1000).toFixed(2);
};
