const signinBtn = document.getElementById('signin__btn');
const card = document.querySelector('.card');
const signin = document.querySelector('.signin');
const welcome = document.getElementById('welcome');
const spanUserId = document.getElementById('user_id');
const btnLogout = document.querySelector('.logout');
const control = Array.from(document.querySelectorAll('.control'));
const url = 'https://students.netoservices.ru/nestjs-backend/auth';

if (localStorage.getItem('netoservices.ru')) {
    localData = JSON.parse(localStorage.getItem('netoservices.ru'));
    restoreUser(localData.user_id);
}

signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let  empty = false;
    control.forEach((el) => {
        if (!el.value) {
            alert('Логин или пароль не могут быть пустыми');
            empty = true;
        }
    });
    if (empty) {
        document.forms.signin__form.reset();
        return;
    };
    const authFalse = document.querySelector('.auth_false')
    if (authFalse) {
        authFalse.remove();
    }
    const xhr = new XMLHttpRequest;
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === xhr.DONE) {
            const data = JSON.parse(xhr.responseText);
            if (data.success == true) {
                localStorage.setItem('netoservices.ru', JSON.stringify({'user_id' : data.user_id,}));
                restoreUser(data.user_id);
            } else {
                const div = document.createElement('div');
                div.innerHTML = '<span class="auth_false">Неверный логин/пароль</span>';
                card.appendChild(div);
            }
        }
    });
    xhr.open('POST', url);
    const formData = new FormData(document.forms.signin__form);
    xhr.send(formData);
    document.forms.signin__form.reset();
});

btnLogout.addEventListener('click', (e) => {
    localStorage.removeItem('netoservices.ru');
    spanUserId.textContent = '';
    signin.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
});

function restoreUser(id) {
    spanUserId.textContent = id;
    signin.classList.remove('signin_active');
    welcome.classList.add('welcome_active');
}