  const colorChangingText = document.getElementById('color-changing-text');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let currentColorIndex = 1; 

function changeColor() {
  colorChangingText.style.color = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length; 
}

setInterval(changeColor, 1000); 

function E() {
  event.preventDefault()
var url = "https://useproton.github.io/play.html";
  var win = window.open();
  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";
  var iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.margin = "0";
  iframe.referrerpolicy = "no-referrer";
  iframe.allow = "fullscreen";
  iframe.src = url;
  win.document.body.appendChild(iframe);
  if (localStorage.getItem("RL") == null) {
   localStorage.setItem("RL","https://www.google.com");
}
window.location.href = localStorage.getItem("RL");
