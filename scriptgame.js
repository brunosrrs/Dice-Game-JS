"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnHow = document.querySelector(".btn--how");

const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close-janela");
const janela = document.querySelector(".janela");

//Starting Conditions
let scores, currentScore, activePlayer, playing;

const fechar = function () {
  janela.classList.add("hidden");
  overlay.classList.add("hidden");
};

const abrir = function () {
  janela.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle checks if has the class, if true remove, else adds
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

init();

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    //3. Check for rolled 1: if true switch player
    if (dice !== 1) {
      //Add dice to score getting the id of the player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Swithc players and reset score
      switchPlayer();
    }
  }
});

//Hold button funcionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to the array of scores
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    //Finishing the game
    if (scores[activePlayer] >= 50) {
      diceEl.classList.add("hidden");

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

btnHow.addEventListener("click", abrir);
btnClose.addEventListener("click", fechar);
overlay.addEventListener("click", fechar);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !janela.classList.contains("hidden")) {
    fechar();
  }
});
