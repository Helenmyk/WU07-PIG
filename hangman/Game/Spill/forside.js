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

function ingenLyd() {
  let lyd = document.getElementById("lydfil");
  if (lyd.muted == true) {
    lyd.muted = false;
    stille.src = "speaker.png";
  } else {
    lyd.muted = true;
    stille.src = "no-sound.png";
  }
  stille.blur();
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
