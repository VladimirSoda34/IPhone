const cookieBox = document.querySelector(".cookies");
const close = document.querySelector(".cookie__btn");
const btn = document.querySelector(".form__btn");
const img = document.querySelector(".section-our-mission__img");
const text = document.querySelector(".section-our-mission__text");
let scroll_position = 0;


close.addEventListener("click", () => {
    cookieBox.classList.add('hide');
    setInterval(() => {
        cookieBox.classList.add('close');
    }, 900);
});


btn.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(element => {
        if (element.value.trim() === '') {
            element.classList.add('red');
        } else if (element.value.trim() !== '') {
            element.remove.classList('red');
        }
    });
});

window.addEventListener("scroll", () => {
    scroll_position = window.scrollY;
    if (scroll_position >= 1300 && scroll_position <= 1400) {
        img.classList.remove('img-none');
        text.classList.add('text-none');
    } else if (scroll_position < 500 || scroll_position >= 2500) {
        img.classList.add('img-none');
        text.classList.remove('text-none');
    }
});