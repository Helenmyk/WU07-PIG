if (window.performance) {
  console.info("window.performance works fine on this browser");
}
if (performance.navigation.type == 1) {
  location.href = "../forside/forside.html";
}
let flyttingBokstaver = document.getElementById("letters");
window.addEventListener("resize", function() {
  //Lytter til størrelsen på skjermen/vinduet flytter tastaturet litt opp hvis skjermen er mindre enn 1000px
  if (window.matchMedia("(min-width: 1000px)").matches) {
    console.log("Screen width is at least 1000px");
    flyttingBokstaver.style.marginTop = "25%";
  } else {
    console.log("Screen less than 1000px");
    flyttingBokstaver.style.marginTop = "30%";
  }
});
window.addEventListener("resize", function() {
  //fix for at tastaturet oppfører seg rart
  if (window.matchMedia("(min-width: 1250px)").matches) {
    console.log("Screen width is at least 1250px");
    flyttingBokstaver.style.marginTop = "25%";
  }
});

var words = [
  "SLU SOM EN REV",
  "STILLE SOM EN MUS",
  "DUM SOM EN SAU",
  "STA SOM ET ESEL",
  "TJUKK SOM EN GRIS",
  "STOLT SOM EN HANE",
  "LITEN SOM EN MUS",
  "SNILL SOM ET LAM",
  "KAKLE SOM EN HØNE",
  "HYLE SOM EN GRIS",
  "STYGG SOM EN KU",
  "LEKEN SOM EN KATT",
  "VAGGE SOM EN GÅS",
  "KJØRE SOM ET SVIN",
  "GALE SOM EN HANE",
  "MJAUE SOM EN KATT",
  "SINT SOM EN OKSE",
  "PIPE SOM EN MUS",
  "KLAR SOM ET EGG",
  "FRI SOM FUGLEN",
  "LOPPER I BLODET"
];

let secretWord, wrongCount, guess, letter, contains; //definert noen globale variabler

let $guess = $("#guess"); //henter elementet guess med id
let $message = $("#message"); //henter elementet message med id

$("#letters").on("click", handleLetterClick); //når diven letters blir trykt på kjøres funksjonen handleLetterClick

initialize(); //kjører funksjonen intitialize når siden lastes.

function initialize() {
  wrongCount = 0; //setter wrongcounten til 0
  secretWord = words[getRandomInt(words.length - 1)]; //Velger tilfedlig ord fra words array

  guess = "";

  for (let i = 0; i < secretWord.length; i++) {
    //i denne for-løkken gjøres ordet om fra vanlig bokstaver til understreker og legger til mellomrom der det er.
    let currentLetter = secretWord[i];
    if (currentLetter === " ") {
      guess += " ";
    } else {
      guess += "_";
    }
  }

  $("button.letter-button").prop("disabled", false); //"skrur på knappene"
  render(); //kjører funksjonen render
}

function getRandomInt(max) {
  //funksjon for å skrive ut tilfedig tall avhengig av maks-tallet du gir den
  return Math.floor(Math.random() * (max + 1));
}

function render() {
  $guess.html(guess); //gjør elementet guess lik variabelen guess
  // pop balloong

  if (guess === secretWord) {
    //kjører funksjonen sprekk fram til wrongcount er nådd 7 da kjøres spillLyd (starten på tap sekvensen)
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
  } else if (wrongCount === 8 && contains == false) {
    sprekk();
  } else if (wrongCount === 9 && contains == false) {
    sprekk();
    setTimeout(spillLyd, 700);
  }
}
let dingSound = 1;
let pauseTid = true;
function handleLetterClick(evt) {
  if (pauseTid == true) {
    if (wrongCount === 9) return; //hvis spiller har tapt kjøres ikke resten av funskjonen
    for (i = 1; i < 30; i++) {
      if (evt.target.id == "knapp" + i) {
        //fikser bug der flere ting enn bare knapper kunne bli trykket på for å kjøre koden under
        evt.target.style.backgroundColor = "white"; //endrer farge på den trykte knappen
        evt.target.style.opacity = "0.5"; //gjør den trykte knappen mer gjennomsiktig
        letter = evt.target.textContent; //setter variabelen letter lik verdien av den trykte knappen
        console.log(secretWord);
        if (secretWord.includes(letter)) {
          //hvis secretWord inneholder den trykte bokstaven kjøres if-en
          if (dingSound == 3) {
            dingSound = 1;
          }
          document.getElementById("ding" + dingSound).play();
          dingSound++;
          contains = true; //fikser bug for render funksjonen der flere ballonger sprakk samtidig
          let pos = secretWord.indexOf(letter); //
          while (pos >= 0) {
            //endrer understreken i guess til den trykte knappen
            guess = guess.split("");
            guess[pos] = letter;
            guess = guess.join("");
            pos = secretWord.indexOf(letter, pos + 1);
          }
        } else {
          contains = false;
          wrongCount++;
        }

        $(evt.target).prop("disabled", true);
        render();
      }
    }
    pauseTid = false;
    setTimeout(function() {
      pauseTid = true;
    }, 600);
  }
}
let antallHint = 0;
let selectedChar;
function hint() {
  for (let i = 0; i < 15; i++) {
    if (guess[i] == "_") {
      selectedChar = secretWord[i];
      console.log("ok " + selectedChar);
      for (let j = 1; j < 30; j++) {
        if (document.getElementById("knapp" + j).innerHTML == selectedChar) {
          document.getElementById("knapp" + j).style.backgroundColor = "white";
          document.getElementById("knapp" + j).style.opacity = "0.5";
          $("#knapp" + j).prop("disabled", true);
          console.log("Funksjonen blir kjørt");
          for (let h = 0; h < secretWord.length; h++) {
            if (secretWord[h] == selectedChar) {
              guess = endreBokstav(guess, h, selectedChar);
              document.getElementById("guess").innerHTML = guess;
            }
          }
        }
      }
      if (guess == secretWord) {
        setTimeout(vinnFunksjon, 700);
      }
      document.getElementById("hintKnapp").onclick = bruktOppHint;
      break;
    }
  }
}

