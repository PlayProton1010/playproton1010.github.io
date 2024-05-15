  const colorChangingText = document.getElementById('color-changing-text');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let currentColorIndex = 1; 

function changeColor() {
  colorChangingText.style.color = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length; 
}

setInterval(changeColor, 1000); 

function function() {
  preventDefault()
var url = window.location.href
    var urlObj = new window.URL(window.location.href);
    document.getElementById("create").onclick = function () {
      if (url.value.substring(0, 8) !== "https://" && url.value.substring(0, 7) !== "http://") {
        url.value = "https://" + url.value.split("https://").pop();
      } else if (url.value.substring(0, 7) == "http://") {
        url.value = "https://" + url.value.split("http://").pop();
      }
      win = window.open();
      win.document.body.style.margin = "0";
      win.document.body.style.height = "100vh";
      var iframe = win.document.createElement("iframe");
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.margin = "0";
      iframe.referrerpolicy = "no-referrer";
      iframe.allow = "fullscreen";
      iframe.src = url.value;
      win.document.body.appendChild(iframe);
    };
  window.location.href = "https://useproton.github.io/play.html"
}
