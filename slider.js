const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const pageContainer = document.querySelector('.all-pages-container');
const allItems = document.querySelectorAll('.item');
const allDots = document.querySelectorAll('.dot')

const PAGE_WIDTH = 450;
let position = -450;
let counter = 1;

// Этот код создает копии первого и последнего элементов массива allItems, используя метод cloneNode().

// Первая строка создает копию последнего элемента массива allItems и сохраняет его в переменной cloneItemPrev.

// Вторая строка создает копию первого элемента массива allItems и сохраняет его в переменной cloneItemNext.

// Затем две последующие строки используют метод insertAdjacentElement() для вставки копии последнего элемента перед первым элементом в pageContainer и копии первого элемента после последнего элемента в pageContainer. Это делается для создания эффекта бесконечной прокрутки слайдов, когда пользователь достигает последнего или первого слайда, и контейнер автоматически перемещается к следующему или предыдущему слайду, соответственно.

const cloneItemPrev = allItems[allItems.length - 1].cloneNode(true);
const cloneItemNext = allItems[0].cloneNode(true);

pageContainer.insertAdjacentElement('afterbegin',cloneItemPrev);
pageContainer.insertAdjacentElement('beforeend',cloneItemNext);

// Функция prevSlide(), отображает предыдущий слайд.

// Сначала функция вызывает функцию disable() для блокировки действий пользователя на короткое время, чтобы избежать ошибок при быстром клике. После этого через setTimeout() вызывается функция enable(), которая разблокирует возможность клика и переключения слайдов на странице.

// Затем функция проверяет, если значение переменной counter меньше или равно 1, то устанавливает counter на значение allItems.length + 1. Таким образом, при достижении первого слайда, следующим слайдом будет последний слайд.

// Затем функция увеличивает значение переменной position на ширину страницы (PAGE_WIDTH), чтобы перейти на предыдущий слайд. Затем устанавливаются значения свойств transition и transform для контейнера pageContainer, чтобы создать эффект плавного перехода между слайдами.

// Затем переменная counter уменьшается на 1 и вызывается функция dotActiveSlide(counter), которая активирует точку, соответствующую текущему слайду. Наконец, вызывается функция jump(), которая проверяет, выходит ли контейнер за границы страницы, и при необходимости перемещает его на определенное значение.

const prevSlide = () => {
    disable();
    setTimeout(enable, 800);

    if (counter <= 1) {
        counter = allItems.length + 1;
    }

    position += PAGE_WIDTH;
    pageContainer.style.transition = 'all 0.7s ease-in-out';
    pageContainer.style.transform = `translateX(${position}px)`;


    counter--;
    dotActiveSlide(counter)
    jump();
}


const nextSlide = () => {
    disable();
    setTimeout(enable, 800);

    position -= PAGE_WIDTH;
    pageContainer.style.transition = 'all 0.7s ease-in-out';
    pageContainer.style.transform = `translateX(${position}px)`;
    console.log(position)

    if (counter >= allItems.length) {
        counter = 0;
    }
    counter++;
    dotActiveSlide(counter);
    jump();

}

// Функция jump(), добавляет обработчик события transitionend на элемент pageContainer. Этот обработчик проверяет значение переменной position, которая определяет текущую позицию контейнера, и если она выходит за границы, то устанавливает новое значение позиции и перемещает контейнер на это значение с помощью свойства transform.

// Если position меньше, чем отрицательное произведение количества элементов на ширину страницы (-(allItems.length) * PAGE_WIDTH) и не равно 0, то позиция устанавливается на -450 и контейнер перемещается на это значение.

// Если position больше или равно 0, то позиция устанавливается на отрицательное произведение количества элементов на ширину страницы (-(allItems.length) * PAGE_WIDTH) и контейнер перемещается на это значение.

const jump = () => {
    pageContainer.addEventListener('transitionend', () => {

        if (position < -(allItems.length) * PAGE_WIDTH && position != 0) {
            pageContainer.style.transition = 'none';
            position = -450;
            pageContainer.style.transform = `translateX(${position}px)`;
        } else if (position >= 0) {
            pageContainer.style.transition = 'none';
            position = -(allItems.length) * PAGE_WIDTH;
            pageContainer.style.transform = `translateX(${position}px)`;
        }
    })
}

const dotActiveSlide = (n) => {
    for (let dot of allDots) {
        dot.classList.remove('active');
    }
    allDots[n - 1].classList.add('active');
}

const dotActiveSlideClick = (i) => {
    dotActiveSlide(i)
    counter = i
    position = -(i * PAGE_WIDTH)

    pageContainer.style.transition = 'all 0.7s ease-in-out';
    pageContainer.style.transform = `translateX(${position}px)`;
}


const disable = () => {
    document.getElementById('next').disabled = true;
    document.getElementById('prev').disabled = true;
}
const enable = () => {
    document.getElementById('next').disabled = false;
    document.getElementById('prev').disabled = false;
}


prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

