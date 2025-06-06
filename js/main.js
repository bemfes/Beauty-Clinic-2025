const body = document.querySelector('body');
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    preloader.classList.add('preloader_hidden')
    body.classList.remove('no-scroll')
})

const firstSection = document.querySelector('.first-section')
const header = document.querySelector('.header')
const windowWidth = window.innerWidth
function stickyHeader(entries) {
    if (windowWidth < 575) {
        if (!entries[0].isIntersecting) {
            header.classList.add('header__sticky')
        } else {
            header.classList.remove('header__sticky')
        }

    }
}

const options = {
    threshold: 0
}

const observerFirstSection = new IntersectionObserver(stickyHeader, options)

observerFirstSection.observe(firstSection)


const searchBtn = document.querySelector('.search__btn')
const searchBox = document.querySelector('.search__box')
const overlay = document.querySelector('.overlay')
searchBtn.addEventListener('click', () => {
    searchBox.classList.remove('search__box_hidden')
    overlay.classList.add('overlay_opened')
})



const mobileMenu = document.querySelector('.first-section__nav-list')
const hmg = document.querySelector('.hamburger')
const mobileMenuClose = document.querySelector('.first-section__nav-close')
const overlayMenu = document.querySelector('.overlay_menu')
hmg.addEventListener('click', () => {
    mobileMenu.classList.add('first-section__nav-list_opened')
    overlayMenu.classList.add('overlay_header')
})

mobileMenuClose.addEventListener('click', () => {
    overlayMenu.classList.remove('overlay_header')
    mobileMenu.classList.remove('first-section__nav-list_opened')
})

overlay.addEventListener('click', () => {
    overlay.classList.remove('overlay_opened')
    searchBox.classList.add('search__box_hidden')
    modal.classList.add('modal__hidden')
    mobileMenu.classList.remove('first-section__nav-list_opened')
})
overlayMenu.addEventListener('click', () => {
    overlayMenu.classList.remove('overlay_header')
    mobileMenu.classList.remove('first-section__nav-list_opened')
})


const navList = document.querySelectorAll('.nav__list')
navList.forEach(list => {
    list.addEventListener('click', (e) => {
        if(e.target.classList.contains('nav__item-link')) {
            e.preventDefault()
            const id = e.target.getAttribute('href')
            document.querySelector(id).scrollIntoView({behavior: 'smooth'})
            overlayMenu.classList.remove('overlay_header')
            mobileMenu.classList.remove('first-section__nav-list_opened')
        }
    })
})

const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach(item => {
    const faqDesc = item.querySelector('.faq__bottom')
    const faqIcon = item.querySelector('.faq__icon')
    const faqSpanFirst = item.querySelector('.faq__span_1')
    const faqSpans = item.querySelectorAll('.faq__span')
    const faqAnswer = item.querySelector('.faq__text')
    item.addEventListener('click', () => {
        if (faqDesc.style.maxHeight) {
            item.classList.remove('faq__item_click')
            faqIcon.classList.remove('faq__icon_click')
            faqSpanFirst.classList.remove('faq__span_1_click')
            faqSpans.forEach(span => {
                span.classList.remove('faq__span_click')
            })
            faqDesc.style.maxHeight = null
            item.setAttribute('aria-expanded', 'false')
            faqAnswer.removeAttribute('tabindex', '0')
            faqIcon.setAttribute('aria-label', 'expand answer')
        } else {
            item.classList.add('faq__item_click')
            faqIcon.classList.add('faq__icon_click')
            faqSpanFirst.classList.add('faq__span_1_click')
            faqSpans.forEach(span => {
                span.classList.add('faq__span_click')
            })
            faqDesc.style.maxHeight = faqDesc.scrollHeight + "px"
            item.setAttribute('aria-expanded', 'true')
            faqAnswer.setAttribute('tabindex', '0')
            faqIcon.setAttribute('aria-label', 'roll up answer')
        }
        
    })
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (faqDesc.style.maxHeight) {
                item.classList.remove('faq__item_click')
                faqIcon.classList.remove('faq__icon_click')
                faqSpanFirst.classList.remove('faq__span_1_click')
                faqSpans.forEach(span => {
                    span.classList.remove('faq__span_click')
                })
                faqDesc.style.maxHeight = null
                item.setAttribute('aria-expanded', 'false')
                faqAnswer.removeAttribute('tabindex', '0')
                faqIcon.setAttribute('aria-label', 'expand answer')
            } else {
                item.classList.add('faq__item_click')
                faqIcon.classList.add('faq__icon_click')
                faqSpanFirst.classList.add('faq__span_1_click')
                faqSpans.forEach(span => {
                    span.classList.add('faq__span_click')
                })
                faqDesc.style.maxHeight = faqDesc.scrollHeight + "px"
                item.setAttribute('aria-expanded', 'true')
                faqAnswer.setAttribute('tabindex', '0')
                faqIcon.setAttribute('aria-label', 'roll up answer')
            }
        }
    })
})



