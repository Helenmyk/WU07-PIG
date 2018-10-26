window.onload = oppstart();

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

let valgtBallong;
function oppstart() {
  let b1 = document.getElementById("ballong1");
  let b2 = document.getElementById("ballong2");
  let b3 = document.getElementById("ballong3");
  let b4 = document.getElementById("ballong4");
  let b5 = document.getElementById("ballong5");
  let b6 = document.getElementById("ballong6");
  let b7 = document.getElementById("ballong7");

  b1.onclick = event => {
    b1.src = "blng.gif";
    valgtBallong = "ballong1";
    setTimeout(removeImg, 300);
  };
  b2.onclick = event => {
    b2.src = "blng.gif";
    valgtBallong = "ballong2";
    setTimeout(removeImg, 300);
  };
  b3.onclick = event => {
    b3.src = "blng.gif";
    valgtBallong = "ballong3";
    setTimeout(removeImg, 300);
  };
  b4.onclick = event => {
    b4.src = "blng.gif";
    valgtBallong = "ballong4";
    setTimeout(removeImg, 300);
  };
  b5.onclick = event => {
    b5.src = "blng.gif";
    valgtBallong = "ballong5";
    setTimeout(removeImg, 300);
  };
  b6.onclick = event => {
    b6.src = "blng.gif";
    valgtBallong = "ballong6";
    setTimeout(removeImg, 300);
  };
  b7.onclick = event => {
    b7.src = "blng.gif";
    valgtBallong = "ballong7";
    setTimeout(removeImg, 300);
  };
}

function removeImg() {
  var elem = document.getElementById(valgtBallong);
  elem.parentNode.removeChild(elem);
}

function test() {
  var vgrad = document.getElementById("vGrad");
  vgrad.style.animation = "testAnimation 0.7s ease-out 0s normal 1 forwards";
}
