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

//Funskjon som skrur bakgrunnsmusikken av på siden
function ingenLyd() {
  var lyd = document.getElementById("lydFil");
  if (lyd.muted == true) {
    //Sjekker om lyden er av
    lyd.muted = false; //Skrur på lyden dersom den er av
    lydBilde.src = "../Bilder/speaker2.png"; //Gir et bilde til knappen
  } else {
    lyd.muted = true; //Hvis lyden er på, skrus lyden av
    lydBilde.src = "../Bilder/mute-2.png"; //Gir et bilde til knappen
  }
  lydBilde.blur(); //Fjerner fokus fra knappen så den ikke skrus av/på ved trykk på enter
}

let words = [
  // hangman ordene
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

let secretWord, wrongCount, guess, letter, contains, blng, skyPause; //definert noen globale variabler

let $guess = $("#guess"); //henter elementet guess med id
let $message = $("#message"); //henter elementet message med id

$("#letters").on("click", handleLetterClick); //når diven letters blir trykt på kjøres funksjonen handleLetterClick

initialize(); //kjører funksjonen intitialize.

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
  if (guess === secretWord) {
    //hvis en har vunnet kjøres vinn sekvensen
    setTimeout(vinnFunksjon, 700);
  }
  for (let i = 1; i < 9; i++) {
    //sprekker en ballong hver gang denne kjøres fra ballong 1-8
    if (wrongCount === i && contains == false) {
      sprekk();
    }
  }
  if (wrongCount === 9 && contains == false) {
    sprekk();
    setTimeout(tapSekvens, 700);
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
        if (secretWord.includes(letter)) {
          //hvis secretWord inneholder den trykte bokstaven kjøres if-en
          if (dingSound == 3) {
            //Veksler mellom lyd for rett gjettet bokstav for å fikse bug der det ikke ble spilt lyd
            dingSound = 1;
          }
          document.getElementById("ding" + dingSound).play();
          dingSound++; //legger til 1 på dingsound så den konstant går mellom 1 og 2 på grunnen av ifen tidligere
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
          contains = false; // Contains fikser bug der en ballong poppet av og til når man gjettet riktig
          wrongCount++; //legger til 1 på wrongcount så en ny ballong popper og man til slutt kan tape
        }

        $(evt.target).prop("disabled", true); //setter den trykte knappen til disable
        render(); //kjører render funksjonen som bla.a oppdaterer guess.
      }
    }
    pauseTid = false; //dette sammens med timeouten under gjør at man ikke kan trykke på noen knapper på tastaturet-
    // mer enn 1 gang hvert 600 millisekund for å unngå diverse bugs som lydproblemer og ballong pop gif som ikke ville display :Funksjonen
    setTimeout(function() {
      pauseTid = true;
    }, 750);
  }
}
let antallHint = 0;
let selectedChar;
function hint() {
  //Funksjon for hint knapp (få en bokstav "gratis")
  for (let i = 0; i < 15; i++) {
    //for-løkke for å gå gjennom guess
    if (guess[i] == "_") {
      //finner ved hjelp av for-løkken første plass i ordet som ikke er gjettet enda
      selectedChar = secretWord[i]; //setter selectedChar til bokstaven i secretWord på plassen i guess vi fant ovenfor
      for (let j = 1; j < 30; j++) {
        //Ny for-løkke i den andre for-løkken for å gå gjennom knappene på tastaturet
        if (document.getElementById("knapp" + j).innerHTML == selectedChar) {
          //hvis knappen sin innerHTML altså bokstaven knappen er tildelt er lik selected char kjøres if-en
          document.getElementById("knapp" + j).style.backgroundColor = "white"; //endrer bakgrunnsfarge på knappen til hvit.
          document.getElementById("knapp" + j).style.opacity = "0.5"; //Gjør knappen litt gjennomsiktig
          $("#knapp" + j).prop("disabled", true); //setter knappen til disable
          for (let h = 0; h < secretWord.length; h++) {
            //Enda en for-løkke i de to andre for å gå gjennom secretword
            if (secretWord[h] == selectedChar) {
              //for plassene i secretWord med den utvalgte bokstaven kjøres if-en
              guess = endreBokstav(guess, h, selectedChar); //Den utvalgte bokstaven settes inn i stedet for "_" ved hjelp av funksjonen endreBokstav
              document.getElementById("guess").innerHTML = guess;
            }
          }
        }
      }
      if (guess == secretWord) {
        //dersom man bruker hintet på siste bokstav kjøres vinn-sekvensen
        setTimeout(vinnFunksjon, 700); //kjører funksjonen vinnFunksjon etter 0,7 sekund
      }
      document.getElementById("hintKnapp").onclick = bruktOppHint; //endrer onclick til hintknapp til bruktOppHint pga. at man bare har ett hint
      break;
    }
  }
}
//https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function endreBokstav(str, index, chr) {
  //Endrer bokstav "chr" på plassen "index" i stringen "str"
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function bruktOppHint() {
  //Funksjon for hint knapp når hintet er brukt opp
  alert("Du har ikke flere hint!");
}

