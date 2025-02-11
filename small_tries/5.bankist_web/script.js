'use strict'

const header = document.querySelector('.header');
const navContainer = document.querySelector('.nav');
const navLinksContainer = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const operationsTabContainer = document.querySelector('.operations__tab-container');
const operationTabs = document.querySelectorAll('.operations__tab');
const operationContents = document.querySelectorAll('.operations__content');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');

const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const logo = document.querySelector('.nav__logo');
const lazyImgs = document.querySelectorAll('img[data-src]');

const initSection1Pos = document.querySelector('#section--1').getBoundingClientRect();

const navLinksGrayFunc = function () {
    const handleHover = (event, opacity) => {
        const grayFunc = (opacity, targetLink) => {
            logo.style.opacity = opacity;
            navLinks.forEach(link => {
                if (link !== targetLink) link.style.opacity = opacity;
            });
        };
        event.target.classList.contains('nav__link') && (function (opacity, targetLink) {
            grayFunc(opacity, targetLink);
        })(opacity, event.target);
    };
    navContainer.addEventListener('mouseover', event => handleHover(event, 0.5));
    navContainer.addEventListener('mouseout', event => handleHover(event, 1));
};// another way is use 'this' keyword

const detectModalEvent = function () {
    const modalOpenAndClose = function (event, clickBool) {
        const openModal = function () {
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
        };
        const closeModal = function () {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        };
        event.key || (clickBool ? openModal() : closeModal());
        if (event.key == 'Escape' && !modal.classList.contains('hidden') && !overlay.classList.contains('hidden'))
            closeModal();
        else;
    };
    btnOpenModal.forEach(btn => {
        btn.onclick = event => {
            modalOpenAndClose(event, true);
        };
    });
    [overlay, btnCloseModal].forEach(clickObj => {
        clickObj.onclick = event => {
            modalOpenAndClose(event, false);
        }
    });
    document.onkeydown = event => {
        console.log(event.key);
        modalOpenAndClose(event, false);
    };
};

const linkSkip = function () {
    navLinksContainer.addEventListener('click', function (event) {
        event.preventDefault();
        event.target.classList.contains('nav__link') && (function (targetLink) {
            const goTo = targetLink.getAttribute('href');
            goTo === '#' || document.querySelector(goTo).scrollIntoView({ behavior: 'smooth' });
        })(event.target)
    });
};// event delegation

const learnMoreScroll = function () {
    btnLearnMore.onclick = () => {
        section1.scrollIntoView({ behavior: 'smooth' });
    };
};

const navSticky = function () {
    const headerHeight = header.getBoundingClientRect().height;
    const sticyNav = entries => {
        const [entry] = entries;
        if (!entry.isIntersecting) navContainer.classList.add('sticky');
        else navContainer.classList.remove('sticky');
    };
    const headerObserver = new IntersectionObserver(sticyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${headerHeight}px`
    });
    // 【EXPLAIN HERE】
    /*
    The "line" of section 1 is located very bottom of the viewport, and the header height is almost equal to 
    the viewport height. Therefore, rootMargin is set to the header height, causing the upper and lower 
    boundaries of the viewport to invert, so that the upper boundary is originally below the "line" of 
    section 1, and therefore slides freely, resulting in a sticky nav.
    */
    headerObserver.observe(header);
};

const operationsTagsResponse = function () {
    operationsTabContainer.addEventListener('click', event => {
        const clicked = event.target.closest('.operations__tab');
        if (!clicked) return;
        else {
            operationTabs.forEach(tab => {
                tab.classList.remove('operations__tab--active');
            });
            operationContents.forEach(content => {
                content.classList.remove('operations__content--active');
            });
            clicked.classList.add('operations__tab--active');
            document.querySelector(`.operations__content--${clicked.dataset.tab}`)
                .classList.add('operations__content--active');
        };
    });
};// event delegation

const revealSections = function () {
    const revealFunc = (entries, observer) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            entry.target.classList.remove('section--hidden');
            console.log(entry);
        }
        else return;
        observer.unobserve(entry.target);
    };
    const sectionsObserver = new IntersectionObserver(revealFunc, {
        root: null,
        threshold: 0.25,
    });
    allSections.forEach(section => {
        sectionsObserver.observe(section);
        section.classList.add('section--hidden');
    });
};

const imgLazyLoad = function () {
    const imgLoad = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        else {
            console.log(entry)
            entry.target.src = entry.target.dataset.src;
            entry.target.addEventListener('load', () => {
                entry.target.classList.remove('lazy-img');
            });
            observer.unobserve(entry.target);
        };
    };
    const imgObserver = new IntersectionObserver(imgLoad, {
        root: null,
        threshold: 0,
    });
    lazyImgs.forEach(img => {
        imgObserver.observe(img);
    });
};

const slideActive = function () {
    const slidesLength = slides.length;
    let crrSlide = 0;
    (function () {
        slides.forEach((_, index) => {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide='${index}'></button>`
            );
        });
    })();
    const goToSlide = slideNum => {
        slides.forEach((slide, idnex) => {
            slide.style.transform = `translateX(${100 * (idnex - slideNum)}%)`;
        });
        dotsActive();
    };
    const slideInit = () => {
        goToSlide(0);
    };
    const moveSlide = (direction) => {
        crrSlide = (crrSlide + direction + slidesLength) % slidesLength;
        goToSlide(crrSlide);
    };
    const dotsActive = () => {
        document.querySelectorAll('.dots__dot').forEach(dot => {
            dot.classList.remove('dots__dot--active');
        });
        document.querySelector(`.dots__dot[data-slide='${crrSlide}']`).classList.add('dots__dot--active');
    };
    slideInit();
    btnSlideRight.addEventListener('click', () => moveSlide(1));
    btnSlideLeft.addEventListener('click', () => moveSlide(-1));
    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') moveSlide(-1);
        else if (event.key === 'ArrowRight') moveSlide(1);
    });
    dotContainer.addEventListener('click', (event) => {
        event.target.classList.contains('dots__dot') && (function (targetSlide) {
            crrSlide = targetSlide;
            goToSlide(crrSlide);
        })(event.target.dataset.slide);
    });
};

const main = function () {
    document.addEventListener('DOMContentLoaded', event => {
        console.log('HTML parsed and DOM tree built.');
        console.log(event);
    });
    const funcs = [navLinksGrayFunc, detectModalEvent, linkSkip, learnMoreScroll, navSticky,
        operationsTagsResponse, revealSections, imgLazyLoad, slideActive];
    funcs.forEach((func) => {
        func();
    });
};

main();

