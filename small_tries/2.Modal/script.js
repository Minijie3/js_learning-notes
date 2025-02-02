'use strict'

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShow = document.querySelectorAll('.show-modal');
const btnClose = document.querySelector('.close-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const keyDownFunc = function (event) {
    console.log(event.key);
    if (event.key == 'Escape' && !modal.classList.contains('hidden') && !overlay.classList.contains('hidden'))
        closeModal();
    else console.log('Nothing will happen.')
};

const main = function () {
    for (let i = 0; i < btnShow.length; i++)
        btnShow[i].addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', keyDownFunc);
};

main();

