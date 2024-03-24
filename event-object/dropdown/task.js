const dropdown_value = document.querySelector('.dropdown__value');
const dropdown_list = document.querySelector(".dropdown__list");
const dropdown_item = Array.from(document.querySelectorAll('.dropdown__item'));

dropdown_value.addEventListener('click', () => {

    dropdown_list.classList.toggle("dropdown__list_active");

});

dropdown_item.forEach((el) => {
    el.addEventListener('click', (event) => { 
        event.preventDefault();
        // dropdown_list.classList.toggle('dropdown__list_active');
        el.closest(".dropdown__list").classList.toggle('dropdown__list_active');
        dropdown_value.textContent = event.target.textContent;
    });
});