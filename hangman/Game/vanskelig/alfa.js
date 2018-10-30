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
  /*/if (player == true) {
    document.getElementById("iframeAudio").src = "";
  } else {
    document.getElementById("playAudio").pause();
  }*/
  document.getElementById("gob").style.webkitAnimationPlayState = "paused";
  document.getElementById("sky1").style.webkitAnimationPlayState = "paused";
  document.getElementById("sky2").style.webkitAnimationPlayState = "paused";
  document.getElementById("sky3").style.webkitAnimationPlayState = "paused";
  document.getElementById("alert").play();
  setTimeout(tapt, 1000);
}

function tapt() {
  let tastatur = document.getElementById("letters");
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards";
  setTimeout(grisAnimasjon, 1000);
}

function grisAnimasjon() {
  var grisPos = document.getElementById("gob");
  grisPos.style.top = grisPos.offsetTop + "px";

  for (let j = 1; j < 4; j++) {
    var skyPos = document.getElementById("sky" + j);
    skyPos.style.left = skyPos.offsetLeft + "px";
    skyPos.style.animation = "animerSky 1.8s ease-in 0s normal 1 forwards";
  }

  document.getElementById("fall").play();
  document.getElementById("gob").style.animation =
    "animerGris 1.8s ease-in 0s normal 1 forwards";
}
