window.addEventListener("resize", function() {
  if (window.matchMedia("(min-width: 980px)").matches) {
    console.log("Screen width is at least 980px");
    for (let i = 1; i < 5; i++) {
      var element = document.getElementById("border" + i);
      element.classList.add("side" + i);
    }
  } else {
    console.log("Screen less than 980px");
    for (let i = 1; i < 5; i++) {
      var element = document.getElementById("border" + i);
      element.classList.remove("side" + i);
    }
  }
});

var words = [
  "HØNEMOR",
  "LESEHEST",
  "RINGREV",
  "DANSELØVE",
  "HERMEGÅS",
  "SNEGLEFART",
  "LINSELUS",
  "LÅRHØNE",
  "SVINDYRT",
  "TULLEBUKK",
  "VINGLEMUS",
  "DUMPAPP",
  "GRISEVÆR",
  "FYTTIGRISEN",
  "GRISEFLAKS",
  "GRISEGOD",
  "HELDIGGRIS",
  "REDDHARE",
  "KLATREMUS"
];

/*------------- app's state -------------*/
var secretWord, wrongCount, guess, letter, contains;

/*------------- cached element references -------------*/
var $guess = $("#guess");
var $img = $("#hang-img");
var $message = $("#message");

/*------------- event listeners -------------*/
$("#letters").on("click", handleLetterClick);

/*------------- functions -------------*/
initialize();

function initialize() {
  wrongCount = 0;
  secretWord = words[getRandomInt(words.length - 1)];

  guess = "";

  for (var i = 0; i < secretWord.length; i++) {
    var currentLetter = secretWord[i];
    if (currentLetter === " ") {
      guess += " ";
    } else {
      guess += "_";
    }
  }

  $("button.letter-button").prop("disabled", false);
  render();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function render() {
  $guess.html(guess);
  // pop balloong

  if (guess === secretWord) {
    console.log("du vant!");
  } else if (wrongCount === 1 && contains == false) {
    sprekk();
  } else if (wrongCount === 2 && contains == false) {
    sprekk();
  } else if (wrongCount === 3 && contains == false) {
    sprekk();
  } else if (wrongCount === 4 && contains == false) {
    sprekk();
  } else if (wrongCount === 5 && contains == false) {
    sprekk();
  } else if (wrongCount === 6 && contains == false) {
    sprekk();
  } else if (wrongCount === 7 && contains == false) {
    sprekk();
  }
}

function handleLetterClick(evt) {
  if (wrongCount === 7) return;
  for (i = 1; i < 30; i++) {
    if (evt.target.id == "knapp" + i) {
      evt.target.style.backgroundColor = "white";
      evt.target.style.opacity = "0.5";
      letter = evt.target.textContent;
      console.log(secretWord);
      if (secretWord.includes(letter)) {
        contains = true;
        var pos = secretWord.indexOf(letter);
        while (pos >= 0) {
          guess = guess.split("");
          guess[pos] = letter;
          guess = guess.join("");
          pos = secretWord.indexOf(letter, pos + 1);
        }
      } else {
        if (evt.target.id !== "reset") {
          contains = false;
          wrongCount++;
        }
      }

      $(evt.target).prop("disabled", true);
      $("#reset").prop("disabled", false);
      render();
    }
  }
}
let blng;
function sprekk() {
  blng = document.getElementById("ballong" + wrongCount);
  blng.src = "../Bilder/blng.gif";
  var number = getRandomInt(5);
  console.log(number);
  document.getElementById("pop" + number).play();
  setTimeout(removeImg, 300);
}

function removeImg() {
  blng.style.display = "none";
}
