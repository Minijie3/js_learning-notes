// here using the html to take experiments

// selecting elements
console.log(document.documentElement);// get all
console.log(document.head);
console.log(document.body);
console.log(document.querySelector('.header'));// get details of the class
allSections = document.querySelectorAll('.section');
console.log(allSections);// if delete a section in the browser, it still shows in the console
allBtns = document.getElementsByTagName('button');
console.log(allBtns);// if delete a button in the browser, it won't show in the console
console.log(document.getElementById('section-2'));// don't need #
console.log(document.getElementsByClassName('btn'));// don't need .
// getElementBy... returns HTMLcollection(similar to array, element can be chosen by index)
// which means it will be updated in the console when change happened

// creating and inserting elements
// .insertAdjacentHTML is useful to create and insert elements which can be seen at small_tries/4.bankist/script.js
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics.
                    <button class="btn btn--close--cookie">Got it!</button>`;
header = document.querySelector('.header');
header.append(message);
header.prepend(message);
// header.before(message);
// header.append(message.cloneNode(true)); → this will create a copy of the message div and append it to the header
// delete elements
document.querySelector('.btn--close--cookie').addEventListener('click', function () {
    message.remove();
});

// The. style property allows you to access and modify the inline style of an element, 
// which is directly written in the style property of the HTML element.
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.backgroundColor)// ok
console.log(message.style.height)// null
console.log(message.style.color)// nothing happened
// getComputedStyle：Used to retrieve all computed styles of an element, 
// including styles from external style sheets(css) and inherited styles.
console.log(getComputedStyle(message).getPropertyValue('color') === getComputedStyle(message).color);// true
console.log(Number.parseFloat(getComputedStyle(message).height) + 40 + 'px');
// for :root in the css(:root → <html>)
document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.getElementsByClassName('nav__logo')[0];
// standard attributes
console.log(logo.alt);
console.log(logo.src);// http://127.0.0.1:5500/fundemental_part/7.advanced_DOM_events/img/logo.png
console.log(logo.className);
// non-standard attributes
console.log(logo.designer);// ×, undefined
console.log(logo.getAttribute('designer'));// √, Jonas
console.log(logo.attributes)
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
console.log(logo.getAttribute('src'));// img/logo.png
// for the files in the same folder, logo.src returns the absolute path of the file, while
// logo.getAttribute('src') returns the relative path of the file
// special: data-* attributes
console.log(logo.dataset.versionNumber);// 1.0
console.log(logo.dataset);// DOMStringMap {versionNumber: '1.0'}

/*
class: classList.add/remove/toggle/contains
for add/remove/contains, parameters are strings
for toggle, parameters are string and booleans, (string, bool),
NOTICE that there should be only onestring in the 1st parameter,
the bool means force: true → force-add, false → force-remove, otherwise it's auto.

【DON'T USE】: logo.className = ......
*/

// position is the browser page
const section2 = document.querySelector('#section--2');
console.log(section2.getBoundingClientRect());
// Get the position relative to the current viewport, rather than the entire webpage.
console.log(window.scrollX, window.scrollY);
// Obtain the sliding distance for the entire webpage.
// pageXOffset has been deprecated, use window.scrollX and window.scrollY instead.
// If some addEventListener is not added, it is usually 0, 0
/*
window.scrollTo(x, y): x, y represent the target of scrolling relative to the entire webpage.
window.scrollBy(x, y): Scroll a certain distance from the current position.
*/
// a modern scroll way: target.scrollIntoView({})

// events
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
    alert('addEventListener: Great! You are reading the heading :D');
    h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
// ↑ it's another way to add event listener
/*
addEventLister: can add multiple event listeners to the same element,, for example:
    h1.addEventListener('mouseenter', alertH1);
    h1.addEventListener('mouseenter', alertH1Another);
alertH1 and alertH1Another will work together
    h1.onmouseenter = alertH1;
    h1.onmouseenter = alertH1Another;
alertH1Another will override alertH1, only alertH1Another will work
*/

// propagation
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target, e.currentTarget);
    console.log(e.currentTarget === this);

    // Stop propagation
    // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
});
/*
click nav_link, it will be:
LINK → CONTAINER → NAV: bubbling
if set
    document.querySelector('.nav').addEventListener('click', function (e) {
        this.style.backgroundColor = randomColor();
        console.log('NAV', e.target, e.currentTarget);
    }, true);
then click nav_link, it will be:
NAV → LINK → CONTAINER: capture NAV then bubble
*/

// DOM traversing
// for example: for the 1st h1
// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));// NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes);
// NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children);
// this will return a HTMLCollection, which is a live collection(auto update)
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';
// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('h1').style.background = 'var(--gradient-primary)';
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// NOTICE here use background, not backgroundColor
// Going sideways: DIRECT siblings
console.log(h1.previousElementSibling);// null is right
console.log(h1.nextElementSibling);// <h4>
console.log(h1.parentElement.children);// HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
