  const colorChangingText = document.getElementById('color-changing-text');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let currentColorIndex = 1; 

function changeColor() {
  colorChangingText.style.color = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length; 
}

setInterval(changeColor, 1000); 

function E() {
event.preventDefault();
var url = "https://useproton.github.io/play.html";
var win = window.open();
win.document.body.style.margin = "0";
win.document.body.style.height = "100vh";
var iframe = win.document.createElement("iframe");
  var nav = getElementById("nav")
  nav.document.style.visibility = "hidden"
iframe.style.border = "none";
iframe.style.width = "100%";
iframe.style.height = "calc(100vh - 100px)"; 
iframe.style.margin = "0";
iframe.referrerpolicy = "no-referrer";
iframe.allow = "fullscreen";
iframe.src = url;
win.document.body.appendChild(iframe);
  nav.document.style.display = "none";
nav.style.backgroundColor = "darkgrey";
nav.style.display = "flex";
nav.style.justifyContent = "flex-start";
nav.style.width = "100%";
nav.style.height = "10%";
nav.style.position = "fixed";
nav.style.top = "0";
nav.style.zIndex = 10;
nav.style.flexWrap = "wrap";
nav.style.alignItems = "center";
const navUl = document.createElement("ul");
navUl.style.listStyle = "visible";
navUl.style.margin = "0";
navUl.style.padding = "0";
nav.appendChild(navUl);
location.replace("https://google.com");
}
  