function sliderBig() {
    const sliderBtnLeft = document.querySelector('.slider-big__main-arrow_left')
    const sliderBtnRight = document.querySelector('.slider-big__main-arrow_right')
    const sliderItem = document.querySelectorAll('.shadow_slider-big-item')
    const sliderImg = document.querySelectorAll('.slider-big__img')
    const sliderBig = document.querySelector('.slider-big')
    let currSlide = 0
    
    const fourthSectionLeft = document.querySelector('.fourth-section__left')
    const compStyleSection = window.getComputedStyle(fourthSectionLeft)
    const compWidthSection = compStyleSection.getPropertyValue('width')
    const widthSectionNumber = Number(compWidthSection.slice(0, -2))
    
    sliderItem.forEach(item => {
        item.style.width = `${widthSectionNumber - 7}px`
    })
    sliderImg.forEach(img => {
        img.style.width = `${widthSectionNumber - 10.487}px`
    })

    function goToSlide(slide) {
        sliderItem.forEach(item => {
            item.style.transform = `translateX(${slide * (-widthSectionNumber + 7)}px)`
        })
        
    }
    
    function nextSlides() {
        
        if (currSlide === 2) {
            currSlide = -1
        }
        
        currSlide++
        goToSlide(currSlide)
        
    }
    
    function prevSlides() {
        
        if (currSlide === 0) {
            currSlide = 3
        }
        
        currSlide--
        goToSlide(currSlide)
        
    }
    
    sliderBtnLeft.addEventListener('click', prevSlides)
    sliderBtnRight.addEventListener('click', nextSlides)
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlides()
        } else if (e.key === 'ArrowLeft') {
            prevSlides()
        }
    })

    const sensitivity = 20;
    let touchStart = null; 
    let touchPosition = null;


    sliderBig.addEventListener("touchstart", function (e) {
        TouchStart(e);
    });
    sliderBig.addEventListener("touchmove", function (e) {
        TouchMove(e);
    }); 

    sliderBig.addEventListener("touchend", function (e) {
        TouchEnd(e);
    });

    sliderBig.addEventListener("touchcancel", function (e) {
        TouchEnd(e);
    });

    function TouchStart(e) {
        touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        };
        touchPosition = { x: touchStart.x, y: touchStart.y };
    }

    function TouchMove(e) {
        touchPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        };
    }

    function TouchEnd(e) {
        CheckAction();
        touchStart = null;
        touchPosition = null;
    }

    function CheckAction() {
        let d =
        {
            x: touchStart.x - touchPosition.x,
            y: touchStart.y - touchPosition.y,
        };

        if (Math.abs(d.x) > Math.abs(d.y)) {
        if (Math.abs(d.x) > sensitivity) {
            if (d.x > 0) {
            nextSlides()
            }
            else {
            prevSlides()
            }
        }
        }
    }

}   

sliderBig()

window.addEventListener('resize', sliderBig)



const swiperBox = document.querySelector('.swiper-container');

if (swiperBox) {
    try {
        const swiper = new Swiper(swiperBox, {
            breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                575: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                
                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                  },
              },
            loop: true,
            
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        })

    } catch {

    }
}

const gifBox = document.querySelector('.gif__box')
const gifOverlay = document.querySelector('.overlay__send')

try {
    new window.JustValidate('.ninth-section__form', {
        colorWrong: "#18181B",
        messages: {
          email: {
            email: "Enter the correct email",
            required: "Enter an email",
          },
      
        },
        submitHandler: function(thisForm) {
          gifBox.classList.remove('gif__box_hidden')
          gifOverlay.classList.add('overlay_gif-opened')
          
      
          thisForm.reset();
          gifBox.classList.add('gif__box_hidden')
          gifOverlay.classList.remove('overlay_gif-opened')
          modal.classList.remove('modal__hidden')
          overlay.classList.add('overlay_opened')
        }
      });

} catch {

}

const modalBtn = document.querySelector('.modal__btn')
const modal = document.querySelector('.modal')
modalBtn.addEventListener('click', () => {
    modal.classList.add('modal__hidden')
    overlay.classList.remove('overlay_opened')
})

