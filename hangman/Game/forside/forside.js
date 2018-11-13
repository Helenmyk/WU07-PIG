let vgrad; //definerer den globale variabelen vgrad med let fordi den brukes gjentatte ganger

function startSpill() { //funksjonen som skjer når man trykker på "start spill"
  vgrad = document.getElementById("vGrad"); //henter variabelen vgrad og setter den lik elementet vGrad
  vgrad.style.animation = "testAnimation 0.7s ease-out 0s normal 1 forwards"; //animerer vanskelighetsgrad-boksen nedover
  if (menyBoksHistorie.style.display == "block") {//hvis menyBoksHistorie har dispay block kjøres koden i if-en
    menyBoksHistorie.style.display = "none"; // display endres til "none" slik at historie-boksen skjules, hvis den er åpen, når man trykker på "start spill"
  } else if (menyBoksRegler.style.display == "block") {//hvis menyBoksRegler har dispay block kjøres koden i if-en
    menyBoksRegler.style.display = "none"; // display endres til "none" slik at regel-boksen skjules, hvis den er åpen, når man trykker på "start spill"
  }
  document.getElementById("regler").disabled = true;//"disabler" knappen regler
  document.getElementById("historie").disabled = true;//"disabler" knappen historie
}

function tilbakeVGrad() { //funksjonen som skjer hvis man trykker på tilbakeknappen i vanskelighetsgrad-menyen
  vgrad = document.getElementById("vGrad"); //henter variabelen vgrad
  vgrad.style.top = "100px";
  vgrad.style.animation = "tilbakeAnimasjon 0.7s ease-in 0s normal 1 forwards"; // animerer vanskelighetsgrad-boksen oppover

  document.getElementById("regler").disabled = false; //"undisabler" knappen regler
  document.getElementById("historie").disabled = false; //"undisabler" knappen historie
}

// funksjon for at historie-boksen lukker seg dersom regel-boksen blir trykket på
function regler() {
  let menyBoksRegler = document.getElementById("menyBoksRegler");
  if (menyBoksHistorie.style.display == "block") { //hvis menyBoksHistorie har display block kjøres koden i if-en
    menyBoksHistorie.style.display = "none"; //display endres til "none" slik at den skjules
  }
  if (menyBoksRegler.style.display == "block") { //hvis menyBoksRegler har dispay block kjøres koden i if-en
    menyBoksRegler.style.display = "none"; //display endres til "none" slik at den skjules
  } else {
    menyBoksRegler.style.display = "block"; //display endres til "block" slik at den synes
  }
}

// funksjon for at regel-boksen lukker seg dersom historie-boksen blir trykket på
function historie() {
  let menyBoksHistorie = document.getElementById("menyBoksHistorie");
  if (menyBoksRegler.style.display == "block") { //hvis menyBoksRegler har dispay block kjøres koden i if-en
    menyBoksRegler.style.display = "none"; //display endres til "none" slik at den skjules
  }
  if (menyBoksHistorie.style.display == "block") { //hvis menyBoksHistorie har dispay block kjøres koden i if-en
    menyBoksHistorie.style.display = "none"; //display endres til "none" slik at den skjules
  } else {
    menyBoksHistorie.style.display = "block"; //display endres til "block" slik at den synes
  }
}

function lett() { // funksjon som tar deg til index.html i lett mappen dersom du trykker på "ord"
  document.location.href = "../lett/index.html";
}

function vanskelig() { // funksjon som tar deg til index.html i vanskelig mappen dersom du trykker på uttrykk
  document.location.href = "../vanskelig/index.html";
}

function ingenLyd() { // funskjon som skrur bakgrunnsmusikken av på siden
  let lyd = document.getElementById("lydFil"); // definerer variabelen lyd og sier den lik elementet lydFil
  if (lyd.muted == true) { // sjekker om lyden er av
    lyd.muted = false; // skrur på lyden dersom den er av
    lydBilde.src = "../Bilder/speaker2.png"; // gir et bilde til knappen
  } else {
    lyd.muted = true; // hvis lyden er på, skrus lyden av
    lydBilde.src = "../Bilder/mute-2.png"; // gir et bilde til knappen
  }
  lydBilde.blur(); // fjerner fokus fra knappen så den ikke skrus av/på ved trykk på enter
}
