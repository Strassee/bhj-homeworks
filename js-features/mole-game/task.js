const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

getHole = index => document.getElementById(`hole${index}`);

for (let i = 1; i <= 9; i++) {
    getHole(i).onclick = () => {
        if (getHole(i).className === 'hole hole_has-mole') {
            dead.textContent++;
        } else {
            lost.textContent++;
        }
        if (dead.textContent == 5 && lost.textContent < 2) {
            alert("Вы победили в игре!");
            dead.textContent = 0;
            lost.textContent = 0;
        } else if (lost.textContent == 2) {
            alert("Вы проиграли!");
            dead.textContent = 0;
            lost.textContent = 0;
        }
    };
}