function sprekk() {
  //Funksjon for å sprekke ballonger (kjøres hver gang man tar feil)
  blng = document.getElementById("ballong" + wrongCount); //Setter blng lik ballong(1-9)
  blng.src = "../Bilder/blng.gif"; //endrer bilder kilden til ballong sprekk gif-en
  let number = getRandomInt(3); //setter number lik et tilfeldig tall mellom 0 og 3
  document.getElementById("pop" + number).play(); //spiller av lyden i elementet pop + det tilfeldige tallet fått over for å veksle mellom pop lyder
  setTimeout(removeBlng, 300); //kjører funksjonen removeBlng når gifen er ferdig (etter 0,3 sekund)
  setTimeout(function() {
    if (wrongCount === 9) {
      document.getElementById("streken").style.display = "none"; //fjerner streken mellom grisen og ballong9 når ballong9 sprekker
    }
  }, 100); //bedre timing på fjerning av streken
}

function removeBlng() {
  //Funksjon for å skjule ballong
  blng.style.display = "none"; //setter display lik "none" som skjuler elementet
}

function pauseAnimasjoner() {
  //Funksjon for å pause grisen, ballongene og skyenes konstante animasjoner
  document.getElementById("gob").style.webkitAnimationPlayState = "paused"; //pauser animasjon for gris og ballong
  for (let i = 1; i < 6; i++) {
    //for-løkke for å pause animasjon for sky 1 til 5
    skyPause = document.getElementById("sky" + i);
    skyPause.style.webkitAnimationPlayState = "paused";
  }
}

let tastatur = document.getElementById("letters"); //Gjør den globale variabelen tastatur lik elementet letters i html

function vinnFunksjon() {
  //Første sekvens for når man har vunnet
  document.getElementById("lydFil").pause(); //pauser bakgrunnsmusikken
  document.getElementById("guess").style.color = "green"; //Endrer farge på guess til grønn
  document.getElementById("grisen").src = "../Bilder/blid.png"; //endrer elementet grisen sin kilde til den glade grisen siden man har vunnet
  document.getElementById("vinnLyd").play(); //spiller av seiers-lyden
  setTimeout(vinnFunksjon2, 2300); //etter 2.3 sekunder forsetter sekvensen med funksjonen vinnFunksjon2
}

function vinnFunksjon2() {
  //Neste steg i vinnsekvensen
  document.getElementById("vinnSang").play(); //spiller av seiers-sangen
  pauseAnimasjoner(); //Kjører funksjon for å pause gris, ballong og skyer
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards"; //tastaturet animeres ned og ut av bildet
  setTimeout(skyAnimasjonVinn, 1000); //etter ett sekund fortsetter vinnsekvensen med skyAnimasjonVinn
}

