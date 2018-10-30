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
      let skjermSide = document.getElementById("border" + i);
      skjermSide.classList.remove("side" + i);
    }
  }
});

//Funskjon som skrur bakgrunnsmusikken av på siden
function ingenLyd() {
  var lyd = document.getElementById("lydFil");
  if (lyd.muted == true) {
    //Sjekker om lyden er av
    lyd.muted = false; //Skrur på lyden dersom den er av
    lydBilde.src = "../Bilder/speaker.png"; //Gir et bilde til knappen
  } else {
    lyd.muted = true; //Hvis lyden er på, skrus lyden av
    lydBilde.src = "../Bilder/no-sound.png"; //Gir et bilde til knappen
  }
  lydBilde.blur(); //Fjerner fokus fra knappen så den ikke skrus av/på ved trykk på enter
}

/*
let player;
let isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  $("#iframeAudio").remove();
  player = false;
} else {
  $("#playAudio").remove(); //Sletter iframe elementet for å unngå dobbel lyd avspilling.
  player = true;
}
let music = document.getElementById("playAudio");
music.play();
music.loop = true;
*/
let words = [
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
let secretWord, wrongCount, guess, letter, contains;

/*------------- cached element references -------------*/
let $guess = $("#guess");
let $img = $("#hang-img");
let $message = $("#message");

/*------------- event listeners -------------*/
$("#letters").on("click", handleLetterClick);

/*------------- functions -------------*/
initialize();

function initialize() {
  wrongCount = 0;
  secretWord = words[getRandomInt(words.length - 1)]; //Velger tilfedlig ord fra words array

  guess = "";

  for (let i = 0; i < secretWord.length; i++) {
    //i denne for løkken gjøres ordet om fra vanlig bokstaver til understreker og legger til mellomrom der det er.
    let currentLetter = secretWord[i];
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
  //funksjon for å skrive ut tilfedig tall avhengig av maks-tallet du gir den
  return Math.floor(Math.random() * (max + 1));
}

function render() {
  $guess.html(guess);
  // pop balloong

  if (guess === secretWord) {
    setTimeout(vinnFunksjon, 700);
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
    setTimeout(spillLyd, 700);
  }
}

function handleLetterClick(evt) {
  if (wrongCount === 7) return; //hvis spiller har tapt kjøres ikke resten av funskjonen
  for (i = 1; i < 30; i++) {
    if (evt.target.id == "knapp" + i) {
      //fikser bug der flere ting enn bare knapepr kunne bli trykket på for å kjøre koden under
      evt.target.style.backgroundColor = "white";
      evt.target.style.opacity = "0.5";
      letter = evt.target.textContent;
      console.log(secretWord);
      if (secretWord.includes(letter)) {
        contains = true;
        let pos = secretWord.indexOf(letter);
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
  let number = getRandomInt(3);
  console.log(number);
  document.getElementById("pop" + number).play();
  setTimeout(removeBlng, 300);
}

function removeBlng() {
  blng.style.display = "none";
}

function spillLyd() {
  //  if (player == true) {
  //    document.getElementById("iframeAudio").src = "";
  //  } else {
  //    document.getElementById("playAudio").pause();
  //  }
  pauseAnimasjoner();
  document.getElementById("alert").play();
  setTimeout(tapt, 1000);
}
let skyPause;
function pauseAnimasjoner() {
  document.getElementById("gob").style.webkitAnimationPlayState = "paused";
  for (let i = 1; i < 6; i++) {
    skyPause = document.getElementById("sky" + i);
    skyPause.style.webkitAnimationPlayState = "paused";
  }
}

let tastatur = document.getElementById("letters");

function vinnFunksjon() {
  document.getElementById("guess").style.color = "green";
  document.getElementById("fall").play();
  setTimeout(vinnFunksjon2, 2300);
}

function vinnFunksjon2() {
  pauseAnimasjoner();
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards";
  setTimeout(skyAnimasjonVinn, 1000);
}

let skyPos;
let grisPos;
let gaardBakgrunn;
function skyAnimasjonVinn() {
  for (let j = 1; j < 6; j++) {
    skyPos = document.getElementById("sky" + j);
    skyPos.style.left = skyPos.offsetLeft + "px";
    skyPos.style.animation = "animerSky 2.5s ease-in 0s normal 1 forwards";
  }
  gaardBakgrunn = document.getElementById("gaard");
  gaardBakgrunn.style.animation =
    "animerLanding 2.5s ease-out 0s normal 1 forwards";
  setTimeout(grisAnimasjonVinn, 1500);
}

function grisAnimasjonVinn() {
  grisPos = document.getElementById("gob");
  grisPos.style.top = grisPos.offsetTop + "px";
  document.getElementById("gob").style.animation =
    "grisVinn 2.5s ease-in-out 0s normal 1 forwards";
}

function tapt() {
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards";
  setTimeout(grisAnimasjon, 1000);
}

function grisAnimasjon() {
  grisPos = document.getElementById("gob");
  grisPos.style.top = grisPos.offsetTop + "px";

  for (let j = 1; j < 6; j++) {
    skyPos = document.getElementById("sky" + j);
    skyPos.style.left = skyPos.offsetLeft + "px";
    skyPos.style.animation = "animerSky 1.8s ease-in 0s normal 1 forwards";
  }

  document.getElementById("fall").play();
  document.getElementById("gob").style.animation =
    "animerGris 1.8s ease-in 0s normal 1 forwards";
}
