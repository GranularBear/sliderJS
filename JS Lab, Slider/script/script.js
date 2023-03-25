let sliderImagesDB = [{
    title: 'Rostov-on-Don, Admiral',
    url: 'images/slider-img-1.jpg'
}, {
    title: 'Sochi Thieves',
    url: 'images/slider-img-2.jpg'
}, {
    title: 'Rostov-on-Don Patriotic',
    url: 'images/slider-img-3.jpg'
}];

function initSlider(options) {
    if (!sliderImagesDB || !sliderImagesDB.length) return;

    const sliderOptions = {
        autoplay: false
    }

    const sliderImages = document.querySelector('.slider-image-wrapper');
    const sliderMobileImages = document.querySelector('.mobile-image-container');
    const sliderDots = document.querySelector('.slider-dots');
    const sliderArrows = document.querySelectorAll('.slider-arrow');
    const sliderMobileArrows = document.querySelectorAll('.round-button-arrow');
    const sliderTitles = document.querySelector('.horizontal-list-no-bullet-points')

    initImages();
    initArrows();
    initTitles();
    initDots();

    if(sliderOptions.autoplay) {
        initAutoplay();
    }

    function initImages() {
        sliderImages.dataset.index = '0';
        sliderImages.innerHTML = `<img alt='Example of inner decoration' src='${sliderImagesDB[0].url}' class='slider-image'>`;
        sliderMobileImages.dataset.index = '0';
        sliderMobileImages.innerHTML = `<img alt='Example of inner decoration' src='${sliderImagesDB[0].url}' class="section-image mobile">`
    }

    function moveSlider(num) {
        sliderImages.dataset.index = `${num}`;
        sliderImages.innerHTML = `<img alt='Example of inner decoration' src='${sliderImagesDB[num].url}' class='slider-image'>`;
        sliderMobileImages.dataset.index = `${num}`;
        sliderMobileImages.innerHTML = `<img alt='Example of inner decoration' src='${sliderImagesDB[num].url}' class="section-image mobile">`
        // dots
        sliderDots.querySelector('.active').classList.remove('active');
        sliderDots.querySelector('.n' + num).classList.add('active');
        // titles
        sliderTitles.querySelector('.active').classList.remove('active');
        sliderTitles.querySelector('.n' + num).classList.add('active');

    }

    function initArrows() {
        sliderArrows.forEach(arrow => {
            arrow.addEventListener('click', function () {
                let currentNumber = +sliderImages.dataset.index;
                let nextNumber;
                if (arrow.classList.contains('left')) {
                    nextNumber = currentNumber === 0 ? sliderImagesDB.length - 1 : currentNumber - 1;
                } else {
                    nextNumber = currentNumber === sliderImagesDB.length - 1 ? 0 : currentNumber + 1;
                }
                moveSlider(nextNumber);
            });
        })

        sliderMobileArrows.forEach(arrow => {
            arrow.addEventListener('click', function () {
                let currentNumber = +sliderMobileImages.dataset.index;
                let nextNumber;
                if (arrow.classList.contains('left')) {
                    nextNumber = currentNumber === 0 ? sliderImagesDB.length - 1 : currentNumber - 1;
                } else {
                    nextNumber = currentNumber === sliderImagesDB.length - 1 ? 0 : currentNumber + 1;
                }
                moveSlider(nextNumber);
            });
        })
    }

    function initDots() {
        sliderImagesDB.forEach((image, index) => {
            let dot = `<div class='slider-dots-item n${index} ${index === 0 ? 'active' : ''}' data-index='${index}'></div>`;
            sliderDots.innerHTML += dot;
        });

        sliderDots.querySelectorAll('.slider-dots-item').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initTitles() {
        sliderImagesDB.forEach((image, index) => {
            let title =`<li class="section-horizontal-list-item n${index} ${index === 0 ? 'active' : ''}" data-index=${index}>${image.title}</li>`
            document.querySelector('.horizontal-list-no-bullet-points').innerHTML += title;
        });

        sliderTitles.querySelectorAll('.section-horizontal-list-item').forEach(title => {
            title.addEventListener('click', function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initAutoplay() {
        setInterval(() => {
            let currentNumber = +sliderImages.dataset.index;
            let nextNumber = currentNumber === sliderImagesDB.length - 1 ? 0 : currentNumber + 1;
            moveSlider(nextNumber);
        }, 3000)
    }

}

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
})