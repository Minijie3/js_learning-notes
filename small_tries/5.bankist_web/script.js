'use strict'

const navLinks = document.querySelector('.nav__links');
const section1 = document.querySelector('#section--1');

const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

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

const learnMoreScroll = function () {
    btnLearnMore.onclick = () => {
        section1.scrollIntoView({ behavior: 'smooth' });
    };
};

const linkSkip = function () {
    navLinks.addEventListener('click', function (event) {
        event.preventDefault();
        event.target.classList.contains('nav__link') && (function (targetLink) {
            const goTo = targetLink.getAttribute('href');
            document.querySelector(goTo).scrollIntoView({ behavior: 'smooth' });
        })(event.target)
    });
};// event delegation

const main = function () {
    detectModalEvent();
    learnMoreScroll();
    linkSkip();
};

main();

