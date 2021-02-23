var wordInPlaySpan = document.querySelector(".word-in-play");
var winCountSpan = document.querySelector(".win-count");
var lossCountSpan = document.querySelector(".loss-count");
var timerSpan = document.querySelector(".timer");
var resetButton = document.querySelector(".reset-button");
var startButton = document.querySelector(".start-button");
var words = ["Javascript", "Angular", "React", "Java", "Function", "Array", "Modulus"];
var selectedWord;
var wordInPlay;
var score = {
  win: 0,
  loss: 0
};
var gameTimer;

//Start Game
function startGame() {
  //Reset and Start Timer
  timerSpan.textContent = 10;
  startTimer();

  //Load Word
  var wordRandomIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[wordRandomIndex].toLowerCase().split("");
  wordInPlay = words[wordRandomIndex].toLowerCase().split("");

  for (var i = 0; i < wordInPlay.length; i++) {
    var randomlyMask = Math.floor(Math.random() * 2);
    if (randomlyMask === 0) { //Mask Letter if randomlyMask is 0
      wordInPlay[i] = "_";
    }
  }
  wordInPlaySpan.innerHTML = wordInPlay.join(" ").toUpperCase();
}

//Checking if Entered Key Matches
function checkKey(event) {
  var keyPress = event.key;
  var keyPressLowerCase = keyPress.toLowerCase();
  if (selectedWord.includes(keyPressLowerCase)) {
    var indexOfKey = 0;
    while (indexOfKey < selectedWord.length && indexOfKey != -1) {
      indexOfKey = selectedWord.indexOf(keyPressLowerCase, indexOfKey);
      wordInPlay[indexOfKey] = keyPressLowerCase;
      if (indexOfKey != -1) {
        indexOfKey++;
      }
    }
    wordInPlaySpan.innerHTML = wordInPlay.join(" ").toUpperCase();
  }

  if (checkWin()) {
    updateScore("win");
  }
}

//Check Win
function checkWin() {
  if (wordInPlay.includes("_")) {
    return false;
  }
  else {
    return true;
  }
}

//Start Timer
function startTimer() {
  var timer = 10;
  gameTimer = setInterval(function () {
    if (timer > 0) {
      timer--;
    }
    else {
      clearInterval(gameTimer);
      loseGame();
    }
    timerSpan.textContent = timer;
  }, 1000)


}

//Lose Game
function loseGame() {
  updateScore("loss")
}

//Update Score
function updateScore(result) {

  setTimeout(function () {
    if (result === "win") {
      score.win++;
      winCountSpan.textContent = score.win;
    }
    else {
      score.loss++;
      lossCountSpan.textContent = score.loss;
    }

    resetTimer();
    startGame();
  }, 700);
}

//Reset Game
function resetGame() {
  clearInterval(gameTimer);
  score.win = 0;
  score.loss = 0;
  winCountSpan.textContent = 0;
  lossCountSpan.textContent = 0;
  timerSpan.textContent = 10;

  startGame();
}

function resetTimer() {
  clearInterval(gameTimer);
}

//Enter Key To Guess
document.addEventListener("keydown", checkKey);

//Click Button to Reset Game
resetButton.addEventListener("click", resetGame);

//Start Button to Start Game
startButton.addEventListener("click", startGame);
