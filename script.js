'use strict';

const players = document.querySelectorAll('.player');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');
const totalScore0El = document.querySelector('#score--0');
const totalScore1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, totalScore0, totalScore1, playing, breakingForOne;

function starter() {
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  playing = true;
  breakingForOne = false;
  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
}
starter();

const endGame = () => {
  for (let i = 0; i < 2; i++) {
    if (!players[i].classList.contains('player--active')) {
      continue;
    } else {
      // console.log(players[i]);
      document.querySelector(`.player--${i}`).classList.add('player--winner');
      document
        .querySelector(`.player--${i}`)
        .classList.remove('player--active');
    }
  }
  playing = false;
  diceEl.classList.add('hidden');
};

const switchPlayer = function () {
  if (players[0].classList.contains('player--active')) {
    if (!breakingForOne) {
      totalScore0 += currentScore;
      totalScore0El.textContent = totalScore0;
      if (totalScore0 >= 100) {
        endGame();
        return;
      }
    }
    currentScore0El.textContent = 0;
    currentScore = Number(document.getElementById(`current--1`).textContent);
    players[0].classList.remove('player--active');
    players[1].classList.add('player--active');
  } else {
    if (!breakingForOne) {
      totalScore1 += currentScore;
      totalScore1El.textContent = totalScore1;
      if (totalScore1 >= 100) {
        endGame();
        return;
      }
    }
    currentScore1El.textContent = 0;
    currentScore = Number(document.getElementById(`current--0`).textContent);
    players[1].classList.remove('player--active');
    players[0].classList.add('player--active');
    console.log('lolhahaha');
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.classList.remove('hidden');

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      for (let i = 0; i < 2; i++) {
        if (!players[i].classList.contains('player--active')) {
          continue;
        } else {
          // console.log(players[i]);
          document.getElementById(`current--${i}`).textContent = currentScore;
        }
      }
    } else {
      // currentScore = 0;
      breakingForOne = true;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    breakingForOne = false;
    switchPlayer();
  }
});

btnNew.addEventListener('click', starter);
