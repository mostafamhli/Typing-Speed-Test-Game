const easyWords = [
  "Hello",
  "Rust",
  "Test",
  "Roles",
  "Funny",
  "Scala",
  "Town",
  "Code",
  "Task",
  "Coding",
];

const normalWords = [
  "Country",
  "Testing",
  "Youtube",
  "Github",
  "Python",
  "Twitter",
  "Runner",
  "Styling",
  "Cascade",
  "Playing",
];
const hardWords = [
  "Programming",
  "Javascript",
  "Linkedin",
  "Leetcode",
  "Internet",
  "Destructuring",
  "Paradigm",
  "Documentation",
  "Working",
  "Dependencies",
];

const lvls = {
  Easy: 3,
  Normal: 3,
  Hard: 3,
};

let defaultLevel = "Normal";
let defaultLevelSeconds = lvls[defaultLevel];

let words;
switch (defaultLevel) {
  case "Easy":
    words = easyWords;
    break;
  case "Normal":
    words = normalWords;
    break;
  case "Hard":
    words = hardWords;
    break;
}

let startButton = document.querySelector(".start");
let levelName = document.querySelector(".message .lvl");
let levelSeconds = document.querySelector(".message .seconds");
let word = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

levelName.innerHTML = defaultLevel;
levelSeconds.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

input.onpaste = function () {
  return false;
};

startButton.onclick = function () {
  this.remove();
};

let saveChangesButton = document.querySelector(".saveChanges");
saveChangesButton.setAttribute("data-bs-dismiss", "modal");
saveChangesButton.onclick = function () {
  var select = document.querySelector(".form-select");
  defaultLevel = select.options[select.selectedIndex].value;
  defaultLevelSeconds = lvls[defaultLevel];
  levelName.innerHTML = defaultLevel;
  levelSeconds.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words.length;
  switch (defaultLevel) {
    case "Easy":
      words = easyWords;
      break;
    case "Normal":
      words = normalWords;
      break;
    case "Hard":
      words = hardWords;
      break;
  }
  scoreTotal.innerHTML = words.length;
  input.focus();
  generateWords();
};
document.querySelector(".closeButton").onclick = function () {
  input.focus();
  generateWords();
};

function generateWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  //remove word from array
  words.splice(wordIndex, 1);
  word.innerHTML = randomWord;
  //empty upcomming words and fill it again
  upComingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upComingWords.appendChild(div);
  }
  console.log();
  if (words.length === 9) {
    setTimeout(() => {
      startPlaying();
    }, 2000);
  } else {
    startPlaying();
  }
}

function startPlaying() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (word.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          generateWords();
        } else {
          let congrat = document.querySelector(".Congrat");
          congrat.style.display = "flex";
        }
      } else {
        let gameOver = document.querySelector(".game-over");
        gameOver.style.display = "block";
        document.querySelector(".game-over .butt .yes").onclick = function () {
          location.reload();
        };
        document.querySelector(".game-over .butt .no").onclick = function () {
          window.close();
        };
      }
    }
  }, 1000);
}
