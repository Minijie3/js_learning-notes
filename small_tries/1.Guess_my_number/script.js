'use strict'

let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highScore = 0;

const stoMessage = document.querySelector('.message');
const stoScore = document.querySelector('.score');
const stoNumber = document.querySelector('.number');
const stoGuess = document.querySelector('.guess');
const stoHighScore = document.querySelector('.highscore');
const stoAgain = document.querySelector('.again');
const stoCheck = document.querySelector('.check');

const unEqual = function (guessNumber) {
    if (guessNumber > secretNumber) {
        stoMessage.textContent = '📈 Too high !';
        stoScore.textContent = `${--score}`;
    } else {
        stoMessage.textContent = '📉 Too low !';
        stoScore.textContent = `${--score}`;
    };
};

const loseGame = function (score) {
    if (score === 0) {
        stoMessage.textContent = '💥 You lost the game !';
        stoNumber.textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#fe0101';
    };
};

const judgeGuess = function () {
    const guessNumber = Number(stoGuess.value);
    if (!guessNumber || guessNumber < 1 || guessNumber > 100) {
        stoMessage.textContent = '‼️ You should enter a number between 1 and 100 !'
    } else if (guessNumber === secretNumber) {
        stoMessage.textContent = '🎉 Correct Number !'
        document.querySelector('body').style.backgroundColor = '#60b347';
        stoNumber.textContent = secretNumber;
    } else if (guessNumber !== secretNumber) {
        unEqual(guessNumber);
        loseGame(score);
    };
};

const againGame = function () {
    scoreMax(score);
    score = 20;
    secretNumber = Math.trunc(Math.random() * 100) + 1;
    stoMessage.textContent = 'Start guessing...';
    stoScore.textContent = score;
    document.querySelector('body').style.backgroundColor = '#222';
    stoNumber.textContent = '?';
};

const scoreMax = function (score) {
    if (score > highScore) {
        highScore = score;
        stoHighScore.textContent = highScore;
    };
};

const main = function () {
    stoCheck.addEventListener('click', judgeGuess);
    stoAgain.addEventListener('click', againGame);
};

main();

