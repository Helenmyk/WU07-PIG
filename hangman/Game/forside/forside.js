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

function startSpill() {
  var vgrad = document.getElementById("vGrad");
  vgrad.style.animation = "testAnimation 0.7s ease-out 0s normal 1 forwards";
}

function tilbakeVGrad() {
  var vgrad = document.getElementById("vGrad");
  vgrad.style.top = "100px";
  vgrad.style.animation = "tilbakeAnimasjon 0.7s ease-in 0s normal 1 forwards";
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
