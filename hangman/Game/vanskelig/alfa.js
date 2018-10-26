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

var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  $("#iframeAudio").remove();
} else {
  $("#playAudio").remove(); //just to make sure that it will not have 2x audio in the background
}

var words = [
  "SLU SOM EN REV",
  "STILLE SOM EN MUS",
  "DUM SOM EN SAU",
  "STA SOM ET ESEL",
  "TJUKK SOM EN GRIS",
  "SVETTER SOM EN GRIS",
  "TROFAST SOM EN HUND",
  "STOLT SOM EN HANE",
  "FEIG SOM EN KYLLING",
  "LITEN SOM EN MUS",
  "SNILL SOM ET LAM",
  "SMIDIG SOM EN KATT",
  "KAKLE SOM EN HØNE",
  "HYLE SOM EN GRIS",
  "STYGG SOM EN KU",
  "LEKEN SOM EN KATT",
  "VAGLE SOM EN GÅS",
  "KJØRE SOM ET SVIN",
  "GALE SOM EN HANE",
  "MJAUE SOM EN KATT",
  "FROM SOM ET LAM",
  "SINT SOM EN OKSE",
  "PIPE SOM EN MUS",
  "KLATRE SOM EN GEIT",
  "KLAR SOM ET EGG",
  "FRI SOM FUGLEN",
  "LOPPER I BLODET",
  "KLEKKE UT EN PLAN",
  "REGNE HUNDER OG KATTER",
  "SULTEN SOM EN HEST",
  "SKVETTE VANN PÅ GÅSA",
  "SULTEN SOM ULV"
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
  var number = getRandomInt(3);
  console.log(number);
  document.getElementById("pop" + number).play();
  setTimeout(removeImg, 300);
}

function removeImg() {
  blng.style.display = "none";
}
