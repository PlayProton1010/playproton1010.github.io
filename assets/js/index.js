  const colorChangingText = document.getElementById('color-changing-text');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let currentColorIndex = 1; 

function changeColor() {
  colorChangingText.style.color = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length; 
}

setInterval(changeColor, 1000); 