function endreBokstav(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function bruktOppHint() {
  alert("Du har ikke flere hint!");
}

let blng;
function sprekk() {
  blng = document.getElementById("ballong" + wrongCount);
  blng.src = "../Bilder/blng.gif";
  let number = getRandomInt(3);
  document.getElementById("pop" + number).play();
  setTimeout(removeBlng, 300);
  setTimeout(function() {
    if (wrongCount === 9) {
      document.getElementById("streken").style.display = "none";
    }
  }, 100);
}

function removeBlng() {
  blng.style.display = "none";
}

function spillLyd() {
  document.getElementById("guess").innerHTML = secretWord; //Skriver ut hva det riktige ordet var
  document.getElementById("guess").style.color = "red"; //Skriver ut riktig ord i rødt
  document.getElementById("lydFil").pause();

  pauseAnimasjoner();
  document.getElementById("alert").play();
  document.getElementById("grisen").src = "../Bilder/overrasket.png";
  setTimeout(tapt, 2000);
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
  document.getElementById("lydFil").pause();
  document.getElementById("guess").style.color = "green";
  document.getElementById("grisen").src = "../Bilder/blid.png";
  document.getElementById("vinnLyd").play();
  setTimeout(vinnFunksjon2, 2300);
}

function vinnFunksjon2() {
  document.getElementById("vinnSang").play();
  pauseAnimasjoner();
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards";
  setTimeout(skyAnimasjonVinn, 1000);
}

let skyPos, grisPos, gaardBakgrunn, gressBakgrunn, restartBoksVinn;
function skyAnimasjonVinn() {
  for (let j = 1; j < 6; j++) {
    skyPos = document.getElementById("sky" + j);
    skyPos.style.left = skyPos.offsetLeft + "px";
    skyPos.style.animation = "animerSky 2.5s ease-in 0s normal 1 forwards";
  }
  gaardBakgrunn = document.getElementById("gaardOgmamma");
  gaardBakgrunn.style.display = "block";
  gaardBakgrunn.style.animation =
    "animerLanding 2.5s ease-out 0s normal 1 forwards";
  setTimeout(grisAnimasjonVinn, 1500);
  1;
}

function grisAnimasjonVinn() {
  grisPos = document.getElementById("gob");
  grisPos.style.top = grisPos.offsetTop + "px";
  document.getElementById("gob").style.animation =
    "animerGris 2.5s ease-in-out 0s normal 1 forwards";
  setTimeout(boksAnimasjonVinn, 3700);
}

function boksAnimasjonVinn() {
  restartBoksVinn = document.getElementById("restartMenyVinn");
  restartBoksVinn.style.animation =
    "animerBoks 0.7s ease-out 0s normal 1 forwards";
}

function tapt() {
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards";
  setTimeout(grisAnimasjonTap, 1000);
}

function grisAnimasjonTap() {
  for (let j = 1; j < 6; j++) {
    skyPos = document.getElementById("sky" + j);
    skyPos.style.left = skyPos.offsetLeft + "px";
    skyPos.style.animation = "animerSky 1.8s ease-in 0s normal 1 forwards";
  }
  document.getElementById("fall").play();
  sky6 = document.getElementById("sky6");
  setTimeout(function() {
    sky6.style.display = "block";
    sky6.style.animation = "skyFallAnimasjon 2s ease-in 0s normal 1 forwards";
    setTimeout(grisTapFall, 1800);
  }, 1000);
}
function grisTapFall() {
  grisPos = document.getElementById("gob");
  grisPos.style.top = grisPos.offsetTop + "px";
  document.getElementById("grisen").style.animation =
    "animerGris 0.5s ease-out 0s normal 1 forwards";
  gressBakgrunn = document.getElementById("gress");
  gressBakgrunn.style.display = "block";
  gressBakgrunn.style.animation = "tapLanding 0.5s linear 0s normal 1 forwards";
  setTimeout(function() {
    document.getElementById("splat").play();
    setTimeout(function() {
      document.getElementById("grisen").src = "../Bilder/skvist.png";
    }, 250);
  }, 100);
  setTimeout(boksAnimasjonTap, 2500);
}

function boksAnimasjonTap() {
  var restartBoksTap = document.getElementById("tapMeny");
  restartBoksTap.style.animation =
    "testAnimation 0.7s ease-out 0s normal 1 forwards";
}

function tilMeny() {
  location.href =
    "http://folk.ntnu.no/marilhan/hangman/Game/forside/forside.html";
}

function spillIgjen() {
  location.href =
    "http://folk.ntnu.no/marilhan/hangman/Game/vanskelig/index.html";
}
function menyBtn() {
   location.href =
    "http://folk.ntnu.no/marilhan/hangman/Game/forside/forside.html"
}
