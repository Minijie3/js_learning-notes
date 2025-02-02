'use strict';

const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdScore = document.querySelector('.btn--hold');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const totalScore1 = document.querySelector('#score--0');
const totalScore2 = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let player1Active = player1.classList.contains('player--active');
let player2Active = player2.classList.contains('player--active');

const changeActorAgain = function (situation) {
    if (!situation) {
        if (player1Active) {
            player1.classList.remove('player--active');
            player2.classList.add('player--active');
            currentScore1.textContent = 0;
        } else if (player2Active) {
            player2.classList.remove('player--active');
            player1.classList.add('player--active');
            currentScore2.textContent = 0;
        };
        [player1Active, player2Active] = [!player1Active, !player2Active];
    } else {
        if (player2Active) {
            player2.classList.remove('player--active');
            player1.classList.add('player--active');
        };
        [player1Active, player2Active] = [true, false];
        totalScore1.textContent = 0;
        totalScore2.textContent = 0;
        currentScore1.textContent = 0;
        currentScore2.textContent = 0;
        document.querySelector('.player--winner').classList.remove('player--winner');
        document.querySelector('#name--0').textContent = 'Player 1';
        document.querySelector('#name--1').textContent = 'Player 2';
    };
};

const diceMaking = function () {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    for (let i = 1; i <= 6; i++)
        if (diceNumber === i) diceImg.src = `dice-${i}.png`;
    if (diceNumber === 1) changeActorAgain(0);
    else {
        if (player1Active) currentScore1.textContent = Number(currentScore1.textContent) + diceNumber;
        else if (player2Active) currentScore2.textContent = Number(currentScore2.textContent) + diceNumber;
    };
};

const isWin = function () {
    if (player1Active && Number(totalScore1.textContent) >= 100) {
        document.querySelector('#name--0').textContent = 'Winner !';
        return true;
    } else if (player2Active && Number(totalScore2.textContent) >= 100) {
        document.querySelector('#name--1').textContent = 'Winner !';
        return true;
    };
    return false;
};

const endThisRound = function () {
    if (player1Active)
        totalScore1.textContent = Number(totalScore1.textContent) + Number(currentScore1.textContent);
    else if (player2Active)
        totalScore2.textContent = Number(totalScore2.textContent) + Number(currentScore2.textContent);
    if (!isWin()) changeActorAgain(0);
    else
        document.querySelector('.player--active').classList.add('player--winner');
};

const main = function () {
    rollDice.addEventListener('click', diceMaking);
    holdScore.addEventListener('click', endThisRound);
    newGame.addEventListener('click', function () {
        changeActorAgain(1);
    });
};

main();

