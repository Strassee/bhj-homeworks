
const url = 'https://students.netoservices.ru/nestjs-backend/upload';

const progress = document.getElementById( 'progress' );

document.forms.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const myRequest = new XMLHttpRequest();
    myRequest.addEventListener('readystatechange', () => {          
        myRequest.upload.addEventListener('progress', (e) => {
            progress.value = e.loaded / e.total;
        });
    });
    
    myRequest.open('POST', url);
    const formData = new FormData(document.forms.form);
    myRequest.send(formData);
});



