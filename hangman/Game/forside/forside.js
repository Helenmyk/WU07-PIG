let vgrad = document.getElementById("vGrad");
function startSpill() {
  vgrad = document.getElementById("vGrad");
  vgrad.style.animation = "testAnimation 0.7s ease-out 0s normal 1 forwards";
  if (menyBoksHistorie.style.display == "block") {
    menyBoksHistorie.style.display = "none";
  } else if (menyBoksRegler.style.display == "block") {
    menyBoksRegler.style.display = "none";
  }
  document.getElementById("regler").disabled = true;
  document.getElementById("historie").disabled = true;
}

function tilbakeVGrad() {
  vgrad = document.getElementById("vGrad");
  vgrad.style.top = "100px";
  vgrad.style.animation = "tilbakeAnimasjon 0.7s ease-in 0s normal 1 forwards";

  document.getElementById("regler").disabled = false;
  document.getElementById("historie").disabled = false;
}

function regler() {
  let menyBoksRegler = document.getElementById("menyBoksRegler");
  if (menyBoksHistorie.style.display == "block") {
    menyBoksHistorie.style.display = "none";
  }
  if (menyBoksRegler.style.display == "block") {
    menyBoksRegler.style.display = "none";
  } else {
    menyBoksRegler.style.display = "block";
  }
}

function historie() {
  let menyBoksHistorie = document.getElementById("menyBoksHistorie");
  if (menyBoksRegler.style.display == "block") {
    menyBoksRegler.style.display = "none";
  }
  if (menyBoksHistorie.style.display == "block") {
    menyBoksHistorie.style.display = "none";
  } else {
    menyBoksHistorie.style.display = "block";
  }
}

function lett() {
  document.location.href = "../lett/index.html";
}
function vanskelig() {
  document.location.href = "../vanskelig/index.html";
}

//Funskjon som skrur bakgrunnsmusikken av på siden
function ingenLyd() {
  let lyd = document.getElementById("lydFil");
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
