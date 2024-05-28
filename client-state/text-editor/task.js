const editor = document.getElementById('editor');
const button = document.getElementById('button');

const text = localStorage.getItem('textEditor');
if(text) {
    restoreText(text);
}

editor.addEventListener('keyup', (e) => {
    saveText(editor.value);
});

button.addEventListener('click', (e) => {
    editor.value = '';
    localStorage.removeItem('textEditor');
});

function saveText(text) {
    localStorage.setItem('textEditor', text);
};

function restoreText() {
    editor.value = localStorage.getItem('textEditor');
};
