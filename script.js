'use strict';

// Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const rollButton = document.querySelector('.btn--roll');
const newButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');
const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.getElementById('current--1');
const player1 = document.querySelector('.player--1');
const player0 = document.querySelector('.player--0');

// Init

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;
diceEl.classList.add('hidden');
// Playing functions

const init = function() {
    let currentScore = 0;
    let activePlayer = 0;
    const scores = [0, 0];
    let playing = true;
    diceEl.classList.add('hidden');
};

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player1.classList.toggle('player--active');
    player0.classList.toggle('player--active');
};

const rollDice = function() {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6 + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
};

const holdDice = function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
};

const newGame = function() {
    init();
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
};

// Buttons
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', holdDice);
newButton.addEventListener('click', newGame);