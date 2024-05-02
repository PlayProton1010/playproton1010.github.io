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
      img.style.width = "150px";
      img.style.height = "150px";
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

const searchBox = document.getElementById("search-box");
  const imagesContainer = document.getElementById("image-container");

  searchBox.addEventListener("keyup", function() {
    const searchTerm = this.value.toLowerCase();
    const images = imagesContainer.querySelectorAll("img");

    images.forEach(function(image) {
      const altText = image.alt.toLowerCase();
      image.parentElement.style.display = altText.includes(searchTerm) ? "block" : "none";
    });
  });
