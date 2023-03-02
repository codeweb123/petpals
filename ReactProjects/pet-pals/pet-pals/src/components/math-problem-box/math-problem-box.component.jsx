import "./math-problem-box.styles.scss";
import Button from "../button/button.component";

const gamePage = document.getElementById("game-page");
const scorePage = document.getElementById("score-page");
const splashPage = document.getElementById("splash-page");
const countdownPage = document.getElementById("countdown-page");
// Splash Page
const startForm = document.getElementById("start-form");
const radioContainers = document.querySelectorAll(".radio-container");
const radioInputs = document.querySelectorAll("input");
// Countdown Page
const countdown = document.querySelector(".countdown");
// Game Page
const itemContainer = document.querySelector(".item-container");
// Score Page
const finalTimeEl = document.querySelector(".final-time");
const baseTimeEl = document.querySelector(".base-time");
const penaltyTimeEl = document.querySelector(".penalty-time");
const playAgainBtn = document.querySelector(".play-again");

// Equations
let equationsArray = [];
let questionAmount = 0;
let playerGuessArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = "0.0s";

// Scroll
let valueY = 0;

const MathProblemBox = () => {
  window.onload = function () {
    startForm.addEventListener("click", () => {
      radioContainers.forEach((radioEl) => {
        radioEl.classList.remove("selected-label");
        if (radioEl.children[1].checked) {
          radioEl.classList.add("selected-label");
        }
      });
    });
  };

  function playAgain() {
    gamePage.addEventListener("click", startTimer());
    scorePage.hidden = true;
    splashPage.hidden = false;
    equationsArray = [];
    playerGuessArray = [];
    valueY = 0;
    playAgainBtn.hidden = true;
  }

  function showScorePage() {
    setTimeout(() => {
      playAgainBtn.hidden = false;
    }, 1000);
    gamePage.hidden = true;
    scorePage.hidden = false;
  }

  function scoresToDOM() {
    finalTimeDisplay = finalTime.toFixed(1);
    baseTime = timePlayed.toFixed(1);
    penaltyTime = penaltyTime.toFixed(1);
    baseTimeEl.textContent = `Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent = `${finalTimeDisplay}s`;
    itemContainer.scrollTo({ top: 0, behavior: "instant" });
    showScorePage();
  }

  function checkTime() {
    if (playerGuessArray.length == questionAmount) {
      clearInterval(timer);
      equationsArray.forEach((equation, index) => {
        if (equation.evaluated === playerGuessArray[index]) {
        } else {
          penaltyTime += 0.5;
        }
      });
      finalTime = timePlayed + penaltyTime;
      scoresToDOM();
    }
  }

  function addTime() {
    timePlayed += 0.1;
    checkTime();
  }

  function startTimer() {
    timePlayed = 0;
    penaltyTime = 0;
    finalTime = 0;
    timer = setInterval(addTime, 100);
    gamePage.removeEventListener("click", startTimer);
  }

  function select(guessedTrue) {
    valueY += 80;
    itemContainer.scroll(0, valueY);
    return guessedTrue
      ? playerGuessArray.push("true")
      : playerGuessArray.push("false");
  }

  function showGamePage() {
    gamePage.hidden = false;
    countdownPage.hidden = true;
  }
  //Get random number up to a max number
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // Create Correct/Incorrect Random Equations
  function createEquations() {
    // Randomly choose how many correct equations there should be
    const correctEquations = getRandomInt(questionAmount);
    // Set amount of wrong equations
    const wrongEquations = questionAmount - correctEquations;
    // Loop through, multiply random numbers up to 9, push to array
    for (let i = 0; i < correctEquations; i++) {
      firstNumber = getRandomInt(9);
      secondNumber = getRandomInt(9);
      const equationValue = firstNumber * secondNumber;
      const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
      equationObject = { value: equation, evaluated: "true" };
      equationsArray.push(equationObject);
    }
    // Loop through, mess with the equation results, push to array
    for (let i = 0; i < wrongEquations; i++) {
      firstNumber = getRandomInt(9);
      secondNumber = getRandomInt(9);
      const equationValue = firstNumber * secondNumber;
      wrongFormat[0] = `${firstNumber} x ${
        secondNumber + 1
      } = ${equationValue}`;
      wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${
        equationValue - 1
      }`;
      wrongFormat[2] = `${
        firstNumber + 1
      } x ${secondNumber} = ${equationValue}`;
      const formatChoice = getRandomInt(3);
      const equation = wrongFormat[formatChoice];
      equationObject = { value: equation, evaluated: "false" };
      equationsArray.push(equationObject);
    }
  }

  function equationsToDOM() {
    equationsArray.forEach((equation) => {
      const item = document.createElement("div");
      item.classList.add("item");

      const equationText = document.createElement("h1");
      equationText.textContent = equation.value;
      item.appendChild(equationText);
      itemContainer.appendChild(item);
    });
  }

  //Dynamically adding correct/incorrect equations
  function populateGamePage() {
    // Reset DOM, Set Blank Space Above
    itemContainer.textContent = "";
    // Spacer
    const topSpacer = document.createElement("div");
    topSpacer.classList.add("height-240");
    // Selected Item
    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selected-item");
    // Append
    itemContainer.append(topSpacer, selectedItem);
    // Create Equations, Build Elements in DOM
    createEquations();
    equationsToDOM();
    // Set Blank Space Below
    const bottomSpacer = document.createElement("div");
    bottomSpacer.classList.add("height-500");
    itemContainer.appendChild(bottomSpacer);
  }

  function countdownStart() {
    countdown.textContent = "3";
    setTimeout(() => {
      countdown.textContent = "2";
    }, 1000);
    setTimeout(() => {
      countdown.textContent = "1";
    }, 2000);
    setTimeout(() => {
      countdown.textContent = "GO!";
    }, 3000);
  }

  function showCountdown() {
    countdownPage.hidden = false;
    splashPage.hidden = true;
    countdownStart();
    populateGamePage();
    setTimeout(showGamePage, 400);
  }

  function getRadioValue() {
    let radioValue;
    radioInputs.forEach((radioInput) => {
      if (radioInput.checked) {
        radioValue = radioInput.value;
      }
    });
    return radioValue;
  }

  function selectQuestionAmount(e) {
    e.preventDefault();
    questionAmount = getRadioValue();
    if (questionAmount) {
      showCountdown();
    }
  }

  window.onload = function () {
    startForm.addEventListener("submit", selectQuestionAmount);
    gamePage.addEventListener("click", startTimer);
  };

  return (
    <div className="game-container">
      <div className="header">
        <h1>Math Game</h1>
      </div>
      <div className="card" id="splash-page">
        <form id="start-form">
          <div className="selection-container">
            <div className="radio-container">
              <label htmlFor="value-10"> 10 questions </label>
              <input
                type="radio"
                name="questions"
                value="10"
                id="value"
              ></input>
              <span className="best-score">
                <span> Best Score </span>
                <span className="best-score-value">0.0s</span>
              </span>
            </div>
            <div className="radio-container">
              <label htmlFor="value-25"> 25 questions </label>
              <input
                type="radio"
                name="questions"
                value="25"
                id="value"
              ></input>
              <span className="best-score">
                <span> Best Score </span>
                <span className="best-score-value">0.0s</span>
              </span>
            </div>
            <div className="radio-container">
              <label htmlFor="value-50"> 50 questions </label>
              <input
                type="radio"
                name="questions"
                value="50"
                id="value"
              ></input>
              <span className="best-score">
                <span> Best Score </span>
                <span className="best-score-value">0.0s</span>
              </span>
            </div>
            <div className="radio-container">
              <label htmlFor="value-99"> 99 questions </label>
              <input
                type="radio"
                name="questions"
                value="99"
                id="value"
              ></input>
              <span className="best-score">
                <span> Best Score </span>
                <span className="best-score-value">0.0s</span>
              </span>
            </div>
          </div>
          <div className="selection-footer">
            <button className="start" type="submit">
              Start Round!
            </button>
          </div>
        </form>
      </div>

      <div className="card" id="countdown-page">
        <div className="countdown"></div>
      </div>
      <div className="card" id="game-page">
        <div className="item-container"></div>
        <div className="item-footer">
          <Button className="wrong" onClick={select(false)}>
            Wrong
          </Button>
          <Button className="right" onClick={select(true)}>
            Right
          </Button>
        </div>
      </div>
      <div className="card" id="score-page">
        <div className="score-container">
          <h1 className="title">Your Time</h1>
          <div className="final-time"></div>
          <div className="base-time"></div>
          <div className="penalty-time"></div>
        </div>
        <div className="score-footer">
          <Button className="play-again" onClick={playAgain()} hidden>
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MathProblemBox;
