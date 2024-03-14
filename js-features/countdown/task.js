const timer = document.getElementById('timer');
const t = timer.textContent.split(":");

let h = t[0];
let m = t[1];
let s = t[2];

const intervalId = setInterval(() => {
    if (h == 0 && m == 0 && s == 0) {
        clearInterval(intervalId);
        alert("Вы победили в конкурсе!");            
    } else {
        s--;
        if (s == 0 && (m != 0 || h != 0)) {
            s = 59;
            if (m != 0) {
                m--;
            }
            else {
                m = 59;  
                h--;
            }
        }
    }

    timer.textContent =  `0${h}`.slice(-2) + ":" +  `0${m}`.slice(-2) + ":"  + `0${s}`.slice(-2);

}, 1000);
