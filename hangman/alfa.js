
/*------------- constants -------------*/
var words = [
    'HØNEMOR',
    'LESEHEST',
    'RINGREV',
    'DANSELØVE',
    'HERMEGÅS',
    'SNEGLEFART',
    'LINSELUS',
    'LÅRHØNE',
    'SVINDYRT',
    'TULLEBUKK',
    'VINGLEMUS',
    'DUMPAPP',
    'GRISEVÆR',
    'FYTTIGRISEN',
    'GRISEFLAKS',
    'GRISEGOD',
    'HELDIGGRIS',
    'REDDHARE',
    'KLATREMUS'
];

/*------------- constants -------------*/
var utrykk = [
    'SLU SOM EN REV',
    'STILLE SOM EN MUS',
    'DUM SOM EN SAU',
    'STA SOM ET ESEL',
    'TJUKK SOM EN GRIS',
    'SVETTER SOM EN GRIS',
    'TROFAST SOM EN HUND',
    'STOLT SOM EN HANE',
    'FEIG SOM EN KYLLING',
    'LITEN SOM EN MUS',
    'SNILL SOM ET LAM',
    'SMIDIG SOM EN KATT',
    'KAKLE SOM EN HØNE',
    'HYLE SOM EN GRIS',
    'STYGG SOM EN KU',
    'LEKEN SOM EN KATT',
    'VAGLE SOM EN GÅS',
    'KJØRE SOM ET SVIN',
    'FATTIG SOM EN KIRKEROTTE',
    'GALE SOM EN HANE',
    'MJAUE SOM EN KATT',
    'FROM SOM ET LAM',
    'SINT SOM EN OKSE',
    'PIPE SOM EN MUS',
    'KLATRE SOM EN GEIT',
    'KLAR SOM ET EGG',
    'FRI SOM FUGLEN',
    'LISTE SEG PÅ KATTEPOTER',
    'KASTE PERLER FOR SVIN',
    'LOPPER I BLODET',
    'KLEKKE UT EN PLAN',
    'DET GÅR DEN VEIEN HØNA SPARKER'
    'HA SINE SVIN PÅ SKOGEN',
    'DET ER BEDRE MED EN FUGL I HÅNDA ENN TI PÅ TAKET',
    'Å REGNE HUNDER OG KATTER',
    'SULTEN SOM EN HEST',
    'SKVETTE VANN PÅ GÅSA',
    'INGEN VET HVOR HAREN HOPPER',
    'GJØR IKKE EN FLUE FORTRED'
    'SULTEN SOM EN ULV'

>>>>>>> 4f928585445e5bea1c4a41261867850e5e7e8d6a
];

/*------------- app's state -------------*/
var secretWord, wrongCount, guess;

/*------------- cached element references -------------*/
var $guess = $("#guess");
var $img = $("#hang-img");
var $message = $("#message");

/*------------- event listeners -------------*/
$("#letters").on("click", handleLetterClick);

$("#reset").on("click", initialize);

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
  $img.attr("src", "images/img" + wrongCount + ".png");

  if (guess === secretWord) {
    // Hvis vinner
  } else if (wrongCount === 7) {
    // Hvis Taper
  } else {
    // ?
  }
}

function handleLetterClick(evt) {
  if (wrongCount === 7) return;
  evt.target.style.backgroundColor = "white";
  evt.target.style.opacity = "0.5";
  var letter = evt.target.textContent;
  console.log(secretWord);
  if (secretWord.includes(letter)) {
    var pos = secretWord.indexOf(letter);
    while (pos >= 0) {
      guess = guess.split("");
      guess[pos] = letter;
      guess = guess.join("");
      pos = secretWord.indexOf(letter, pos + 1);
    }
  } else {
    if (evt.target.id !== "reset") {
      wrongCount++;
    }
  }

  $(evt.target).prop("disabled", true);
  $("#reset").prop("disabled", false);
  render();
}