let skyPos, grisPos, gaardBakgrunn, gressBakgrunn, restartBoksVinn; //definerer noen globale variabler som bare er relevante nedenfor dette
function skyAnimasjonVinn() {
  //Sekvens der grisen begynner landingen sin ved gården
  tastatur.style.display = "none"; //skjuler tastaturet med display none
  for (let j = 1; j < 6; j++) {
    //for-løkke for å animere sky 1-5 oppover for å visualisere at grien drar nedover
    skyPos = document.getElementById("sky" + j); //setter skyPos lik elementet sky + j (der j er mellom 1 og 5)
    skyPos.style.left = skyPos.offsetLeft + "px"; //endrer plasseringen til skyene i css til deres plasering der animasjonen ble pauset.
    skyPos.style.animation = "animerSky 2.5s ease-in 0s normal 1 forwards"; //animerer skyene oppover for å visualisere at grisen drar nedover
    //bruker ease-in for at skyene skal akselerere slik at det ser ut som grisen drar raskere og raskere ned.
  }
  gaardBakgrunn = document.getElementById("gaardOgmamma"); //setter variabelen gaardBakgrunn lik elementet gaardOgmamma for videre bruk
  gaardBakgrunn.style.display = "block"; //endrer display fra none til block
  gaardBakgrunn.style.animation = //animerer bakgrunnen oppover fra utenfor skjermen til inn i skjermen
    "animerLanding 2.5s ease-out 0s normal 1 forwards";
  setTimeout(grisAnimasjonVinn, 1500); //når det er ett sekund igjen av animasjonen til bakgrunnen kjøres neste sekvens for å få-
  //en "smooth" overgang fra at bakgrunnen animeres opp til at grisen med ballonger animeres ned
}

function grisAnimasjonVinn() {
  //Nest siste funksjon for vinnsekvensen
  grisPos = document.getElementById("gob"); //setter grisPos lik elementet gob som er grisen og ballongen
  grisPos.style.top = grisPos.offsetTop + "px"; //endrer plasseringen til grisOgBallong i css til deres plasering der animasjonen ble pauset.
  document.getElementById("gob").style.animation = //animerer grisOgBallong ned mot gården
    "animerGris 2.5s ease-in-out 0s normal 1 forwards"; //bruker ease-in-out for akselerasjon og deakselerasjon for "smooth" overgang og landing
  setTimeout(boksAnimasjonVinn, 3700); //etter 3,7 sekunder kjøres siste sekvens boksAnimasjonVinn
}

function boksAnimasjonVinn() {
  //Siste for vinnsekvensen er funksjon for å animere inn restartBoksVinn
  restartBoksVinn = document.getElementById("restartMenyVinn"); //setter restartBoksVinn lik elementet restartMenyvinn som er boks for å spille igjen eller gå til meny
  restartBoksVinn.style.animation = //animerer inn boksen og får den til å bli der med "forwards"
    "animerBoksRestart 0.7s ease-out 0s normal 1 forwards";
}

function tapSekvens() {
  //første funksjon for tapsekvensen
  document.getElementById("guess").innerHTML = secretWord; //Skriver ut hva det riktige ordet var
  document.getElementById("guess").style.color = "red"; //Skriver ut riktig ord i rødt
  document.getElementById("lydFil").pause(); //pauser bakgrunnsmusikken
  pauseAnimasjoner(); //kjører funksjonen pauseAnimasjoner som stopper de konstante animasjonene til grisen og skyene
  document.getElementById("alert").play(); //spilelr av alert lyden
  document.getElementById("grisen").src = "../Bilder/overrasket.png"; //endrer gris kilde til den overraskede grisen
  setTimeout(tapt, 2000); //etter 2 sekunder kjøres funksjonen tapt
}

