const imageContainer = document.getElementById('image-container');

fetch('./assets/json/g.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(image => {
      const imageElement = document.createElement('a');
      imageElement.href = image.src;

      const img = document.createElement('img');
      img.src = image.logo;
      img.alt = image.title || 'ERROR';
      img.style.width = "130px";
      img.style.height = "130px";
      img.className = "classy";
 
      imageElement.addEventListener("click", function (event) {
        event.preventDefault();

        
        window.location.href = image.src;
      });


      imageElement.appendChild(img);

      imageContainer.appendChild(imageElement);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

function home() {
  window.location.href = "./index.html"
}