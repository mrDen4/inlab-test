const products = [
    {
        title: 'DOLCE MILK',
        subtitle: 'Молочко для тела',
        currentPrice: 251,
        oldPrice: 359,
        sale: 30,
        img: './assets/images/product1.png'
    },
    {
        title: 'PERLIER',
        subtitle: 'Гель для душа Fresia',
        currentPrice: 279,
        oldPrice: 559,
        sale: 50,
        img: './assets/images/product2.png'
    },
    {
        title: 'KUNDAL',
        subtitle: 'Гель для душа Английская роза',
        currentPrice: 974,
        oldPrice: 1499,
        sale: 35,
        img: './assets/images/product3.png'
    },
]

window.addEventListener('load', () => {
    let productsImage = document.querySelector('.banner__products-image');
    let btnNextSlide = document.querySelector('.banner__arrow--right');
    let btnPrevSlide = document.querySelector('.banner__arrow--left');
    let title = document.querySelector('.banner__title');
    let subtitle = document.querySelector('.banner__subtitle');
    let sale = document.querySelector('.banner__sale');
    let currentPrice = document.querySelector('.banner__price-current');
    let oldPrice = document.querySelector('.banner__price-old');

    let sliderPosition = 0;
    let currentSlide = 0;
    const COUNT_PRODUCTS = products.length;
    const COUNT_TRANSLATE_IMAGE = 100 / products.length;

    let transformSlideContent = (elem, productKey, className, endString = '', startString = '') => {
        elem.classList.add(className);
        elem.addEventListener('transitionend', () => {
            elem.textContent = `${startString}${products[currentSlide][productKey]} ${endString}`;
            elem.classList.remove(className);
        })
    }

    let changeSlide = () => {
        transformSlideContent(title, 'title', 'hideDown');
        transformSlideContent(subtitle, 'subtitle', 'hideDown');
        transformSlideContent(sale, 'sale', 'hideDown', '%', '-');
        transformSlideContent(currentPrice, 'currentPrice', 'hideUp', 'руб.');
        transformSlideContent(oldPrice, 'oldPrice', 'hideUp', 'руб.');
    }

    let autoSwipeSlider = setInterval(() => {
        if (sliderPosition > COUNT_TRANSLATE_IMAGE - 100) {
            currentSlide += 1;
            // Меняем фото
            sliderPosition -= COUNT_TRANSLATE_IMAGE;
            productsImage.style.transform = `translateX(${(sliderPosition)}%)`; 
            
            //Меняем контент
            changeSlide();
        } else {
            clearInterval(autoSwipeSlider);
        }
    }, 4000)

    for (let i = 0; i < products.length; i++) {
        const el = products[i];
        const img = document.createElement('img');
        img.src = el.img;
        img.classList.add('banner__img');
        img.alt = el.title;

        productsImage.appendChild(img);
    }

    // Вывод текущей инфы по слайду
    title.textContent = products[0].title;
    subtitle.textContent = products[0].subtitle;
    sale.textContent = `-${products[0].sale}%`;
    currentPrice.textContent = `${products[0].currentPrice} руб.`;
    oldPrice.textContent = `${products[0].oldPrice} руб.`;

    btnNextSlide.addEventListener('click', () => {
        clearInterval(autoSwipeSlider);
        if (sliderPosition > COUNT_TRANSLATE_IMAGE - 100) {
            currentSlide += 1;
            // Меняем фото
            sliderPosition -= COUNT_TRANSLATE_IMAGE;
            productsImage.style.transform = `translateX(${(sliderPosition)}%)`; 
            
            //Меняем контент
            changeSlide();
        } else {
            currentSlide = 0;

            // Меняем фото
            sliderPosition = 0;
            productsImage.style.opacity = 0; 
            productsImage.style.transform = `translate(${(sliderPosition)}%)`; 
            productsImage.style.opacity = 1; 

            //Меняем контент
            changeSlide();
        }
    })

    btnPrevSlide.addEventListener('click', () => {
        clearInterval(autoSwipeSlider);
        if (sliderPosition < 0) {
            currentSlide -= 1;

            //Меняем фото
            sliderPosition += COUNT_TRANSLATE_IMAGE;
            productsImage.style.transform = `translateX(${(sliderPosition)}%)`;  
            
            //Меняем контент
            changeSlide();
        } else {
            currentSlide = products.length - 1;

            //Меняем фото
            sliderPosition = -COUNT_TRANSLATE_IMAGE * currentSlide;
            productsImage.style.transform = `translateX(${(sliderPosition)}%)`;  
            
            //Меняем контент
            changeSlide();
        }
    })
})