function tapt() {
  //animerer ut tastaturet
  tastatur.style.animation = "keyboardOut 0.7s ease-out 0s normal 1 forwards"; //tastaturet animeres ned og ut av bilde
  setTimeout(grisAnimasjonTap, 1000); //etter ett sekund kjøres neste funksjon i tapsekvensen grisAnimasjonTap
}

function grisAnimasjonTap() {
  //funksjon for å animere skyene opp i tap sekvensen for å visualisere at grisen faller
  tastatur.style.display = "none"; //skjuler tastaturet med display none
  for (let i = 1; i < 6; i++) {
    //for-løkke for å animere skyene 1-5 oppover
    skyPos = document.getElementById("sky" + i); //setter skyPos
    skyPos.style.left = skyPos.offsetLeft + "px"; //endrer plasseringen til skyene i css til deres plasering der animasjonen ble pauset.
    skyPos.style.animation = "animerSky 1.8s ease-in 0s normal 1 forwards"; //bruker ease-in i animasjonen for at skyene skal akselerere oppover
  }
  document.getElementById("fall").play(); //spiller av fall lyden
  sky6 = document.getElementById("sky6"); //setter variabelen sky6 lik elementet sky6
  setTimeout(function() {
    //etter ett sekund kjøres koden under
    sky6.style.display = "block"; //endrer display fra none til block på sky6
    sky6.style.animation = "skyFallAnimasjon 2s ease-in 0s normal 1 forwards"; //animerer sky 6 så den kommer nedefra og oppover får å forsette visualiseringen av at grisen faller
    setTimeout(grisTapFall, 1800); //etter 1,8 sekund kjøres neste del av tapsekvensen
  }, 1000);
}
function grisTapFall() {
  //nest siste funksjon i tapsekvensen der bakgrunnen animeres opp og grisen ned
  grisPos = document.getElementById("gob"); //setter variabelen grisPos lik elementet gob
  grisPos.style.top = grisPos.offsetTop + "px"; //endrer plasseringen til grisPos i css til  plaseringen der animasjonen ble pauset.
  document.getElementById("grisen").style.animation = //animerer grisen nedover i 0,5 sekund
    "animerGris 0.5s ease-out 0s normal 1 forwards";
  gressBakgrunn = document.getElementById("gress"); //setter variabelen gressBakgrunn lik elementet gress
  gressBakgrunn.style.display = "block"; //endrer display fra none til block
  gressBakgrunn.style.animation = "tapLanding 0.5s linear 0s normal 1 forwards"; //animerer gressBakgrunn oppover like lenge som grisen animeres ned
  setTimeout(function() {
    //etter 100 millisekund kjøres splat lyden
    document.getElementById("splat").play();
    setTimeout(function() {
      //etter 300 millisekund endres kilden til grisen til den skviste grisen
      document.getElementById("grisen").src = "../Bilder/skvist.png"; //endrer kilden til grisen til den skviste grisen
    }, 300);
  }, 100);
  setTimeout(boksAnimasjonTap, 2500); //når det har gått 2,5 sekunder kjøres den siste funksjonen i tapsekvensen
}

function boksAnimasjonTap() {
  //funksjonen animerer inn enn boks der man kan velge mellom å gå til meny eller spilel igjen
  let restartBoksTap = document.getElementById("tapMeny"); //definerer variabelen restartBoksTap lik elementet tapMeny
  restartBoksTap.style.animation = //animerer inn restart boksen
    "animerBoksRestart 0.7s ease-out 0s normal 1 forwards";
}

function tilMeny() {
  //funksjon for meny knappen i restartboksen
  location.href = "../forside/forside.html"; // endrer filen til vinduet til forside filen
}

function spillIgjen() {
  //funksjon for spill igjen knappen i restartboksen
  location.href = "../lett/index.html";
  // endrer filen til vinduet til samme filen for å refreshe siden
}
function menyBtn() {
  //funksjon for menyknappen oppe til høyre i spillvinduet
  location.href = "../forside/forside.html";
  // endrer filen til vinduet til forside filen
}
